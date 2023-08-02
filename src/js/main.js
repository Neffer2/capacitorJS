import { Camera, CameraResultType } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const STORAGE_KEY = "my-images";


// Elems
let imageElement = document.getElementById('captured-image');
let description = document.getElementById('description');
let uploadSection = document.getElementById('upload-section');
let storeAction =  document.getElementById('store-action');
 
const takePicture = async () => {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.base64
    }); 

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var image64 = image.base64String;

    // Can be set to the src of an image now
    imageElement.src = `data:image\png;base64,${image64}`;
    uploadSection.style.display = "none";
    imageElement.style.display = "block";
};

// STORE FILESYSTEM
const writeSecretFile = async () => {    
    let image = imageElement.src;
    let desc = description.value;

    let photos = [{id: 0, photo: image, desc: desc}];

    // await Filesystem.deleteFile({
    //     path: 'secrets/photos.txt',
    //     directory: Directory.Documents,
    // });

    /* Verifico si existe el nombre del archivo dentro de la base de datos
        ( Lo que significaría que ya existe un documento en FileSystem).
    */
    const { value } = await Preferences.get({ key: STORAGE_KEY });

    if (value){
        const { data } = await Filesystem.readFile({
            path: 'secrets/photos.txt',
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });
    
        photos = JSON.parse(data);
        photos.push({id: photos.length, photo: image, desc: desc});
    }else {
        await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify({path: 'secrets/photos.txt'}) });
    }

    appendData('secrets/photos.txt', photos);
    resetElems();
    vibrate();
    // console.log(photos);
};

async function appendData(src, data){
    await Filesystem.writeFile({
        path: src,
        data: JSON.stringify(data),
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
    });

    // Evento para recargar
    const bodyElem = document.querySelector("body");
    bodyElem.dispatchEvent(new CustomEvent("reload-list"));
}

function resetElems(){
    uploadSection.style.display = "block";
    imageElement.src = "";
    description.value = "";
}

async function vibrate(){
    await Haptics.vibrate();
}

// Events
uploadSection.addEventListener('click', takePicture);
storeAction.addEventListener('click', writeSecretFile);