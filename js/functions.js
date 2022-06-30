function recup(todoList){
    const displayTag = document.querySelector('.main');

    console.log(todoList);

    displayTag.innerHTML += "<br>" + todoList.location.name;
    displayTag.innerHTML += "<br>" + todoList.current.temp_c;
    displayTag.innerHTML += "<br>" + todoList.current.gust_kph;
    displayTag.innerHTML += "<br>" + todoList.current.condition.code;
}

document.querySelector('.input-button-ville').addEventListener('click', function(event){
    event.preventDefault();
    parameter("key","bb17b7c52fa045b6aa5113146222906");
    parameter("q",document.querySelector('.input-ville').value);
});