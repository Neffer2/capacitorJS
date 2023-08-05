import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const STORAGE_KEY = "modulo1";
export const STORAGE_PATH = "PM1.txt";
const QUALITY = 30;

// Elems
let marca = document.getElementById('marca'); 
let ciudad = document.getElementById('ciudad');
let pdv = document.getElementById('pdv');
let fechaVisita = document.getElementById('fechaVisita');
let mes = document.getElementById('mes');
let semana = document.getElementById('semana');
let estrato = document.getElementById('estrato');
let barrio = document.getElementById('barrio');
let selfiePDV = document.getElementById('selfiePDV');
let fotoFachada = document.getElementById('fotoFachada');

let selfiePDVBox = document.getElementById('selfiePDVBox');
let fotoFachadaBox = document.getElementById('fotoFachadaBox');

// BUTTONS
let btnStore = document.getElementById('store');
let btnReset = document.getElementById('reset');

let elems = [marca, ciudad, pdv, fechaVisita, mes, semana, estrato, barrio];
let photos = [selfiePDV, fotoFachada];

async function store (){
    if (validation()){
        let dataModulo = [{
            id: 0,
            marca: marca.value,
            ciudad: ciudad.value,
            pdv: pdv.value,
            fechaVisita: fechaVisita.value,
            mes: mes.value,
            semana: semana.value,
            estrato: estrato.value,
            barrio: barrio.value.toUpperCase(),
            selfiePDV: selfiePDV.src,
            fotoFachada: fotoFachada.src,
            novedades: null
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
                marca: marca.value,
                ciudad: ciudad.value,
                pdv: pdv.value,
                fechaVisita: fechaVisita.value,
                mes: mes.value,
                semana: semana.value,
                estrato: estrato.value,
                barrio: barrio.value.toUpperCase(),
                selfiePDV: selfiePDV.src,
                fotoFachada: fotoFachada.src,
                novedades: null
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

const pdvPicture = async () => {
    const image = await Camera.getPhoto({
        quality: QUALITY,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
    }); 

    var image64 = image.base64String;

    selfiePDV.src = `data:image/png;base64,${image64}`;
    selfiePDV.style.display = "block";
    selfiePDVBox.style.display = "none";
};

const fachadaPicture = async () => {
    const image = await Camera.getPhoto({
        quality: QUALITY,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
    }); 

    var image64 = image.base64String;

    fotoFachada.src = `data:image/png;base64,${image64}`;
    fotoFachada.style.display = "block";
    fotoFachadaBox.style.display = "none";
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
        elem.removeAttribute('src'); 
    });

    fotoFachadaBox.style.display = "block";
    selfiePDVBox.style.display = "block";
}

// Events
btnStore.addEventListener('click', store);
btnReset.addEventListener('click', reset);

selfiePDVBox.addEventListener('click', pdvPicture);
fotoFachadaBox.addEventListener('click', fachadaPicture);