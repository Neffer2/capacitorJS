let selectCiudades = document.getElementById('select-ciudades');
let maiContent = document.getElementById('main-content');

let ciudad = document.getElementById('ciudad');
let btnAction = document.getElementById('btn-ok');

function mount(){
    let ciudad = getCiudad();

    if (ciudad){
        showMain();
    }else {
        showSelectCiudades();
    }
}

function setCiudad(ciudad){
    localStorage.setItem('ciudad', ciudad);
    window.location.href = "index.html";
}

function getCiudad(){
    return localStorage.getItem('ciudad');
} 

function showMain(){
    selectCiudades.style.display = "none";
    maiContent.style.display = "block";
}

function showSelectCiudades(){
    selectCiudades.style.display = "flex";
    maiContent.style.display = "none";
}

btnAction.addEventListener('click', () => {
    setCiudad(ciudad.value);
});

window.addEventListener("DOMContentLoaded", function() {
    mount();
});