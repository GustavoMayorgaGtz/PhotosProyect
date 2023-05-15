import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlCuentasComponent } from './control-cuentas/control-cuentas.component';
import { SafeUrlPipe } from 'src/tuberia/safe-url.pipe';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { SubirImagenesComponent } from './subir-imagenes/subir-imagenes.component';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { VerCategoriaComponent } from './ver-categoria/ver-categoria.component';


@NgModule({
  declarations: [
    ControlCuentasComponent,
    SafeUrlPipe,
    CrearUsuarioComponent,
    SubirImagenesComponent,
    CrearCategoriaComponent,
    VerCategoriaComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ControlCuentasComponent
  ]
})
export class ComponentsModuleModule { }
