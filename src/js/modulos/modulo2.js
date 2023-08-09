import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const STORAGE_KEY = "modulo2";
export const STORAGE_PATH = "PM2.txt";
 
// Elems
let marca = document.getElementById('marca');
let pdv = document.getElementById('pdv');
let num_abordadas = document.getElementById('num_abordadas');
let tipo_producto = document.getElementById('tipo_producto');
let presentacion = document.getElementById('presentacion');
let num_ventas_1 = document.getElementById('num_ventas_1');
let num_ventas_2 = document.getElementById('num_ventas_2');
let genero1 = document.getElementById('genero1'); 
let genero2 = document.getElementById('genero2'); 

let gifus = document.getElementById('gifus');
let edad = document.getElementById('edad');

let num_ventas_competencia = document.getElementById('num_ventas_competencia');

// BUTTONS
let btnStore = document.getElementById('store');
let btnReset = document.getElementById('reset');
 
let elems = [marca, num_abordadas, num_ventas, tipo_producto, num_ventas_competencia, presentacion, gifus, genero, edad];
 
async function store (){
    if (validation()){
        let dataModulo = [{
            id: 0,
            marca: marca.value,
            num_abordadas: num_abordadas.value,
            num_ventas: num_ventas.value,
            tipo_producto: tipo_producto.value,
            num_ventas_competencia: num_ventas_competencia.value,
            presentacion: presentacion.value,
            gifus: gifus.value,
            genero: genero.value,
            edad: edad.value
        }]; 

        // await Filesystem.deleteFile({
        //     path: 'secrets/photos.txt',
        //     directory: Directory.Documents,
        // });

        /* Verifico si existe el nombre del archivo dentro de la base de datos
            ( Lo que significaría que ya existe un documento en FileSystem).
        */
        const { value } = await Preferences.get({ key: STORAGE_KEY });

        if (value){
            const { data } = await Filesystem.readFile({
                path: STORAGE_PATH,
                directory: Directory.Documents,
                encoding: Encoding.UTF8,
            });

            dataModulo = JSON.parse(data);
            dataModulo.push({
                id: dataModulo.length,
                marca: marca.value,
                num_abordadas: num_abordadas.value,
                num_ventas: num_ventas.value,
                tipo_producto: tipo_producto.value,
                num_ventas_competencia: num_ventas_competencia.value,
                presentacion: presentacion.value,
                gifus: gifus.value,
                genero: genero.value,
                edad: edad.value
            });
        }else {
            await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify({path: STORAGE_PATH}) });
        }
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

function list500(elem){
    elem.innerHTML += `<option value="">Seleccionar</option>`;

    let cont = 1;
    while(cont <= 500){
        elem.innerHTML += `<option value="${cont}">${cont}</option>`;
        cont++;
    }
}

// Events
btnStore.addEventListener('click', store);
btnReset.addEventListener('click', reset);
window.onload = list500(num_abordadas), list500(num_ventas), list500(gifus), list500(num_ventas_competencia);