import * as CONSTANTS from'../constants/constants';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

// Elems
let ciudad = document.getElementById('ciudad');
// let busquedaCiudad = document.getElementById('busqueda-ciudad');
let busquedaCiudad = {value: null};

let pdv = document.getElementById('pdv');
let fechaVisita = document.getElementById('fechaVisita');
let semana = document.getElementById('semana');
let estrato = document.getElementById('estrato');
let barrio = document.getElementById('barrio');
let focoAgotado = document.getElementById('foco-agotado');
let selfiePDV = document.getElementById('selfiePDV');
let fotoFachada = document.getElementById('fotoFachada');

let customPdvContainer = document.getElementById('custom-pdv-container');
let pdvNom = document.getElementById('pdvNom');
let pdvDire = document.getElementById('pdvDire');

let selfiePDVBox = document.getElementById('selfiePDVBox');
let fotoFachadaBox = document.getElementById('fotoFachadaBox');

// BUTTONS 
let btnStore = document.getElementById('store');
let btnReset = document.getElementById('reset');
let btnVovler = document.getElementById('volver');

let elems = [fechaVisita, semana, estrato, barrio, focoAgotado];
let photos = [selfiePDV, fotoFachada]; 

function mount(){
    ciudad.value = getCiudad();  
    fillPdv();  
}

function getCiudad(){
    return localStorage.getItem('ciudad');
}

async function store (){
    if (validation()){
        let auxPdv = pdv.value;

        if (auxPdv === ''){   
            auxPdv = `Codigo: ${pdvNom.value} Nombre y Dirección: ${pdvDire.value}`;
        }

        let dataModulo = [{
            token: CONSTANTS.generateToken(),
            pdv: auxPdv,
            fechaVisita: fechaVisita.value,
            semana: semana.value,
            estrato: estrato.value,
            barrio: barrio.value.toUpperCase(),
            focoAgotado: focoAgotado.value,
            selfiePDV: selfiePDV.src,
            fotoFachada: fotoFachada.src,
            novedades: null
        }];
    
        appendData(CONSTANTS.STORAGE_PATHM1, dataModulo);
    }else {
        alert("Debes rellenar todos los campos");
    }
}

async function appendData(src, data){
    try {
        await Filesystem.writeFile({
            path: src,
            data: JSON.stringify(data),
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });    

        alert("Datos almacenados con éxito.");

        reset();
        vibrate();
        volver();
    }catch(error){
        alert("Opps! tenemos un problema.");
    }
}

const pdvPicture = async () => {
    const image = await Camera.getPhoto({
        quality: CONSTANTS.QUALITY,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
    }); 

    var image64 = image.base64String;

    selfiePDV.src = `data:image/png;base64,${image64}`;
    selfiePDV.style.display = "block";
    selfiePDVBox.style.display = "none";
};

const fachadaPicture = async () => {
    const image = await Camera.getPhoto({
        quality: CONSTANTS.QUALITY,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
    }); 

    var image64 = image.base64String;

    fotoFachada.src = `data:image/png;base64,${image64}`;
    fotoFachada.style.display = "block";
    fotoFachadaBox.style.display = "none";
};

