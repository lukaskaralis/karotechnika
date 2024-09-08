require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');
const bcrypt = require("bcrypt");
const {hash} = require("bcrypt");
const cors = require('cors');
const cookieParser = require("cookie-parser");
//const {createTokens, validateToken} = require('./Javascript/JWT');

/**
 * Duomenų bazės konfigūracija.
 */
const db = knex({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
});

console.log('DB Host:', process.env.DB_HOST);
console.log('DB User:', process.env.DB_USER);
console.log('DB Password:', process.env.DB_PASSWORD);
console.log('DB Name:', process.env.DB_NAME);
/**
 * Konfiguruojama Express.js programa.
 */
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/**
 * Nustatomas pradinis kelias statiniams failams, pridedamas fukcionalumas JSON duomenims,.
 */
let intialPath = path.join(__dirname, "");
app.use(bodyParser.json());
app.use(express.static(intialPath));
app.use(cookieParser());
module.exports = app;

/**
 * Maršrutas skirtas grąžinti naudotojui pagrindinį HTML puslapį.
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "index.html"));
})

/**
 * Maršrutas skirtas grąžinti naudotojui prisijungimo HTML puslapį.
 */
app.get('/login', (req, res) => {
    res.sendFile(path.join(intialPath, "login.html"));
})

/**
 * Maršrutas skirtas grąžinti naudotojui registracijos HTML puslapį.
 */
app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));
})

/**
 * Nustatoma kiek "salt" naudoti "bcrypt" algoritmui.
 */
const saltRounds = 10;
/**
 * Sukuriamas POST maršrutas. Paimami naudotojo įvesti duomenys, patikrinama ar visi reikalingi
 * laukai yra užpildyti. Tikrinama ar el.pašto laukas turi @ ženklą. Užšifruojamas slaptažodis
 * naudojant "bcrypt" algoritmą. Sukuriamas naujas įrašas į duomenų baze su naudotojo duomenimis
 * ir suvaldomi duomenys, jeigu toks el.paštas jau yra duomenų bazėje.
 */
app.post('/register-user', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name.length || !email.length || !password.length) {
        res.json('Užpildykite visus laukus');
    } else if (!email.includes('@')) {
        res.json('Blogas elektroninis paštas');
    } else {
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Insert the new user
            await db('Users').insert({
                name: name,
                email: email,
                password: hashedPassword
            });

            // Retrieve the inserted user data
            const [newUser] = await db('Users').where({ email: email });

            if (newUser) {
                res.json({
                    name: newUser.name,
                    email: newUser.email
                });
            } else {
                res.status(500).json('Nepavyko gauti naudotojo duomenų');
            }
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.json('Elektroninis paštas jau egzistuoja');
            } else {
                res.status(500).json('Klaida pridedant naudotoją');
            }
        }
    }
});

app.post('/login-user', (req, res) => {
    const { email, password } = req.body;

    db.select('id', 'name', 'email', 'password')
        .from('users')
        .where({
            email: email,
        })
        .then(data => {
            if (data.length) {
                const storedHashedPassword = data[0].password;
                bcrypt.compare(password, storedHashedPassword, (compareErr, result) => {
                    if (compareErr) {
                        res.status(500).json('Nepavyko prisijungti');
                    } else {
                        if (result) {
                            console.log('User Data:', data);

                            const accessToken = createTokens({
                                username: data[0].name,
                                id: data[0].id
                            });

                            res.cookie("access-token", accessToken, {
                                maxAge: 60 * 60 * 24 * 30
                            });

                            res.json({
                                name: data[0].name,
                                email: data[0].email,
                                accessToken: accessToken,
                            });
                        } else {
                            res.json('Elektroninis paštas arba slaptažodis neteisingas');
                        }
                    }
                });
            } else {
                res.json('Elektroninis paštas arba slaptažodis neteisingas');
            }
        })
        .catch(err => {
            res.status(500).json('Nepavyko prisijungti');
        });
});

/**
 * Paleidžiamas serveris.
 */
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Port is open ${PORT}.`);
});