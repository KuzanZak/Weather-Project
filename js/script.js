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