function fillPdv(){
    pdv.innerHTML = '';

    switch(ciudad.value){
        case 'Bogota':         
            if (busquedaCiudad.value){
                let resultados = CONSTANTS.puntosBogota.filter((elem) => {
                    return elem.cod.startsWith(busquedaCiudad.value); 
                });        

                pdv.innerHTML = '';
                resultados.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }else {
                CONSTANTS.puntosBogota.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }
        break;
        case 'Barranquilla':
            if (busquedaCiudad.value){
                let resultados = CONSTANTS.puntosBarranquilla.filter((elem) => {
                    return elem.cod.startsWith(busquedaCiudad.value); 
                });        

                pdv.innerHTML = '';
                resultados.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }else {
                CONSTANTS.puntosBarranquilla.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }
        break;
        case 'Medellin': 
            if (busquedaCiudad.value){
                let resultados = CONSTANTS.puntosMedellin.filter((elem) => {
                    return elem.cod.startsWith(busquedaCiudad.value); 
                });        

                pdv.innerHTML = '';
                resultados.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }else {
                CONSTANTS.puntosMedellin.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }
        break;
        case 'Cartagena': 
            if (busquedaCiudad.value){
                let resultados = CONSTANTS.puntosCartagena.filter((elem) => {
                    return elem.cod.startsWith(busquedaCiudad.value); 
                });        

                pdv.innerHTML = '';
                resultados.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }else {
                CONSTANTS.puntosCartagena.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }
        break;
        case 'Cali': 
            if (busquedaCiudad.value){
                let resultados = CONSTANTS.puntosCali.filter((elem) => {
                    return elem.cod.startsWith(busquedaCiudad.value); 
                });        

                pdv.innerHTML = '';
                resultados.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }else {
                CONSTANTS.puntosCali.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }
        break;
        case 'Santa Marta': 
            if (busquedaCiudad.value){
                let resultados = CONSTANTS.puntosSantaMarta.filter((elem) => {
                    return elem.cod.startsWith(busquedaCiudad.value); 
                });        

                pdv.innerHTML = '';
                resultados.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }else {
                CONSTANTS.puntosSantaMarta.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }
        break;
        case 'Manizales': 
            if (busquedaCiudad.value){
                let resultados = CONSTANTS.puntosManizales.filter((elem) => {
                    return elem.cod.startsWith(busquedaCiudad.value); 
                });        

                pdv.innerHTML = '';
                resultados.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }else {
                CONSTANTS.puntosManizales.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }
        break;
        case 'Ibague':
            if (busquedaCiudad.value){
                let resultados = CONSTANTS.puntosIbague.filter((elem) => {
                    return elem.cod.startsWith(busquedaCiudad.value); 
                });        

                pdv.innerHTML = '';
                resultados.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }else {
                CONSTANTS.puntosIbague.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }
        break;
        case 'Caldas': 
            if (busquedaCiudad.value){
                let resultados = CONSTANTS.puntosCaldas.filter((elem) => {
                    return elem.cod.startsWith(busquedaCiudad.value); 
                });        

                pdv.innerHTML = '';
                resultados.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }else {
                CONSTANTS.puntosCaldas.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }
        break;
        case 'Pereira': 
            if (busquedaCiudad.value){
                let resultados = CONSTANTS.puntosPereira.filter((elem) => {
                    return elem.cod.startsWith(busquedaCiudad.value); 
                });        

                pdv.innerHTML = '';
                resultados.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }else {
                CONSTANTS.puntosPereira.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }
        break;
        case 'Cuba':
            if (busquedaCiudad.value){
                let resultados = CONSTANTS.puntosCuba.filter((elem) => {
                    return elem.cod.startsWith(busquedaCiudad.value); 
                });        

                pdv.innerHTML = '';
                resultados.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }else {
                CONSTANTS.puntosCuba.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }
        break;
        case 'SanJoaquin':
            if (busquedaCiudad.value){
                let resultados = CONSTANTS.puntosSanJoaquin.filter((elem) => {
                    return elem.cod.startsWith(busquedaCiudad.value); 
                });        

                pdv.innerHTML = '';
                resultados.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }else {
                CONSTANTS.puntosSanJoaquin.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }
        break;
        case 'VillaMaria':
            if (busquedaCiudad.value){
                let resultados = CONSTANTS.puntosVillaMaria.filter((elem) => {
                    return elem.cod.startsWith(busquedaCiudad.value); 
                });        

                pdv.innerHTML = '';
                resultados.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }else {
                CONSTANTS.puntosVillaMaria.forEach((item) => {
                    pdv.innerHTML += `<option value="${item.cod}">${item.nom} - ${item.cod}</option>`;
                });
            }
        break;
    }

    pdv.innerHTML += "<option value='OTRO'>OTRO</option>";
    showPdv();
}

function customPdv(){
    if (pdv.value === "OTRO"){
        hidePdv();
    }else {
        showPdv();
    }
}

function showPdv(){
    pdv.style.display = 'block';
    customPdvContainer.style.display = 'none';
}

function hidePdv(){ 
    pdv.value = "";
    pdv.style.display = 'none';
    customPdvContainer.style.display = 'block';        
}

function validation (){
    let validator = true;
    
    if (pdv.value === ""){
        if (pdvNom.value === "" || pdvDire.value === ""){
            validator = false;
        }
    }
    
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

function reset(){
    window.location.href = "modulo1.html";
}

function volver(){
    window.location.href = "index.html";
}

// Events
btnStore.addEventListener('click', store);
btnReset.addEventListener('click', reset);
btnVovler.addEventListener('click', volver);

selfiePDVBox.addEventListener('click', pdvPicture);
fotoFachadaBox.addEventListener('click', fachadaPicture);

// ciudad.addEventListener('change', fillPdv);
pdv.addEventListener('change', customPdv);
// busquedaCiudad.addEventListener('input', fillPdv);

window.addEventListener("DOMContentLoaded", function() {
    mount();
});