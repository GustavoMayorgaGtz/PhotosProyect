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

  public images: ImagesCompress[] = [];
  getUser(){
    if(this.id)
    this.servicios.getImages({idUser: this.id}).subscribe((images) => {
      images.forEach((image) => {
        const thispath = image.pathCompress.split("./public/")
        console.log("Path: ",  varglobal.server+thispath[0]);
        this.images.push({
          idImage: image.idImage,
          pathCompress:  varglobal.server+thispath[0],
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
}
