import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllService } from 'src/servicios/all.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss','./inicio.component.mobile.scss']
})
export class InicioComponent implements OnInit {

  public isLogin: boolean = false;
  constructor(
    private router: Router,
    private servicios: AllService,
  ) { }

  ngOnInit(): void {
    sessionStorage.removeItem("id");
    sessionStorage.clear();
    this.change_image_interval();
  }

  public noImg = 0;
  change_image_interval(){
    setInterval(()=> {
       this.noImg++;
       if(this.noImg == 3){
        this.noImg = 0;
       }
    }, 5000);
  }
  logIn(value: string) {
    this.servicios.login(value).subscribe((user) => {
      if (user.status) {
        //Usuario logeado
        if(user.type == 1)
        {
          //Usuario normal
          sessionStorage.setItem("id", user.id)
          this.router.navigate(['/fotos'])
        }else{
          //Usuario administrador
          sessionStorage.setItem("id", user.id)
          this.router.navigate(['/administrador'])
        }
        
      } else {
        alert("ID incorrecto")
      }
    }, (err: HttpErrorResponse) => {
      alert("Hubo un problema para iniciar sesion");
      // console.log("Error de entrada: ", err);
    });
  }

  enable_Login(){
    this.isLogin = !this.isLogin;
  }

  facebook(){
    window.open("https://www.facebook.com/Photo-Republic-367008857203792");
  }

  whatsapp(){
    window.open("https://wa.link/cpkj0g");
  }

  instagram(){
    window.open("https://www.instagram.com/photorepublicmx/");
  }
}
