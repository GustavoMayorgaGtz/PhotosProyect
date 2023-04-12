import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorRoutingModule } from './administrador.routing.module';
import { AdministradorComponent } from './administrador.component';
import { ComponentsModuleModule } from "../../components/components.module";



@NgModule({
    declarations: [
        AdministradorComponent
    ],
    imports: [
        CommonModule,
        AdministradorRoutingModule,
        ComponentsModuleModule
    ]
})
export class AdministradorModule { }
