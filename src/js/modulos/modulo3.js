import * as CONSTANTS from'../constants/constants';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
  
// Elems 
let visibilidad = document.getElementById('visibilidad');
let tipo_visibilidad = document.getElementById('tipo_visibilidad');
let visibilidad_competencia = document.getElementById('visibilidad_competencia');
let tipo_visibilidad_competencia = document.getElementById('tipo_visibilidad_competencia');
let foto_visibilidad_marca = document.getElementById('foto_visibilidad_marca');
let foto_visibilidad_competencia = document.getElementById('foto_visibilidad_competencia');

// Useful vars
let foto_visibilidad_marcaBox = document.getElementById('foto_visibilidad_marcaBox');
let foto_visibilidad_competenciaBox = document.getElementById('foto_visibilidad_competenciaBox');

let allowPhotos = true;

// BUTTONS
let switchOxxo = document.getElementById('switch-oxxo');
let btnStore = document.getElementById('store');
let btnReset = document.getElementById('reset');
let btnVolver = document.getElementById('volver'); 
 
let elems = [visibilidad, tipo_visibilidad, visibilidad_competencia, tipo_visibilidad_competencia];
let photos = [foto_visibilidad_marca, foto_visibilidad_competencia];

function mount(){
    fillFields();
}

async function store (){ 
    let dataModulo = []; 
    if (switchOxxo.checked){
        dataModulo = [{
            visibilidad: null,
            tipo_visibilidad: null,
            visibilidad_competencia: null,
            tipo_visibilidad_competencia: null,
            foto_visibilidad_marca: null,
            foto_visibilidad_competencia: null,
        }];                     
    }else {
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
    }
    appendData(CONSTANTS.STORAGE_PATHM3, dataModulo);
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

const visibilidad_marcaPicture = async () => {
    if (allowPhotos){
        const image = await Camera.getPhoto({
            quality: CONSTANTS.QUALITY,
            allowEditing: false,
            source: CameraSource.Camera,
            resultType: CameraResultType.Base64
        }); 
    
        var image64 = image.base64String;
    
        foto_visibilidad_marca.src = `data:image/png;base64,${image64}`;
        foto_visibilidad_marca.style.display = "block";
        foto_visibilidad_marcaBox.style.display = "none";
    }
};

const foto_visibilidad_competenciaPicture = async () => {
    if (allowPhotos){
        const image = await Camera.getPhoto({
            quality: CONSTANTS.QUALITY,
            allowEditing: false,
            source: CameraSource.Camera,
            resultType: CameraResultType.Base64
        }); 
    
        var image64 = image.base64String;
    
        foto_visibilidad_competencia.src = `data:image/png;base64,${image64}`;
        foto_visibilidad_competencia.style.display = "block";
        foto_visibilidad_competenciaBox.style.display = "none";
    }
};

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

function disableFileds(){
    reset();
    if (switchOxxo.checked){
        elems.forEach((elem) => {
            elem.disabled  = true;
        });
    
        allowPhotos = !allowPhotos;
    }else {
        elems.forEach((elem) => {
            elem.disabled  = false;
        });
    
        allowPhotos = !allowPhotos;
    }
}
 
function reset(){ 
    elems.forEach((elem) => {
        elem.value = "";
    });

    photos.forEach((elem) => {
        elem.removeAttribute('src'); 
    });

    foto_visibilidad_competenciaBox.style.display = "block";
    foto_visibilidad_marcaBox.style.display = "block";
}

function volver(){
    window.location.href = "index.html";
}

function fillFields(){
    CONSTANTS.visibilidades.forEach((item) => {
        tipo_visibilidad.innerHTML += `<option value="${item}">${item}</option>`;
        tipo_visibilidad_competencia.innerHTML += `<option value="${item}">${item}</option>`;
    });
}

window.addEventListener("DOMContentLoaded", function() {
    mount();
});

// Events
btnStore.addEventListener('click', store);
btnReset.addEventListener('click', reset);
btnVolver.addEventListener('click', volver);
switchOxxo.addEventListener('change', disableFileds);

foto_visibilidad_marcaBox.addEventListener('click', visibilidad_marcaPicture);
foto_visibilidad_competenciaBox.addEventListener('click', foto_visibilidad_competenciaPicture);