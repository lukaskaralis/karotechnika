function openModal(imageSrc, author) {
    document.getElementById('myModal').style.display = "block";
    document.getElementById("modalImg").src = imageSrc;
    document.getElementById("author").innerText = "Nuotraukos autorius: " + author + "\nCreative Commons Attribution";
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}
