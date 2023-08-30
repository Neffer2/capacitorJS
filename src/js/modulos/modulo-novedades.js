import * as CONSTANTS from'../constants/constants';
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
            return false;
        }
    }else{
        alert("Debes rellenar todos los campos");
    }
}

function fillPdv(){
    pdv.innerHTML = "<option value=''>Seleccionar</option>";
    switch(ciudad.value){
        case 'Bogota': 
            CONSTANTS.puntosBogota.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'Barranquilla': 
            CONSTANTS.puntosBarranquilla.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'Medellin': 
            CONSTANTS.puntosMedellin.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'Cali': 
            CONSTANTS.puntosCali.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'Manizales': 
            CONSTANTS.puntosManizales.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'Caldas': 
            CONSTANTS.puntosCaldas.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'Pereira': 
            CONSTANTS.puntosPereira.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'Cuba': 
            CONSTANTS.puntosCuba.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'SanJoaquin': 
            CONSTANTS.puntosSanJoaquin.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
        case 'VillaMaria': 
            CONSTANTS.puntosVillaMaria.forEach((item) => {
                pdv.innerHTML += `<option value="${item.cod}">${item.nom}</option>`;
            });
        break;
    }

    pdv.innerHTML += "<option value='OTRO'>OTRO</option>";
    showPdv();
}

function customPdv(){
    if (pdv.value === "OTRO"){
        hidePdv();
    }else {
        showPdv();
    }
}

function showPdv(){
    pdv.style.display = 'block';
    customPdvContainer.style.display = 'none';
}

function hidePdv(){
    pdv.value = "";
    pdv.style.display = 'none';
    customPdvContainer.style.display = 'block';        
}

async function syncM1 (id){    
    let dataModulo = [{
        id: id,
        pdv: pdv.value,
        token: CONSTANTS.generateToken(),
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
            volver();
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

function volver(){
    window.location.href = "index.html";
} 

// Events
store.addEventListener('click', storeNovedad);
btnReset.addEventListener('click', reset);

ciudad.addEventListener('change', fillPdv);
pdv.addEventListener('change', customPdv);