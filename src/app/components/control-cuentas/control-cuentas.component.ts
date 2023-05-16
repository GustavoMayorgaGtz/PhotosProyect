import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { user } from 'src/interface';
import { AllService } from 'src/servicios/all.service';
import { Messenger } from 'src/servicios/messenger';

@Component({
  selector: 'app-control-cuentas',
  templateUrl: './control-cuentas.component.html',
  styleUrls: ['./control-cuentas.component.scss']
})

export class ControlCuentasComponent implements OnInit {

  public isCreateUser: boolean = false;
  public message: string = "Crear usuario";
  public info: string = `En esta opcion puedes gestionar y administrar los usuarios de la plataforma. Puedes
  obtener el ID de cada usuario para que el cliente pueda iniciar sesion y ver las imagenes que tu subas.`

  constructor(private servicios: AllService,
    private messenger: Messenger) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.messenger.menuControl.subscribe((optionMenu) => {
      this.menuOption = optionMenu
      this.info = 'En esta opcion puedes gestionar y administrar los usuarios de la plataforma. Puedes obtener el ID de cada usuario para que el cliente pueda iniciar sesion y ver las imagenes que tu subas.';
    })
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


  createUser_Event() {
    this.menuOption = 2;
  }

  public showMessage: boolean = false;
  public id_userToDrop !: string;
  drop_user(id: string) {
    this.id_userToDrop = id;
    this.showMessage = !this.showMessage;
  }

  public menuOption: number = 0;
  public userSelected!: user;
  uploadImages_Event(user: user) {
    this.userSelected = user;
    this.menuOption = 1;
  }

  public isConfirm = true;
  public alert_message: string = "¿Deseas eliminar el usuario?";
  message_click_event(option: boolean) {
    this.isConfirm = true;
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
