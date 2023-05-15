import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl, } from '@angular/platform-browser';
import { AllService } from 'src/servicios/all.service';

@Component({
  selector: 'app-subir-imagenes',
  templateUrl: './subir-imagenes.component.html',
  styleUrls: ['./subir-imagenes.component.scss']
})

export class SubirImagenesComponent implements OnInit {

  public isEditImages: boolean = false;

  constructor(private servicios: AllService,
    private sanitazer: DomSanitizer) {
  }

  ngOnInit(): void {

  }

  public images_status: string = "Haz click para subir imagenes";
  public viewImages: boolean = false;
  public formdata: FormData = new FormData();
  public image!: string;
  public soruceImages!: HTMLInputElement;
  getLocalImages(images: HTMLInputElement) {
    this.soruceImages = images;
    let auxName: string = "";
    if (this.soruceImages.files) {
      const files = this.soruceImages.files
      const sizefiles = files.length;
      for (let i = 0; i < sizefiles; i++) {
        this.borderType.push("Sin borde");
        const thisFile = files.item(i);
        if (thisFile) {
          this.formdata.append('images', thisFile);
        }
      }
    }

    if (images.files) {
      const files = images.files;
      const size = files.length;
      auxName = files[0].name;
      this.images_status = auxName + "... y " + (size - 1) + ' imagenes mas.';
      this.viewImages = true;
    }
  }

  
  public imagesNames: string[] = [];
  public safeUrl: SafeUrl[] = [];
  verImagenes() {
    this.isEditImages = !this.isEditImages;
    this.imagesNames = [];
    if (this.soruceImages.files) {
      const files = this.soruceImages.files;
      const size = files.length;
      for (let i = 0; i < size; i++) {
        const url = URL.createObjectURL(files[i])
        this.imagesNames.push(url);
        const newSafe = this.sanitazer.bypassSecurityTrustUrl(url);
        this.safeUrl.push(newSafe);
      }
    }
  }

  public borderType: string[] = [];
  setBorder(type: string, id: number) {
    this.borderType[id] = type;
  }

  
  //UPLOAD IMAGES
  subirImagenes() {
    // this.alert_message = "Subiendo Imagenes";
    // this.isConfirm = false;
    // this.showMessage = true;
    const json = JSON.stringify(this.borderType);
    this.formdata.delete('bordertype');
    this.formdata.append("bordertype", json);
    this.formdata.delete('idUser');
    // this.formdata.append("idUser", this.userSelected.id);k
    this.servicios.uploadImageUser(this.formdata).subscribe((data) => {
    

      // setTimeout(() => {
      //   this.isConfirm = true;
      //   this.showMessage = false;
      // }, 2000)

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

      // this.alert_message = "Error subiendo imagenes";

      // setTimeout(() => {
      //   this.isConfirm = true;
      //   this.showMessage = false;
      // }, 2000)
    })
  }

}
