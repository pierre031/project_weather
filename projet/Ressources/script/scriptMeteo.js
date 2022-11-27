//Affichage de la date
function showDate() {
    const date = new Date();
    const optionsDate = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    }
    const dateFormate = new Intl.DateTimeFormat("fr-FR", optionsDate).format(date);

    const affichageDate = document.getElementById("date");
    affichageDate.textContent = dateFormate;
    affichageMeteo();
    affichageSaint();
}
//showDate();

//Affichage de l'heure
function showHour() {
    //Récupération de l'heure
    const heure = new Date();
    //Mise en forme de l'heure avec 2 chiffres
    const optionsHeure = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }
    //Création de la chaine à afficher avec les options des 2 chiffres et au format Français
    const heureFormate = new Intl.DateTimeFormat("fr-FR", optionsHeure).format(heure);
    const affichageHeure = document.getElementById("heure");
    affichageHeure.textContent = heureFormate;

    if (heure === "00-00-00") {
        showDate();
    }
}
//showHour();
//Mise à jour de l'affichage de l'heure toutes les secondes
const heure = setInterval(showHour, 1000);


//Récupération de infos météo
function affichageMeteo() {
    fetch("https://www.prevision-meteo.ch/services/json/toulouse")
        .then(promesseTenue)
        .then(traitementDataMeteo)
        .catch(promesseBrisee);
}


//Récupération des infos des saints du jour
function affichageSaint() {
    fetch("https://nominis.cef.fr/json/nominis.php")
        .then(promesseTenue)
        .then(traitementDataSaints)
        .catch(promesseBrisee);
}


//Affichage d'une erreur dans la console si echec du fetch
function promesseBrisee(err) {
    console.error(err);
}

//Traitement du fetch
function promesseTenue(data) {
    if (data.ok) {
        //Si le fetch a réussi on retourne un objet dé-jsonifié pour qu'il soit lisible par JS
        return data.json();
    } else {
        //Si le fetch a échoué on lance une erreur
        throw new Error("Données non collectées");
    }
}

//Traitements des infos de l'API météo
function traitementDataMeteo(obj) {
    //console.log(obj);
    //Récupération et affichage de la ville
    const city = document.getElementById("city");

    city.textContent = obj.city_info.name;

    //Récupération et affichage du sunrise et sunset
    const sunrise = document.getElementById("sunrise");
    const sunset = document.getElementById("sunset");

    sunrise.textContent = obj.city_info.sunrise;
    sunset.textContent = obj.city_info.sunset;

    //Récupération et affichage du jour
    const jour1 = document.querySelector("tr:nth-of-type(2)>td");
    const jour2 = document.querySelector("tr:nth-of-type(3)>td");
    const jour3 = document.querySelector("tr:last-of-type>td");

    jour1.textContent = obj.fcst_day_0.day_long;
    jour2.textContent = obj.fcst_day_1.day_long;
    jour3.textContent = obj.fcst_day_2.day_long;

    //Récupération et affichage de l'image météo
    const imgMeteo1 = document.querySelector("tr:nth-of-type(2)>td:nth-of-type(2)>img");
    const imgMeteo2 = document.querySelector("tr:nth-of-type(3) td:nth-of-type(2)>img");
    const imgMeteo3 = document.querySelector("tr:last-of-type td:nth-of-type(2)>img");

    imgMeteo1.src = obj.fcst_day_0.icon;
    imgMeteo1.alt = obj.fcst_day_0.condition_key;
    imgMeteo2.src = obj.fcst_day_1.icon;
    imgMeteo2.alt = obj.fcst_day_1.condition_key;
    imgMeteo3.src = obj.fcst_day_2.icon;
    imgMeteo3.alt = obj.fcst_day_2.condition_key;

    //Récupération et affichage de la description météo
    const descMeteo1 = document.querySelector("tr:nth-of-type(2) td:last-of-type");
    const descMeteo2 = document.querySelector("tr:nth-of-type(3) td:last-of-type");
    const descMeteo3 = document.querySelector("tr:last-of-type td:last-of-type");

    descMeteo1.textContent = obj.fcst_day_0.condition;
    descMeteo2.textContent = obj.fcst_day_1.condition;
    descMeteo3.textContent = obj.fcst_day_2.condition;

    //Récupération et affichage des températures min, max et moy
    const tempMin = document.getElementById("min");
    const tempMax = document.getElementById("max");
    const tempMoy = document.getElementById("moy");

    tempMin.textContent = obj.fcst_day_0.tmin;
    tempMax.textContent = obj.fcst_day_0.tmax;
    tempMoy.textContent = Math.round((obj.fcst_day_0.tmax + obj.fcst_day_0.tmin) / 2);
}

//Traitements des infos de l'API des saints du jour
function traitementDataSaints(obj) {
    const saintsDuJour = document.getElementById("saint");

    //Récupération de l'objet qui contient les prénoms
    const saintsDuJourPrenoms = obj.response.prenoms.majeurs;
    let saint = "";
    //Boucle sur l'objet des prénoms pour récupérer les clés (les prénoms)
    for (let prenom in saintsDuJourPrenoms) {
        //Mise en forme de l'affichage des prénoms en rajoutant une virgule et espace entre chaque
        saint += prenom + ", ";
    }
    //Formatage des prénoms en supprimant la dernière virgule et le dernier espace
    const saintFormate = saint.substring(0, saint.length - 2);
    //Affichage des saints du jour avec la mise en formes
    saintsDuJour.textContent = saintFormate;
}

window.addEventListener("DOMContentLoaded", () => {
    showDate();
    showHour();
    setInterval(showHour, 1000);
})