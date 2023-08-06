import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { CapacitorHttp } from '@capacitor/core';

export const STORAGE_KEYM1 = "modulo1";
export const STORAGE_PATHM1 = "PM1.txt";

export const API_LINK = "https://desarrolloiglu.com/api/";
export const API_AUTH = "https://desarrolloiglu.com/api/login";

let novedades = document.getElementById('novedades');
let email = document.getElementById('email'); 
let password = document.getElementById('password');

let elems = [email, password, novedades];


// Buttons
let store = document.getElementById('store');
let btnReset = document.getElementById('reset');

async function storeNovedad(){
    if (validation()){
        let dataModulo = {
            email: email.value,
            password: password.value
        };

        try {
            const options = {
            url: API_AUTH,
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                data: dataModulo, 
            }
            
            const response = await CapacitorHttp.post(options);
            if (response.data.status){
                syncM1(response.data.id);

            }else {
                alert("Usuario no encontrado");
            }
        }catch(error){
            console.log(error);
            return false;
        }
    }else{
        alert("Usuario no encontrado");
    }
}

async function syncM1 (id){    
    let dataModulo = [{
        id: id,
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
}

// Events
store.addEventListener('click', storeNovedad);
btnReset.addEventListener('click', reset);