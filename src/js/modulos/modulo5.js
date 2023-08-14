import * as CONSTANTS from'../constants/constants';
import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const STORAGE_KEY = "modulo5";
export const STORAGE_PATH = "PM5.txt";

// Elems 
let producto = document.getElementById('producto');
let presentacion = document.getElementById('presentacion');
let precio = document.getElementById('precio');
let precioList = document.getElementById('precios-list');
let fotoPrecios = document.getElementById('fotoPrecios');
let precios = [];

let fotoPreciosBox = document.getElementById('fotoPreciosBox');

let productoComp = document.getElementById('productoComp');
let presentacionComp = document.getElementById('presentacionComp');
let precioComp = document.getElementById('precioComp');
let precioCompList = document.getElementById('preciosComp-list');
let fotoPreciosComp = document.getElementById('fotoPreciosComp');
let preciosComp = [];

let fotoPreciosCompBox = document.getElementById('fotoPreciosCompBox');

// BUTTONS
let btnStore = document.getElementById('store');
let btnVolver = document.getElementById('volver');
let btnStorePrecio = document.getElementById('storePrecio');
let btnStorePrecioComp = document.getElementById('storePrecioComp');
 
let elems = [];
/*  Fotos no obligatorias
    let photos = [fotoPrecios, fotoPreciosComp];
*/

async function store (){
    
    if (validation()){
        let dataModulo = [{
            precios: precios,
            preciosComp: preciosComp,
            fotoPrecios: fotoPrecios.src,
            fotoPreciosComp: fotoPreciosComp.src
        }];
        
        await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify({path: STORAGE_PATH}) });
        appendData(STORAGE_PATH, dataModulo);
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
    }catch(error){
        alert("Opps! tenemos un problema.");
    }
}

function storePrecio(){
    if (producto.value && presentacion.value && precio.value){
        precios.push({
            producto: producto.value,
            presentacion: presentacion.value,
            precio: precio.value
        });
        showPrecios();
    }
}

const preciosPicture = async () => {
    const image = await Camera.getPhoto({
        quality: CONSTANTS.QUALITY,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
    }); 

    var image64 = image.base64String;

    fotoPrecios.src = `data:image/png;base64,${image64}`;
    fotoPrecios.style.display = "block";
    fotoPreciosBox.style.display = "none";
};

const preciosCompPicture = async () => {
    const image = await Camera.getPhoto({
        quality: CONSTANTS.QUALITY,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
    }); 

    var image64 = image.base64String;

    fotoPreciosComp.src = `data:image/png;base64,${image64}`;
    fotoPreciosComp.style.display = "block";
    fotoPreciosCompBox.style.display = "none";
};

function storePrecioCompetencia(){
    if (productoComp.value && presentacionComp.value && precioComp.value){
        preciosComp.push({
            producto: productoComp.value,
            presentacion: presentacionComp.value,
            precio: precioComp.value
        });
        showPreciosCompetencia();
    }
}

function deletePrecio(key){
    precios.splice(key, 1);
    showPrecios();
}

function deletePrecioCompetencia(key){
    preciosComp.splice(key, 1);
    showPreciosCompetencia();
}

function showPrecios(){
    precioList.innerHTML = "";
    precios.forEach((item, key) => {
        precioList.innerHTML += 
        `<tr class="text-center">
            <td>${item.producto}</td>
            <td>${item.presentacion}</td>
            <td>${item.precio}</td>
            <td><button onclick="deletePrecio(${key})" class="btn btn-danger">x</button></td>
        </tr>`;
    });
}

function showPreciosCompetencia(){
    precioCompList.innerHTML = "";
    preciosComp.forEach((item, key) => {
        precioCompList.innerHTML += 
        `<tr class="text-center">
            <td>${item.producto}</td>
            <td>${item.presentacion}</td>
            <td>${item.precio}</td>
            <td><button onclick="deletePrecioCompetencia(${key})" class="btn btn-danger">x</button></td>
        </tr>`;
    });
}

function validation (){
    let validator = true;

    elems.forEach((elem) => {
        if (elem.value === ""){
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

    window.location.href = "index.html";
}

function mount(){}

function volver(){
    window.location.href = "index.html";
}

// Events
btnStore.addEventListener('click', store);
btnVolver.addEventListener('click', volver);
btnStorePrecio.addEventListener('click', storePrecio);
btnStorePrecioComp.addEventListener('click', storePrecioCompetencia);

fotoPreciosBox.addEventListener('click', preciosPicture);
fotoPreciosCompBox.addEventListener('click', preciosCompPicture);

window.onload = mount();
window.deletePrecio = deletePrecio;
window.deletePrecioCompetencia = deletePrecioCompetencia;
