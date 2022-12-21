//Récupération du champs email
const email = document.getElementById("email");
//Récupération du champs sujet
const subject = document.getElementById("subject");
//Récupération du champs message
const message = document.getElementById("msg");
//Récupération du bouton submit
const submit = document.querySelector("input[type='submit']");

//Gestion événementielle
//Ajout d'un événement lorsqu'on quitte le focus du mail
email.addEventListener("blur", checkEmail);
//Ajout d'un événement lorsqu'on quitte le focus su sujet
subject.addEventListener("blur", checkSubject);
//Ajout d'un événement lorsqu'on quitte le focus du message
message.addEventListener("blur", checkMessage);
//Ajout d'un évènement lors du click sur le bouton envoyer
submit.addEventListener("click", checkForm);

//Fonctions
function checkEmail() {
    let isEmailOk = true;
    //RegEx pour un mail valide
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //On compare la valeur rentrée dans le champs email avec la RegEx
    if (!email.value.trim().match(mailformat) && email.value.trim().length > 0) {
        //Si la comparaison est fausse
        isEmailOk = false;
        //Ajout d'une info-bulle lorsque la souris est sur l'input
        email.setAttribute("title", "Veuillez saisir une adresse mail valide !")
        //Ajout de bordure rouge
        email.classList.add("bordererror");
        //Ajout d'un message d'erreur
        email.nextElementSibling.classList.add("show");
    } else {
        email.classList.remove("bordererror");
        email.nextElementSibling.classList.remove("show");
        email.removeAttribute("title");
    }
    return isEmailOk;
}

function checkSubject() {
    let isSubjectOk = true;

    //On supprime les espaces au début et à la fin de la String avec trim()
    //Si la String trimée est < 5 caractères
    if (subject.value.trim().length < 5 && subject.value.trim().length > 0) {
        isSubjectOk = false;
        //Ajout d'une info-bulle lorsque la souris est sur l'input
        subject.setAttribute("title", "Saisissez votre sujet de discussion (5 caractères minimum)")
        //Ajout de bordure rouge
        subject.classList.add("bordererror");
        //Ajout d'un message d'erreur
        subject.nextElementSibling.classList.add("show");
    } else {
        subject.classList.remove("bordererror");
        subject.nextElementSibling.classList.remove("show");
    }
    return isSubjectOk;
}

function checkMessage() {
    let isMessageOk = true;

    if (message.value.trim().length < 5 && message.value.trim().length > 0) {
        isMessageOk = false;
        //Ajout d'une info-bulle lorsque la souris est sur l'input
        message.setAttribute("title", "Vous n'avez rien à dire ? (5 caractères minimum)")
        //Ajout de bordure rouge
        message.classList.add("bordererror");
        //Ajout d'un message d'erreur
        message.nextElementSibling.classList.add("show");
    } else {
        message.classList.remove("bordererror");
        message.nextElementSibling.classList.remove("show");
    }
    return isMessageOk;
}

function checkForm(evt) {
    //Test du champ email
    let emailChecked = checkEmail();

    //Test du champ sujet
    let subjectChecked = checkSubject();

    //Test du champ message
    let messageChecked = checkMessage();

    if(!emailChecked || !subjectChecked || !messageChecked) {
        alert("Formulaire invalide !")
        evt.preventDefault();
    }
}