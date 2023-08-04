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

// Buttons
let sync = document.getElementById('sync-action');

function mount(){
    // syncM1();
    syncM2();
    // syncM3();
    // syncM4();
}

async function syncM1 (){
    const { data } = await Filesystem.readFile({
        path: STORAGE_PATHM1,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
    });

    let dataModulo = JSON.parse(data);
    console.log("M1");
    console.log(dataModulo);
}

async function syncM2 (){
    const { data } = await Filesystem.readFile({
        path: STORAGE_PATHM2,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
    });
 
    let dataModulo = JSON.parse(data);
    console.log("M2");
    // console.log(dataModulo);

    // Example of a POST request. Note: data
    // can be passed as a raw JS Object (must be JSON serializable)
    // const options = {
    //     url: 'https://pokeapi.co/api/v2/pokemon/ditto',
    //     headers: { 'X-Fake-Header': 'Fake-Value' },
    //     params: { size: 'XL' },
    // };

    // const response = await CapacitorHttp.request({ options, method: 'GET' });
    // console.log(response);
    // doGet();
    doPost();
}

async function doGet (){
    const options = {
      url: 'https://desarrolloiglu.com/api/users',
      headers: { 
        'Content-Type': 'application/json',
      },
      params: { },
    };
  
    // or...
    
    const response = await CapacitorHttp.get(options);
    console.log(response);
};


async function doPost (){
    const options = {
      url: 'http://localhost:8000/api/login',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
       },
      data: {email: "n3f73r@asdas.com", password: "asdasd"},
    };
  
    // or...
    const response = await CapacitorHttp.post(options);
    console.log(response);
};
  

async function syncM3 (){
    const { data } = await Filesystem.readFile({
        path: STORAGE_PATHM3,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
    });

    let dataModulo = JSON.parse(data);
    console.log("M3");
    console.log(dataModulo);
}

async function syncM4 (){
    const { data } = await Filesystem.readFile({
        path: STORAGE_PATHM4,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
    });

    let dataModulo = JSON.parse(data);
    console.log("M4");
    console.log(dataModulo);
}


// Events
sync.addEventListener('click', mount);