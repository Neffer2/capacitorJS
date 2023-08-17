import * as CONSTANTS from'../constants/constants';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { CapacitorHttp } from '@capacitor/core';

let novedades = document.getElementById('novedades');
let email = document.getElementById('email'); 
let password = document.getElementById('password');
let pdv = document.getElementById('pdv');

let elems = [email, password, pdv, novedades]; 

// Buttons
let store = document.getElementById('store');
let btnReset = document.getElementById('reset');

async function storeNovedad(){
    if (validation()){
        // Login
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
                syncM1(response.data.id); 
            }else {
                alert("Usuario no encontrado");
            }
        }catch(error){
            console.log(error);
            return false;
        }
    }else{
        alert("Debes rellenar todos los campos");
    }
}

async function syncM1 (id){    
    let dataModulo = [{
        id: id,
        pdv: pdv.value,
        token: null,
        novedades: novedades.value,    
    }]; 

    try {
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
            alert("Novedad reportada con éxito.");
            reset();
        }else {
            alert("Opps! hubo un problema verifique su conexión.");    
        }
    }catch(error){
        console.log(error);
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