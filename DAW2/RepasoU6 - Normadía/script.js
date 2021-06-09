// U6

let armasArray=[]; //creo una array global 
let tipoPeticion="";
function peticionXHR(){
    //Hacemos la peticion con comunicacion asincrona
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "listar_armas.php", true); //la url del php por parametro
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
           armasArray=JSON.parse(xhr.responseText);
           tipoPeticion="XMLHttpRequest";
           crearTabla();
        } else {
          console.error(xhr.statusText);
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(null);
}

function peticionFetch(){
    fetch('listar_armas.php')
    .then((response) => response.json())
    .then((data) => { //data es un json 
        //console.log(data);
        armasArray=data;
        tipoPeticion="Fetch";
        crearTabla();
    });
}

function crearTabla(){
    const divTabla = document.getElementById("responseDiv");
    divTabla.innerHTML="";

    const tituloTipoPeticion=document.createElement("h2");
    tituloTipoPeticion.innerText="Tabla creada con "+tipoPeticion;
    divTabla.appendChild(tituloTipoPeticion);

    //vamos a extraer los valores del select
    const valorSelectBando=document.getElementById("tipoBando").value;
    const armasFiltered=[];
    armasArray.map((arma)=>{
        if(valorSelectBando==arma.bando){
            armasFiltered.push(arma);
        }
    });

    //***creamos la tabla en el dom***
    const tablaElem = document.createElement("table");
    tablaElem.id = "tablaArmas";

    const filaHeaderElem=document.createElement("tr");
    const headers = ["Nombre","Imagen","Descripción","Bando"];
    headers.map((elemento)=>{
        const thElem=document.createElement("th");
        thElem.innerText=elemento;
        filaHeaderElem.appendChild(thElem);
    })
    tablaElem.appendChild(filaHeaderElem);

    armasFiltered.map((arma)=>{
        const filaElem=document.createElement("tr");
        const colums = ["nombre","imagen","descripcion","bando"];
        colums.map((elemento)=>{
            const tdElem=document.createElement("td");
            const valor=arma[elemento]; //!!

            if(elemento=="imagen"){
                const imagen=document.createElement("img");
                imagen.src= valor;
                tdElem.appendChild(imagen);
            }else if(elemento=="bando"){
                tdElem.innerText=valor==1 ? "Aliados" : "Eje";
            }else{
                tdElem.innerText=valor;
            }

            filaElem.appendChild(tdElem);
        })
        tablaElem.appendChild(filaElem);
    })

    divTabla.appendChild(tablaElem);
}
