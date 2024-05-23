const statyContainer = document.getElementById('staty');
const continentSelect = document.getElementById('continent-select');
const populationFilterButton = document.getElementById('population-filter');
const areaFilterButton = document.getElementById('area-filter');

let countriesData = []; // Uchování načtených dat států

// Funkce pro načítání dat ze zvoleného kontinentu
function loadCountriesByContinent(continent) {
    fetch(`https://restcountries.com/v3.1/region/${continent}`)
        .then((response) => response.json())
        .then((data) => {
            countriesData = data; // Uložení dat států pro pozdější použití
            renderCountries(data); // Zobrazení načtených států
        });
}

// Funkce pro zobrazení států
function renderCountries(data) {
    statyContainer.innerHTML = '';
    data.forEach(stat => {
        let blockCountry = `
            <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="card">
                    <img class="card-img-top" src="${stat.flags.png}" alt="${stat.name.official}" />
                    <div class="card-body">
                        <h4 class="card-title">${stat.translations.ces.common}</h4>
                        <p class="card-text">Počet obyvatel: ${stat.population}<br>Rozloha: ${stat.area} km<sup>2</sup></p>
                        <button class="btn btn-primary" onclick="showCountryDetails('${stat.translations.ces.common}')">Více informací</button>
                    </div>
                </div>
            </div>`;
        statyContainer.innerHTML += blockCountry;
    });
}

// Obsluha události změny výběru kontinentu
continentSelect.addEventListener('change', function() {
    const selectedContinent = continentSelect.value;
    loadCountriesByContinent(selectedContinent);
});

// Funkce pro filtrování států podle počtu obyvatel
populationFilterButton.addEventListener('click', function() {
    const sortedData = countriesData.slice().sort((a, b) => b.population - a.population); // Seřazení dat podle počtu obyvatel
    renderCountries(sortedData); // Zobrazení seřazených dat
});

// Funkce pro filtrování států podle rozlohy
areaFilterButton.addEventListener('click', function() {
    const sortedData = countriesData.slice().sort((a, b) => b.area - a.area); // Seřazení dat podle rozlohy
    renderCountries(sortedData); // Zobrazení seřazených dat
});

// Funkce pro otevření Wikipedie pro daný stát
function showCountryDetails(commonName) {
    window.open(`https://cs.wikipedia.org/wiki/${commonName}`, '_blank');
}

// Načtení dat pro výchozí kontinent
loadCountriesByContinent('europe'); // Načti Evropu jako výchozí kontinent


