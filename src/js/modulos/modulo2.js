import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const STORAGE_KEY = "modulo2";
export const STORAGE_PATH = "PM2.txt";
 
// Elems
let marca = document.getElementById('marca');
let pdv = document.getElementById('pdv');
let num_abordadas = document.getElementById('num_abordadas');
let num_ventas_1 = document.getElementById('num_ventas_1');
let num_ventas_2 = document.getElementById('num_ventas_2');
let genero_1 = document.getElementById('genero_1'); 
let genero_2 = document.getElementById('genero_2'); 
let edad_1 = document.getElementById('edad_1'); 
let edad_2 = document.getElementById('edad_2'); 
let gifus = document.getElementById('gifus');

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
let btnReset = document.getElementById('reset');

let elems = [marca, pdv, num_abordadas, num_ventas_1, num_ventas_2, genero_1, genero_2, gifus, edad_1, edad_2, 
    MLBROJO,
    MLBROJO_PRESENT,

    MLBREDSELECTION,
    MLBREDSELECTION_PRESENT,

    PIELROJA,
    PIELROJA_PRESENT,

    CARIBE, 
    CARIBE_PRESENT, 

    LMAZUL,
    LMAZUL_PRESENT,

    LMROJO,
    LMROJO_PRESENT,

    MLBGOLD,
    MLBGOLD_PRESENT,

    CHESTERFIELDAZUL,
    CHESTERFIELDAZUL_PRESENT,

    CHESTERFIELDBLANCO,
    CHESTERFIELDBLANCO_PRESENT,

    LMSILVER, 
    LMSILVER_PRESENT, 

    CHESTERFIELDGREEN,
    CHESTERFIELDGREEN_PRESENT,

    MLBFUSION_FRUTOSROJOS,
    MLBFUSION_FRUTOSROJOS_PRESENT,

    MLBSUMMER_SANDIA, 
    MLBSUMMER_SANDIA_PRESENT, 

    MLBEXOTIC_TUTIFRUTI, 
    MLBEXOTIC_TUTIFRUTI_PRESENT, 

    CHESTERFIELDPURPLE_FRUTOSROJOS,
    CHESTERFIELDPURPLE_FRUTOSROJOS_PRESENT,

    LMPURPLE_FRUTOSROJOS,
    LMPURPLE_FRUTOSROJOS_PRESENT,

    LMWARREGO_SANDIA,
    LMWARREGO_SANDIA_PRESENT
];
 
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
            gifus: gifus.value,
            MLBROJO: MLBROJO.value,
            MLBROJO_PRESENT: MLBROJO_PRESENT.value,
            MLBREDSELECTION: MLBREDSELECTION.value,
            MLBREDSELECTION_PRESENT: MLBREDSELECTION_PRESENT.value,
            PIELROJA: PIELROJA.value,
            PIELROJA_PRESENT: PIELROJA_PRESENT.value,
            CARIBE: CARIBE.value,
            CARIBE_PRESENT: CARIBE_PRESENT.value,
            LMAZUL: LMAZUL.value,
            LMAZUL_PRESENT: LMAZUL_PRESENT.value,
            LMROJO: LMROJO.value,
            LMROJO_PRESENT: LMROJO_PRESENT.value,
            MLBGOLD: MLBGOLD.value,
            MLBGOLD_PRESENT: MLBGOLD_PRESENT.value,
            CHESTERFIELDAZUL: CHESTERFIELDAZUL.value,
            CHESTERFIELDAZUL_PRESENT: CHESTERFIELDAZUL_PRESENT.value,
            CHESTERFIELDBLANCO: CHESTERFIELDBLANCO.value,
            CHESTERFIELDBLANCO_PRESENT: CHESTERFIELDBLANCO_PRESENT.value,
            LMSILVER: LMSILVER.value,
            LMSILVER_PRESENT: LMSILVER_PRESENT.value,
            CHESTERFIELDGREEN: CHESTERFIELDGREEN.value,
            CHESTERFIELDGREEN_PRESENT: CHESTERFIELDGREEN_PRESENT.value,
            MLBFUSION_FRUTOSROJOS: MLBFUSION_FRUTOSROJOS.value,
            MLBFUSION_FRUTOSROJOS_PRESENT: MLBFUSION_FRUTOSROJOS_PRESENT.value,
            MLBSUMMER_SANDIA: MLBSUMMER_SANDIA.value,
            MLBSUMMER_SANDIA_PRESENT: MLBSUMMER_SANDIA_PRESENT.value,
            MLBEXOTIC_TUTIFRUTI: MLBEXOTIC_TUTIFRUTI.value,
            MLBEXOTIC_TUTIFRUTI_PRESENT: MLBEXOTIC_TUTIFRUTI_PRESENT.value,
            CHESTERFIELDPURPLE_FRUTOSROJOS: CHESTERFIELDPURPLE_FRUTOSROJOS.value,
            CHESTERFIELDPURPLE_FRUTOSROJOS_PRESENT: CHESTERFIELDPURPLE_FRUTOSROJOS_PRESENT.value,
            LMPURPLE_FRUTOSROJOS: LMPURPLE_FRUTOSROJOS.value,
            LMPURPLE_FRUTOSROJOS_PRESENT: LMPURPLE_FRUTOSROJOS_PRESENT.value,
            LMWARREGO_SANDIA: LMWARREGO_SANDIA.value,
            LMWARREGO_SANDIA_PRESENT: LMWARREGO_SANDIA_PRESENT.value
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
                gifus: gifus.value,
                MLBROJO: MLBROJO.value,
                MLBROJO_PRESENT: MLBROJO_PRESENT.value,
                MLBREDSELECTION: MLBREDSELECTION.value,
                MLBREDSELECTION_PRESENT: MLBREDSELECTION_PRESENT.value,
                PIELROJA: PIELROJA.value,
                PIELROJA_PRESENT: PIELROJA_PRESENT.value,
                CARIBE: CARIBE.value,
                CARIBE_PRESENT: CARIBE_PRESENT.value,
                LMAZUL: LMAZUL.value,
                LMAZUL_PRESENT: LMAZUL_PRESENT.value,
                LMROJO: LMROJO.value,
                LMROJO_PRESENT: LMROJO_PRESENT.value,
                MLBGOLD: MLBGOLD.value,
                MLBGOLD_PRESENT: MLBGOLD_PRESENT.value,
                CHESTERFIELDAZUL: CHESTERFIELDAZUL.value,
                CHESTERFIELDAZUL_PRESENT: CHESTERFIELDAZUL_PRESENT.value,
                CHESTERFIELDBLANCO: CHESTERFIELDBLANCO.value,
                CHESTERFIELDBLANCO_PRESENT: CHESTERFIELDBLANCO_PRESENT.value,
                LMSILVER: LMSILVER.value,
                LMSILVER_PRESENT: LMSILVER_PRESENT.value,
                CHESTERFIELDGREEN: CHESTERFIELDGREEN.value,
                CHESTERFIELDGREEN_PRESENT: CHESTERFIELDGREEN_PRESENT.value,
                MLBFUSION_FRUTOSROJOS: MLBFUSION_FRUTOSROJOS.value,
                MLBFUSION_FRUTOSROJOS_PRESENT: MLBFUSION_FRUTOSROJOS_PRESENT.value,
                MLBSUMMER_SANDIA: MLBSUMMER_SANDIA.value,
                MLBSUMMER_SANDIA_PRESENT: MLBSUMMER_SANDIA_PRESENT.value,
                MLBEXOTIC_TUTIFRUTI: MLBEXOTIC_TUTIFRUTI.value,
                MLBEXOTIC_TUTIFRUTI_PRESENT: MLBEXOTIC_TUTIFRUTI_PRESENT.value,
                CHESTERFIELDPURPLE_FRUTOSROJOS: CHESTERFIELDPURPLE_FRUTOSROJOS.value,
                CHESTERFIELDPURPLE_FRUTOSROJOS_PRESENT: CHESTERFIELDPURPLE_FRUTOSROJOS_PRESENT.value,
                LMPURPLE_FRUTOSROJOS: LMPURPLE_FRUTOSROJOS.value,
                LMPURPLE_FRUTOSROJOS_PRESENT: LMPURPLE_FRUTOSROJOS_PRESENT.value,
                LMWARREGO_SANDIA: LMWARREGO_SANDIA.value,
                LMWARREGO_SANDIA_PRESENT: LMWARREGO_SANDIA_PRESENT.value
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
    // elems.forEach((elem) => {
    //     elem.value = "0";
    // });
}

// Events
btnStore.addEventListener('click', store);
btnReset.addEventListener('click', reset);

window.onload = mount();