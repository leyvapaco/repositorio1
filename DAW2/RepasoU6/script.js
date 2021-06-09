document.getElementById("boton_xml").addEventListener("click", xmlInformacion, false);
document.getElementById("boton_fetch").addEventListener("click", fetchInformacion, false);
document.getElementById("modificar_datos").addEventListener("click", modificarDatos, false);

let resultXML;

function xmlInformacion() {

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resultXML = JSON.parse(this.responseText);
            document.getElementById("div_dinamico").innerHTML = "Datos cargados de la WEB";
            insertarBaseDeDatosXML(resultXML);
        }
    };
    xhr.open("GET", "latest.json", true);
    xhr.send();

}

let resultFetch;

function fetchInformacion() {

    fetch('latest.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            resultFetch = result;
            document.getElementById("div_dinamico").innerHTML = "Datos cargados de la WEB";
            insertarBaseDeDatosFetch(resultFetch);
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}
        
function insertarBaseDeDatosXML(resultXML) {

    console.log(resultXML); 

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let respuesta = JSON.parse(this.responseText);
            cargarInformacion(respuesta); //Carga los valores para el desplegable de comunidades autónomas
            generarTabla(respuesta);
        }
    };
    let parametros = JSON.stringify(resultXML);

    console.log(parametros);

    xhr.open("POST", "insertar_comunidades.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.send(parametros);

}

function insertarBaseDeDatosFetch(resultFetch) {

    fetch('insertar_comunidades.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(resultFetch)
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            cargarInformacion(result);
            generarTabla(result);
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}

function cargarInformacion(datos) { //Carga los valores para el desplegable de comunidades autónomas
    let select = document.getElementById("comunidad_autonoma");
    select.innerHTML = "";

    for (let index = 0; index < datos.length; index++) {
        if (datos[index].ccaa != "Totales") {
            let option = document.createElement("option");
            option.value = datos[index].ccaa;
            option.appendChild(document.createTextNode(option.value));
            select.appendChild(option);
        }

    }
    console.log(select);
}

function generarTabla(datos) { //Genera la tabla de datos por comunidad autónoma

    let body = document.getElementsByTagName('body')[0];

    let div = document.getElementById("tabla");
    div.innerHTML = "";

    let tabla = document.createElement('table');
    tabla.style.border = "1px solid black";
    tabla.style.borderCollapse = 'collapse';

    let thead = document.createElement('thead');

    let headers = ["Comunidad", "D. Entregadas", "D. Admin", "D. Completa", "% Entregadas", "% Pobl. Admin.", "% Pobl. Completa"]

    let tr = document.createElement('tr');
    for (let i = 0; i < headers.length; i++) {
        let th = document.createElement('th');
        th.style.border = "1px solid black";
        th.appendChild(document.createTextNode(headers[i]));
        tr.appendChild(th);
    }
    thead.appendChild(tr);

    let tbody = document.createElement('tbody');

    for (let i = 0; i < datos.length - 1; i++) {

        let tr = document.createElement('tr');
        for (let j = 0; j < headers.length; j++) {
            let td = document.createElement('td');
            td.style.border = "1px solid black";
            if (datos[i].ccaa != "Totales") {
                tr.setAttribute("id", datos[i].ccaa);
                if (j == 0) {
                    let nombre = document.createTextNode(datos[i].ccaa);
                    td.appendChild(nombre);
                } else if (j == 1) {
                    let nombre = document.createTextNode(datos[i].dosisAdministradas);
                    td.appendChild(nombre);
                } else if (j == 2) {
                    let nombre = document.createTextNode(datos[i].dosisEntregadas);
                    td.appendChild(nombre);
                } else if (j == 3) {
                    let nombre = document.createTextNode(datos[i].dosisPautaCompletada);
                    td.appendChild(nombre);
                } else if (j == 4) {
                    let dato = datos[i].porcentajeEntregadas;
                    dato = dato * 100;
                    dato = dato.toFixed(2);
                    let nombre = document.createTextNode(dato);
                    td.appendChild(nombre);
                } else if (j == 5) {
                    let dato = datos[i].porcentajePoblacionAdministradas;
                    dato = dato * 100;
                    dato = dato.toFixed(2);
                    let nombre = document.createTextNode(dato);
                    td.appendChild(nombre);
                } else if (j == 6) {
                    let dato = datos[i].porcentajePoblacionCompletas;
                    dato = dato * 100;
                    dato = dato.toFixed(2);
                    let nombre = document.createTextNode(dato);
                    td.appendChild(nombre);
                }
            }

            tr.appendChild(td)
        }

        tbody.appendChild(tr);

    }

    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    div.appendChild(tabla);
    body.appendChild(div);

}

function modificarDatos() {
    let comunidad_autonoma = document.getElementById("comunidad_autonoma").value;
    let dosis_entregadas = document.getElementById("dosis_entregadas").value;
    let dosis_administradas = document.getElementById("dosis_administradas").value;
    let dosis_completas = document.getElementById("dosis_completas").value;
    let porcentaje_entregadas = document.getElementById("porcentaje_entregadas").value;
    let porcentaje_administradas = document.getElementById("porcentaje_administradas").value;
    let porcentaje_completa = document.getElementById("porcentaje_completa").value;

    let json = {
        "ccaa": comunidad_autonoma,
        "dosisEntregadas": dosis_entregadas,
        "dosisAdministradas": dosis_administradas,
        "dosisPautaCompletada": dosis_completas,
        "porcentajeEntregadas": porcentaje_entregadas,
        "porcentajePoblacionAdministradas": porcentaje_administradas,
        "porcentajePoblacionCompletas": porcentaje_completa
    }

    fetch('actualizar_comunidad.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(json)
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            modificarTabla(result); //Una vez actualizada la BBDD refrescamos la tabla de datos
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}

function modificarTabla(result) {

    let elemento = document.getElementById(result.ccaa);

    for (let i = 0; i < elemento.childNodes.length; i++) {
        if (i === 0) {
            elemento.childNodes[i].textContent = result.ccaa;
        } else if (i === 1) {
            elemento.childNodes[i].textContent = result.dosisEntregadas;
        } else if (i === 2) {
            elemento.childNodes[i].textContent = result.dosisAdministradas;
        } else if (i === 3) {
            elemento.childNodes[i].textContent = result.dosisPautaCompletada;
        } else if (i === 4) {
            let dato = result.porcentajeEntregadas;
            dato = dato * 100;
            dato = dato.toFixed(2);
            elemento.childNodes[i].textContent = dato;
        } else if (i === 5) {
            let dato = result.porcentajePoblacionAdministradas;
            dato = dato * 100;
            dato = dato.toFixed(2);
            elemento.childNodes[i].textContent = dato;
        } else if (i === 6) {
            let dato = result.porcentajePoblacionCompletas;
            dato = dato * 100;
            dato = dato.toFixed(2);
            elemento.childNodes[i].textContent = dato;
        }

    }

}