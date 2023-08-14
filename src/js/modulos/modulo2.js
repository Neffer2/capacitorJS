import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const STORAGE_KEY = "modulo2";
export const STORAGE_PATH = "PM2.txt";
  
// Elems
let num_abordadas = document.getElementById('num_abordadas');

let producto = document.getElementById('producto');
let presentacion = document.getElementById('presentacion');
let genero = document.getElementById('genero'); 
let edad = document.getElementById('edad'); 
let cantidad = document.getElementById('cantidad');
let ventasList = document.getElementById('ventas-list');

let gifu = document.getElementById('gifu');
let sabor = document.getElementById('sabor');
let genero_gifu = document.getElementById('genero_gifu');
let edad_gifu = document.getElementById('edad_gifu');
let gifusList = document.getElementById('gifus-list');

let ventas = [];
let gifus = [];


// BUTTONS
let btnStore = document.getElementById('store');
let btnStoreVenta = document.getElementById('storeVenta');
let btnStoreGifu = document.getElementById('storeGifu');
let btnVolver = document.getElementById('volver');

let elems = [num_abordadas];
 
async function store (){
    if (validation()){
        let dataModulo = [{
            ventas: ventas,
            gifus: gifus
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

function storeVenta(){
    if (producto.value && presentacion.value && genero.value && edad.value && cantidad.value){
        ventas.push({
            producto: producto.value,
            presentacion: presentacion.value,
            genero: genero.value,
            edad: edad.value,
            cantidad:cantidad.value
        });
        showVentas();
    }
}

function storeGifu(){
    if (gifu.value && sabor.value && genero_gifu.value && edad_gifu.value){
        gifus.push({
            gifu: gifu.value,
            sabor: sabor.value,
            genero_gifu: genero_gifu.value,
            edad_gifu: edad_gifu.value,
        });
        showGifus();
    }
}

/*
    Los modulos no son accesibles desde el window. 
    Por eso se define la variable y se almacena una función flecha
*/

const deleteVenta = (key) =>{
    ventas.splice(key, 1);
    showVentas();
} 

const deleteGifu = (key) =>{
    gifus.splice(key, 1);
    showGifus();
} 

function showVentas(){
    ventasList.innerHTML = "";
    ventas.forEach((item, key) => {
        ventasList.innerHTML += 
        `<tr class="text-center">
            <td>${item.producto}</td>
            <td>${item.presentacion}</td>
            <td>${item.genero}</td>
            <td>${item.edad}</td>
            <td>${item.cantidad}</td>
            <td><button onclick="deleteVenta(${key})" class="btn btn-danger">x</button></td>
        </tr>`;
    });
}

function showGifus(){
    gifusList.innerHTML = "";
    gifus.forEach((item, key) => {
        gifusList.innerHTML += 
        `<tr class="text-center">
            <td>${item.gifu}</td>
            <td>${item.sabor}</td>
            <td>${item.genero_gifu}</td>
            <td>${item.edad_gifu}</td>
            <td><button onclick="deleteGifu(${key})" class="btn btn-danger">x</button></td>
        </tr>`;
    });
}

async function vibrate(){
    await Haptics.vibrate();
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

function reset(){
    elems.forEach((elem) => {
        elem.value = "";
    });

    window.location.href = "index.html";
}

function volver(){
    window.location.href = "index.html";
}

function mount(){}

// Events
btnStoreGifu.addEventListener('click', storeGifu);
btnStoreVenta.addEventListener('click', storeVenta);
btnStore.addEventListener('click', store);
btnVolver.addEventListener('click', volver);

window.onload = mount();

// Attached functions
window.deleteVenta = deleteVenta;
window.deleteGifu = deleteGifu;