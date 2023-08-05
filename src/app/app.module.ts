import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentsModuleModule } from './components/components.module';
import { ModuleModule } from './pages/module.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModuleModule
  ], 
  providers: [ HttpClient ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
