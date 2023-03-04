import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio-module.module').then(m => m.InicioModuleModule)
  },
  {
    path:'agregado',
    loadChildren: () => import('./agregado/agregado-module.module').then(m => m.AgregadoModuleModule)
  },
  {
    path:'*',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
