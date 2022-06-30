
// function parameter(name,value) {
//     let loc = window.location.href, hist= window.history, parameters = loc.match(/[\\?&].([^&#]*)=([^&#]*)/g), data = {}, url = '?';

//     for (let key in parameters) {
//         let couple = parameters[key].substring(1, parameters[key].length).split('=');  // A chaque fois qu'on trouve l'occurrence "="
//         data[couple[0]] = couple[1];                                                   // Tableau
//     }

//     if (value == null)  return data[name] ? data[name] : null;
//     if (value != false) data[name] = value;

//     for (let key in data) {
//         if (value == false && key == name) continue;                                  // On passe si la valeur est fausse ou si la clé est égale au nom
//         url = url.concat(key.concat('=' + data[key]+'&'));                            // Concaténation de la nouvelle adresse
//     }
//     hist.pushState('', document.title, url.substring(0, url.length-1));               // On modifie l'historique de navigation
//     location.reload();
// }

// async function waitingForResponse() {
//     let param = parameter("q");
//     if(param != undefined){
//         const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${parameter("key")}&q=${parameter("q")}`);
//         const todoList = await response.json();

//         recup(todoList);
//     }
// }
// waitingForResponse();

async function waitingForResponse(name) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=bb17b7c52fa045b6aa5113146222906&q=${name}`);
    const todoList = await response.json();
    getName(todoList)
    getTemp(todoList)
    getCondition(todoList);
    getWind(todoList);
}


// Conditions //
function getName(array){
    document.getElementById("city-ttl").innerText = array.location.name;
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
});

