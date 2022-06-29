function recup(todoList){
    const displayTag = document.querySelector('.main');
    Object.values(todoList).forEach(town => {
        console.log(typeof town.name)
        // renvoi une fois sur 2 ==> undefined
        displayTag.innerHTML += (!town.name) ? "" : town.name;
        displayTag.innerHTML += (!town.region) ? "" : town.region;
        
    });
}

document.querySelector('.input-button-ville').addEventListener('click', function(event){
    event.preventDefault();
    parameter("key","bb17b7c52fa045b6aa5113146222906");
    parameter("q",document.querySelector('.input-ville').value);
    // utiliser ajax
});