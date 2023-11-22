import * as CONSTANTS from'../constants/constants';
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

let preferenciaMarca = document.getElementById('preferencia');
let preferenciaOtroText = document.getElementById('preferencia-otro-text');

let preferenciaCompetencia = document.getElementById('preferencia-competencia');
let preferenciaCompOtroText = document.getElementById('preferencia-comp-otro-text');

let mensajeMarcaSfp = document.getElementById('mensaje-marca-SFP');
let sfpMarca = document.getElementById('SFP-marca');

let mensajeMarcaCcs = document.getElementById('mensaje-marca-CCs');
let ccsMarca = document.getElementById('CCs-marca');

let intervencion1 = document.getElementById('intervencion1');
let intervencion2 = document.getElementById('intervencion2');

let gifu = document.getElementById('gifu');
let genero_gifu = document.getElementById('genero_gifu');
let edad_gifu = document.getElementById('edad_gifu');
let gifusList = document.getElementById('gifus-list');

// Useful vars
let preferenciaContainer = document.getElementById('preferencia-container');
let preferenciaOtro = document.getElementById('preferencia-otro');

let preferenciaCompetenciaContainer = document.getElementById('preferencia-competencia-container');
let preferenciaCompOtro = document.getElementById('preferencia-comp-otro');

let sfpMarcaContainer = document.getElementById('SFP-marca-container');
let ccsMarcaContainer = document.getElementById('CCs-marca-container');

// BUTTONS 
let btnStore = document.getElementById('store');
let btnStoreVenta = document.getElementById('storeVenta');
let btnStoreGifu = document.getElementById('storeGifu');
let btnStoreAbordado = document.getElementById('storeAbordado');
let btnSubsAbordado = document.getElementById('subsAbordado');
let btnVolver = document.getElementById('volver');

let elems = [num_abordadas, leads];

function mount(){
    fillFileds();
    showVentas();
    showAbordados();
    showGifus();
}

async function store (){
    let abordadosStored = await readData(CONSTANTS.STORAGE_ABORDADOS);
    let ventasStored = await readData(CONSTANTS.STORAGE_VENTAS);
    let gifusStored = await readData(CONSTANTS.STORAGE_GIFUS);

    if (validation()){
        let dataModulo = [{
            num_abordadas: abordadosStored.length -1,
            ventas: ventasStored,
            gifus: gifusStored
        }];

        appendData(CONSTANTS.STORAGE_PATHM2, dataModulo);

        reset();
        vibrate();
        volver();
    }else {
        alert("Debes rellenar todos los campos");
    }
}

async function storeAbordado(){
    await appendAbordados();
    showAbordados();
}

async function storeVenta(){
    let validation = true;

    if (mensajeMarcaSfp.value == 0){sfpMarca.value = "";}
    if (mensajeMarcaCcs.value == 0){ccsMarca.value = "";}

    /* VALIDATION */
    if (preferenciaMarca.value == "" && preferenciaCompetencia.value == ""){
        validation = false;
    }
        
    if (preferenciaMarca.value == "Otro" && preferenciaOtroText.value == ""){
        validation = false;
    }

    if(preferenciaCompetencia.value == "Otro" && preferenciaCompOtroText.value == ""){
        validation = false;
    }    

    if (mensajeMarcaSfp.value == ""){
        validation = false;
    }

    if (mensajeMarcaCcs.value == ""){
        validation = false;
    }

    if (mensajeMarcaSfp.value == 1 && sfpMarca.value == ""){
        validation = false;
    }

    if (mensajeMarcaCcs.value == 1 && ccsMarca.value == ""){
        validation = false;
    }
    /* ** */

    if (producto.value && presentacion.value && genero.value && edad.value && cantidad.value && intervencion1.value && intervencion2.value && validation){
        await appendVenta({
            producto: producto.value,
            presentacion: presentacion.value,
            genero: genero.value,
            edad: edad.value,
            cantidad:cantidad.value,
            interesInicial: interesInicial.value,

            preferenciaMarca: preferenciaMarca.value,
            preferenciaOtroText: preferenciaOtroText.value,

            preferenciaCompetencia: preferenciaCompetencia.value,
            preferenciaCompOtroText: preferenciaCompOtroText.value,

            mensajeMarcaSfp: mensajeMarcaSfp.value,
            sfpMarca: sfpMarca.value,

            mensajeMarcaCcs: mensajeMarcaCcs.value,
            ccsMarca: ccsMarca.value,

            intervencion1: intervencion1.value,
            intervencion2: intervencion2.value,
        });
        showVentas();
        resetVentaForm();
    }else { 
        alert("Debes llenar todos los campos");
    }
}

