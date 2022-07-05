const favoritesTAB = [];
const favoriteJson = JSON.parse(localStorage.getItem("favorites"));
if(favoriteJson != null) favoriteJson.forEach(favorite => { favoritesTAB.push(favorite) });

function recupDay(api,town){
    const contentList = document.querySelector('.weatherTown dl');
    contentList.innerHTML = '';

    Object.values(api.forecast.forecastday).forEach((daily,index) => {
        const date = 	new Date(daily.date);
        const days = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
        contentList.innerHTML += `<dt class="name-town${index}">${days[date.getDay()]} ${daily.date.split('-')[2]}</dt><dd class="icon-weather${index}"><img src="http:${daily.day.condition.icon}" alt=""></dd><dd class="current-temp${index}">${Math.round(daily.day.avgtemp_c)} °C</dd>`;

        // Display forecast when submit
        document.querySelector('.weatherPerday').style.display = 'flex';
    });
}

function listenAddFavorite(){
    document.querySelector('.add-favorite').addEventListener('click', function(event){
        event.preventDefault();
        if(!document.querySelector('.div-input-favorite')){

            const linkMenu = document.querySelector('.menu');
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
// Add favorites on screen
function addFavorite(event, $this){
    if ( event.keyCode == 13 ){
        // Vérifie si favorite-town existe alors concat avec le précédent existant sinon création
        const town = $this.value;
        const favoriteJson = localStorage.getItem("favorites");
        favoritesTAB.push(town);
        const favoriteTab = JSON.stringify(favoritesTAB);
        localStorage.setItem("favorites", favoriteTab);

        const li = document.createElement('li');
        const favoriteLink = document.createElement("a");
        const iconDelete = document.createElement("i");
        iconDelete.classList.add("fa");
        iconDelete.classList.add("fa-times");
        iconDelete.classList.add("delete");
        iconDelete.setAttribute("aria-hidden", "true");

        li.className = "link-menu";
        favoriteLink.className = `fav`;
        favoriteLink.href = `#${town}`;
        favoriteLink.append(town);
        li.appendChild(favoriteLink);
        li.appendChild(iconDelete);
        document.querySelector('.menu').prepend(li);
        favoriteLink.addEventListener('click', function(event){
            event.preventDefault();
            waitingForResponse(this.innerText);
        });
    }
}
displayFavorite();
listenAddFavorite();
// Display all favorites
function displayFavorite(){
    const favoriteJson = localStorage.getItem("favorites");
    const favorite = JSON.parse(favoriteJson);
    if(favorite !== null){
        favorite.forEach(function(fav){
            const li = document.createElement('li');
            const favoriteLink = document.createElement("a");
            const iconDelete = document.createElement("i");
            iconDelete.classList.add("fa");
            iconDelete.classList.add("fa-times");
            iconDelete.classList.add("delete");
            iconDelete.setAttribute("aria-hidden", "true");

            li.className = "link-menu";
            favoriteLink.className = `fav`;
            favoriteLink.href = `#${fav}`;
            favoriteLink.append(fav);
            li.appendChild(favoriteLink);
            li.appendChild(iconDelete);

            document.querySelector('.menu').prepend(li);
            // Listen favorite and request
            favoriteLink.addEventListener('click', function(event){
                event.preventDefault();
                waitingForResponse(this.innerText);
            });
            iconDelete.addEventListener('click', function(event){

            });
        });
    }
}