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
    // console.log(api)
}
// Favorite button's listener
function listenAddFavorite(){
    // document.querySelector('.add-favorite').addEventListener('click', function(event){
    //     event.preventDefault();
    //     addFavorite(event, document.querySelector('.input-favorite'));
    // });
}

// Add favorites on screen
function addFavorite(event, $this){
    // Limit is 4 entries
        const fav = $this.value;
        const myjson = JSON.parse(localStorage.getItem("favorites"));
        const ifExists = myjson.filter(favorite => favorite === $this.value )
        console.log( ifExists );

        if(localStorage.getItem("favorites") != null && JSON.parse(localStorage.getItem("favorites")).length > 3){
            alert("La limite maximum de favoris a été atteinte (4)");
            return;
        }
        // Vérifie si favorite-town existe alors concat avec le précédent existant sinon création
        const favoriteJson = localStorage.getItem("favorites");
        favoritesTAB.push(fav);
        const favoriteTab = JSON.stringify(favoritesTAB);
        localStorage.setItem("favorites", favoriteTab);

        createFavorite(fav);
        deleteFavorite();
}
// Display all favorites
function displayFavorite(){
    const favoriteJson = localStorage.getItem("favorites");
    const favorite = JSON.parse(favoriteJson);
    if(favorite !== null){
        favorite.forEach(function(fav){
            createFavorite(fav);
            deleteFavorite();
        });
    }
}
function createFavorite(fav){
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
}
function deleteFavorite(){
    document.querySelector('.fa.fa-times').addEventListener('click', function(event){
        console.log('delete favorite'); // En cours...
    });
}

displayFavorite();
listenAddFavorite();