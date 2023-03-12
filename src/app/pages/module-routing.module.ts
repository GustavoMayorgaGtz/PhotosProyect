import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./inicio/inicio-module.module').then(m => m.InicioModuleModule)
      },
      {
        path: 'agregar',
        loadChildren: () => import('./agregado/agregado-module.module').then(m => m.AgregadoModuleModule)
      },
      {
        path: 'administrador',
        loadChildren: () => import('./administrador/administrador.module.module').then(m => m.ModuleModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
