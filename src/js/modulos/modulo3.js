import * as CONSTANTS from'../constants/constants';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
  
// Elems 
let pdv = document.getElementById('pdv');
let visibilidad = document.getElementById('visibilidad');
let tipo_visibilidad = document.getElementById('tipo_visibilidad');
let visibilidad_competencia = document.getElementById('visibilidad_competencia');
let tipo_visibilidad_competencia = document.getElementById('tipo_visibilidad_competencia');
let num_ventas_competencia = document.getElementById('num_ventas_competencia');
let foto_visibilidad_marca = document.getElementById('foto_visibilidad_marca');
let foto_visibilidad_competencia = document.getElementById('foto_visibilidad_competencia');

// Useful vars
let foto_visibilidad_marcaBox = document.getElementById('foto_visibilidad_marcaBox');
let foto_visibilidad_competenciaBox = document.getElementById('foto_visibilidad_competenciaBox');

// BUTTONS
let btnStore = document.getElementById('store');
let btnReset = document.getElementById('reset');
let btnVolver = document.getElementById('volver'); 
 
let elems = [visibilidad, tipo_visibilidad, visibilidad_competencia, tipo_visibilidad_competencia];
let photos = [foto_visibilidad_marca, foto_visibilidad_competencia];

async function store (){ 
    if (validation()){
        let dataModulo = [{
            visibilidad: visibilidad.value,
            tipo_visibilidad: tipo_visibilidad.value,
            visibilidad_competencia: visibilidad_competencia.value,
            tipo_visibilidad_competencia: tipo_visibilidad_competencia.value,
            foto_visibilidad_marca: foto_visibilidad_marca.src,
            foto_visibilidad_competencia: foto_visibilidad_competencia.src,
        }]; 
        
        // await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify({path: STORAGE_PATH}) });
        appendData(CONSTANTS.STORAGE_PATHM3, dataModulo);

        // await Filesystem.deleteFile({
        //     path: 'secrets/photos.txt',
        //     directory: Directory.Documents,
        // });
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

        volver();
        vibrate();
    }catch(error){
        alert("Opps! tenemos un problema.");
    }
}

const visibilidad_marcaPicture = async () => {
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
};

const foto_visibilidad_competenciaPicture = async () => {
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

// Events
btnStore.addEventListener('click', store);
btnReset.addEventListener('click', reset);
btnVolver.addEventListener('click', volver);

foto_visibilidad_marcaBox.addEventListener('click', visibilidad_marcaPicture);
foto_visibilidad_competenciaBox.addEventListener('click', foto_visibilidad_competenciaPicture);