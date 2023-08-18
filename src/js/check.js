import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import * as CONSTANTS from'./constants/constants';

let modulo1 = document.getElementById('modulo1');
let checkboxM1 = document.getElementById('checkboxM1'); 

let modulo2 = document.getElementById('modulo2');
let checkboxM2 = document.getElementById('checkboxM2'); 

let modulo3 = document.getElementById('modulo3');
let checkboxM3 = document.getElementById('checkboxM3'); 

let modulo4 = document.getElementById('modulo4');
let checkboxM4 = document.getElementById('checkboxM4'); 

let sync = document.getElementById('sync');

function mount() {
    checkModulo1();
    checkModulo2();
    checkModulo3();
    checkModulo4();
}

async function checkModulo1(){
    try {
        const { data } = await Filesystem.readFile({
            path: CONSTANTS.STORAGE_PATHM1,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });
         
        let dataModulo = JSON.parse(data);
        if (dataModulo.length){
            disableModulo(modulo1, checkboxM1);
        }
    }catch(error){
        return true;
    }
}

async function checkModulo2(){
    try {
        const { data } = await Filesystem.readFile({
            path: CONSTANTS.STORAGE_PATHM2,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });
        
        let dataModulo = JSON.parse(data);
        if (dataModulo.length){
            disableModulo(modulo2, checkboxM2);
        }
    }catch(error){
        return true;
    }
}

async function checkModulo3(){
    try {
        const { data } = await Filesystem.readFile({
            path: CONSTANTS.STORAGE_PATHM3,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });
        
        let dataModulo = JSON.parse(data);
        if (dataModulo.length){
            disableModulo(modulo3, checkboxM3);
        }
    }catch(error){
        return true;
    }
}

async function checkModulo4(){
    try {
        const { data } = await Filesystem.readFile({
            path: CONSTANTS.STORAGE_PATHM4,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });
        
        let dataModulo = JSON.parse(data);
        if (dataModulo.length){
            disableModulo(modulo4, checkboxM4);
        }
    }catch(error){
        return true;
    }
}

function enableSync(){
    if (checkboxM1.checked && checkboxM2.checked && checkboxM3.checked && checkboxM4.checked){
        sync.href = "sync.html";
    }else {
        sync.href = "#";
    } 
}

function disableModulo(modulo, checkbox){
    modulo.href = "#";
    checkbox.checked = true;
    enableSync();
}

// window.onload = mount;

window.addEventListener("DOMContentLoaded", function() {
    mount()
});