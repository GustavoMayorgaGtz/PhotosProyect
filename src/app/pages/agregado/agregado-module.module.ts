import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregadoRoutingModule } from './agregado-routing.module';
import { AgregadoComponent } from './agregado.component';



@NgModule({
  declarations:[
    AgregadoComponent
  ],
  imports: [
    CommonModule,
    AgregadoRoutingModule,
    
  ],
})
export class AgregadoModule { }
