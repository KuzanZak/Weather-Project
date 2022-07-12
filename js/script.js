const airColor = ["darkturquoise", "green", "yellow", "orange", "red", "purple"];

const airQuality = ["Bon", "Moyen", "Dégradé", "Mauvais", "Très Mauvais", "Ext Mauvais"];

const conditions = {
    sunny: {
        code: [1000]
    },
    cloudy: {
        code: [1003, 1006, 1009, 1030, 1135, 1147]
    },
    rainy: {
        code: [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246]
    },
    thundery: {
        code: [1087, 1273, 1276, 1279, 1282 ]
    },
    snowy: {
        code: [1066, 1069, 1072, 1114, 1117, 1168, 1171, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264]
    }
};

const airData = [
    {
        id: "pm2_5",
        keyApi: "pm2_5",
        threshold: [10, 20, 25, 50, 75],
        idb: "aq-pm2_5",
        idq: "aql-pm2_5"
    },
                    {
        id: "pm10",
        keyApi: "pm10",
        threshold: [20, 40, 50, 100, 150],
        idb: "aq-pm10",
        idq: "aql-pm10"
    },
    {
        id: "no2",
        keyApi: "no2",
        threshold: [40, 90, 120, 230, 340],
        idb: "aq-no2",
        idq: "aql-no2"
    },
                    {
        id: "o3",
        keyApi: "o3",
        threshold: [50, 100, 130, 240, 380],
        idb: "aq-o3",
        idq: "aql-o3"
    },
                    {
        id: "so2",
        keyApi: "so2",
        threshold: [100, 200, 350, 500, 750],
        idb: "aq-so2",
        idq: "aql-so2"
    }
];

async function waitingForResponse(name) {
    if(name === "") return;
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=bb17b7c52fa045b6aa5113146222906&lang=fr&q=${name}&aqi=yes`);
    const todoList = await response.json();
    if(response.status != 200) {
        alert("Ce lieu n'existe pas!");
        return;
    }

    getIcon(todoList)
    getName(todoList)
    getCountry(todoList)
    getTemp(todoList)
    getCondition(todoList);
    getWind(todoList);
    displayAirQuality(todoList.current.air_quality);
    isFavorite(name);

    const responseDay = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bb17b7c52fa045b6aa5113146222906&lang=fr&q=${name}&days=3&aqi=no&alert=no`);
    const todoListDay = await responseDay.json();
    recupDay(todoListDay);
}

// Conditions //

function modifyBackground(codeApi){
    if (conditions.sunny.code.includes(codeApi)) {
        document.body.style.background = `url(../img/sunny.jpg) no-repeat 70%`;
        document.body.style.backgroundSize = `1920px 1280px`;
    }
    else if (conditions.cloudy.code.includes(codeApi)) {
        document.body.style.background = `url(../img/cloud3.jpg) no-repeat 70%`;
        document.body.style.backgroundSize = `1920px 1280px`;
    }
    else if (conditions.rainy.code.includes(codeApi)) {
        document.body.style.background = `url(../img/rainy.jpg) no-repeat 70%`;
        document.body.style.backgroundSize = `1920px 1280px`;
    }
    else if (conditions.thundery.code.includes(codeApi)) {
        document.body.style.background = `url(../img/thundery.jpg) no-repeat 70%`;
        document.body.style.backgroundSize = `1920px 1280px`;
    }
    else {
        document.body.style.background = `blue`;
    }
}
function getName(array){
    document.getElementById("city-ttl").innerText = array.location.name;
}

function getIcon(array){
    document.getElementById("list-cd").innerHTML = `<img class="icon-c" src="${array.current.condition.icon}" alt="weather condition">`;
    modifyBackground(array.current.condition.code)
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
    displayWeather(event)
    document.getElementById("input-ville").value = "";
});

function addAndReplace(){
    document.getElementById("input-ttl").classList.replace("displayF", "displayN");
    document.getElementById("first-content").classList.replace("displayN", "displayG");
}



