function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

function validateUserName(name) {
    const nameRegex = /^[a-zA-Z.-]{2,40}$/;
    return nameRegex.test(name);
}

const $contactForm = document.getElementById("registerForm");

let user = [];
let errors = [];

$contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let nameValue = document.getElementById("name").value;
    let emailValue = document.getElementById("email").value;
    let passwordValue = document.getElementById("password").value;

    let errorName = document.getElementById('error-name')
    let errorEmail = document.getElementById('error-email')
    let errorPassword = document.getElementById('error-password')

    if (!validateUserName(nameValue)) {
        errors.push(["Erreur nom"])
        errorName.innerHTML += "Le nom d'utilisateur n'est pas valide."
    } else {
        user.push(["Nom", nameValue])
        errorName.innerHTML = "";
    }
    if (!validateEmail(emailValue)) {
        errors.push(["Erreur mail"])
        errorEmail.innerHTML += "Le mail n'est pas valide."
    } else {
        user.push(["Email", emailValue]);
        errorEmail.innerHTML = "";
    }
    if (!validatePassword(passwordValue)) {
        errors.push(["Erreur mot de passe"])
        errorPassword.innerHTML += "Le mot de passe n'est pas valide."
        
    } else {
        user.push(["Mot de passe", passwordValue])
        errorPassword.innerHTML = "";
    }

    console.log(errors);
    console.log(user);

    if (errors.length > 0) {
        // relancer la boucle, effacer tableaux
        user = [];
        errors = [];
    } else {
        alert("Vous avez enregistré votre profil avec succès !")
        // enregistrer tableau user dans local storage
        localStorage.setItem("user", JSON.stringify(user));
        // nettoyer les inputs
        document.getElementById("registerForm").reset();
    }

})