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


  public showMessage: boolean = false;
  public id_userToDrop !: number;
  drop_user(id: number) {
    this.id_userToDrop = id;
   
    this.showMessage = !this.showMessage;
  }

  message_click_event(option: boolean) {
    if (option) {
      this.servicios.deleteUser(this.id_userToDrop).subscribe((data) => {
      console.log(data)
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
