import * as fs from 'fs';
export function createDirectoryUser(id){
       //Verificar que existe el directorio donde guardaremos el archivo
       const directorio = `./public/user_directory_${id}/`;
       if (!fs.existsSync(directorio)) {
         //Crear el directorio
         fs.mkdirSync(directorio, { recursive: true });
       }
       return directorio;
}