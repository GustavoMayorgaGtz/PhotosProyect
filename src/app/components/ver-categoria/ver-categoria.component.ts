import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { user } from 'src/interface';
import { AllService } from 'src/servicios/all.service';
import { Messenger } from 'src/servicios/messenger';

@Component({
  selector: 'app-ver-categoria',
  templateUrl: './ver-categoria.component.html',
  styleUrls: ['./ver-categoria.component.scss']
})
export class VerCategoriaComponent implements OnInit {

  @Input() user!: user;
  constructor(
    private servicios: AllService,
    private messenger: Messenger
  ) { }

  ngOnInit(): void {
    console.log(this.user);
    this.getCategorys();
  }

  getCategorys(){
    if(this.user.id){
      this.servicios.findCategory({id: this.user.id}).subscribe((categorys) => {
        console.log("Las categorias encontradas son: ",categorys);
      }, (err: HttpErrorResponse) => {
        console.log("Error al buscar categorias")
      })
    }
  }

  back() {
    this.messenger.setMenuControl(0);
  }
}
