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
    alert("Switch image")
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

  }

  public images: ImagesCompress[] = [];
  public position: number = 0;
  public classNames: string[] = [];
  public printClass: string[] = [];
  public zoomClass: string[] = [];
  public categorys: category[] = [];
  public categoryNames: string[] = []
  getUser() {
    if (this.id)
      this.servicios.getUser(this.id).subscribe((user) => {
        const typeEvent = user.typeEvent;
        switch (typeEvent) {
          case 'Boda': {
            this.categoryNames = ["Sesion casual",
              "Getting ready",
              "Sesion formal",
              "Civil",
              "Ceremonia religiosa",
              "Fiesta",
              "Cabina 360°"
            ];
            this.categorys = [
              {
                iconsrc: "./assets/circulo-azul.png"
                , title: "Sesion casual"
                , images: []
              },
              {
                iconsrc: "./assets/running.png",
                title: "Getting ready"
                , images: []
              },
              {
                iconsrc: "./assets/circulo-rosa.png",
                title: "Sesion formal"
                , images: []
              },
              {
                iconsrc: "./assets/couple.png",
                title: "Civil"
                , images: []
              },
              {
                iconsrc: "./assets/iglesia.png",
                title: "Ceremonia religiosa"
                , images: []
              },
              {
                iconsrc: "./assets/party1.png",
                title: "Fiesta"
                , images: []
              },
              {
                iconsrc: "./assets/party2.png",
                title: "Cabina 360°"
                , images: []
              },
            ];
            break;
          }
          case 'XV': {
            this.categoryNames = [
              "Sesion casual",
              "Getting ready",
              "Sesion formal",
              "Ceremonia religiosa",
              "Fiesta",
              "Cabina 360°"
            ];
            this.categorys = [
              {
                iconsrc: "./assets/circulo-azul.png",
                title: "Sesion casual"
                , images: []
              },
              {
                iconsrc: "./assets/running.png",
                title: "Getting ready"
                , images: []
              },
              {
                iconsrc: "./assets/circulo-rosa.png",
                title: "Sesion formal"
                , images: []
              },
              {
                iconsrc: "./assets/iglesia.png",
                title: "Ceremonia religiosa"
                , images: []
              },
              {
                iconsrc: "./assets/party1.png",
                title: "Fiesta"
                , images: []
              },
              {
                iconsrc: "./assets/party2.png",
                title: "Cabina 360°"
                , images: []
              },
            ];
            break;
          }
          case 'Bautizo': {
            this.categoryNames = [
              "Sesion casual",
              "Ceremonia religiosa",
              "Fiesta",
            ];
            this.categorys = [
              {
                iconsrc: "./assets/circulo-azul.png",
                title: "Sesion casual"
                , images: []
              },
              {
                iconsrc: "./assets/iglesia.png",
                title: "Ceremonia religiosa"
                , images: []
              },
              {
                iconsrc: "./assets/party1.png",
                title: "Fiesta"
                , images: []
              }
            ];
            break;
          }
          case 'Sesion Casual': {
            this.categoryNames = ["Sesion casual"];
            this.categorys = [{
              iconsrc: "./assets/circulo-azul.png",
              title: "Sesion casual"
              , images: []
            }];
            break;
          }
        }
        this.servicios.getImages({ idUser: this.id }).subscribe((images) => {
          images.forEach((image) => {
            const indexCategory = this.categoryNames.indexOf(image.category);
            this.categorys[indexCategory].images?.push(image);
            console.log(`Agregando imagen de categoria ${image.category} id:`, indexCategory);
          })
          this.images = this.categorys[0].images?this.categorys[0].images: [];
          console.log("-------------------")
          console.log(this.categorys);
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
      }, (err: HttpErrorResponse) => {
        console.log("Error al buscar usuario: ", err);
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
