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
        allowEditing: true,
        resultType: CameraResultType.base64
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var image64 = image.base64String;

    // Can be set to the src of an image now
    imageElement.src = `data:image/png;base64,${image64}`;
    uploadSection.style.display = "none";
};

// Store
const storeData = async () => {
    let image = imageElement.src;
    let desc = description.value;

    // Load any stored previous data
    const { value } = await Preferences.get({ key: STORAGE_KEY });

    // Add the new image/description to the array
    // or create a new array
    // Then store the JSON.stringified() version to Preferences
    if (value) {
        const arr = JSON.parse(value);
        arr.push({ image, desc });
        await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(arr) });
    } else {
        const arr = [
            {
                image,
                desc,
            },
        ];
        await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(arr) });
    }

    resetElems();
    vibrate();
};

function resetElems(){
    uploadSection.style.display = "block";
    imageElement.src = "";
    description.value = "";
}

async function vibrate(){
    await Haptics.vibrate();
    // checkName();
}

// FILESYSTEM

const writeSecretFile = async () => {    

    let photos = [];

    // await Filesystem.deleteFile({
    //     path: 'secrets/text.txt',
    //   directory: Directory.Documents,
    // });

    // Verifico si hay algo en el FileSystem. 

    const fileReader = new FileReader();
    fileReader.readAsText('secrets/text.txt');
    fileReader.onload = () => {
        if (fileReader.result) {
            alert("The file exists");
        } else {
            alert("The file does not exist");
        }
    };

    // console.log(aux);

    // con const { } me salto un paso y tomo los valores que están dentro del key "data"
    // const { data } = await Filesystem.readFile({
    //     path: 'secrets/text.txt',
    //     directory: Directory.Documents,
    //     encoding: Encoding.UTF8,
    // });

    // photos = JSON.parse(data);
    // photos.push({photo: 'NUEVO', desc: "REGISTRO"});

    // await Filesystem.writeFile({
    //     path: 'secrets/text.txt',
    //     data: JSON.stringify(photos),
    //     directory: Directory.Documents,
    //     encoding: Encoding.UTF8,
    // });

    // console.log(photos);
};


  // Events
uploadSection.addEventListener('click', takePicture);
storeAction.addEventListener('click', writeSecretFile);