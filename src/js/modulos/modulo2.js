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

let productoComp = document.getElementById('productoComp');
let presentacionComp = document.getElementById('presentacionComp');
let cantidadComp = document.getElementById('cantidadComp');
let ventasCompList = document.getElementById('ventasComp-list');

let gifu = document.getElementById('gifu');
let genero_gifu = document.getElementById('genero_gifu');
let edad_gifu = document.getElementById('edad_gifu');
let gifusList = document.getElementById('gifus-list');

let ventas = [];
let ventasComp = [];
let gifus = [];

// BUTTONS
let btnStore = document.getElementById('store');
let btnStoreVenta = document.getElementById('storeVenta');
let btnStoreVentaComp = document.getElementById('storeVentaComp');
let btnStoreGifu = document.getElementById('storeGifu');
let btnVolver = document.getElementById('volver');

let elems = [num_abordadas];
 
async function store (){
    if (validation()){
        let dataModulo = [{
            ventas: ventas,
            ventasComp: ventasComp,
            gifus: gifus
        }];  

        // await Preferences.set({ key: CONSTANTS.STORAGE_KEYM2, value: JSON.stringify({path: CONSTANTS.STORAGE_PATHM2}) });
        appendData(CONSTANTS.STORAGE_PATHM2, dataModulo);
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
            cantidad:cantidad.value,
            interesInicial: interesInicial.value
        });
        showVentas();
    }
}

function storeVentaComp(){
    if (productoComp.value && presentacionComp.value && cantidadComp.value){
        ventasComp.push({
            producto: productoComp.value,
            presentacion: presentacionComp.value,
            cantidad:cantidad.value
        });
        showVentasComp();
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

const deleteVenta = (key) =>{
    ventas.splice(key, 1);
    showVentas();
} 

const deleteVentaComp = (key) => {
   ventasComp.splice(key, 1);
   showVentasComp();
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
            <td>${item.interesInicial}</td>
            <td><button onclick="deleteVenta(${key})" class="btn btn-danger">x</button></td>
        </tr>`;
    });
}

function showVentasComp(){
    ventasCompList.innerHTML = "";
    ventasComp.forEach((item, key) => {
        ventasCompList.innerHTML += 
        `<tr class="text-center">
            <td>${item.producto}</td>
            <td>${item.presentacion}</td>
            <td>${item.cantidad}</td>
            <td><button onclick="deleteVentaComp(${key})" class="btn btn-danger">x</button></td>
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
btnStoreVentaComp.addEventListener('click', storeVentaComp);
btnStore.addEventListener('click', store);
btnVolver.addEventListener('click', volver);

// Attached functions
window.deleteVenta = deleteVenta;
window.deleteGifu = deleteGifu;
window.deleteVentaComp = deleteVentaComp;