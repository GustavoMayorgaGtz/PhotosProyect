import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/servicios/all.service';
import { Messenger } from 'src/servicios/messenger';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.scss']
})
export class CrearCategoriaComponent implements OnInit{
  constructor(
    private servicios: AllService,
    private messenger: Messenger
  ){ }

  ngOnInit(): void {   }

  public categroy_icon_style: string[] = ['', '', '', '', '', '', '', '', '', ''];
  public idCategorySelected!: number;
  selectIcon_Event(id: number) {
    this.idCategorySelected = id;
    this.categroy_icon_style = ['', '', '', '', '', '', '', '', '', ''];
    this.categroy_icon_style[id] = "icon-option-selected";
    console.log("Opcion marcada");
  }

  guardarCategoria(name: string) {
    const id = sessionStorage.getItem("id");
    console.log("Id del usuario: ", id);
    const option = this.categroy_icon_style.indexOf("icon-option-selected")
    if (name && option != -1 && option) {
      const body = {
        iconInteger: option,
        title: name,
        id: id
      }
      console.log("Datos de creacion", body);
      this.servicios.createCategory(body).subscribe((data) => {
        console.log("Creacion de categoria: ", data)
      }, (err: HttpErrorResponse) => {
        console.log("error!")
      })
    } else {
      alert("categoria no creada");
    }
  }
  back(){
     this.messenger.setMenuControl(0);  }
}
