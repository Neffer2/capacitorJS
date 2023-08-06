import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const STORAGE_KEY = "modulo5";
export const STORAGE_PATH = "PM5.txt";

// Elems 
let precio = document.getElementById('precio');
let tipo_producto = document.getElementById('tipo_producto');

// BUTTONS
let btnStore = document.getElementById('store');
let btnReset = document.getElementById('reset');
 
let elems = [precio, tipo_producto];

async function store (){
    if (validation()){
        let dataModulo = [{
            id: 0,
            precio: precio.value,
            tipo_producto: tipo_producto.value
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
            // console.log(dataModulo1);
            dataModulo.push({
                id: dataModulo.length,
                precio: precio.value,
                tipo_producto: tipo_producto.value
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
}

// Events
btnStore.addEventListener('click', store);
btnReset.addEventListener('click', reset);
