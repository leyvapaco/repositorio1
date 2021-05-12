var lista = document.getElementsByTagName("LI");

for (let i = 0; i < lista.length; i++) {
    let span = document.createElement("SPAN");
    let texto = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(texto);
    lista[i].appendChild(span);
}

var cerrar = document.getElementsByClassName("close");

for (let i = 0; i < cerrar.length; i++) {
    cerrar[i].onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
  }
}
var listaTareas

function anadirLista() {
    let li = document.createElement("li");
    let inputazo = document.getElementById("inputazo").value;
    let t = document.createTextNode(inputazo);
    li.appendChild(t);
    if (inputazo === '') {
        console.log("no se escribio nada");
    } else {
        document.getElementById("UL").appendChild(li).className = "sii";
        
    }
    document.getElementById("inputazo").value = "";

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < cerrar.length; i++) {
        cerrar[i].onclick = function() {
        let div = this.parentElement;
        div.style.display = "none";
        }
    }

 //   var listaTareas = document.getElementById("sii")
    var listaTareas = document.getElementById("UL")

    console.log(listaTareas)
    console.log("aqui llego")
    setCookie("tarea", inputazo, 7)

}

/*
function setCookie(nombre, value, dias) {
    var d = new Date()
    d.setTime(d.getTime()+dias*24*60*60*1000)
    let expiracion = "expires="+d.toUTCString()

    var curCookie = nombre + "=" + value + "; " + expiracion

 alert (curCookie)
    document.cookie = curCookie

}

*/


function setCookie(nombre, value, dias) {
    var d = new Date()
    d.setTime(d.getTime()+dias*24*60*60*1000)
    let expiracion = "expires="+d.toUTCString()

    var prevCookie=valoresCookie("tarea")

    if (prevCookie){  
         var curCookie = nombre + "=" + prevCookie + "," +value+ "; " + expiracion}
         else{    var curCookie = nombre + "=" +value+ "; " + expiracion}

    document.cookie = curCookie

}



// Devuelve un Array con los valores de la cookie "tarea" separados por comas; p.e [cocinar, barrer]
function valoresCookie(name) {

    var nameEQ = name + "="; 
    var ca = document.cookie.split(';');
  
    for(var i=0;i < ca.length;i++) {
  
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) {
        return decodeURIComponent( c.substring(nameEQ.length,c.length) );
      }
  
    }
  
    return null;
  
  }
  
//muestra en la carga inicial de la página, las tareas almacenadas en la cookie "tarea"
function mostrarLista() {
    var x = document.cookie

    var strCookies=valoresCookie("tarea")
         
    if (strCookies){

    var valorCookie = strCookies.split(',');
     
    for(var j=0;j < valorCookie.length;j++) {    

    let li = document.createElement("li");     
    let inputazo=valorCookie[j]
   

    let t = document.createTextNode(inputazo);
    li.appendChild(t);
    
    //document.getElementById("UL").appendChild(li).className = "sii";
    document.getElementById("UL").appendChild(li);
        
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < cerrar.length; i++) {
        cerrar[i].onclick = function() {
        let div = this.parentElement;
        div.style.display = "none";
        }
    }
    }
 }
}

