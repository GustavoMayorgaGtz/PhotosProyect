import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregadoRoutingModule } from './agregado-routing.module';
import { AgregadoComponent } from './agregado.component';
import { SafeUrlPipe2 } from 'src/tuberia/safe-url2';



@NgModule({
  declarations:[
    AgregadoComponent,
    SafeUrlPipe2
  ],
  imports: [
    CommonModule,
    AgregadoRoutingModule,
    
  ],
})
export class AgregadoModule { }
