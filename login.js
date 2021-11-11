const USERS_URL = "https://danikho2020.github.io/json/user.json"

var getJSONData = function (url) {
    var result = {};

    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;

            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;

            return result; ""
        })
};

function comparacion(array) {
    let user = document.getElementById('username').value
    let password = document.getElementById('pswd').value
    let flag = false;

    for (let i = 0; i < array.length; i++) {

        if (user == array[i].user && password == array[i].password) {
            window.location.replace('inicio.html')
            localStorage.setItem(`Datos-User${i}`, JSON.stringify({ usuario: user, puntos: 0 }))
            flag = true;
            localStorage.setItem('usuarioActual', i)
        };
    }

    if (!flag) {
        alert("datos incorrectos")
    }

}






document.addEventListener('DOMContentLoaded', function (e) {

    getJSONData(USERS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let usersarray = resultObj.data;
            console.log(usersarray)
            document.getElementById("login").addEventListener('click', function (e) { 
                comparacion(usersarray) })

        }
        else {
            throw Error(resultObj.statusText)
        }
    });

});