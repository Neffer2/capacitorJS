import * as CONSTANTS from'../constants/constants';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

// Elems 
let visibilidad = document.getElementById('visibilidad');
let foto_visibilidad = document.getElementById('foto_visibilidad');
let foto_visibilidad_img = document.getElementById('foto_visibilidad_img');
let foto_visibilidad_box = document.getElementById('foto_visibilidad_box');

let iniciativa = document.getElementById('iniciativa');

let visibilidad_promocion = document.getElementById('visibilidad_promocion');
let foto_visibilidad_promocion = document.getElementById('foto_visibilidad_promocion');
let foto_visibilidad_promocion_img = document.getElementById('foto_visibilidad_promocion_img');
let foto_visibilidad_promocion_box = document.getElementById('foto_visibilidad_promocion_box');

let venta_dispositivos = document.getElementById('venta_dispositivos');
let remiciones = document.getElementById('remiciones');
// Useful vars

// BUTTONS
let btnStore = document.getElementById('store');
let btnReset = document.getElementById('reset');
let btnVolver = document.getElementById('volver'); 
 
let elems = [visibilidad, iniciativa, visibilidad_promocion, venta_dispositivos, remiciones];
let photos = [foto_visibilidad_img, foto_visibilidad_promocion_img];

function mount(){
    
}

async function store (){ 
    let dataModulo = []; 
    if (validation()){
        dataModulo = [{
            visibilidad: visibilidad.value,
            tipo_visibilidad: tipo_visibilidad.value,
            visibilidad_competencia: visibilidad_competencia.value,
            tipo_visibilidad_competencia: tipo_visibilidad_competencia.value,
            foto_visibilidad_marca: foto_visibilidad_marca.src,
            foto_visibilidad_competencia: foto_visibilidad_competencia.src,

        }];
    }else {
        alert("Debes rellenar todos los campos"); 
    }

    appendData(CONSTANTS.STORAGE_PATHM4, dataModulo);
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

        volver();
        vibrate();
    }catch(error){
        alert("Opps! tenemos un problema.");
    }
}

const visibilidadPicture = async () => {
    const image = await Camera.getPhoto({
        quality: CONSTANTS.QUALITY,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
    }); 

    var image64 = image.base64String;

    foto_visibilidad_img.src = `data:image/png;base64,${image64}`;
    foto_visibilidad_img.style.display = "block";
    foto_visibilidad_box.style.display = "none";
};

const visibilidadPromocionPicture = async () => {
    const image = await Camera.getPhoto({
        quality: CONSTANTS.QUALITY,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
    }); 

    var image64 = image.base64String;

    foto_visibilidad_promocion_img.src = `data:image/png;base64,${image64}`;
    foto_visibilidad_promocion_img.style.display = "block";
    foto_visibilidad_promocion_box.style.display = "none";
};

function showElem(show, elem){
    if (show === 'Si'){
        elem.style.display = 'block';
    }else {
        elem.style.display = 'none';
    }
}

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

function reset(){ 
    elems.forEach((elem) => {
        elem.value = "";
    });

    photos.forEach((elem) => {
        elem.removeAttribute('src'); 
    });

    foto_visibilidad_box.style.display = "block";
    foto_visibilidad_promocion_box.style.display = "block";

    showElem('No', foto_visibilidad);
    showElem('No', foto_visibilidad_promocion);
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

visibilidad.addEventListener('change', function(){
    showElem(visibilidad.value, foto_visibilidad);
});

visibilidad_promocion.addEventListener('change', function(){
    showElem(visibilidad_promocion.value, foto_visibilidad_promocion);
});

foto_visibilidad_box.addEventListener('click', visibilidadPicture);
foto_visibilidad_promocion_box.addEventListener('click', visibilidadPromocionPicture);