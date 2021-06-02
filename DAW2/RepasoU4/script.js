let formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {

    crearCookie();

    if (validarNombre() && validarAnyo() && validarHabilidades() && validarTirada() && validarRol() && validarPassword()) {
       // limpiarFormulario();
        document.getElementById("ultima_tirada").innerHTML = getCookie("tirada");
        e.preventDefault();
    } else {
        e.preventDefault();
    }

});

function crearCookie() {
    let numeroAleatorio = Math.floor(Math.random() * 6 + 1);;
    let d = new Date();
    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
    let expiracion = "expires=" + d.toUTCString();
    document.cookie = "tirada" + "=" + numeroAleatorio + ";" + expiracion + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function validarNombre() {
    let correcto = true;

    let nombre = document.getElementById("nombre").value;

    if (nombre === "") {
        correcto = false;
        document.getElementById("nombre").focus();
        document.getElementById("nombre").classList.remove("verde");
        document.getElementById("nombre").classList.add("rojo");
    } else {
        document.getElementById("nombre").classList.remove("rojo");
        document.getElementById("nombre").classList.add("verde");
    }

    return correcto;
}

function validarAnyo() {
    let correcto = true;

    let anyo = document.getElementById("anyo").value;

    if (anyo >= 700 && anyo <= 8000) {
        document.getElementById("anyo").classList.remove("rojo");
        document.getElementById("anyo").classList.add("verde");
    } else {
        correcto = false;
        document.getElementById("anyo").focus();
        document.getElementById("anyo").classList.remove("verde");
        document.getElementById("anyo").classList.add("rojo");
    }

    return correcto;
}

function validarHabilidades() {
    // regex
    let correcto = true;

    let habilidades = document.getElementById("habilidades").value;

    // En esta expresión regular estamos validando que tenga algunas de las siguientes letras, para ello utilizamos la expresión '|' para comprobar si se cumple alguna.
    let expReg = /^(M|WS|BS|S|T|W|A|Ld|Sv)$/;

    if (expReg.test(habilidades)) {
        document.getElementById("habilidades").classList.remove("rojo");
        document.getElementById("habilidades").classList.add("verde");
    } else {
        correcto = false;
        document.getElementById("habilidades").focus();
        document.getElementById("habilidades").classList.remove("verde");
        document.getElementById("habilidades").classList.add("rojo");
    }

    return correcto;
}

function validarTirada() {
    //regex
    let correcto = true;

    let tirada = document.getElementById("tirada").value;

    // En primer lugar comprobamos que tenga una F mayúscula, luego una de las siguientes letras, a continuaciín la R mayúscula, y por último un número de dos cifras, empezando por el 00 y terminando por el 99.
    let expReg = /^(F)(x2|>|=|<)(R)([0-9]{2})$/;

    if (expReg.test(tirada)) {
        document.getElementById("tirada").classList.remove("rojo");
        document.getElementById("tirada").classList.add("verde");
    } else {
        correcto = false;
        document.getElementById("tirada").focus();
        document.getElementById("tirada").classList.remove("verde");
        document.getElementById("tirada").classList.add("rojo");
    }

    return correcto;
}

function validarRol() {
    let correcto = true;

    let rol = document.getElementById("rol").value;

    if (rol !== "") {
        document.getElementById("rol").classList.remove("rojo");
        document.getElementById("rol").classList.add("verde");
    } else {
        correcto = false;
        document.getElementById("rol").focus();
        document.getElementById("rol").classList.remove("verde");
        document.getElementById("rol").classList.add("rojo");
    }

    return correcto;
}

function validarPassword() {
    //regex
    let correcto = true;

    let password = document.getElementById("password").value;

    // Tiene que empezar con dos letras mayúsculas, luego están los caracteres que no sean alfanúmericos ni ':', para ello ponemos un corchete y al principio '^' para que valide si no están. A continuatión nos tenemos que encontrar con una palabra de solo letras, ya sea mayúsculas o minúsculas, después tiene que haber un corchete obligatoriamente y por último dos dígitos.
    let expReg = /^([A-Z]{2})([^A-Za-z0-9_:])([A-Za-z]{8,})(#)(\d{2})$/;

    if (expReg.test(password)) {
        document.getElementById("password").classList.remove("rojo");
        document.getElementById("password").classList.add("verde");
    } else {
        correcto = false;
        document.getElementById("password").focus();
        document.getElementById("password").classList.remove("verde");
        document.getElementById("password").classList.add("rojo");
    }

    return correcto;
}

function limpiarFormulario(){
    document.getElementById("nombre").value = "";
    document.getElementById("nombre").classList = "";
    document.getElementById("anyo").value = "";
    document.getElementById("anyo").classList = "";
    document.getElementById("habilidades").value = "";
    document.getElementById("habilidades").classList = "";
    document.getElementById("tirada").value = "";
    document.getElementById("tirada").classList = "";
    document.getElementById("rol").value = "";
    document.getElementById("rol").classList = "";
    document.getElementById("password").value = "";
    document.getElementById("password").classList = "";
}