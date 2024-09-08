var pages = [
    { name: "Pradžia", url: "index.html" },
    { name: "Tankai", url: "Tankai.html" },
    { name: "Testas", url: "Testas.html" },
    { name: "Nuotraukos", url: "Nuotraukos.html" },
    { name: "Abrams", url: "Abrams.html" }
];


function generateSearchResults() {
    var searchText = document.getElementById("searchInput").value.toLowerCase();
    var searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.innerHTML = '';

    var searchResultsList = document.createElement('ul');

    pages.forEach(function(page) {
        if (page.name.toLowerCase().includes(searchText)) {
            var listItem = document.createElement('li');
            var link = document.createElement('a');
            link.href = page.url;
            link.textContent = page.name;
            listItem.appendChild(link);
            searchResultsList.appendChild(listItem);
        }
    });

    if (searchResultsList.children.length > 0) {
        searchResultsDiv.innerHTML = '';
        searchResultsDiv.appendChild(searchResultsList);
        searchResultsDiv.style.display = "block";
    } else {
        searchResultsDiv.style.display = "none";
    }
}
document.getElementById("searchInput").addEventListener("input", generateSearchResults);
function hideSearchResults(event) {
    var searchInput = document.getElementById("searchInput");
    var searchResults = document.getElementById("searchResults");
    if (event.target !== searchInput && event.target !== searchResults && !searchResults.contains(event.target)) {
        searchResults.style.display = "none";
    }
}
document.body.addEventListener("click", hideSearchResults);