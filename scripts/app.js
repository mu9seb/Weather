// declaring services
let cityService;
// declaring controls / DOM elements
let citySelect;

document.addEventListener("DOMContentLoaded", () => {
    // creating the cityService object from the CityService class
    cityService = new CityService();

    // assigning the global vars
    citySelect = document.getElementById("citySelect");

    // registering events
    citySelect.addEventListener("change", filterCity);

    // start loading data
    loadData();
})

async function loadData() {

    const cities = await cityService.getAll();

    let i = 0;
    cities.forEach(city => {
        const option = new Option(city.name, i);
        citySelect.appendChild(option);
        i++;
    });
}

async function filterCity() {
    const cityIndex = citySelect.value

    const forecast = await cityService.findByIndex(cityIndex);

    displayForecast(forecast);
}

function displayForecast(forecast) {
    if('content' in document.createElement('template')) {
        const dataTableBody = document.querySelector("#forecastDisplay");
        
        // clear table
        dataTableBody.innerHTML = "";

        // populate table
        forecast.forEach(period => {
            addPeriod(period, dataTableBody)
        });
    }
}

function addPeriod(period, parent) {
    const template = document.getElementById("rowDatumTemplate").content.cloneNode(true);

    template.querySelector("#time").innerText = period.name;
    template.querySelector("#temp").innerText = period.temperature + " " + period.temperatureUnit;
    template.querySelector("#wind").innerText = period.windDirection + " " + period.windSpeed;
    template.querySelector("#desc").innerText = period.shortForecast;
    
    parent.appendChild(template);
}
