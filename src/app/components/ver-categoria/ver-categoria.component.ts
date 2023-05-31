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
        this.categorias = data.category;
        data.category.forEach((item) => {
          switch (item.iconInteger) {
            case 0: {
              this.images.push("./assets/copas.png");
              break;
            }
            case 1: {
              this.images.push("./assets/anillos.png");

              break;
            }
            case 2: {
              this.images.push("./assets/iglesia.png");
              break;
            }
            case 3: {
              this.images.push("./assets/app.png");
              break;
            }
            case 4: {
              this.images.push("./assets/party.png");

              break;
            }
            case 5: {
              this.images.push("./assets/party1.png");
              break;
            }
            case 6: {
              this.images.push("./assets/party2.png");
              break;
            }
            case 7: {
              this.images.push("./assets/circulo-azul.png");
              break;
            }
            case 8: {
              this.images.push("./assets/circulo-rosa.png");
              break;
            }
            case 9: {
              this.images.push("./assets/cruz.png");
              break;
            }
          }
        })
      }, (err: HttpErrorResponse) => {
        // console.log("Error al buscar categorias")
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
