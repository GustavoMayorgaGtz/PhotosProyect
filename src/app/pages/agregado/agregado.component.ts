import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ImagesCompress } from 'src/interface';
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
  ){
    const id = sessionStorage.getItem('id');
    if(id)
    {
      this.id = id;
    }

  }

  ngOnInit(): void {
     this.getUser();
     
  }

  changeImage(option: number){
    if(option == 1){
      if(this.position === 0){
        this.position = this.images.length - 1;
      }else{
        this.position--;
      }
    }
    if(option == 2){
      if(this.position === this.images.length - 1){
        this.position = 0;
      }else{
        this.position++;
      }
    }
  }

  public images: ImagesCompress[] = [];
  public position: number = 0;
  public classNames: string[] = [];
  getUser(){
    if(this.id)
    this.servicios.getImages({idUser: this.id}).subscribe((images) => {
      images.forEach((image) => {
        this.classNames.push("icon-corazon-desactive");
        console.log(image.pathCompress)
        const thispath = image.pathCompress.replace("./public/","");
        console.log(thispath)
        console.log("Path: ",  varglobal.server+"/"+thispath);
        this.images.push({
          idImage: image.idImage,
          pathCompress:  varglobal.server+"/"+thispath,
          border: image.border
        })
      })
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


  doubleClick(position: number){
    if(this.classNames[position].match('icon-corazon-active'))
    {
      this.classNames[position] = "icon-corazon-hide";

    }else{
      this.classNames[position] = "icon-corazon-active";
    }

  }
}
