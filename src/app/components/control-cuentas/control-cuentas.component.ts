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

  guardarUsuario_Event(id: string, name: string) {
    //Crear peticion para registrar nuevo usuario
    if (id && name) {
      this.servicios.createUser(id, name).subscribe((user) => {
        console.log(user)
        alert("Usuario creado");
        this.getUsers();
      }, (err: HttpErrorResponse) => {
        switch (err.status) {
          case 0: {
            alert("No se puede conectar al servidor, intentalo mas tarde.")
            break;
          }
          case 500: {
            alert("Error en el servidor, la operacion no se pudo realizar")
            break;
          }
        }
      })
    }
  }

  public message: string = "Crear usuario";
  public info: string = `En esta opcion puedes gestion y administrar los usuarios de la plataforma. Puedes
  obtener el ID de cada usuario para que el cliente pueda iniciar sesion y ver las imagenes que tu subas.`
  createUser_Event() {
    this.isCreateUser = !this.isCreateUser;
    if (this.isCreateUser) {
      this.message = "Administrar usuarios";
      this.info = `Registra un nuevo usuario, recuerda que un ID complejo ayuda a la seguridad del usuario (trata de evitar numero simples).`;

    } else {
      this.message = "Crear usuario";
      this.info = `En esta opcion puedes gestion y administrar los usuarios de la plataforma. Puedes
      obtener el ID de cada usuario para que el cliente pueda iniciar sesion y ver las imagenes que tu subas.`;
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
        alert("Usuario Eliminado.")
      }, (err: HttpErrorResponse) => {
        switch (err.status) {
          case 0: {
            alert("No se puede conectar al servidor, intentalo mas tarde.")
            break;
          }
          case 500: {
            alert("Error en el servidor, la operacion no se pudo realizar")
            break;
          }
        }
      }, () => {
        this.getUsers();
        this.showMessage = false;
      })
    } else {
      this.showMessage = false;
    }
  }
}
