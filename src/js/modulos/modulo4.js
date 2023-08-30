import * as CONSTANTS from'../constants/constants';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

// Elems
let producto = document.getElementById('producto');
let presentacion = document.getElementById('presentacion');
let precio = document.getElementById('precio');
let stock = document.getElementById('stock');
let disponibilidadList = document.getElementById('disponibilidad-list');

let productoComp = document.getElementById('productoComp');
let presentacionComp = document.getElementById('presentacionComp');
let precioComp = document.getElementById('precioComp');
let stockComp = document.getElementById('stockComp');
let disponibilidadCompList = document.getElementById('disponibilidadComp-list');

// BUTTONS 
let btnStore = document.getElementById('store'); 
let btnVolver = document.getElementById('volver');
let btnStoreDispo = document.getElementById('storeDispo');
let btnStoreDispoComp = document.getElementById('storeDispoComp');

let disponibilidades = [];
let disponibilidadesComp = [];
let elems = [];

function mount(){
    fillFields();
}

async function store (){
    if (validation()){
        let dataModulo = [{
            disponibilidades: disponibilidades,
            disponibilidadesComp: disponibilidadesComp
        }];

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
            precio: precio.value,
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
            precio: precioComp.value,
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
            <td>${item.precio}</td>
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
            <td>${item.precio}</td>
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

// Dynamic selects
function fillFields(){
    producto.innerHTML += CONSTANTS.productos;
    productoComp.innerHTML += CONSTANTS.productos;
    
    CONSTANTS.presentaciones.forEach((item) => {
        presentacion.innerHTML += `<option value="${item}">${item}</option>`;
        presentacionComp.innerHTML += `<option value="${item}">${item}</option>`;
    });
}

producto.addEventListener('change', () => {
    if (producto.selectedIndex !== -1){
        const selectedOptionElement = producto.options[producto.selectedIndex];   
        if (selectedOptionElement.dataset.type == 'bons/hets'){
            setPresentacionesElectricos();
        }else if(selectedOptionElement.dataset.type == 'PIEL_ROJA'){ 
            setPresentacionesPielRoja();
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

function setPresentacionesPielRoja(){
    presentacion.innerHTML = "<option value='' class='text-center'>🔽</option>";
    CONSTANTS.presentacionPielRoja.forEach((item) => {
        presentacion.innerHTML += `<option value="${item}">${item}</option>`;
    });
}
/* ** */  

function volver(){
    window.location.href = "index.html";
} 

window.addEventListener("DOMContentLoaded", function() {
    mount()
});

// Events
btnStore.addEventListener('click', store);
btnVolver.addEventListener('click', volver);
btnStoreDispo.addEventListener('click', storeDispo);
btnStoreDispoComp.addEventListener('click', storeDispoComp);

// Attached functions
window.deleteDisponibilidad = deleteDisponibilidad;
window.deleteDisponibilidadComp = deleteDisponibilidadComp;