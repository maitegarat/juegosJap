var datosUser = JSON.parse(localStorage.getItem('Datos-User'));


var

    pelis = [
        "Volver al futuro",
        "Jurassic Park",
        "Forrest Gump",
        "IT",
        "ET",
        "La purga",
        "El señor de los anillos",
        "Harry Potter",
        "Los vengadores",
        "Sin reservas",
        "La propuesta",
        "Venom",
        "Mi villano favorito",
        "Toy Story",
        "Shrek",
        "Deadpool",
        "El jinete sin cabeza",
        "Pocahontas",
        "Free Guy"
    ],

    intentos = 6,

    contenido = document.getElementById("content"),

    myModal = document.getElementById("myModal"),

    peliActual = pelis[Math.floor(Math.random() * (pelis.length))],

    palabrasPeli = peliActual.split(" ");


document.addEventListener("DOMContentLoaded", function () {


    document.getElementById("intentos").innerHTML = intentos; //El participante dispone de seis intentos
    mostrarAsteriscos(palabrasPeli, "%"); //Mostrar asteriscos recibe por parámetros un array que contiene las palabras del nombre 
    //de la película y la letra a la que hay que comparar, al cargar por primera vez como no deseamos que compare a ninguna letra
    //pasamos por parámetro el símbolo "%"
    console.log(peliActual)
    document.getElementById("nombre").innerHTML = `${datosUser.usuario}`
    document.getElementById("puntaje").innerHTML = `${datosUser.puntos}`

    document.getElementById("enviar").addEventListener("click", function () {
        validarLetra();
    });
    document.getElementById("letra").addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
            validarLetra();
        }
    }) //Se ejecuta la función validarLetra cuando el usuario hace click en Probar Letra o da enter

});

function validarLetra() {
    var
        letra = document.getElementById("letra").value; //Input donde usuario ingresa la letra a probar

    mostrarAsteriscos(palabrasPeli, letra);//Busca la letra y si encuentra muestra las coincidencias

    if ((peliActual.indexOf(letra) == -1) || (letra == "")) { //En caso de no encontrar resta un intento

        intentos--;

    };

    document.getElementById("intentos").innerHTML = intentos; //Actualiza los intentos
    checkWin(intentos, contenido.innerHTML, peliActual);// Chequea si se llegó al final de intentos o se completó la palabra
    document.getElementById("letra").value = "";//Una vez que se compara la letra con el nombre se vacía la entrada
    document.getElementById("letra").focus();// El cursor se vuelve a posicionar en la entrada de la letra

};

function mostrarAsteriscos(palabras, letter) { //mostrarAsteriscos va a buscar si la letra está en las palabras ingresadas, en caso de que si
    // va a sustituir los asteriscos por la letra en los lugares que coincida
    let contenidoAnterior = contenido.innerHTML.split(" ");//Guarda el string anterior para no perder las letras ya encontradas
    contenido.innerHTML = ``;

    for (let i = 0; i < palabras.length; i++) {//Este for recorre las diferentes palabras del array

        let palabraActual = palabras[i],
            contenidoAntPalabra = contenidoAnterior[i].split("");

        for (let j = 0; j < palabraActual.length; j++) { //Este for recorre cada letra de una palabra

            if (letter.toLowerCase() == palabraActual[j].toLowerCase()) {

                contenido.innerHTML += `${palabraActual[j]}`;


            } else if (contenidoAntPalabra[j] == palabraActual[j]) {

                contenido.innerHTML += `${contenidoAntPalabra[j]}`;

            } else {

                contenido.innerHTML += `*`;

            }
        }

        contenido.innerHTML += ` `
    }
};

function checkWin(intento, content, pelicula) {

    var
        nombrePeli = document.getElementById("nombrePeli");

    if ((content.indexOf("*") == -1) || (intento < 1)) {

        document.getElementById("toggleBtn").click();//Ejecuta el modal que contiene la validación del nombre
        document.getElementById("verify").addEventListener("click", function (e) {

            validarPelicula();//Compara el nombre ingresado con el nombre de la película, no es sensible a mayúsculas
            e.stopImmediatePropagation();//Evita que se ejecute reloadPage en el primer click
            reloadPage();//Recarga la página luego de mostrar el resultado del juego

        });

        nombrePeli.addEventListener("keydown", function (e) {

            if (e.key === "Enter") {
                validarPelicula();
                reloadPage();
            }

        });
    };


    function validarPelicula() {

        if (nombrePeli.value.toLowerCase() == pelicula.toLowerCase()) {

            document.getElementById("success").classList.remove("d-none");  //Si el usuario acierta se muestra el diálogo "Acertaste"
            localStorage.getItem('Datos-User')

            
            if (datosUser) {
                let prueba = datosUser.puntos
                console.log(localStorage.getItem('Datos-User'))
                prueba += 1;
    
                localStorage.setItem('Datos-User', JSON.stringify({ usuario: datosUser.usuario, puntos: prueba }))   
            }
            

            } else {

                document.getElementById("fail").classList.remove("d-none");// Si no acierta se muestra el diálogo "No acertaste" y el nombre correcto
                document.getElementById("peliReal").innerHTML = `${peliActual}`;

            }

            document.getElementById("verify").classList.add("d-none");//se oculta el botón de verificar
            document.getElementById("playAgain").classList.remove("d-none");//se muestra el cartel de volver a jugar
        }

        function reloadPage() {//Recarga la página si el usuario hace otro click o presiona una tecla

            window.addEventListener("click", function () {

                window.location.replace("inicio.html");

            });
            nombrePeli.addEventListener("keydown", function () {

                window.location.replace("inicio.html");

            });

        }
    };
