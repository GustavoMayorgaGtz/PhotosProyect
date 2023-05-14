import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
    if (!this.editImages) {
      this.isUploadImage = 0;
      this.message = "Crear usuario";
      this.info = `En esta opcion puedes gestionar y administrar los usuarios de la plataforma. Puedes
        obtener el ID de cada usuario para que el cliente pueda iniciar sesion y ver las imagenes que tu subas.`;
    } else {
      this.editImages = !this.editImages;
      this.formdata.delete("images");
      this.formdata.delete('bordertype');
      this.formdata.delete('idUser');
      this.borderType = [];
      this.imagesNames = [];

    }
  }

  public isConfirm = true;
  public alert_message: string = "¿Deseas eliminar el usuario?";
  message_click_event(option: boolean) {
    this.isConfirm = true;
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

  public borderType: string[] = [];
  setBorder(type: string, id: number) {
    this.borderType[id] = type;
  }


  //UPLOAD IMAGES
  subirImagenes() {
    this.alert_message = "Subiendo Imagenes";
    this.isConfirm = false;
    this.showMessage = true;
    const json = JSON.stringify(this.borderType);
    this.formdata.delete('bordertype');
    this.formdata.append("bordertype", json);
    this.formdata.delete('idUser');
    this.formdata.append("idUser", this.userSelected.id);
    this.servicios.uploadImageUser(this.formdata).subscribe((data) => {
      this.alert_message = "Imagenes subidas";

      setTimeout(() => {
        this.isConfirm = true;
        this.showMessage = false;
      }, 2000)

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

      this.alert_message = "Error subiendo imagenes";

      setTimeout(() => {
        this.isConfirm = true;
        this.showMessage = false;
      }, 2000)
    })
  }

  public categroy_icon_style: string[] = ['', '', '', '', '', '', '', '', '', ''];
  public idCategorySelected!: number;
  selectIcon_Event(id: number) {
    this. idCategorySelected = id;
    this.categroy_icon_style = ['', '', '', '', '', '', '', '', '', ''];
    this.categroy_icon_style[id] = "icon-option-selected";
    console.log("Opcion marcada");
  }

  guardarCategoria(name: string){
    console.log("Guardando categoria");
    console.log("Nombre del medidor: ", name)
    const option = this.categroy_icon_style.indexOf("icon-option-selected")
    if(name && option != -1 && option ){
      alert("categoria creada");
    }else{
      alert("categoria no creada");
    }
  }
}
