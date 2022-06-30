async function waitingForResponse(name) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=bb17b7c52fa045b6aa5113146222906&q=${name}`);
    const todoList = await response.json();
    getName(todoList)
    getTemp(todoList)
    getCondition(todoList);
}


// Conditions // 
function getName(array){
    console.log(array.location.name)
}
function getTemp(array){
    console.log(array.current.temp_c)
}
function getCondition(array){
    console.log(array.current.condition.text)
}

document.getElementById("header-form").addEventListener("click", function(event){
    if (event.target.classList.contains("input-button-ville")) {
        waitingForResponse(document.getElementById("input-ville").value);
    }
});