async function storeGifu(){
    if (gifu.value && genero_gifu.value && edad_gifu.value){
        await appendGifu({
            gifu: gifu.value,
            genero_gifu: genero_gifu.value,
            edad_gifu: edad_gifu.value,
        });
        showGifus();
        resetGifusForm();
    }
}

/*  
Los modulos no son accesibles desde el window. 
Por eso se define la variable y se almacena una función flecha.
Deletes
*/
const deleteAbordado = async (key) =>{
    let abordadosStored = await readData(CONSTANTS.STORAGE_ABORDADOS);
    abordadosStored.splice(key, 1);

    await deleteData(CONSTANTS.STORAGE_ABORDADOS);
    await appendData(CONSTANTS.STORAGE_ABORDADOS, abordadosStored);
    showAbordados();
}

const deleteVenta = async (key) =>{
    let ventasStored = await readData(CONSTANTS.STORAGE_VENTAS);
    ventasStored.splice(key, 1);

    await deleteData(CONSTANTS.STORAGE_VENTAS);
    await appendData(CONSTANTS.STORAGE_VENTAS, ventasStored);
    showVentas();
} 
 
const deleteGifu = async (key) =>{
    let gifusStored = await readData(CONSTANTS.STORAGE_GIFUS);
    gifusStored.splice(key, 1);

    await deleteData(CONSTANTS.STORAGE_GIFUS);
    await appendData(CONSTANTS.STORAGE_GIFUS, gifusStored);
    showGifus();
}
/* *** */

/* Shows */
async function showAbordados(){
    let abordados = await readData(CONSTANTS.STORAGE_ABORDADOS);

    if (abordados){
        if ((abordados.length - 1) > 0){
            num_abordadas.value = abordados.length - 1;
        }else {
            num_abordadas.value = 0;
        }
    }else{
        num_abordadas.value = 0;
    }
}

async function showVentas(){
    let ventasStored = await readData(CONSTANTS.STORAGE_VENTAS);
    if (ventasStored){
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
}

async function showGifus(){
    let gifusStored = await readData(CONSTANTS.STORAGE_GIFUS);
    if (gifusStored){
        gifusList.innerHTML = "";
        gifusStored.forEach((item, key) => {
            gifusList.innerHTML += 
            `<tr class="text-center">
                <td>${item.gifu}</td>
                <td>${item.genero_gifu}</td>
                <td>${item.gifu}</td>
                <td>
                <button onclick="deleteGifu(${key})" class="btn btn-danger">
                    <b>x</b>
                </button>
                </td>
            </tr>`;
        });
    }
}

function showPreferencia(show){
    if (show){
        preferenciaContainer.hidden = false;
        preferenciaCompetenciaContainer.hidden = true;
    }else {
        preferenciaContainer.hidden = true;
        preferenciaCompetenciaContainer.hidden = false;
    }
}

function showSfp(show){
    if (show){
        sfpMarcaContainer.hidden = false;
    }else {        
        sfpMarcaContainer.hidden = true;
    }
}

function showCcs(show){
    if (show){
        ccsMarcaContainer.hidden = false;
    }else {        
        ccsMarcaContainer.hidden = true;
    }
}
/* *** */

/* Appends */
async function appendAbordados(){
    let abordadosStored = await readData(CONSTANTS.STORAGE_ABORDADOS);
    abordadosStored.push({ abordados: 1 });
    await appendData(CONSTANTS.STORAGE_ABORDADOS, abordadosStored);
}

async function appendVenta(ventas){
    let ventasStored = await readData(CONSTANTS.STORAGE_VENTAS);
    ventasStored.push(ventas);
    await appendData(CONSTANTS.STORAGE_VENTAS, ventasStored);
}

async function appendGifu(gifus){
    let gifusStored = await readData(CONSTANTS.STORAGE_GIFUS);
    gifusStored.push(gifus);
    await appendData(CONSTANTS.STORAGE_GIFUS, gifusStored);
}
/* *** */

/* Utilities */
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
        return [];
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

        vibrate();
    }catch(error){
        alert("Opps! tenemos un problema.");
    }
}

