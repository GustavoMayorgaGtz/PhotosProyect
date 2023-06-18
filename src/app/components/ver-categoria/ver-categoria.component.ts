import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { category, user } from 'src/interface';
import { AllService } from 'src/servicios/all.service';
import { Messenger } from 'src/servicios/messenger';

@Component({
  selector: 'app-ver-categoria',
  templateUrl: './ver-categoria.component.html',
  styleUrls: ['./ver-categoria.component.scss']
})
export class VerCategoriaComponent implements OnInit {

  @Input() user!: user;
  public categorias: category[] = [];

  constructor(
    private servicios: AllService,
    private messenger: Messenger,
  ) { 
  }
  
  ngOnInit(): void {
    // console.log("Ver categoria, usuario: ", this.user);
    this.getCategorys();
  }


  public images: string[] = [];
  getCategorys() {
    if (this.user.id) {
      this.servicios.findCategory({ id: this.user.id }).subscribe((data) => {
      }, (err: HttpErrorResponse) => {
        
      })           
    }
  }

  back() {
    this.messenger.setMenuControl(0);
  }

  crear_category() {
    this.messenger.setMenuControl(2);
  }

  select_category(idCategory: number) {
    this.messenger.setCategory(this.categorias[idCategory].idCategory);
    this.messenger.setMenuControl(4);
  }
}
