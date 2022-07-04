async function waitingForResponse(name) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=bb17b7c52fa045b6aa5113146222906&lang=fr&q=${name}`);
    const todoList = await response.json();
    getName(todoList)
    getCountry(todoList)
    getTemp(todoList)
    getCondition(todoList);
    getWind(todoList);

    const responseDay = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=bb17b7c52fa045b6aa5113146222906&lang=fr&q=${name}&days=3&aqi=no&alert=no`);
    const todoListDay = await responseDay.json();
    recupDay(todoListDay,todoList);
}

<<<<<<< HEAD
// Conditions // 
=======
// Conditions //
>>>>>>> c5bff6083b3b8bf255e286125b9d5439b8a6861a
function getName(array){
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

document.getElementById("header-form").addEventListener("submit", function(){
    waitingForResponse(document.getElementById("input-ville").value);
    waitingForResponseAstronomy(document.getElementById("input-ville").value);
});

// Autocomplete //

function autocomplete(inp){
    inp.addEventListener("input", function(event){
        waitingForResponseSearch(document.getElementById("input-ville").value);
    });
}
async function waitingForResponseSearch(name) {
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
    document.getElementById("sunset-conditions").innerHTML = array.astronomy.astro.sunset.replace("PM", "<sup>PM</sup>");}

