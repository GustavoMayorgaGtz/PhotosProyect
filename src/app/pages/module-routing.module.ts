import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./inicio/inicio-module.module').then(m => m.InicioModuleModule)
      },
      {
        path: 'agregar',
        loadChildren: () => import('./agregado/agregado-module.module').then(m => m.AgregadoModuleModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
