import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { CapacitorHttp } from '@capacitor/core';

export const STORAGE_KEYM1 = "modulo1";
export const STORAGE_PATHM1 = "PM1.txt"

export const API_LINK = "http://localhost:8000/api/"


// Buttons
let store = document.getElementById('store');
let novedades = document.getElementById('novedades');

async function syncM1 (){
    let dataModulo = [{
        novedades: novedades.value,
    }]; 

    try {
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
            alert("Novedad reportada con éxito.");    
        }else {
            alert("Opps! hubo un problema verifique su conexión.");    
        }
    }catch(error){
        alert("Opps! hubo un problema verifique su conexión.");    
    }
}

// Events
store.addEventListener('click', syncM1);