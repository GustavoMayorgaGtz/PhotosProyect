import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlCuentasComponent } from './control-cuentas/control-cuentas.component';




@NgModule({
  declarations: [
    ControlCuentasComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ControlCuentasComponent,
  ]
})
export class ComponentsModuleModule { }
