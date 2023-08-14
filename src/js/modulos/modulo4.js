import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
 
export const STORAGE_KEY = "modulo4";
export const STORAGE_PATH = "PM4.txt";

// Elems
let presente = document.getElementById('presente');

let producto = document.getElementById('producto');
let presentacion = document.getElementById('presentacion');
let stock = document.getElementById('stock');
let disponibilidadList = document.getElementById('disponibilidad-list');
let disponibilidades = [];

// BUTTONS
let btnStore = document.getElementById('store');
let btnVolver = document.getElementById('volver');
let btnStoreDispo = document.getElementById('storeDispo');

let elems = [presente];
 
async function store (){
    if (validation()){
        let dataModulo = [{
            presente: presente.value,
            disponibilidades: disponibilidades
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

const deleteDisponibilidad = (key) =>{
    disponibilidades.splice(key, 1);
    showDisponibilidades();
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


window.onload = mount();
window.deleteDisponibilidad = deleteDisponibilidad;