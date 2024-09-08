var isBiggerSize = false;
var originalFontSizes = {};

document.getElementById('textSizeToggle').addEventListener('click', function(event) {
    event.preventDefault();

    var headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');

    if (!isBiggerSize) {
        for (var i = 0; i < headings.length; i++) {
            var computedStyle = window.getComputedStyle(headings[i]);
            originalFontSizes[i] = {
                size: parseFloat(computedStyle.fontSize),
                unit: computedStyle.fontSize.slice(-2)
            };
            headings[i].style.fontSize = (originalFontSizes[i].size * 1.2) + originalFontSizes[i].unit;
        }
        isBiggerSize = true;
        document.getElementById('textSizeToggle').textContent = 'Mažesnis šriftas';
    } else {
        for (var i = 0; i < headings.length; i++) {
            headings[i].style.fontSize = originalFontSizes[i].size + originalFontSizes[i].unit;
        }
        isBiggerSize = false;
        document.getElementById('textSizeToggle').textContent = 'Didesnis šriftas';
    }
});

document.getElementById('darkMode').addEventListener('click', function() {
    document.getElementById('navbar').classList.toggle('dark-mode-navbar');
    var elements = document.querySelectorAll('h2, p, h4, h5');
    elements.forEach(function(element) {
        element.classList.toggle('dark-mode-text');
    });
    var elements1 = document.querySelectorAll('.h2');
    elements1.forEach(function(element) {
        element.classList.toggle('dark-mode-text-body');
    });
    document.getElementById('footer').classList.toggle('dark-mode-footer');
    var darkModeButton = document.getElementById('darkMode');
    if (darkModeButton.textContent === 'Tamsus režimas') {
        darkModeButton.textContent = 'Šviesus režimas';
    } else {
        darkModeButton.textContent = 'Tamsus režimas';
    }
});