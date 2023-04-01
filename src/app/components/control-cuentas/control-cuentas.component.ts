import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { user } from 'src/interface';
import { AllService } from 'src/servicios/all.service';

@Component({
  selector: 'app-control-cuentas',
  templateUrl: './control-cuentas.component.html',
  styleUrls: ['./control-cuentas.component.scss']
})

export class ControlCuentasComponent implements OnInit {


  public isCreateUser: boolean = false;
  constructor(private servicios: AllService,
    private sanitazer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  public users: user[] = [];
  getUsers() {
    this.users = [];
    this.servicios.getUsers().subscribe((users) => {
      this.users = users;
    })
  }

  guardarUsuario_Event(id: string, name: string) {
    //Crear peticion para registrar nuevo usuario
    if (id && name) {
      this.servicios.createUser(id, name).subscribe((user) => {
        console.log(user)
        alert("Usuario creado");
        this.getUsers();
      }, (err: HttpErrorResponse) => {
        switch (err.status) {
          case 0: {
            alert("No se puede conectar al servidor, intentalo mas tarde.")
            break;
          }
          case 500: {
            alert("Error en el servidor, la operacion no se pudo realizar")
            break;
          }
        }
      })
    }
  }

  public message: string = "Crear usuario";
  public info: string = `En esta opcion puedes gestionar y administrar los usuarios de la plataforma. Puedes
  obtener el ID de cada usuario para que el cliente pueda iniciar sesion y ver las imagenes que tu subas.`
  createUser_Event() {
    this.isCreateUser = !this.isCreateUser;
    if (this.isCreateUser) {
      this.message = "Administrar usuarios";
      this.info = `Registra un nuevo usuario, recuerda que un ID complejo ayuda a la seguridad del usuario ( trata de evitar numero o palabras simples ).`;

    } else {
      this.message = "Crear usuario";
      this.info = `En esta opcion puedes gestionar y administrar los usuarios de la plataforma. Puedes
      obtener el ID de cada usuario para que el cliente pueda iniciar sesion y ver las imagenes que tu subas.`;
    }
  }

  public showMessage: boolean = false;
  public id_userToDrop !: string;
  drop_user(id: string) {
    this.id_userToDrop = id;
    this.showMessage = !this.showMessage;
  }

  public isUploadImage: number = 0;
  public userSelected!: user;
  uploadImages_Event(user: user) {
    this.userSelected = user;
    this.isUploadImage = 1;
    this.info = "Carga las imagenes y define los atributos de como se visualizaran las imagenes.";

  }

  reset() {
    this.isUploadImage = 0;
    this.message = "Crear usuario";
    this.info = `En esta opcion puedes gestionar y administrar los usuarios de la plataforma. Puedes
      obtener el ID de cada usuario para que el cliente pueda iniciar sesion y ver las imagenes que tu subas.`;
  }

  message_click_event(option: boolean) {
    if (option) {
      this.servicios.deleteUser(this.id_userToDrop).subscribe((data) => {
        alert("Usuario Eliminado.")
      }, (err: HttpErrorResponse) => {
        switch (err.status) {
          case 0: {
            alert("No se puede conectar al servidor, intentalo mas tarde.")
            break;
          }
          case 500: {
            alert("Error en el servidor, la operacion no se pudo realizar")
            break;
          }
        }
      }, () => {
        this.getUsers();
        this.showMessage = false;
      })
    } else {
      this.showMessage = false;
    }
  }

  //UPLOAD IMAGES
  public images_status: string = "Haz click para subir imagenes";
  public viewImages: boolean = false;
  public images !: FileList;
  
  public image!: string;
  public soruceImages!: HTMLInputElement;
  getLocalImages(images: HTMLInputElement) {

    this.soruceImages = images;
    let auxName: string = "";

    if (images.files) {
      const files = images.files;
      const size = files.length;
      auxName = files[0].name;
      this.images_status = auxName + "... y " + (size - 1) + ' imagenes mas.';
      this.viewImages = true;
    }
  }

  public editImages: boolean = false;
  public imagesNames: string[] = [];
  public safeUrl: SafeUrl[] = [];
  
  verImagenes() {
    this.editImages = !this.editImages;
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

  setBorder(type: string){

  }
}
