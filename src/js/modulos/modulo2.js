import * as CONSTANTS from'../constants/constants';
import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
  
// Elems
let num_abordadas = document.getElementById('num_abordadas');

let producto = document.getElementById('producto');
let presentacion = document.getElementById('presentacion');
let genero = document.getElementById('genero'); 
let edad = document.getElementById('edad'); 
let cantidad = document.getElementById('cantidad');
let interesInicial = document.getElementById('interes');
let ventasList = document.getElementById('ventas-list'); 

let gifu = document.getElementById('gifu');
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

function mount(){
    showVentas();
}

async function store (){
    if (validation()){
        let dataModulo = [{
            ventas: ventas,
            gifus: gifus
        }];  

        // await Preferences.set({ key: CONSTANTS.STORAGE_KEYM2, value: JSON.stringify({path: CONSTANTS.STORAGE_PATHM2}) });
        appendData(CONSTANTS.STORAGE_PATHM2, dataModulo);
    }else {
        alert("Debes rellenar todos los campos");
    }
}  

async function storeVenta(){
    if (producto.value && presentacion.value && genero.value && edad.value && cantidad.value){
        await appendVenta({
            producto: producto.value,
            presentacion: presentacion.value,
            genero: genero.value,
            edad: edad.value,
            cantidad:cantidad.value,
            interesInicial: interesInicial.value
        });
        showVentas();
    }
}

function storeGifu(){
    if (gifu.value && genero_gifu.value && edad_gifu.value){
        gifus.push({
            gifu: gifu.value,
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
const deleteVenta = async (key) =>{
    let ventasStored = await readData(CONSTANTS.STORAGE_VENTAS);
    ventasStored.splice(key, 1);
    await deleteData(CONSTANTS.STORAGE_VENTAS);
    console.log(ventasStored);
    // await appendVenta(ventasStored);
    showVentas();
} 

const deleteGifu = (key) =>{
    gifus.splice(key, 1);
    showGifus();
} 
 
async function showVentas(){
    let ventasStored = await readData(CONSTANTS.STORAGE_VENTAS);

    ventasList.innerHTML = "";
    ventasStored.forEach((item, key) => {
        ventasList.innerHTML += 
        `<tr class="text-center">
            <td>${item.producto}</td>
            <td>${item.presentacion}</td>
            <td>${item.genero}</td>
            <td>${item.edad}</td>
            <td>${item.cantidad}</td>
            <td>${item.interesInicial}</td>
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
            <td>${item.genero_gifu}</td>
            <td>${item.edad_gifu}</td>
            <td><button onclick="deleteGifu(${key})" class="btn btn-danger">x</button></td>
        </tr>`;
    });
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

async function appendVenta(ventas){
    let ventasStored = await readData(CONSTANTS.STORAGE_VENTAS);
    ventasStored.push(ventas);
    await appendData(CONSTANTS.STORAGE_VENTAS, ventasStored);
}

async function readData(src){
    try {
        const { data } = await Filesystem.readFile({
            path: src,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });
        
        let dataStored = JSON.parse(data);
        if (dataStored.length){
            return dataStored;
        }

        return [];
    }catch(error){
        alert("Opps! este archivo no existe.");
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

        // reset();
        vibrate();
    }catch(error){
        alert("Opps! tenemos un problema.");
    }
}

async function deleteData(src){
    try {
        await Filesystem.writeFile({
            path: src,
            data: JSON.stringify([]),
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });    
    }catch(error){
        alert("Opps! tenemos un problema.");
    }
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
// Events 
btnStoreGifu.addEventListener('click', storeGifu);
btnStoreVenta.addEventListener('click', storeVenta);
btnStore.addEventListener('click', store);
btnVolver.addEventListener('click', volver);

// Dynamic selects
if (producto){
    producto.innerHTML += CONSTANTS.productos;
}

producto.addEventListener('change', () => {
    if (producto.selectedIndex !== -1){
        const selectedOptionElement = producto.options[producto.selectedIndex];   
        // deleteData(CONSTANTS.STORAGE_VENTAS);
        if (selectedOptionElement.dataset.type){
            setPresentacionesElectricos();
        }else{ 
            setPresentacionesCombustubles();
        }
    }    
});

function setPresentacionesElectricos(){
    presentacion.innerHTML = "<option value='' class='text-center'>🔽</option>";
    CONSTANTS.presentacionesElectricos.forEach((item) => {
        presentacion.innerHTML += `<option value="${item}">${item}</option>`;
    });
}

function setPresentacionesCombustubles(){
    presentacion.innerHTML = "<option value='' class='text-center'>🔽</option>";
    CONSTANTS.presentaciones.forEach((item) => {
        presentacion.innerHTML += `<option value="${item}">${item}</option>`;
    });
}

window.addEventListener("DOMContentLoaded", function() {
    mount()
});

// Attached functions
window.deleteVenta = deleteVenta;
window.deleteGifu = deleteGifu;