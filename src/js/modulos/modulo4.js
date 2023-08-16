import * as CONSTANTS from'../constants/constants';
import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

// Elems
let presente = document.getElementById('presente');

let producto = document.getElementById('producto');
let presentacion = document.getElementById('presentacion');
let stock = document.getElementById('stock');
let disponibilidadList = document.getElementById('disponibilidad-list');

let productoComp = document.getElementById('productoComp');
let presentacionComp = document.getElementById('presentacionComp');
let stockComp = document.getElementById('stockComp');
let disponibilidadCompList = document.getElementById('disponibilidadComp-list');

// BUTTONS 
let btnStore = document.getElementById('store');
let btnVolver = document.getElementById('volver');
let btnStoreDispo = document.getElementById('storeDispo');
let btnStoreDispoComp = document.getElementById('storeDispoComp');

let elems = [presente];
let disponibilidades = [];
let disponibilidadesComp = [];
 
async function store (){
    if (validation()){
        let dataModulo = [{
            presente: presente.value,
            disponibilidades: disponibilidades,
            disponibilidadesComp: disponibilidadesComp
        }];

        // await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify({path: STORAGE_PATH}) });
        appendData(CONSTANTS.STORAGE_PATHM4, dataModulo);
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

function storeDispo(){
    if (producto.value && presentacion.value && stock.value){
        disponibilidades.push({
            producto: producto.value,
            presentacion: presentacion.value,
            stock: stock.value
        });
        showDisponibilidades();
    }
}

function storeDispoComp(){
    if (productoComp.value && presentacionComp.value && stockComp.value){
        disponibilidadesComp.push({
            producto: productoComp.value,
            presentacion: presentacionComp.value,
            stock: stockComp.value
        });
        showDisponibilidadesComp();
    }
}

const deleteDisponibilidad = (key) =>{
    disponibilidades.splice(key, 1);
    showDisponibilidades();
} 

const deleteDisponibilidadComp = (key) => {
    disponibilidadesComp.splice(key, 1);
    showDisponibilidadesComp();
}

function showDisponibilidades(){
    disponibilidadList.innerHTML = "";
    disponibilidades.forEach((item, key) => {
        disponibilidadList.innerHTML += 
        `<tr class="text-center">
            <td>${item.producto}</td>
            <td>${item.presentacion}</td>
            <td>${item.stock}</td>
            <td><button onclick="deleteDisponibilidad(${key})" class="btn btn-danger">x</button></td>
        </tr>`;
    });
}

function showDisponibilidadesComp(){
    disponibilidadCompList.innerHTML = "";
    disponibilidadesComp.forEach((item, key) => {
        disponibilidadCompList.innerHTML += 
        `<tr class="text-center">
            <td>${item.producto}</td>
            <td>${item.presentacion}</td>
            <td>${item.stock}</td>
            <td><button onclick="deleteDisponibilidadComp(${key})" class="btn btn-danger">x</button></td>
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

function mount(){
    elems.forEach((elem) => {
        elem.value = "0";
    });
}

function volver(){
    window.location.href = "index.html";
}

// Events
btnStore.addEventListener('click', store);
btnVolver.addEventListener('click', volver);
btnStoreDispo.addEventListener('click', storeDispo);
btnStoreDispoComp.addEventListener('click', storeDispoComp);

window.onload = mount();
window.deleteDisponibilidad = deleteDisponibilidad;
window.deleteDisponibilidadComp = deleteDisponibilidadComp;