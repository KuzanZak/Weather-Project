function recupTown(town){
    const displayTag = document.querySelector('.main');

    displayTag.innerHTML += "<br>" + town.location.name;
    displayTag.innerHTML += "<br>" + town.current.temp_c;
    displayTag.innerHTML += "<br>" + town.current.gust_kph;
    displayTag.innerHTML += "<br>" + town.current.condition.code;
}

function recupDay(api,town){
    const contentList = document.querySelector('.listDay');
    const meteoTown = document.createElement('dl');

    Object.values(api.forecast.forecastday).forEach(daily => {
        meteoTown.classList.add('weatherTown');

        meteoTown.innerHTML += '<dd><img src="http:' + daily.day.condition.icon + '" alt="">' + daily.date + '</dd>';

        // console.log(daily.day.condition.icon);
        document.querySelector('.listDay').appendChild(meteoTown);
    });
    console.log(api)
}

document.querySelector('.input-button-ville').addEventListener('click', function(event){
    event.preventDefault();
    parameter("key","bb17b7c52fa045b6aa5113146222906");
    parameter("q",document.querySelector('.input-ville').value);
});