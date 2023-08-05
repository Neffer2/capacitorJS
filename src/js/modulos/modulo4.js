import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const STORAGE_KEY = "modulo4";
export const STORAGE_PATH = "PM4.txt";

// Elems
let presente = document.getElementById('presente');

let LMBLUE = document.getElementById('LMBLUE');
let LMPURPLE = document.getElementById('LMPURPLE');
let LMRED = document.getElementById('LMRED');
let LMSILVER = document.getElementById('LMSILVER');
let LMWARREGO = document.getElementById('LMWARREGO');
let LUCKYSTRIKEBLUE10 = document.getElementById('LUCKYSTRIKEBLUE10');
let LUCKYSTRIKEBLUE20 = document.getElementById('LUCKYSTRIKEBLUE20');
let LUCKYSTRIKEFEST10 = document.getElementById('LUCKYSTRIKEFEST10');
let LUCKYSTRIKEFEST20 = document.getElementById('LUCKYSTRIKEFEST20');
let LUCKYSTRIKEGIN10 = document.getElementById('LUCKYSTRIKEGIN10');
let LUCKYSTRIKEGIN20 = document.getElementById('LUCKYSTRIKEGIN20');
let LUCKYSTRIKEMOJITO10 = document.getElementById('LUCKYSTRIKEMOJITO10');
let LUCKYSTRIKEMOJITO20 = document.getElementById('LUCKYSTRIKEMOJITO20');
let ROTHMANSAZUL10 = document.getElementById('ROTHMANSAZUL10');
let ROTHMANSAZUL20 = document.getElementById('ROTHMANSAZUL20');
let ROTHMANSVERDE10 = document.getElementById('ROTHMANSVERDE10');
let ROTHMANSVERDE20 = document.getElementById('ROTHMANSVERDE20');
let ROTHMANSBLANCO10 = document.getElementById('ROTHMANSBLANCO10');
let ROTHMANSBLANCO20 = document.getElementById('ROTHMANSBLANCO20');
let ROTHMANSPURPLE10 = document.getElementById('ROTHMANSPURPLE10');
let ROTHMANSPURPLE20 = document.getElementById('ROTHMANSPURPLE20');
let STARLITE10 = document.getElementById('STARLITE10');
let STARLITE20 = document.getElementById('STARLITE20');
let MALBOROROJO = document.getElementById('MALBOROROJO');
let MALBOROVERDE = document.getElementById('MALBOROVERDE');
let MALBOROAZUL = document.getElementById('MALBOROAZUL');
let CHESTERFIELDPURPLE10 = document.getElementById('CHESTERFIELDPURPLE10');
let CHESTERFIELDPURPLE20 = document.getElementById('CHESTERFIELDPURPLE20');
let CHESTERFIELDGREEN10 = document.getElementById('CHESTERFIELDGREEN10');
let CHESTERFIELDGREEN20 = document.getElementById('CHESTERFIELDGREEN20');
let CHESTERFIELDBLUE10 = document.getElementById('CHESTERFIELDBLUE10');
let CHESTERFIELDBLUE20 = document.getElementById('CHESTERFIELDBLUE10');


// BUTTONS
let btnStore = document.getElementById('store');
let btnReset = document.getElementById('reset');
 
let elems = [presente,
    LMBLUE,
    LMPURPLE,
    LMRED,
    LMSILVER,
    LMWARREGO,
    LUCKYSTRIKEBLUE10,
    LUCKYSTRIKEBLUE20,
    LUCKYSTRIKEFEST10,
    LUCKYSTRIKEFEST20,
    LUCKYSTRIKEGIN10,
    LUCKYSTRIKEGIN20,
    LUCKYSTRIKEMOJITO10,
    LUCKYSTRIKEMOJITO20,
    ROTHMANSAZUL10,
    ROTHMANSAZUL20,
    ROTHMANSVERDE10,
    ROTHMANSVERDE20,
    ROTHMANSBLANCO10,
    ROTHMANSBLANCO20,
    ROTHMANSPURPLE10,
    ROTHMANSPURPLE20,
    STARLITE10,
    STARLITE20,
    MALBOROROJO,
    MALBOROVERDE,
    MALBOROAZUL,
    CHESTERFIELDPURPLE10,
    CHESTERFIELDPURPLE20,
    CHESTERFIELDGREEN10,
    CHESTERFIELDGREEN20,
    CHESTERFIELDBLUE10,
    CHESTERFIELDBLUE20];
 
