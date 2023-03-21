import { Component } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent {

  private menu: Number = 0;
  constructor() {
  }
  
  get Menu() {
    return this.menu
  }

  set Menu(option: Number) {
    this.menu = option;
  }
}
