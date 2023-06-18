import { EnvironmentInjector, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { varglobal } from 'src/var-global/var-global';
import { ImagesCompress, user, userCategory } from 'src/interface';
@Injectable({
  providedIn: 'root'
})
export class AllService {

  constructor(private http: HttpClient) { }

  //peticion para iniciar sesion
  login(id: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${token}`
    });
    let options = { headers: headers };
    return this.http.post<user>(varglobal.server + "/user/login", { id }, options)
  }

  //Peticion para obtener los usuarios
  getUsers() {
    return this.http.get<user[]>(varglobal.server + "/user/");
  }

  //Peticion para obtener la informacion de un usuario
  getUser(id: string) {
    return this.http.get<user>(varglobal.server + "/user/" + id)
  }

  //peticion para obtener las imagenes de un usuario
  getImages(body: Object) {
    return this.http.post<ImagesCompress[]>(varglobal.server + "/images/", body);
  }

  //Peticion para eliminar usuario
  deleteUser(id: string) {
    return this.http.delete(varglobal.server + "/user/" + id)
  }

  //Peticion para crear un usuario
  createUser(body: object) {
    return this.http.post(varglobal.server + "/user/create", body)
  }

  //Peticion para subir imagenes
  uploadImageUser(Files: FormData) {
    // console.log(Files)
    return this.http.post(varglobal.server + "/user/uploadFiles", Files, {
      reportProgress: true, // Habilita el seguimiento del progreso
      observe: 'events', // Observa los eventos de progreso
    });
  }

  //Conexion para crear una categoria
  createCategory(body: object) {
    return this.http.post(varglobal.server + "/category/create", body);
  }

  //Conexion para buscar las categorias
  findCategory(body: object) {
    return this.http.post<userCategory>(varglobal.server + "/category/find", body);
  }
}
