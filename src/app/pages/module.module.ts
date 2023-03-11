import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleRoutingModule } from './module-routing.module';
import { AdministradorComponent } from './administrador/administrador.component';
import { ComponentsModuleModule } from '../components/module.module';



@NgModule({
  declarations: [
    
  
    AdministradorComponent
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    ComponentsModuleModule
  ]
})
export class ModuleModule { }
