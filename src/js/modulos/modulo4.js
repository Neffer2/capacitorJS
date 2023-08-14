import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const STORAGE_KEY = "modulo4";
export const STORAGE_PATH = "PM4.txt";

// Elems
let presente = document.getElementById('presente');
let pdv = document.getElementById('pdv');

let MLBROJO = document.getElementById('MLBROJO');
let MLBREDSELECTION = document.getElementById('MLBREDSELECTION'); 
let PIELROJA = document.getElementById('PIELROJA');
let CARIBE = document.getElementById('CARIBE');
let LMAZUL = document.getElementById('LMAZUL');
let LMROJO = document.getElementById('LMROJO');

let MLBGOLD = document.getElementById('MLBGOLD');
let CHESTERFIELDAZUL = document.getElementById('CHESTERFIELDAZUL');
let CHESTERFIELDBLANCO = document.getElementById('CHESTERFIELDBLANCO');
let LMSILVER = document.getElementById('LMSILVER');

let CHESTERFIELDGREEN = document.getElementById('CHESTERFIELDGREEN');

let MLBFUSION_FRUTOSROJOS = document.getElementById('MLBFUSION_FRUTOSROJOS');
let MLBSUMMER_SANDIA = document.getElementById('MLBSUMMER_SANDIA');
let MLBEXOTIC_TUTIFRUTI = document.getElementById('MLBEXOTIC_TUTIFRUTI');
let CHESTERFIELDPURPLE_FRUTOSROJOS = document.getElementById('CHESTERFIELDPURPLE_FRUTOSROJOS');
let LMWARREGO_SANDIA = document.getElementById('LMWARREGO_SANDIA');


// BUTTONS
let btnStore = document.getElementById('store');
let btnVolver = document.getElementById('volver');
 
let elems = [presente, pdv,
    MLBROJO,
    MLBREDSELECTION,
    PIELROJA,
    CARIBE, 
    LMAZUL,
    LMROJO,

    MLBGOLD,
    CHESTERFIELDAZUL,
    CHESTERFIELDBLANCO,
    LMSILVER, 

    CHESTERFIELDGREEN,

    MLBFUSION_FRUTOSROJOS,
    MLBSUMMER_SANDIA, 
    MLBEXOTIC_TUTIFRUTI, 
    CHESTERFIELDPURPLE_FRUTOSROJOS,
    LMPURPLE_FRUTOSROJOS,
    LMWARREGO_SANDIA
];
 
async function store (){
    if (validation()){
        let dataModulo = [{
            id: 0,
            presente: presente.value,
            pdv: pdv.value,
            
            MLBROJO: MLBROJO.value,
            MLBREDSELECTION: MLBREDSELECTION.value,
            PIELROJA: PIELROJA.value,
            CARIBE: CARIBE.value,
            LMAZUL: LMAZUL.value,
            LMROJO: LMROJO.value,

            MLBGOLD: MLBGOLD.value,
            CHESTERFIELDAZUL: CHESTERFIELDAZUL.value,
            CHESTERFIELDBLANCO: CHESTERFIELDBLANCO.value,
            LMSILVER: LMSILVER.value,

            CHESTERFIELDGREEN: CHESTERFIELDGREEN.value,

            MLBFUSION_FRUTOSROJOS: MLBFUSION_FRUTOSROJOS.value,
            MLBSUMMER_SANDIA: MLBSUMMER_SANDIA.value,
            MLBEXOTIC_TUTIFRUTI: MLBEXOTIC_TUTIFRUTI.value,
            CHESTERFIELDPURPLE_FRUTOSROJOS: CHESTERFIELDPURPLE_FRUTOSROJOS.value,
            LMPURPLE_FRUTOSROJOS: LMPURPLE_FRUTOSROJOS.value,
            LMWARREGO_SANDIA: LMWARREGO_SANDIA.value        
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
                presente: presente.value,
                pdv: pdv.value,
                
                MLBROJO: MLBROJO.value,
                MLBREDSELECTION: MLBREDSELECTION.value,
                PIELROJA: PIELROJA.value,
                CARIBE: CARIBE.value,
                LMAZUL: LMAZUL.value,
                LMROJO: LMROJO.value,

                MLBGOLD: MLBGOLD.value,
                CHESTERFIELDAZUL: CHESTERFIELDAZUL.value,
                CHESTERFIELDBLANCO: CHESTERFIELDBLANCO.value,
                LMSILVER: LMSILVER.value,

                CHESTERFIELDGREEN: CHESTERFIELDGREEN.value,

                MLBFUSION_FRUTOSROJOS: MLBFUSION_FRUTOSROJOS.value,
                MLBSUMMER_SANDIA: MLBSUMMER_SANDIA.value,
                MLBEXOTIC_TUTIFRUTI: MLBEXOTIC_TUTIFRUTI.value,
                CHESTERFIELDPURPLE_FRUTOSROJOS: CHESTERFIELDPURPLE_FRUTOSROJOS.value,
                LMPURPLE_FRUTOSROJOS: LMPURPLE_FRUTOSROJOS.value,
                LMWARREGO_SANDIA: LMWARREGO_SANDIA.value        
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

window.onload = mount();