async function deleteData(src){
    try {
        await Filesystem.deleteFile({
            path: src,
            directory: Directory.Documents,
        });    
    }catch(error){
        alert("Opps! tenemos un problema.");
    }
}
/* *** */

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

function resetFileds(){
    preferenciaMarca.value = "";
    preferenciaOtroText.value = "";
    preferenciaOtroText.hidden = true;

    preferenciaCompetencia.value = "";
    preferenciaCompOtroText.value = "";
    preferenciaCompOtroText.hidden = true;
}

function resetVentaForm(){
    producto.value = "";
    presentacion.value = "";
    genero.value = "";
    edad.value = "";
    cantidad.value = "";
    interesInicial.value = "";

    preferenciaMarca.value = "";
    preferenciaOtroText.value = "";

    preferenciaCompetencia.value = "";
    preferenciaCompOtroText.value = "";

    mensajeMarcaSfp.value = "";
    sfpMarca.value = "";

    mensajeMarcaCcs.value = "";
    ccsMarca.value = "";

    intervencion1.value = "";
    intervencion2.value = "";
    preferenciaOtroText.hidden = true;
    preferenciaCompOtroText.hidden = true;
}

function resetGifusForm(){
    gifu.value = "";
    genero_gifu.value = "";
    edad_gifu.value = "";
}

function volver(){
    window.location.href = "index.html";
} 

/* Setters */
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

function reset(){
    window.location.href = "index.html";
}
/* *** */

// Events  
btnStoreGifu.addEventListener('click', storeGifu);
btnStoreVenta.addEventListener('click', storeVenta);
btnStoreAbordado.addEventListener('click', storeAbordado);
btnSubsAbordado.addEventListener('click', deleteAbordado);

btnStore.addEventListener('click', store);
btnVolver.addEventListener('click', volver);

// Dynamic selects
function fillFileds() {
    producto.innerHTML += CONSTANTS.productos;
    interesInicial.innerHTML += CONSTANTS.productos;
    setPresentacionesCombustubles();

    gifu.innerHTML += CONSTANTS.gifus;

    CONSTANTS.generos.forEach(item => {
        genero.innerHTML += `<option value="${item}">${item}</option>`;
    });
    CONSTANTS.generos.forEach(item => {
        genero_gifu.innerHTML += `<option value="${item}">${item}</option>`;
    });    
}
/* ** */ 

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

interesInicial.addEventListener('change', () => {
    resetFileds();
    let selectedOptionElement = interesInicial.options[interesInicial.selectedIndex];
    if (selectedOptionElement.dataset.pmi == 1){
        showPreferencia(true);
    }else{
        showPreferencia(false);
    }
});

preferenciaMarca.addEventListener('change', () => {
    if(preferenciaMarca.value === "Otro"){
        preferenciaOtro.className = "d-flex gap-0 column-gap-3";
        preferenciaOtroText.hidden = false;
    }else {
        preferenciaOtro.className = "";
        preferenciaOtroText.hidden = true;
        preferenciaOtroText.value = "";
    }
});

preferenciaCompetencia.addEventListener('change', () => {
    if(preferenciaCompetencia.value === "Otro"){
        preferenciaCompOtro.className = "d-flex gap-0 column-gap-3";
        preferenciaCompOtroText.hidden = false;
    }else {
        preferenciaCompOtro.className = "";
        preferenciaCompOtroText.hidden = true;
        preferenciaCompOtroText.value = "";
    }
});

mensajeMarcaSfp.addEventListener('change', () => {
    if (mensajeMarcaSfp.value == 1){
        showSfp(true);
    }else{
        showSfp(false);
    }
});

mensajeMarcaCcs.addEventListener('change', () => {
    if (mensajeMarcaCcs.value == 1){
        showCcs(true);
    }else{
        showCcs(false);
    }
});

window.addEventListener("DOMContentLoaded", function() {
    mount()
});

// Attached functions
window.deleteVenta = deleteVenta;
window.deleteGifu = deleteGifu;