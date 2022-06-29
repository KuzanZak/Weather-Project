function recup(todoList){
    const displayTag = document.querySelector('.main');
    Object.values(todoList).forEach(town => {
        // renvoi une fois sur 2 ==> undefined
        if(town.name)       displayTag.innerHTML += "<br>" + town.name;
        if(town.region)     displayTag.innerHTML += "<br>" + town.region;
        if(town.lat)        displayTag.innerHTML += "<br>" + town.lat;
        if(town.lon)        displayTag.innerHTML += "<br>" + town.lon;
        if(town.tz_id)      displayTag.innerHTML += "<br>" + town.tz_id;
        if(town.feelslike_c)displayTag.innerHTML += "<br>" + town.feelslike_c;
        if(town.gust_kph)   displayTag.innerHTML += "<br>" + town.gust_kph;
        if(town.is_day == 0)displayTag.innerHTML += "<br>" + "C'est la nuit";
        if(town.is_day == 1)displayTag.innerHTML += "<br>" + "C'est le jour";
    });
}

document.querySelector('.input-button-ville').addEventListener('click', function(event){
    event.preventDefault();
    parameter("key","bb17b7c52fa045b6aa5113146222906");
    parameter("q",document.querySelector('.input-ville').value);
});
