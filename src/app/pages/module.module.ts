import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleRoutingModule } from './module-routing.module';
import { AdministradorComponent } from './administrador/administrador.component';



@NgModule({
  declarations: [
    
  
    AdministradorComponent
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule
  ]
})
export class ModuleModule { }
