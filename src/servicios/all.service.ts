import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { varglobal } from 'src/var-global/var-global';
import { user } from 'src/interface';
@Injectable({
  providedIn: 'root'
})
export class AllService {

  constructor( private http: HttpClient ) { }

  //peticion para iniciar sesion
  login(id: string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${token}`
    });
    let options = { headers: headers };
    return this.http.post<user>(varglobal.server+"/user/login", {id}, options)
  }

  //Peticion para obtener los usuarios
  getUsers(){
    return this.http.get<user[]>(varglobal.server+"/user/");
  }

}
