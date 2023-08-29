import * as CONSTANTS from'../constants/constants';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

let sync = document.getElementById('sync');
let btnVolver = document.getElementById('volver');
let btnAndroid = document.getElementById('android');
let btnApple = document.getElementById('apple');

async function depurar(){
    try{
        await Filesystem.deleteFile({
          path: CONSTANTS.STORAGE_PATHM1,
          directory: Directory.Documents, 
        });
        alert("Modulo 1 depurado con éxito");
    }catch(error){}

    try{
        await Filesystem.deleteFile({
            path: CONSTANTS.STORAGE_PATHM2,
            directory: Directory.Documents,
        });

        alert("Modulo 2 depurado con éxito");
    }catch(error){}

    try {
        await Filesystem.deleteFile({
            path: CONSTANTS.STORAGE_VENTAS,
            directory: Directory.Documents,
        });
    }catch(error){}

    try {
        await Filesystem.deleteFile({
            path: CONSTANTS.STORAGE_ABORDADOS,
            directory: Directory.Documents,
        });
    }catch(error){}

    try {
        await Filesystem.deleteFile({
            path: CONSTANTS.STORAGE_GIFUS,
            directory: Directory.Documents,
        });
    }catch(error){}

    try{
        await Filesystem.deleteFile({
            path: CONSTANTS.STORAGE_PATHM3,
            directory: Directory.Documents,
        });
        alert("Modulo 3 depurado con éxito");
    }catch(error){}

    try{
        await Filesystem.deleteFile({
            path: CONSTANTS.STORAGE_PATHM4,
            directory: Directory.Documents,
        });
        alert("Modulo 4 depurado con éxito");
    }catch(error){}
               
    alert("Depuración exitosa");
    enableUpdates();
}

function enableUpdates(){
    btnAndroid.disabled = false;
    btnApple.disabled = false;
}

function volver(){
    window.location.href = "index.html";
}

function updateAndroid(){
    window.location.href = "https://portalempleo.com.co/Philip-morris-android";
}

function updateApple(){
    window.location.href = "https://portalempleo.com.co/Philip-morris-IOS";
}

// Events
sync.addEventListener('click', depurar);
btnVolver.addEventListener('click', volver);

btnAndroid.addEventListener('click', updateAndroid);
btnApple.addEventListener('click', updateApple);