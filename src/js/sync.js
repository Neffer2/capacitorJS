import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { CapacitorHttp } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Alert } from 'bootstrap';
import { Geolocation } from '@capacitor/geolocation';
import * as CONSTANTS from'./constants/constants';

// GLOBALS
let pdv = "";
let token = "";

// Elems
let email = document.getElementById('email'); 
let password = document.getElementById('password');

let selfiePDV = document.getElementById('selfiePDV');
let selfiePDVBox = document.getElementById('selfiePDVBox');

let elems = [email, password];
let photos = [selfiePDV];  
 
// BUTTONS
let sync = document.getElementById('sync-action');
let btnReset = document.getElementById('reset');

async function mount(){             
    if (validation()){
        let dataModulo = {
            email: email.value,
            password: password.value
        };
    
        try {
            const options = {
                url: CONSTANTS.API_AUTH,
                headers: { 
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                 },
                 data: dataModulo, 
                }
                 
                const response = await CapacitorHttp.post(options);
                if (response.data.status){
                    const coordinates = await Geolocation.getCurrentPosition();
                    if (coordinates.coords.latitude && coordinates.coords.longitude){
                        syncM1(response.data.id, coordinates.coords.latitude, coordinates.coords.longitude);
                    }else{ 
                        alert("!Opps, hubo un problema con tu ubicación. Iténtalo de nuevo.");
                    }
                }else {
                    alert("Usuario no encontrado");
                }
        }catch(error){
            return false;
        }
    }else{
        alert("Debes rellenar todos los campos");
    }
}

const picture = async () => {
    const image = await Camera.getPhoto({
        quality: CONSTANTS.QUALITY,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
    }); 

    var image64 = image.base64String;

    selfiePDV.src = `data:image/png;base64,${image64}`;
    selfiePDV.style.display = "block";
    selfiePDVBox.style.display = "none";
}; 

async function syncM1 (id, latitude, longitude){
    try {
        const { data } = await Filesystem.readFile({
            path: CONSTANTS.STORAGE_PATHM1,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });

        let dataModulo = JSON.parse(data);
        pdv = dataModulo[0].pdv;
        token = dataModulo[0].token;

        // Inserto datos extra
        dataModulo.forEach((item) => {
            item.id = id;
            item.foto_cierre = selfiePDV.src;
            item.latitude = latitude;
            item.longitude = longitude;
        });
        
        if (dataModulo.length){
            const options = {
                url: `${CONSTANTS.API_LINK}insertM1`,
                headers: { 
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                 },
                data: dataModulo,
            };
            
            const response = await CapacitorHttp.post(options);
            if (response.status == 200){
                deleteData(CONSTANTS.STORAGE_PATHM1);
                syncM2(id);
                alert("Módulo Ejecución de la actividad sincronizado con éxito.");    
            }else {
                alert("Opps! hubo un problema en el Módulo Ejecución de la actividad.");    
            }
        }else {
            alert("Nada que sincronizar en el Módulo Ejecución de la actividad.");    
        }
    }catch(error){
        console.log(error);
        alert("No existe el módulo Ejecución de la actividad");
    }
}

async function syncM2 (id){ 
    try {
        const { data } = await Filesystem.readFile({
            path: CONSTANTS.STORAGE_PATHM2,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        }); 

        let dataModulo = JSON.parse(data);

        dataModulo.forEach((item) => {
            item.id = id,
            item.pdv = pdv,
            item.token = token
        });
        
        if (dataModulo.length){
            const options = {
                url: `${CONSTANTS.API_LINK}insertM2`,
                headers: { 
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                 },
                data: dataModulo,
            };
            
            const response = await CapacitorHttp.post(options);
            if (response.status == 200){
                deleteData(CONSTANTS.STORAGE_PATHM2);
                syncM3(id);
                alert("Módulo Ventas abordaje sincronizado con éxito.");    
            }else {
                alert("Opps! hubo un problema en el Módulo Ventas abordaje.");    
            }
        }else {
            alert("Nada que sincronizar en módulo Ventas abordaje.");    
        }
    }catch(error){
        alert("No existe el módulo Ventas abordaje");
    }
}
  
async function syncM3 (id){
    try {
        const { data } = await Filesystem.readFile({
            path: CONSTANTS.STORAGE_PATHM3,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });

        let dataModulo = JSON.parse(data);

        dataModulo.forEach((item) => {
            item.id = id,
            item.pdv = pdv,
            item.token = token
        });
        
        if (dataModulo.length){
            const options = {
                url: `${CONSTANTS.API_LINK}insertM3`,
                headers: { 
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                 },
                data: dataModulo,
            };
            
            const response = await CapacitorHttp.post(options);
            if (response.status == 200){
                deleteData(CONSTANTS.STORAGE_PATHM3);
                syncM4(id);
                alert("Módulo Visivilidad de producto sincronizado con éxito.");    
            }else {
                alert("Opps! hubo un problema en el Módulo Visivilidad");
            }
        }else {
            alert("Nada que sincronizar en el módulo Visivilidad.");    
        }
    }catch(error){
        alert("No existe el módulo Visivilidad");
    }
}

async function syncM4(id){
    try {
        const { data } = await Filesystem.readFile({
            path: CONSTANTS.STORAGE_PATHM4,
            directory: Directory.Documents,
            encoding: Encoding.UTF8, 
        });

        let dataModulo = JSON.parse(data);

        dataModulo.forEach((item) => {
            item.id = id,
            item.pdv = pdv,
            item.token = token
        });
        
        if (dataModulo.length){
            const options = {
                url: `${CONSTANTS.API_LINK}insertM4`,
                headers: { 
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                 },
                data: dataModulo,
            };
            
            const response = await CapacitorHttp.post(options);
            if (response.status == 200){
                deleteData(CONSTANTS.STORAGE_PATHM4);
                syncM5(id);
                alert("Módulo Disponibilidad de producto sincronizado con éxito.");    
            }else {
                alert("Opps! hubo un problema en el Módulo Disponibilidad de producto");
            }
        }else {
            alert("Nada que sincronizar en el módulo Disponibilidad de producto.");    
        }
    }catch(error){
        alert("No existe el módulo Disponibilidad de producto");
    }
} 

async function syncM5(id){ 
    try {
        const { data } = await Filesystem.readFile({
            path: CONSTANTS.STORAGE_PATHM5,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });

        let dataModulo = JSON.parse(data);
        
        dataModulo.forEach((item) => {
            item.id = id,
            item.pdv = pdv,
            item.token = token
        });

        if (dataModulo.length){
            const options = {
                url: `${CONSTANTS.API_LINK}insertM5`,
                headers: { 
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                 },
                data: dataModulo,
            };
            
            const response = await CapacitorHttp.post(options);
            if (response.status == 200){
                deleteData(CONSTANTS.STORAGE_PATHM5);
                alert("Módulo Shpoping de precios sincronizado con éxito.");   
                reset(); 
            }else {
                alert("Opps! hubo un problema en el Shpoping de precios.");    
            }
        }else {
            alert("Nada que sincronizar en módulo Shpoping de precios.");    
        }
    }catch(error){
        alert("No existe el módulo Shpoping de precios.");
    }
}

async function deleteData(src){
    try {
        await Filesystem.writeFile({
            path: src,
            data: JSON.stringify([]),
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });    
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

    photos.forEach((elem) => {
        if (elem.src === ""){
            validator = false;
        }
    });

    return validator;
} 

function reset(){
    window.location.href = "index.html";
}

// Events
sync.addEventListener('click', mount);
btnReset.addEventListener('click', reset);
selfiePDVBox.addEventListener('click', picture);