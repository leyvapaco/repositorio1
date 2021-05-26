
let films = [];
let people = [];
let filmsData = false;
let peopleData = false;

document.getElementById("filmsXHR").addEventListener("click", loadFilmsXHR);
document.getElementById("filmsFetch").addEventListener("click", loadFilmsFetch);
document.getElementById("people").addEventListener("click", loadPeople);

function loadFilmsXHR() {
    
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4 && xhr.status == 200) {
    
            let result = JSON.parse(xhr.responseText);
    
            processAndInsertFilms(result);

            document.getElementById("results").innerHTML =
                "Respuesta de films recibida (XMLHttpRequest)";
            console.log("Respuesta de films recibida (XMLHttpRequest)")   
        }
    };

    xhr.open("GET", "https://ghibliapi.herokuapp.com/films", true);
    xhr.send();
}

function loadFilmsFetch() {

    fetch('https://ghibliapi.herokuapp.com/films')
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then( (result) => {
            processAndInsertFilms(result);

            document.getElementById("results").innerHTML =
                "Respuesta de films recibida (Fetch)";
            console.log("Respuesta de films recibida (Fetch)")   
        })
        .catch((error) => console.log("Error: " + error));
}


function processAndInsertFilms(json) {

    for (let i = 0; i < json.length; i++) {

        let film = {

                    "id": json[i].id,
                    "title": json[i].title,
                    "description": json[i].description,
                    "director": json[i].director,
                    "producer": json[i].producer,
                    "release_date": json[i].release_date,
                    "rt_score": json[i].rt_score,
                    "url": json[i].url
        };

        films.push(film);
    }

    fetch('insert_films.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(films)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then( (result) => {

            films = result;

            filmsData = true;

            checkDataLoaded();

            document.getElementById("results").innerHTML =
                "Respuesta de insert_films.php recibida";
            console.log("Respuesta de insert_films.php recibida")  
        })
        .catch((error) => console.log("Error: " + error));
}

function loadPeople() {

    fetch('https://ghibliapi.herokuapp.com/people')
        .then((response) => {

            if (response.ok) {
                return response.json();
            }
        })
        .then( (result) => {

            processAndInsertPeople(result);

            document.getElementById("results").innerHTML =
                "Respuesta de people recibida";
            console.log("Respuesta de people recibida")   
        })
        .catch((error) => console.log("Error: " + error));
}

function processAndInsertPeople(json) {

    for (let i = 0; i < json.length; i++) {

        let person = {

                    "id": json[i].id,
                    "name": json[i].name,
                    "gender": json[i].gender,
                    "age": json[i].age,
                    "eye_color": json[i].eye_color,
                    "hair_color": json[i].hair_color,
                    "films": json[i].films,
        };

        people.push(person);
    }

    fetch('insert_people.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(people)
    })
        .then((response) => {
            
            if (response.ok) {
                return response.json();
            }
        })
        .then( (result) => {

            people = result;

            peopleData = true;

            checkDataLoaded();

            document.getElementById("results").innerHTML =
            "Respuesta de insert_people.php recibida";
            console.log("Respuesta de insert_people.php recibida"); 
        }) 
        .catch((error) => console.log("Error: " + error));
}

function generateFilmsTable(data) {

    let table = document.getElementById("filmsTable");

    let content = "<tr><th>Title</th><th>Description</th><th>Director</th><th>Producer</th><th>Release date</th><th>Rating score</th><th>Personajes</th></tr>";

    for (let i = 0; i < data.length; i++) {

        content += "<tr><td>";
        content += data[i].title;
        content += "</td><td>";
        content += data[i].description;
        content += "</td><td>";
        content += data[i].director;
        content += "</td><td>";
        content += data[i].producer;
        content += "</td><td>";
        content += data[i].release_date;
        content += "</td><td>";
        content += data[i].rt_score;
        content += "</td><td>";
        content += "<button type='button' class='people' value='" + data[i].id + "'>Personajes</button>";
        content += "</td></tr>";
    }

    table.innerHTML = content;

    let buttons = document.getElementsByClassName("people");

    for (btn of buttons) {

        btn.addEventListener("click", getPeopleById);
    }
}

function getPeopleById(e) {

    let id = e.target.value;

    let param = {
                "id_film": id
    };

    fetch('people_by_film_id.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
    })
        .then((response) => {
            
            if (response.ok) {
                return response.json();
            }
        })
        .then( (result) => {

            document.getElementById("results").innerHTML =
                "Respuesta de people_by_film_id.php recibida";
            console.log("Respuesta de people_by_film_id.php recibida");

            generatePeopleTable(result); 
        }) 
        .catch((error) => console.log("Error: " + error));
}

function generatePeopleTable(data) {

    let table = document.getElementById("peopleTable");

    let content = "<tr><th>Name</th><th>Gender</th><th>Age</th><th>Eye color</th><th>Hair color</th></tr>";

    for (let i = 0; i < data.length; i++) {

        content += "<tr><td>";
        content += data[i].name;
        content += "</td><td>";
        content += data[i].gender;
        content += "</td><td>";
        content += data[i].age;
        content += "</td><td>";
        content += data[i].eye_color;
        content += "</td><td>";
        content += data[i].hair_color;
        content += "</td></tr>";
    }

    table.innerHTML = content;
}

function checkDataLoaded() {

    if (filmsData === true && peopleData === true) {

        generateFilmsTable(films);
    }
}





































