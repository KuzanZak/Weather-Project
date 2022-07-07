const airColor = ["cyan", "green", "yellow", "orange", "red", "purple"]

const airData = [
    {
        id: "pm2_5",
        keyApi: "pm2_5",
        threshold: [10, 20, 25, 50, 75],
        idb: "aq-pm2_5",
    },
                    {
        id: "pm10",
        keyApi: "pm10",
        threshold: [20, 40, 50, 100, 150],
        idb: "aq-pm10",
    },
    {
        id: "no2",
        keyApi: "no2",
        threshold: [40, 90, 120, 230, 340],
        idb: "aq-no2",
    },
                    {
        id: "o3",
        keyApi: "o3",
        threshold: [50, 100, 130, 240, 380],
        idb: "aq-o3",
    },
                    {
        id: "so2",
        keyApi: "so2",
        threshold: [100, 200, 350, 500, 750],
        idb: "aq-so2",
    }
];

async function waitingForResponse(name) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=bb17b7c52fa045b6aa5113146222906&lang=fr&q=${name}&aqi=yes`);
    const todoList = await response.json();
    getName(todoList)
    getCountry(todoList)
    getTemp(todoList)
    getCondition(todoList);
    getWind(todoList);
    displayAirQuality(todoList.current.air_quality);
    // testAirQ(todoList);

    const responseDay = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bb17b7c52fa045b6aa5113146222906&lang=fr&q=${name}&days=3&aqi=no&alert=no`);
    const todoListDay = await responseDay.json();
    recupDay(todoListDay);
}

// Conditions //
function getName(array){
    // if (document.getElementById("input-ville").value != array.location.name) return alert("Nom de ville inconnu.");
    document.getElementById("city-ttl").innerText = array.location.name;
}

function getCountry(array){
    document.getElementById("country-ttl").innerText = array.location.country;
}

function getTemp(array){
    document.getElementById("condition-tp").innerText = array.current.temp_c + " °C";
}
function getCondition(array){
    document.getElementById("condition-c").innerText = array.current.condition.text;
}
function getWind(array){
    document.getElementById("condition-ws").innerText = array.current.wind_kph + " km/h";
}
document.getElementById("header-form").addEventListener("submit", function(event){
    event.preventDefault();
    const townValue = document.getElementById("input-ville").value;
    waitingForResponse(townValue);
    addAndReplace()
    waitingForResponseAstronomy(townValue);
});

function addAndReplace(){
    if (document.getElementById("input-ville").value == false) return alert("Nom de ville inconnu.");
    document.getElementById("input-ttl").classList.replace("displayF", "displayN");
    document.getElementById("first-content").classList.replace("displayN", "displayG");

}

// Autocomplete //
let timer;
function autocomplete(inp){
    inp.addEventListener("input", function(event){
        clearTimeout(timer);
        timer = setTimeout(() => {
            waitingForResponseSearch(document.getElementById("input-ville").value)
        }, 700);
    });
};

async function waitingForResponseSearch(name) {
    if (name.length <= 2) return;
    const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=bb17b7c52fa045b6aa5113146222906&lang=fr&q=${name}`);
    const todoListSearch = await response.json();
    getComplete(todoListSearch)
}

function getComplete(array){
    const table = [];
    let a;
    const input = document.getElementById("input-ville");
    let val = input.value;
    closeAllLists();
    if (!val) {return false;}

    a = document.createElement("div");
    a.setAttribute("id", input.id + "-autocomplete-list");
    a.setAttribute("class", "autocomplete-items")
    const div = document.getElementById("autocomplete");
    div.append(a)

    array.forEach(cities => {
        table.push(cities.name)
    })


    for (let i = 0; i < table.length; i++){
        let b = document.createElement("div");
        b.innerHTML = `<strong class="input-autocomplete"> ${table[i].substr(0, val.length)} </strong>`
        b.innerHTML += table[i].substr(val.length);
        b.innerHTML += `<input id="${i}" class="input-hidden" type="hidden" value="${table[i]}">`;

        b.addEventListener("click", function(event){
            input.value = this.getElementsByTagName("input")[0].value;
            closeAllLists();
        });
        a.appendChild(b);
    }
}
autocomplete(document.getElementById("input-ville"))


function closeAllLists(elm){
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
        if (elm != x[i] && elm != document.getElementById("input-ville")){
            x[i].parentNode.removeChild(x[i]);
        }
    }
}
document.addEventListener("click", function(event){
    closeAllLists(event.target);
})

// ASTRONOMY //
async function waitingForResponseAstronomy(name) {
    const response = await fetch(`https://api.weatherapi.com/v1/astronomy.json?key=bb17b7c52fa045b6aa5113146222906&lang=fr&q=${name}&dt=2022-07-04`);
    const todoListAstronomy = await response.json();
    getSunrise(todoListAstronomy)
    getSunset(todoListAstronomy)
}

function getSunrise(array){
    document.getElementById("sunrise-conditions").innerHTML = array.astronomy.astro.sunrise.replace("AM", "<sup>AM</sup>");
}

function getSunset(array){
    document.getElementById("sunset-conditions").innerHTML = array.astronomy.astro.sunset.replace("PM", "<sup>PM</sup>");
}

// AIR QUALITY

function displayAirQuality(api) {
    airData.forEach(index => {
        const indexColor = document.getElementById(index.idb)
        document.getElementById(`${index.id}`).innerText = Math.floor(api[index.keyApi]);
        indexColor.style.backgroundColor = getAirQualityColor(api[index.keyApi], index.threshold)
    })
}

function getAirQualityColor(airQValue, thresholds) {
    for (let i = 0; i < thresholds.length; i++) {
        if (airQValue < thresholds[i]) return airColor[i];
    } 
    return airColor[airColor.length-1];
}