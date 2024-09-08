const tanks = [
    {name: "Abrams", imgSrc: ["Foto/Tankai/Amerikieciu/Abrams/1.jpg", "Foto/Tankai/Amerikieciu/Abrams/2.jpg", "Foto/Tankai/Amerikieciu/Abrams/3.jpg"], link: "Abrams.html"},
    {name: "T-90", imgSrc: ["Foto/Tankai/Rusijos/T90/1.jpg", "Foto/Tankai/Rusijos/T90/2.jpg", "Foto/Tankai/Rusijos/T90/3.jpg"], link: "T90.html"},
    {name: "Leopard 2A5", imgSrc: ["Foto/Tankai/Vokieciu/Leopard 2a5/1.jpg", "Foto/Tankai/Vokieciu/Leopard 2a5/2.jpg", "Foto/Tankai/Vokieciu/Leopard 2a5/3.jpg"], link: "Leopard2A5.html"},
];

const randomizedTanks = tanks.map(tank => {
    return {
        name: tank.name,
        imgSrc: Array.isArray(tank.imgSrc) ? tank.imgSrc[Math.floor(Math.random() * tank.imgSrc.length)] : tank.imgSrc,
        link: tank.link
    };
});

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const shuffledTanks = shuffleArray(randomizedTanks);

document.addEventListener("DOMContentLoaded", function() {
    shuffledTanks.slice(0, 2).forEach((tank, index) => {
        const tankImage = document.getElementById(`tank${index + 1}`);
        const tankName = document.getElementById(`tankName${index + 1}`);
        if (tankImage && tankName) {
            tankImage.src = tank.imgSrc;
            tankName.textContent = tank.name;
            tankImage.addEventListener("click", function() {
                window.location.href = tank.link;
            });
        } else {
            console.error(`Tank image or name element not found for tank${index + 1}`);
        }
    });
});
const helicopters = [
    {name: "Apache", imgSrc: ["Foto/Sraigtasparniai/Amerikieciu/Apache/1.jpg", "Foto/Sraigtasparniai/Amerikieciu/Apache/2.jpg", "Foto/Sraigtasparniai/Amerikieciu/Apache/3.jpg"], link: "common_link.html"},
    {name: "MI-24", imgSrc: ["Foto/Sraigtasparniai/Rusijos/Mi24/1.jpg", "Foto/Sraigtasparniai/Rusijos/Mi24/2.jpg", "Foto/Sraigtasparniai/Rusijos/Mi24/3.jpg"], link: "common_link.html"},
    {name: "Tiger", imgSrc: ["Foto/Sraigtasparniai/Vokieciu/Tiger/1.jpg", "Foto/Sraigtasparniai/Vokieciu/Tiger/2.jpg", "Foto/Sraigtasparniai/Vokieciu/Tiger/3.jpg"], link: "common_link.html"}
];


const randomizedHelicopters = helicopters.map(helicopter => {
    return {name: helicopter.name, imgSrc: Array.isArray(helicopter.imgSrc) ? helicopter.imgSrc[Math.floor(Math.random() * helicopter.imgSrc.length)] : helicopter.imgSrc};
});


const shuffledHelicopters = shuffleArray(randomizedHelicopters);


document.addEventListener("DOMContentLoaded", function() {
    shuffledHelicopters.slice(0, 2).forEach((helicopter, index) => {
        const helicopterImage = document.getElementById(`helicopter${index + 1}`);
        const helicopterName = document.getElementById(`helicopterName${index + 1}`);

        if (helicopterImage && helicopterName) {
            helicopterImage.src = helicopter.imgSrc;
            helicopterName.textContent = helicopter.name;
        } else {
            console.error(`Helicopter image or name element not found for helicopter${index + 1}`);
        }
    });
});

const artillery = [
    {name: "M777", imgSrc: ["Foto/Artilerija/Amerikieciu/M777/1.jpg", "Foto/Artilerija/Amerikieciu/M777/2.jpg", "Foto/Artilerija/Amerikieciu/M777/3.jpg"], link: "common_link.html"},
    {name: "Panzerhaubitze 2000", imgSrc: ["Foto/Artilerija/Vokietijos/2000/1.jpg", "Foto/Artilerija/Vokietijos/2000/2.jpg", "Foto/Artilerija/Vokietijos/2000/3.jpg"], link: "common_link.html"},
    {name: "BM-21", imgSrc: ["Foto/Artilerija/Rusijos/BM21/1.jpg", "Foto/Artilerija/Rusijos/BM21/2.jpg", "Foto/Artilerija/Rusijos/BM21/3.jpg"], link: "common_link.html"}
];

const randomizedArtillery = artillery.map(artilleryPiece => {
    return {name: artilleryPiece.name, imgSrc: Array.isArray(artilleryPiece.imgSrc) ? artilleryPiece.imgSrc[Math.floor(Math.random() * artilleryPiece.imgSrc.length)] : artilleryPiece.imgSrc};
});

const shuffledArtillery = shuffleArray(randomizedArtillery);

document.addEventListener("DOMContentLoaded", function() {
    shuffledArtillery.slice(0, 2).forEach((artilleryPiece, index) => {
        const artilleryImage = document.getElementById(`artillery${index + 1}`);
        const artilleryName = document.getElementById(`artilleryName${index + 1}`);

        if (artilleryImage && artilleryName) {
            artilleryImage.src = artilleryPiece.imgSrc;
            artilleryName.textContent = artilleryPiece.name;
        } else {
            console.error(`Artillery image or name element not found for artillery${index + 1}`);
        }
    });
});




