import * as CONSTANTS from'./constants/constants';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { CapacitorHttp } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Alert } from 'bootstrap';
import { Geolocation } from '@capacitor/geolocation';

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

// LOGS
let error = document.getElementById('error');
 
// BUTTONS
let sync = document.getElementById('sync-action');
let btnReset = document.getElementById('reset');

async function mount(){     
    loadOn();

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
                        alert("!Opps, hubo un problema con tu ubicación. Iténtalo de nuevo.");1
                        loadOff();
                    }
                }else {
                    alert("Usuario no encontrado");
                    loadOff();
                }
        }catch(error){
            alert("Error, activa la ubicación de tu teléfono");
            // alert(error);
            loadOff();
            return false;
        }
    }else{
        alert("Debes rellenar todos los campos");
        loadOff();
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

async function syncM1 (id, latitude, longitude, newToken = null){
    try {
        const { data } = await Filesystem.readFile({
            path: CONSTANTS.STORAGE_PATHM1,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });

        let dataModulo = JSON.parse(data);

        // Inserto datos extra
        dataModulo.forEach((item) => {
            item.id = id;
            item.foto_cierre = selfiePDV.src;
            item.latitude = latitude;
            item.longitude = longitude; 
            if (token){ /* console.log("Se cambia: "+item.token+" por: "+newToken); */ item.token = newToken; }
        });
        
        // Globals
        pdv = dataModulo[0].pdv;
        token = dataModulo[0].token;
        
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
            // Token repetido   
            if (response.data.status === 'error'){
                syncM1(id, latitude, longitude, CONSTANTS.generateToken());
                return false;
            }        

            if (response.status == 200){
                syncM2(id);
                // alert("Módulo Ejecución de la actividad sincronizado con éxito.");    
            }else {
                console.log(response)
                loadOff();
                alert("Opps! hubo un problema en el Módulo Ejecución de la actividad.");    
            }
        }else {
            loadOff();
            alert("Nada que sincronizar en el Módulo Ejecución de la actividad.");    
        }
    }catch(error){
        loadOff();
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
                syncM3(id);
                // alert("Módulo Ventas abordaje sincronizado con éxito.");    
            }else {
                loadOff();
                alert("Opps! hubo un problema en el Módulo Ventas abordaje.");    
            }
        }else {
            loadOff();
            alert("Nada que sincronizar en módulo Ventas abordaje.");    
        }
    }catch(error){
        loadOff();
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
                syncM4(id);
                // alert("Módulo Visivilidad de producto sincronizado con éxito.");    
            }else {
                loadOff();
                alert("Opps! hubo un problema en el Módulo Visivilidad");
            }
        }else {
            loadOff();
            alert("Nada que sincronizar en el módulo Visivilidad.");    
        }
    }catch(error){
        loadOff();
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
                // alert("Módulo Disponibilidad de producto sincronizado con éxito.");    
                await deleteData(CONSTANTS.STORAGE_PATHM1);
                await deleteData(CONSTANTS.STORAGE_PATHM2);
                await deleteData(CONSTANTS.STORAGE_PATHM3);
                await deleteData(CONSTANTS.STORAGE_PATHM4);
                await deleteData(CONSTANTS.STORAGE_VENTAS);
                await deleteData(CONSTANTS.STORAGE_ABORDADOS);
                await deleteData(CONSTANTS.STORAGE_GIFUS);
                alert("Sincronización éxitosa.");    
                reset();
            }else {
                loadOff();
                alert("Opps! hubo un problema en el Módulo Disponibilidad de producto");
            }
        }else {
            loadOff();
            alert("Nada que sincronizar en el módulo Disponibilidad de producto.");    
        }
    }catch(error){
        loadOff();
        alert("No existe el módulo Disponibilidad de producto");
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

function loadOn(){
    document.getElementById('loading-container').style.display = "flex";
    document.getElementById('main-content').style.display = "none";
}

function loadOff(){
    document.getElementById('loading-container').style.display = "none";
    document.getElementById('main-content').style.display = "block";
}

// Events
sync.addEventListener('click', mount);
btnReset.addEventListener('click', reset);
selfiePDVBox.addEventListener('click', picture);