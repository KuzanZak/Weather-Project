let favoritesTAB = [];
const favoriteJson = JSON.parse(localStorage.getItem("favorites"));
if(favoriteJson != null && favoriteJson.length > 0) favoriteJson.forEach(favorite => { favoritesTAB.push(favorite) });

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
function listenFavorite(){
    document.querySelector('.add-favorite').addEventListener('click', function(event){
        event.preventDefault();
        addFavorite(event, document.getElementById('city-ttl'));
    });
}

// Add favorites on screen
function addFavorite(event, town){
    // Limit is 4 entries
        let fav = town.innerText.toLowerCase();

        if(!localStorage.getItem("favorites")) localStorage.setItem("favorites", JSON.stringify("[]"));
        const myjson = JSON.parse(localStorage.getItem("favorites"));

        if(localStorage.getItem("favorites") != null && JSON.parse(localStorage.getItem("favorites")).length === 4){
            alert("La limite maximum de favoris a été atteinte (4)");
            return;
        }

        if(JSON.parse(localStorage.getItem("favorites")).includes(fav)){
            alert('Il y a déjà un favori à ce nom');
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

    if(favoritesTAB.length > 0){
        favorite.forEach(function(fav){
            createFavorite(fav);
            deleteFavorite(fav);
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
        document.getElementById("input-ttl").classList.replace("displayF", "displayN");
        document.getElementById("first-content").classList.replace("displayN", "displayG");
        waitingForResponseAstronomy(this.innerText)
    });
}

function deleteFavorite(fav){
    document.querySelector('.fa.fa-times').addEventListener('click', function(event){
        let newTab = favoritesTAB.filter(favorite => favorite !== fav);
        removeFavorite(this);
        favoritesTAB = newTab;
        localStorage.setItem("favorites", JSON.stringify(newTab));
    });
}

function removeFavorite(obj){
    obj.parentElement.remove();
}

displayFavorite();