import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { varglobal } from 'src/var-global/var-global';
import { login_in } from 'src/interface';
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
    return this.http.post<login_in>(varglobal.server+"/user/login", {id}, options)
  }

}
