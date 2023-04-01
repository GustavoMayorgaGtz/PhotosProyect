import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlCuentasComponent } from './control-cuentas/control-cuentas.component';
import { SafeUrlPipe } from 'src/tuberia/safe-url.pipe';




@NgModule({
  declarations: [
    ControlCuentasComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ControlCuentasComponent,
  ]
})
export class ComponentsModuleModule { }
