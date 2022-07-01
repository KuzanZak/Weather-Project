function recupDay(api,town){
    const contentList = document.querySelector('.weatherTown dl');
    contentList.innerHTML = '';

    Object.values(api.forecast.forecastday).forEach((daily,index) => {
        const date = 	new Date(daily.date);
        const days = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
        contentList.innerHTML += `<dt class="name-town${index}">${days[date.getDay()]} ${daily.date.split('-')[2]}</dt><dd class="icon-weather${index}"><img src="http:${daily.day.condition.icon}" alt=""></dd><dd class="current-temp${index}">${Math.round(daily.day.avgtemp_c)} °C</dd>`;
        console.log(date.getDay(),days[date.getDay()])
        // Display forecast when submit
        document.querySelector('.weatherPerday').style.display = 'flex';
    });
    console.log(api)
}