async function store (){
    if (validation()){
        let dataModulo = [{
            id: 0,
            presente: presente.value,
            LMBLUE: LMBLUE.value,
            LMPURPLE: LMPURPLE.value,
            LMRED: LMRED.value,
            LMSILVER: LMSILVER.value,
            LMWARREGO: LMWARREGO.value,
            LUCKYSTRIKEBLUE10: LUCKYSTRIKEBLUE10.value,
            LUCKYSTRIKEBLUE20: LUCKYSTRIKEBLUE20.value,
            LUCKYSTRIKEFEST10: LUCKYSTRIKEFEST10.value,
            LUCKYSTRIKEFEST20: LUCKYSTRIKEFEST20.value,
            LUCKYSTRIKEGIN10: LUCKYSTRIKEGIN10.value,
            LUCKYSTRIKEGIN20: LUCKYSTRIKEGIN20.value,
            LUCKYSTRIKEMOJITO10: LUCKYSTRIKEMOJITO10.value,
            LUCKYSTRIKEMOJITO20: LUCKYSTRIKEMOJITO20.value,
            ROTHMANSAZUL10: ROTHMANSAZUL10.value,
            ROTHMANSAZUL20: ROTHMANSAZUL20.value,
            ROTHMANSVERDE10: ROTHMANSVERDE10.value,
            ROTHMANSVERDE20: ROTHMANSVERDE20.value,
            ROTHMANSBLANCO10: ROTHMANSBLANCO10.value,
            ROTHMANSBLANCO20: ROTHMANSBLANCO20.value,
            ROTHMANSPURPLE10: ROTHMANSPURPLE10.value,
            ROTHMANSPURPLE20: ROTHMANSPURPLE20.value,
            STARLITE10: STARLITE10.value,
            STARLITE20: STARLITE20.value,
            MALBOROROJO: MALBOROROJO.value,
            MALBOROVERDE: MALBOROVERDE.value,
            MALBOROAZUL: MALBOROAZUL.value,
            CHESTERFIELDPURPLE10: CHESTERFIELDPURPLE10.value,
            CHESTERFIELDPURPLE20: CHESTERFIELDPURPLE20.value,
            CHESTERFIELDGREEN10: CHESTERFIELDGREEN10.value,
            CHESTERFIELDGREEN20: CHESTERFIELDGREEN20.value,
            CHESTERFIELDBLUE10: CHESTERFIELDBLUE10.value,
            CHESTERFIELDBLUE20: CHESTERFIELDBLUE20.value              
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
                LMBLUE: LMBLUE.value,
                LMPURPLE: LMPURPLE.value,
                LMRED: LMRED.value,
                LMSILVER: LMSILVER.value,
                LMWARREGO: LMWARREGO.value,
                LUCKYSTRIKEBLUE10: LUCKYSTRIKEBLUE10.value,
                LUCKYSTRIKEBLUE20: LUCKYSTRIKEBLUE20.value,
                LUCKYSTRIKEFEST10: LUCKYSTRIKEFEST10.value,
                LUCKYSTRIKEFEST20: LUCKYSTRIKEFEST20.value,
                LUCKYSTRIKEGIN10: LUCKYSTRIKEGIN10.value,
                LUCKYSTRIKEGIN20: LUCKYSTRIKEGIN20.value,
                LUCKYSTRIKEMOJITO10: LUCKYSTRIKEMOJITO10.value,
                LUCKYSTRIKEMOJITO20: LUCKYSTRIKEMOJITO20.value,
                ROTHMANSAZUL10: ROTHMANSAZUL10.value,
                ROTHMANSAZUL20: ROTHMANSAZUL20.value,
                ROTHMANSVERDE10: ROTHMANSVERDE10.value,
                ROTHMANSVERDE20: ROTHMANSVERDE20.value,
                ROTHMANSBLANCO10: ROTHMANSBLANCO10.value,
                ROTHMANSBLANCO20: ROTHMANSBLANCO20.value,
                ROTHMANSPURPLE10: ROTHMANSPURPLE10.value,
                ROTHMANSPURPLE20: ROTHMANSPURPLE20.value,
                STARLITE10: STARLITE10.value,
                STARLITE20: STARLITE20.value,
                MALBOROROJO: MALBOROROJO.value,
                MALBOROVERDE: MALBOROVERDE.value,
                MALBOROAZUL: MALBOROAZUL.value,
                CHESTERFIELDPURPLE10: CHESTERFIELDPURPLE10.value,
                CHESTERFIELDPURPLE20: CHESTERFIELDPURPLE20.value,
                CHESTERFIELDGREEN10: CHESTERFIELDGREEN10.value,
                CHESTERFIELDGREEN20: CHESTERFIELDGREEN20.value,
                CHESTERFIELDBLUE10: CHESTERFIELDBLUE10.value,
                CHESTERFIELDBLUE20: CHESTERFIELDBLUE20.value              
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
        elem.value = "0";
    });
}

// Events
btnStore.addEventListener('click', store);
btnReset.addEventListener('click', reset);