import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const STORAGE_KEY = "modulo4";
export const STORAGE_PATH = "PM4.txt";

// Elems
let presente = document.getElementById('presente');
let inv_marca = document.getElementById('inv_marca');
let agotados_marca = document.getElementById('agotados_marca');

// BUTTONS
let btnStore = document.getElementById('store');
let btnReset = document.getElementById('reset');
 
let elems = [presente, inv_marca, agotados_marca];
 
async function store (){
    if (validation()){
        let dataModulo = [{
            id: 0,
            marca: presente.value,
            num_abordadas: inv_marca.value,
            num_ventas: agotados_marca.value
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
                marca: presente.value,
                num_abordadas: inv_marca.value,
                num_ventas: agotados_marca.value
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
}

// Events
btnStore.addEventListener('click', store);
btnReset.addEventListener('click', reset);