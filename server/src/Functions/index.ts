import * as fs from 'fs';
import * as Jimp from 'jimp';


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
    fs.writeFile(name, file.buffer, (err) => {
       if(err){

       }else{
        waterMark(name);
       }
    })
    // sharp(file.buffer)
    //     .resize()
    //     .toFile(name, (err) => {
    //         if (err) {
    //             console.log(err);
    //             throw new HttpException("Server internal err", 500)
    //         } else {
    //             waterMark(name);

    //         }
    //     });
}

export function waterMark(name) {
    Jimp.read(name)
        .then(async (image) => {
                const w = image.getWidth()
                const h =  image.getHeight()
                let compressWidth;
                let compressHeight;
                if(h > w){
                    compressWidth = 500;
                    compressHeight = 800;
                }
                if(w > h){
                    compressWidth = 800;
                    compressHeight = 500;
                }
                image
                .quality(75)
                .resize(compressWidth, compressHeight)
                .print(
                    await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE),
                    50,
                    400,
                    'Photo Republic',
                )
                .print(
                    await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK),
                    50,
                    350,
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