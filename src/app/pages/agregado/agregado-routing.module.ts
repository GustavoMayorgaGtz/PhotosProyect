import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgregadoComponent } from './agregado.component';


const routes: Routes = [
  {
    path:'',
    component: AgregadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregadoRoutingModule { }
