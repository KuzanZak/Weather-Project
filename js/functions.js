let favoritesTAB = [];
const favoriteJson = JSON.parse(localStorage.getItem("favorites"));
if(favoriteJson != null && favoriteJson.length > 0) favoriteJson.forEach(favorite => { favoritesTAB.push(favorite) });

// Add week's day on screen
function recupDay(todoListDay){
    const contentList = document.querySelector('.weatherTown dl');
    contentList.innerHTML = '';

    Object.values(todoListDay.forecast.forecastday).forEach((daily,index) => {
        const date = 	new Date(daily.date);
        const days = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
        contentList.innerHTML += `<dt class="name-town${index}">${days[date.getDay()]} ${daily.date.split('-')[2]}</dt><dd class="icon-weather${index}"><img src="https:${daily.day.condition.icon}" alt=""></dd><dd class="current-temp${index}">${Math.round(daily.day.avgtemp_c)} °C</dd>`;

        // Display forecast when submit
        document.querySelector('.weatherPerday').style.display = 'flex';
    });
}

// Favorite button's listener
function listenAddFavorite(){
    document.querySelector('.add-favorite').addEventListener('click', function(event){
        event.preventDefault();
        let cityFav = document.getElementById('city-ttl').innerText.toLowerCase();

        if(localStorage.getItem("favorites") != null && JSON.parse(localStorage.getItem("favorites")).includes(cityFav)){
            // alert('Il y a déjà un favori à ce nom');
            // return;
        }
        else if(localStorage.getItem("favorites") != null && JSON.parse(localStorage.getItem("favorites")).length === 4){
            alert("La limite maximum de favoris a été atteinte (4)");
            return;
        }
        addFavorite(event, document.getElementById('city-ttl'));
    });
}

// Add favorites on screen
function addFavorite(event, town){
    // Limit is 4 entries
        let fav = town.innerText.toLowerCase();
        if(!localStorage.getItem("favorites")) localStorage.setItem("favorites", JSON.stringify("[]"));
        const myjson = JSON.parse(localStorage.getItem("favorites"));
        // Vérifie si favorite-town existe alors concat avec le précédent existant sinon création
        const favoriteJson = localStorage.getItem("favorites");
        favoritesTAB.push(fav);
        const favoriteTab = JSON.stringify(favoritesTAB);
        localStorage.setItem("favorites", favoriteTab);

        createFavorite(fav);
        deleteFavorite(fav);
        isFavorite(fav);
}

// Display all favorites
function displayFavorite(){
    const favoriteJson = localStorage.getItem("favorites");
    const favorite = JSON.parse(favoriteJson);

    if(favoritesTAB.length > 0){
        document.querySelector('.menu').innerHTML = '';
        favorite.forEach(function(fav){
            createFavorite(fav);
            deleteFavorite(fav);
        });
    }
}

// Adding favorite and creating its environment
function createFavorite(fav){
    const li = document.createElement('li');
    const favoriteLink = document.createElement("a");
    const iconDelete = document.createElement("i");
    iconDelete.classList.add("fa");
    iconDelete.classList.add("fa-times");
    iconDelete.classList.add("delete");
    iconDelete.setAttribute("aria-hidden", "true");

    li.className = "link-menu";
    favoriteLink.id = fav.replace(/ /g,""); // Remove spaces in the string
    favoriteLink.className = `fav`;
    favoriteLink.href = `#${fav}`;
    favoriteLink.append(fav);
    li.appendChild(favoriteLink);
    li.appendChild(iconDelete);

    document.querySelector('.menu').prepend(li);
    // Listen favorite and request
    listenFavorite(favoriteLink);
}

function listenFavorite(favoriteLink){
    favoriteLink.addEventListener('click', function(event){
        event.preventDefault();
        waitingForResponse(this.innerText);
        document.getElementById("input-ttl").classList.replace("displayF", "displayN");
        document.getElementById("first-content").classList.replace("displayN", "displayG");
        waitingForResponseAstronomy(this.innerText);
    });
}
function isFavorite(name){
    const town = name.toLowerCase();
    if(localStorage.getItem("favorites") != null && JSON.parse(localStorage.getItem('favorites')).includes(town)){
        document.querySelector('.add-star').classList.add("is-favorite")
        document.querySelector('.button-favorite').classList.add("remove-favorite");
        document.querySelector('.button-favorite').classList.remove("add-favorite");
        listenIconFavorite(town)
    }
    if(localStorage.getItem("favorites") != null && !JSON.parse(localStorage.getItem('favorites')).includes(town)) {
        document.querySelector('.add-star').classList.remove("is-favorite")
        document.querySelector('.button-favorite').classList.add("add-favorite");
        document.querySelector('.button-favorite').classList.remove("remove-favorite");
        
    }
}

function listenIconFavorite(town){
    document.querySelector('.remove-favorite').addEventListener('click', function(event){
        this.classList.add("add-favorite");
        document.querySelector('.button-favorite').classList.remove("remove-favorite");
        removeOnClickButtonFavorite(this.firstChild,town);
        displayFavorite();
    });
}

// Dsiplay or not display menu
function displayMenu(){
    document.querySelector('.show-menu').addEventListener('click', function(event){
        document.querySelector('.menu').classList.add("active");
    });
    document.querySelector('.menu').addEventListener('click', function(event){
        this.classList.remove("active");
    });
}
// Delete favorite
function deleteFavorite(fav){
    document.querySelector('.fa.fa-times').addEventListener('click', function(event){
        removeFavorite(this, fav);
    });
}

function removeFavorite(obj, fav){
    let newTab = favoritesTAB.filter(favorite => favorite !== fav);
    obj.parentElement.remove();
    favoritesTAB = newTab;
    localStorage.setItem("favorites", JSON.stringify(newTab));
}
function removeOnClickButtonFavorite(firstChild,fav){
    let newTab = favoritesTAB.filter(favorite => favorite !== fav);
    favoritesTAB = newTab;
    localStorage.setItem("favorites", JSON.stringify(newTab));
    firstChild.classList.remove("is-favorite");
}

// Call functions
displayFavorite();
displayMenu();
listenAddFavorite();