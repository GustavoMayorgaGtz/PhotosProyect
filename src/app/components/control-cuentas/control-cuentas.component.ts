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
      alert("Usuario eliminado")
      this.showMessage = false;
      this.getUsers();
     } else {
      this.showMessage = false;
    }
  }
}