// ASTRONOMY //
async function waitingForResponseAstronomy(name) {
    if(name === "")return; 
    const response = await fetch(`https://api.weatherapi.com/v1/astronomy.json?key=bb17b7c52fa045b6aa5113146222906&lang=fr&q=${name}&dt=2022-07-04`);
    const todoListAstronomy = await response.json();
    if(response.status != 200)return; 
    getSunrise(todoListAstronomy)
    getSunset(todoListAstronomy)
}

function getSunrise(array){
    document.getElementById("sunrise-conditions").innerHTML = array.astronomy.astro.sunrise.replace("AM", "<sup>AM</sup>");
}

function getSunset(array){
    document.getElementById("sunset-conditions").innerHTML = array.astronomy.astro.sunset.replace("PM", "<sup>PM</sup>");
}

// DISPLAY WEATHER //
function displayWeather(event) {
    event.preventDefault()
    const townValue = document.getElementById("input-ville").value;
    waitingForResponse(townValue);
    addAndReplace()
    waitingForResponseAstronomy(townValue);
}

// AUTOCOMPLETE //
let timer;
function autocomplete(inp){
    inp.addEventListener("input", function(){
        clearTimeout(timer);
        timer = setTimeout(() => {
            waitingForResponseSearch(document.getElementById("input-ville").value)
        }, 450);
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
        table.push(`${cities.name}, ${cities.country}`)
    })


    for (let i = 0; i < table.length; i++){
        let b = document.createElement("div");
        b.innerHTML = `<strong class="input-autocomplete"> ${table[i].substr(0, val.length)} </strong>`
        b.innerHTML += table[i].substr(val.length);
        b.innerHTML += `<input id="${i}" class="input-hidden" type="hidden" value="${table[i]}">`;

        b.addEventListener("click", function(event){
            document.getElementById("input-ville-autocomplete-list").addEventListener("click", function(event){
                displayWeather(event)
                document.getElementById("input-ville").value = "";

            })
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

// GEOLOCATION // 
if ("geolocation" in navigator) {
    console.log("geolocation présente")
} else {
    console.log("no geolocation");
}

let latitude,longitude;

function geoFindMe(){
    function getPosition(position){
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log("Latitude : ", latitude, "Longitude : ", longitude)
        waitingLocalisation(latitude, longitude)
        addAndReplace();
    }

    function error() {
        alert('Impossible de retrouver votre localisation')
    }

    if (!navigator.geolocation) {
        alert('Votre navigateur ne supporte pas la géolocalisation');
    } else {
        navigator.geolocation.getCurrentPosition(getPosition, error)
    }
}

async function waitingLocalisation(Lat,lon) {
    const response = await fetch(`https://api.weatherapi.com/v1/astronomy.json?key=bb17b7c52fa045b6aa5113146222906&lang=fr&q=${Lat},${lon}&dt=2022-07-04`);
    const todoListLocalisation = await response.json();
    waitingForResponse(todoListLocalisation.location.name)
    getSunrise(todoListLocalisation);
    getSunset(todoListLocalisation);
}
document.getElementById("find-me").addEventListener('click', geoFindMe)


// AIR QUALITY

function displayAirQuality(api) {
    airData.forEach(index => {
        const indexColor = document.getElementById(index.idb)
        const indexQual = document.getElementById(index.idq)
        document.getElementById(`${index.id}`).innerText = Math.floor(api[index.keyApi]);
        indexColor.style.backgroundColor = getAirQualityColor(api[index.keyApi], index.threshold)
        indexQual.innerText = getAirQuality(api[index.keyApi], index.threshold)
    })
}

function getAirQualityColor(airQValue, thresholds) {
    for (let i = 0; i < thresholds.length; i++) {
        if (airQValue < thresholds[i]) return airColor[i];
    }
    return airColor[airColor.length-1];
}
function getAirQuality(airQValue, thresholds) {
    for (let i = 0; i < thresholds.length; i++) {
        if (airQValue < thresholds[i]) return airQuality[i];
    } 
    return airQuality[airQuality.length-1];
}
