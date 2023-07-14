import { ImageConfig } from '@angular/common';
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

  public categroy_selected: number = 0;
  select_category(id: number) {
    this.images = this.categorys[id].images
    this.categroy_selected = id;
  }

  select_liked() {
    const likedImages: ImagesCompress[] = [];
    this.categorys.forEach((category) => {
      category.images.forEach((image) => {
        if (image.liked) {
          likedImages.push(image);
        }
      })
    })
    this.images = likedImages;
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
          images.forEach((image, idx) => {
            // console.log(idx);
            const indexCategory = this.categoryNames.indexOf(image.category);
            const imagePush: ImagesCompress = {
              idImage: image.idImage,
              idx,
              category: image.category,
              pathCompress: varglobal.server + "/" + image.pathCompress.split("/")[2] + "/" + image.pathCompress.split("/")[3],
              border: image.border,
              orientation: image.orientation,
              liked: false,
              amplied: false,
              print: false
            }
            this.categorys[indexCategory].images?.push(imagePush);
            // console.log(`Agregando imagen de categoria ${image.category} id:`, indexCategory);
          })
          this.images = this.categorys[0].images ? this.categorys[0].images : [];
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
        //TODO: Capturar los eventos de error en peticion
        console.log("Error al buscar usuario: ", err);
      })
  }

  printClick_Event(id: number) {
    console.log("->(Print) id image in images array", id)
    this.categorys[this.categroy_selected].images[id].print = !this.categorys[this.categroy_selected].images[id].print;
    if (this.printClass[id] === 'controlSelect') {
      this.printClass[id] = '';
    } else {
      this.printClass[id] = 'controlSelect';
    }
  }

  zoomClick_Event(id: number) {
    
    console.log("->(Zoom) id image in images array: ",id)
    console.log(this.zoomClass);
    this.categorys[this.categroy_selected].images[id].amplied = !this.categorys[this.categroy_selected].images[id].amplied;
    if (this.zoomClass[id] === 'controlSelect') {
      this.zoomClass[id] = '';
    } else {
      this.zoomClass[id] = 'controlSelect';
    }
  }

  //Establecer like en imagenes
  doubleClick(position: number) {
    this.categorys[this.categroy_selected].images[position].liked = !this.categorys[this.categroy_selected].images[position].liked;
  }

  fullScreen_Event(id: number) {
    this.bodyStyle = 1;
    this.position = id;
  }

  MandarImagenes() {
    //liked
    const likedImages: ImagesCompress[] = [];
    const zoomImages: ImagesCompress[] = [];
    const printImages: ImagesCompress[] = [];
    this.categorys.forEach((category) => {
      category.images.forEach((image) => {
        if (image.liked) {
          likedImages.push(image);
        }
        if (image.amplied) {
          zoomImages.push(image);
        }
        if (image.print) {
          printImages.push(image);
        }
      })
    })
    console.log("-------")
    console.log("Estas son las imagenes que gustaron: ", likedImages);
    console.log("Estas son las imagenes de ampliacion: ", zoomImages);
    console.log("Estas son las imagenes de impresion: ", printImages);
    console.log("-------")
  }
}
