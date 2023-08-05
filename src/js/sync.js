import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { CapacitorHttp } from '@capacitor/core';

export const STORAGE_KEYM1 = "modulo1";
export const STORAGE_PATHM1 = "PM1.txt"

export const STORAGE_KEYM2 = "modulo2";
export const STORAGE_PATHM2 = "PM2.txt"

export const STORAGE_KEYM3 = "modulo3";
export const STORAGE_PATHM3 = "PM3.txt"

export const STORAGE_KEYM4 = "modulo4";
export const STORAGE_PATHM4 = "PM4.txt"

export const API_LINK = "http://localhost:8000/api/"


// Buttons
let sync = document.getElementById('sync-action');

function mount(){
    syncM1();
    syncM2();
    syncM3();
    syncM4();
}

async function syncM1 (){
    try {
        const { data } = await Filesystem.readFile({
            path: STORAGE_PATHM1,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });

        let dataModulo = JSON.parse(data);
        
        if (dataModulo.length){
            const options = {
                url: `${API_LINK}insertM1`,
                headers: { 
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                 },
                data: dataModulo,
            };
            
            const response = await CapacitorHttp.post(options);
            if (response.status == 200){
                deleteData(STORAGE_PATHM1);
                alert("Módulo Ejecución de la actividad sincronizado con éxito.");    
            }else {
                alert("Opps! hubo un problema en el Módulo Ejecución de la actividad.");    
            }
        }else {
            alert("Nada que sincronizar en el Módulo Ejecución de la actividad.");    
        }
    }catch(error){
        console.log(error)
        alert("No existe el módulo Ejecución de la actividad");
    }
}

async function syncM2 (){ 
    try {
        const { data } = await Filesystem.readFile({
            path: STORAGE_PATHM2,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });

        let dataModulo = JSON.parse(data);
        
        if (dataModulo.length){
            const options = {
                url: `${API_LINK}insertM2`,
                headers: { 
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                 },
                data: dataModulo,
            };
            
            const response = await CapacitorHttp.post(options);
            if (response.status == 200){
                deleteData(STORAGE_PATHM2);
                alert("Módulo Ventas abordaje sincronizado con éxito.");    
            }else {
                alert("Opps! hubo un problema en el Módulo Ventas abordaje.");    
            }
        }else {
            alert("Nada que sincronizar en módulo Ventas abordaje.");    
        }
    }catch(error){
        console.log(error)
        alert("No existe el módulo Ventas abordaje");
    }
}
  
async function syncM3 (){
    try {
        const { data } = await Filesystem.readFile({
            path: STORAGE_PATHM3,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });

        let dataModulo = JSON.parse(data);
        
        if (dataModulo.length){
            const options = {
                url: `${API_LINK}insertM3`,
                headers: { 
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                 },
                data: dataModulo,
            };
            
            const response = await CapacitorHttp.post(options);
            if (response.status == 200){
                deleteData(STORAGE_PATHM3);
                alert("Módulo Competencia de producto sincronizado con éxito.");    
            }else {
                alert("Opps! hubo un problema en el Módulo Competencia");
            }
        }else {
            alert("Nada que sincronizar en el módulo Competencia.");    
        }
    }catch(error){
        console.log(error)
        alert("No existe el módulo Competencia");
    }
}

async function syncM4 (){
    try {
        const { data } = await Filesystem.readFile({
            path: STORAGE_PATHM4,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });

        let dataModulo = JSON.parse(data);
        
        if (dataModulo.length){
            const options = {
                url: `${API_LINK}insertM4`,
                headers: { 
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                 },
                data: dataModulo,
            };
            
            const response = await CapacitorHttp.post(options);
            if (response.status == 200){
                deleteData(STORAGE_PATHM4);
                alert("Módulo Disponibilidad de producto sincronizado con éxito.");    
            }else {
                alert("Opps! hubo un problema en el Módulo Disponibilidad de producto");
            }
        }else {
            alert("Nada que sincronizar en el módulo Disponibilidad de producto.");    
        }
    }catch(error){
        console.log(error)
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

// Events
sync.addEventListener('click', mount);