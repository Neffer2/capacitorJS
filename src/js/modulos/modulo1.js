import { Camera, CameraResultType } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const STORAGE_KEY = "modulo1";
export const STORAGE_PATH = "PM1.txt";

// Elems
let marca = document.getElementById('marca');
let ciudad = document.getElementById('ciudad');
let pdv = document.getElementById('pdv');
let mes = document.getElementById('mes');
let semana = document.getElementById('semana');
let selfiePDV = document.getElementById('selfiePDV');
let fotoFachada = document.getElementById('fotoFachada');

let selfiePDVBox = document.getElementById('selfiePDVBox');
let fotoFachadaBox = document.getElementById('fotoFachadaBox');

// BUTTONS
let btnStore = document.getElementById('store');
let btnReset = document.getElementById('reset');

let elems = [marca, ciudad, pdv, mes, semana];
let photos = [selfiePDV, fotoFachada];

async function store (){
    if (validation()){        
        let dataModulo1 = [{
            id: 0,
            marca: marca.value,
            ciudad: ciudad.value,
            pdv: pdv.value,
            mes: mes.value,
            semana: semana.value,
            selfiePDV: selfiePDV.src,
            fotoFachada: fotoFachada.src,
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

            dataModulo1 = JSON.parse(data);
            console.log(dataModulo1);
            dataModulo1.push({
                id: 0,
                marca: marca.value,
                ciudad: ciudad.value,
                pdv: pdv.value,
                mes: mes.value,
                semana: semana.value,
                selfiePDV: selfiePDV.src,
                fotoFachada: fotoFachada.src,
            });
        }else {
            await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify({path: STORAGE_PATH}) });
        }

        appendData(STORAGE_PATH, dataModulo1);
    }else {
        alert("Debes rellenar todos los campos");
    }
}

async function appendData(src, data){
    await Filesystem.writeFile({
        path: src,
        data: JSON.stringify(data),
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
    });

    reset();
    vibrate();
}

const pdvPicture = async () => {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64
    }); 

    var image64 = image.base64String;

    selfiePDV.src = `data:image/png;base64,${image64}`;
    selfiePDVBox.style.display = "none";
    selfiePDV.style.display = "block";
};

const fachadaPicture = async () => {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64
    }); 

    var image64 = image.base64String;

    fotoFachada.src = `data:image/png;base64,${image64}`;
    fotoFachadaBox.style.display = "none";
    fotoFachada.style.display = "block";
};

function validation (){
    let validator = true;

    elems.forEach((elem) => {
        if (elem.value === ""){
            validator = false;
        }
    });

    photos.forEach((elem) => {
        if (elem.src === ""){
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

    photos.forEach((elem) => {
        elem.src = "";        
    });

    fotoFachadaBox.style.display = "block";
    selfiePDVBox.style.display = "block";
}

// Events
btnStore.addEventListener('click', store);
btnReset.addEventListener('click', reset);

selfiePDVBox.addEventListener('click', pdvPicture);
fotoFachadaBox.addEventListener('click', fachadaPicture);