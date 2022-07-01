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

function listenFavorite(){
    document.querySelector('.link-favorite').addEventListener('click', function(event){
        event.preventDefault();
        const linkMenu = document.querySelector('.link-menu');
        const divInputFavorite = document.createElement('div');
        divInputFavorite.classList.add('div-input-favorite');
        const inputFavorite = document.createElement('input');
        inputFavorite.type = 'text';
        inputFavorite.classList.add('input-favorite');
        divInputFavorite.appendChild(inputFavorite);
        linkMenu.appendChild(divInputFavorite);

        document.querySelector('.div-input-favorite').style.display = 'block';
        listenInputFavorite(inputFavorite);
    });
}

function listenInputFavorite(inputFavorite){
    inputFavorite.addEventListener('keyup', function(event){
        addFavorite(event, this)
    });
}

function addFavorite(event, $this){
    if ( event.keyCode == 13 ){
        // Vérifie si favorite-town existe alors concat avec le précédent existant sinon création
        const favTown = (localStorage.getItem('favorite-town')) ? localStorage.getItem('favorite-town') + "#" + $this.value : $this.value;
        localStorage.setItem('favorite-town',favTown);
        document.querySelector('.div-input-favorite').style.display = 'none';
        const linkFavorite = document.createElement('a');
        linkFavorite.innerHTML = `<a href="./&q=${$this.value}" class="fav fav-${$this.value}">${$this.value}</a>`;
        document.querySelector('.favorite').append(linkFavorite);
    }
}

function displayFavorite(){
    if(localStorage.getItem('favorite-town')){
        console.log(localStorage.getItem('favorite-town').split("#"));
        const localFavorite= localStorage.getItem('favorite-town').split("#");
        localFavorite.forEach(function(favorite){
            const favoriteHTML = document.createElement("a");
            favoriteHTML.className = `fav fav-${favorite}`;
            favoriteHTML.append(favorite);
            document.querySelector('.favorite').append(favoriteHTML);

        });
    }
}