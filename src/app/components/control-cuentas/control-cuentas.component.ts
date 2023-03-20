import { HttpErrorResponse } from '@angular/common/http';
import { compileDeclareInjectableFromMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { user } from 'src/interface';
import { AllService } from 'src/servicios/all.service';

@Component({
  selector: 'app-control-cuentas',
  templateUrl: './control-cuentas.component.html',
  styleUrls: ['./control-cuentas.component.scss']
})
export class ControlCuentasComponent implements OnInit {

  public isCreateUser: boolean = false;
  constructor(private servicios: AllService) {

  }


  ngOnInit(): void {
    this.getUsers();
  }

  public users: user[] = [];
  getUsers() {
    this.users = [];
    this.servicios.getUsers().subscribe((users) => {
      this.users = users;
      
    })
  }

  guardarUsuario_Event(id:string, name:string){
    //Crear peticion para registrar nuevo usuario
    if(id && name){
       this.servicios.createUser(id, name).subscribe((user) => {
        console.log(user)
        alert("Usuario creado");
        this.getUsers();
       }, (err:HttpErrorResponse) => {
        switch(err.status)
        {
          case 0:{
            alert("No se puede conectar al servidor, intentalo mas tarde.")
            break;
          }
          case 500:{
            alert("Error en el servidor, la operacion no se pudo realizar")
            break;
          }
        }
       })
    }
  }

  public message: string = "Crear usuario";
  createUser_Event(){
    this.isCreateUser = !this.isCreateUser;
    if(this.isCreateUser){
      this.message = "Administrar usuarios";
    }else{
      this.message = "Crear usuario";
    }
  }


  public showMessage: boolean = false;
  public id_userToDrop !: string;
  drop_user(id: string) {
    this.id_userToDrop = id;
   
    this.showMessage = !this.showMessage;
  }

  message_click_event(option: boolean) {
    if (option) {
      this.servicios.deleteUser(this.id_userToDrop).subscribe((data) => {
      console.log(data)
      alert("Usuario Eliminado.")
      }, (err: HttpErrorResponse) => {
        switch(err.status)
        {
          case 0:{
            alert("No se puede conectar al servidor, intentalo mas tarde.")
            break;
          }
          case 500:{
            alert("Error en el servidor, la operacion no se pudo realizar")
            break;
          }
        }
      })
      this.showMessage = false;
      this.getUsers();
     } else {
      this.showMessage = false;
    }
  }
}
