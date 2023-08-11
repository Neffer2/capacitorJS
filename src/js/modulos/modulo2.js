import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const STORAGE_KEY = "modulo2";
export const STORAGE_PATH = "PM2.txt";
  
// Elems
let num_abordadas = document.getElementById('num_abordadas');
let producto = document.getElementById('producto');
let presentacion = document.getElementById('presentacion');
let cantidad = document.getElementById('cantidad');
let ventasList = document.getElementById('ventas-list');
let genero_1 = document.getElementById('genero_1'); 
let genero_2 = document.getElementById('genero_2'); 
let edad_1 = document.getElementById('edad_1'); 
let edad_2 = document.getElementById('edad_2'); 
let gifus = document.getElementById('gifus');
let ventas = [];


// BUTTONS
let btnStore = document.getElementById('store');
let btnStoreVenta = document.getElementById('storeVenta');
let btnReset = document.getElementById('reset');

let elems = [num_abordadas, genero_1, genero_2, gifus, edad_1, edad_2];
 
async function store (){
    if (validation()){
        let dataModulo = [{
            id: 0,
            marca: marca.value,
            pdv: pdv.value,
            num_abordadas: num_abordadas.value,
            num_ventas_1: num_ventas_1.value,
            num_ventas_2: num_ventas_2.value,
            genero_1: genero_1.value,
            genero_2: genero_2.value,
            edad_1: edad_1.value,
            edad_2: edad_2.value,
            gifus: gifus.value
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
                pdv: pdv.value,
                num_abordadas: num_abordadas.value,
                num_ventas_1: num_ventas_1.value,
                num_ventas_2: num_ventas_2.value,
                genero_1: genero_1.value,
                genero_2: genero_2.value,
                edad_1: edad_1.value,
                edad_2: edad_2.value,
                gifus: gifus.value
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

function storeVenta(){
    if (producto.value && presentacion.value && cantidad.value){
        ventas.push({producto: producto.value, presentacion: presentacion.value, cantidad:cantidad.value});
        showVentas();
    }
}

function showVentas(){
    ventasList.innerHTML = "";
    ventas.forEach((item) => {
        ventasList.innerHTML += 
        `<tr class="text-center">
            <td>${item.producto}</td>
            <td>${item.presentacion}</td>
            <td>${item.cantidad}</td>
            <td><button class="btn btn-danger">x</button></td>
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
    // elems.forEach((elem) => {
    //     elem.value = "0";
    // });
}

// Events
btnStoreVenta.addEventListener('click', storeVenta);
btnStore.addEventListener('click', store);
btnReset.addEventListener('click', reset);

window.onload = mount();