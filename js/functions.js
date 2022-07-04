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
    document.querySelector('.add-favorite').addEventListener('click', function(event){
        event.preventDefault();
        if(!document.querySelector('.div-input-favorite')){

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
        }
        else { document.querySelector('.div-input-favorite').remove(); }
    });
}
// Favorite button's listener
function listenInputFavorite(inputFavorite){
    inputFavorite.addEventListener('keyup', function(event){
        addFavorite(event, this)
    });
}
// Add favorites
function addFavorite(event, $this){
    if ( event.keyCode == 13 ){
        // Vérifie si favorite-town existe alors concat avec le précédent existant sinon création
        const favTown = (localStorage.getItem('favorite-town')) ? localStorage.getItem('favorite-town') + "#" + $this.value : $this.value;
        localStorage.setItem('favorite-town',favTown);
        const li = document.createElement('li');
        li.className = "link-menu";
        document.querySelector('.div-input-favorite').style.display = 'none';
        const linkFavorite = document.createElement('a');
        linkFavorite.innerHTML = `<a href="./&q=${$this.value}" class="fav fav-${$this.value}">${$this.value}</a>`;
        li.append(linkFavorite);
        document.querySelector('.menu').append(li);
    }
}
// Display all favorites
function displayFavorite(){
    if(localStorage.getItem('favorite-town')){
        console.log(localStorage.getItem('favorite-town').split("#"));
        const localFavorite= localStorage.getItem('favorite-town').split("#");
        localFavorite.forEach(function(favorite){
            const li = document.createElement('li');
            const favoriteHTML = document.createElement("a");
            li.className = "link-menu";
            favoriteHTML.className = `fav fav-${favorite.replace(' ','-')}`;
            favoriteHTML.href = `#&q=${favorite}`;
            favoriteHTML.append(favorite);
            li.appendChild(favoriteHTML);
            document.querySelector('.menu').append(li);
            favoriteHTML.addEventListener('click', function(event){
                event.preventDefault();
                // J'EN SUIS LAAAAAAAAAA ^^
                console.log(this.innerText)
             });
        });
    }
}