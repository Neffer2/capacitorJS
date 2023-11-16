import * as CONSTANTS from'../constants/constants';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

// Elems
let genero = document.getElementById('genero');
let interesInicial = document.getElementById('interesInicial');
let interesFinal = document.getElementById('interesFinal');
let PreferenciaMarca = document.getElementById('preferencia');
let PreferenciaCompetencia = document.getElementById('preferencia-competencia');

let mensajeMarcaSfp = document.getElementById('mensaje-marca-SFP');
let sfpMarca = document.getElementById('SFP-marca');

let mensajeMarcaCcs = document.getElementById('mensaje-marca-CCs');
let ccsMarca = document.getElementById('SFP-marca');

let ccsAgotado = document.getElementById('Ccs-agotado');

// Useful vars
let PreferenciaContainer = document.getElementById('preferencia-container');
let PreferenciaCompetenciaContainer = document.getElementById('preferencia-competencia-container');
let sfpMarcaContainer = document.getElementById('SFP-marca-container');
let ccsMarcaContainer = document.getElementById('CCs-marca-container');


// BUTTONS
let btnStore = document.getElementById('store');
let btnReset = document.getElementById('reset');
let btnVolver = document.getElementById('volver'); 
 
let elems = [];
let photos = [];

function mount(){
    fillFileds();

    PreferenciaContainer.style.display = "none";
    PreferenciaCompetenciaContainer.style.display = "none";
    sfpMarcaContainer.style.display = "none";
    ccsMarcaContainer.style.display = "none";
}

function fillFileds() {
    interesInicial.innerHTML += CONSTANTS.productos;
    interesFinal.innerHTML += CONSTANTS.productos;

    CONSTANTS.generos.forEach(item => {
        genero.innerHTML += `<option value="${item}">${item}</option>`;
    });   
}

// async function store (){ 
//     let dataModulo = []; 
//     if (validation()){
//         dataModulo = [{
//             visibilidad: visibilidad.value,
//             tipo_visibilidad: tipo_visibilidad.value,
//             visibilidad_competencia: visibilidad_competencia.value,
//             tipo_visibilidad_competencia: tipo_visibilidad_competencia.value,
//             foto_visibilidad_marca: foto_visibilidad_marca.src,
//             foto_visibilidad_competencia: foto_visibilidad_competencia.src,

//         }];
//     }else {
//         alert("Debes rellenar todos los campos"); 
//     }

//     appendData(CONSTANTS.STORAGE_PATHM4, dataModulo);
// }

// async function appendData(src, data){
//     try {
//         await Filesystem.writeFile({
//             path: src,
//             data: JSON.stringify(data),
//             directory: Directory.Documents,
//             encoding: Encoding.UTF8,
//         });    

//         alert("Datos almacenados con éxito."); 

//         volver();
//         vibrate();
//     }catch(error){
//         alert("Opps! tenemos un problema."); 
//     }
// }

function validation (){
    let validator = true;

    elems.forEach((elem) => {
        if (elem.value === ""){
            validator = false;
        }
    });

    photos.forEach((elem) => {
        if (elem.src === ""){
            validator = false;
        } 
    });

    return validator;
}
 
async function vibrate(){
    await Haptics.vibrate();
}

function showPreferencia(show){
    if (show){
        PreferenciaContainer.style.display = "block";
        PreferenciaCompetenciaContainer.style.display = "none";
    }else {
        PreferenciaContainer.style.display = "none";
        PreferenciaCompetenciaContainer.style.display = "block";
    }
}

function showSfp(show){
    if (show){
        sfpMarcaContainer.style.display = "block";
    }else {        
        sfpMarcaContainer.style.display = "none";
    }
}

function showCcs(show){
    if (show){
        ccsMarcaContainer.style.display = "block";
    }else {        
        ccsMarcaContainer.style.display = "none";
    }
}

function reset(){ 
    elems.forEach((elem) => {
        elem.value = "";
    });

    photos.forEach((elem) => {
        elem.removeAttribute('src'); 
    });

    foto_visibilidad_box.style.display = "block";
    foto_visibilidad_promocion_box.style.display = "block";
}

function volver(){
    window.location.href = "index.html";
}

window.addEventListener("DOMContentLoaded", function() {
    mount();
});

// Events
btnStore.addEventListener('click', store);
btnReset.addEventListener('click', reset);
btnVolver.addEventListener('click', volver);

interesFinal.addEventListener('change', () => {
    let selectedOptionElement = interesFinal.options[interesFinal.selectedIndex];
    if (selectedOptionElement.dataset.pmi == 1){
        showPreferencia(true);
    }else{
        showPreferencia(false);
    }
});

mensajeMarcaSfp.addEventListener('change', () => {
    if (mensajeMarcaSfp.value == 1){
        showSfp(true);
    }else{
        showSfp(false);
    }
});

mensajeMarcaCcs.addEventListener('change', () => {
    if (mensajeMarcaCcs.value == 1){
        showCcs(true);
    }else{
        showCcs(false);
    }
});