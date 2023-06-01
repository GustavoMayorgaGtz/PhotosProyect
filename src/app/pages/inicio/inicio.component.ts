import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllService } from 'src/servicios/all.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
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
  }

  logIn(value: string) {
    this.servicios.login(value).subscribe((user) => {
      if (user.status) {
        //Usuario logeado
        if(user.type == 1)
        {
          //Usuario normal
          sessionStorage.setItem("id", user.id)
          this.router.navigate(['/agregar'])
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
}
