import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlCuentasComponent } from './control-cuentas/control-cuentas.component';
import { ControlUploadComponent } from './control-upload/control-upload.component';



@NgModule({
  declarations: [
    ControlCuentasComponent,
    ControlUploadComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ControlCuentasComponent,
    ControlUploadComponent
  ]
})
export class ModuleModule { }
