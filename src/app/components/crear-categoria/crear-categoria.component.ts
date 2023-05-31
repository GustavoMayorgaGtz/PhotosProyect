import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { user } from 'src/interface';
import { AllService } from 'src/servicios/all.service';
import { Messenger } from 'src/servicios/messenger';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.scss']
})
export class CrearCategoriaComponent implements OnInit {
  @Input('user') user!: user;
  constructor(
    private servicios: AllService,
    private messenger: Messenger
  ) { }

  ngOnInit(): void { }

  public categroy_icon_style: string[] = ['', '', '', '', '', '', '', '', '', ''];
  public idCategorySelected!: number;
  selectIcon_Event(id: number) {
    this.idCategorySelected = id;
    this.categroy_icon_style = ['', '', '', '', '', '', '', '', '', ''];
    this.categroy_icon_style[id] = "icon-option-selected";
    // console.log("Opcion marcada");
  }

  guardarCategoria(name: string) {
    if (this.user.id) {
      const option = this.categroy_icon_style.indexOf("icon-option-selected")
      // console.log("opcion de validacion: ", option);

      if (name && option != -1 && option >= 0) {
        const body = {
          iconInteger: option,
          title: name,
          id: this.user.id
        }

        this.servicios.createCategory(body).subscribe((data) => {
          alert("Categoria creada");

        }, (err: HttpErrorResponse) => {
          console.error("error!", err.message);
        })
      } else {
        alert("categoria no creada");
      }
    } else {
      alert("categoria no creada");
    }
  }

  back() {
    this.messenger.setMenuControl(0);
  }
}
