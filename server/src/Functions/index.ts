import * as fs from 'fs';
import { HttpException } from '@nestjs/common';
import * as Jimp from 'jimp';
import * as sharp from 'sharp';


export const createName = (size, directorio) => {
    const names = [];
    for(let i = 0; i < size; i++){
        const time = new Date();
        let nameTime = time.getTime() + '.jpg';
        let name = directorio + nameTime;
        do{
          const now = new Date();
          nameTime = now.getTime() + '.jpg';
          name = directorio + nameTime;
        }while(names.includes(name));
        names.push(name);
    }
return names;
}

export function createDirectoryUser(id) {
    //Verificar que existe el directorio donde guardaremos el archivo
    const directorio = `./public/user_directory_${id}/`;
    const directorioOriginal = `./public/user_directory_${id}_original/`;
    if (!fs.existsSync(directorio)) {
        //Crear el directorio
        fs.mkdirSync(directorio, { recursive: true });
    }
    if (!fs.existsSync(directorioOriginal)) {
        //Crear el directorio
        fs.mkdirSync(directorioOriginal, { recursive: true });
    }
    return {directorio, directorioOriginal};
}

export function saveOriginalImage(file, name){
    fs.writeFile(name, file, 'binary', (err) => {
        if (err) throw err;
        console.log('Imagen original guardada');
      });
}

export function compress(file, name) {
    sharp(file.buffer)
        .resize(250, 250)
        .toFile(name, (err) => {
            if (err) {
                console.log(err);
                throw new HttpException("Server internal err", 500)
            } else {
                waterMark(name);

            }
        });
}

export function waterMark(name) {
    Jimp.read(name)
        .then(async (image) => {
                image
                .resize(250, 250)
                .quality(90)
                .print(
        
                    await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK),
                    10,
                    100,
                    'Photo Republic',
                )
                .writeAsync(name).then(()=>{
                    console.log("---------------------------------------------------")
                    console.log("Imagen comprimida y con marca de agua");
                }).catch((err) => {
                    console.log("Error al aplicar marca de agua:", err)
                })
            
        })
        .catch((err) => {
            console.log(err)
        });
}