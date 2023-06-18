import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { user } from 'src/interface';
import { AllService } from 'src/servicios/all.service';
import { Messenger } from 'src/servicios/messenger';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit{
  public info = "Registra un nuevo usuario, recuerda que un ID complejo ayuda a la seguridad del usuario ( trata de evitar numero o palabras simples ).";
  constructor(private messenger: Messenger,
    private servicios: AllService){

  }

  ngOnInit(): void {
    
  }

  public users: user[] = [];
  getUsers() {
    this.users = [];
    this.servicios.getUsers().subscribe((users) => {
      this.users = users;
    })
  }

  guardarUsuario_Event(id: string, name: string, typeEvent: string) {
    //Crear peticion para registrar nuevo usuario
    if (id && name && typeEvent) {
      const body = {
        id,
        name,
        typeEvent
      }
      this.servicios.createUser(body).subscribe(() => {
        //TODO: alert
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

  back(){
    this.messenger.setMenuControl(0);
  }

}
