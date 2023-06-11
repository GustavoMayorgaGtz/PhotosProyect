import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { setCategoryImage } from 'src/Functions';
import { ImagesCompress, category } from 'src/interface';
import { AllService } from 'src/servicios/all.service';
import { varglobal } from 'src/var-global/var-global';

@Component({
  selector: 'app-agregado',
  templateUrl: './agregado.component.html',
  styleUrls: ['./agregado.component.scss']
})
export class AgregadoComponent implements OnInit {

  public id!: string;
  constructor(
    private servicios: AllService
  ) {
    const id = sessionStorage.getItem('id');
    if (id) {
      this.id = id;
    }
  }

  public bodyStyle: number = 2
  filter_information(option: number) {
    this.bodyStyle = option;
  }

  ngOnInit(): void {
    this.getUser();
  }

  changeImage(option: number) {
    if (option == 1) {
      if (this.position === 0) {
        this.position = this.images.length - 1;
      } else {
        this.position--;
      }
    }
    if (option == 2) {
      if (this.position === this.images.length - 1) {
        this.position = 0;
      } else {
        this.position++;
      }
    }
  }

  select_category(id: number) {
    this.images = [];
    //Obtener las imagenes que pertenecen a esa categoria;
    this.allImages.forEach((image) => {
      if (image.category.idCategory == id) {
        const thispath = image.pathCompress.replace("./public/", "");
        this.classNames.push("icon-corazon-desactive");
        this.printClass.push("");
        this.zoomClass.push("");
        this.images.push({
          idImage: image.idImage,
          pathCompress: varglobal.server + "/" + thispath,
          border: image.border,
          category: image.category,
          orientation: image.orientation,
        })
      }
    });
  }

  public images: ImagesCompress[] = [];
  public position: number = 0;
  public classNames: string[] = [];
  public printClass: string[] = [];
  public zoomClass: string[] = [];
  public categorys: category[] = [];
  public categoryImages!: string[];
  public allImages: ImagesCompress[] = [];
  getUser() {
    if (this.id)
      this.servicios.getImages({ idUser: this.id }).subscribe((images) => {
        let categorynames: string[] = [];
        let idCategory: number[] = [];
        this.allImages = images;

        //Guardar las imagenes por ordern
        images.forEach((image) => {
          if (!categorynames.includes(image.category.title)) {
            this.categorys.push(image.category);
            categorynames.push(image.category.title);
            idCategory.push(image.category.iconInteger);
          }
        })

        if (this.categorys) {
          const idFirstCategory = this.categorys[0].idCategory;
          this.select_category(idFirstCategory);
        }

        this.categoryImages = setCategoryImage(idCategory);
        ////

      }, (err: HttpErrorResponse) => {
        const status = err.status;
        switch (status) {
          case 0: {
            alert("No se pudo conectar al servidor, intentalo mas tarde (0)")
            break;
          }
          case 400: {
            alert("Error al subir las imagenes, intentalo mas tarde (400)")
            break;
          }
          case 500: {
            alert("Error interno del servidor, busca soporte tecnico (500)")
            break;
          }
        }
      })
  }

  PrintZoom_Event(option: string, id: number): void {
    if (option === 'Print') {
      if (this.printClass[id] === 'controlSelect') {
        this.printClass[id] = '';
      } else {
        this.printClass[id] = 'controlSelect';
      }
    }
    if (option === 'Zoom') {
      if (this.zoomClass[id] === 'controlSelect') {
        this.zoomClass[id] = '';
      } else {
        this.zoomClass[id] = 'controlSelect';
      }
    }
  }

  doubleClick(position: number) {
    if (this.classNames[position].match('icon-corazon-active')) {
      this.classNames[position] = "icon-corazon-hide";
    } else {
      this.classNames[position] = "icon-corazon-active";
    }
  }

  fullScreen_Event(id: number) {
    this.bodyStyle = 1;
    this.position = id;
  }
}
