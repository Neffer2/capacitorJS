import * as CONSTANTS from'../constants/constants';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

// Elems
let ciudad = document.getElementById('ciudad');
let pdv = document.getElementById('pdv');
let fechaVisita = document.getElementById('fechaVisita');
let semana = document.getElementById('semana');
let estrato = document.getElementById('estrato');
let barrio = document.getElementById('barrio');
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

let elems = [fechaVisita, semana, estrato, barrio];
let photos = [selfiePDV, fotoFachada]; 

async function store (){
    if (validation()){
        let auxPdv = pdv.value;

        if (auxPdv === ''){   
            auxPdv = `Nombre: ${pdvNom.value} Dirección: ${pdvDire.value}`;
        }

        let dataModulo = [{
            token: CONSTANTS.generateToken(),
            pdv: auxPdv,
            fechaVisita: fechaVisita.value,
            semana: semana.value,
            estrato: estrato.value,
            barrio: barrio.value.toUpperCase(),
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
    pdv.innerHTML = "<option value=''>Seleccionar</option>";
    switch(ciudad.value){
        case 'Bogota': 
            CONSTANTS.puntosBogota.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'Barranquilla': 
            CONSTANTS.puntosBarranquilla.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'Medellin': 
            CONSTANTS.puntosMedellin.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'Cali': 
            CONSTANTS.puntosCali.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'Manizales': 
            CONSTANTS.puntosManizales.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'Caldas': 
            CONSTANTS.puntosCaldas.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'Pereira': 
            CONSTANTS.puntosPereira.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'Cuba': 
            CONSTANTS.puntosCuba.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'SanJoaquin': 
            CONSTANTS.puntosSanJoaquin.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'VillaMaria': 
            CONSTANTS.puntosVillaMaria.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
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

ciudad.addEventListener('change', fillPdv);
pdv.addEventListener('change', customPdv);