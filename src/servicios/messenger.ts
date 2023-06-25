import { EnvironmentInjector, EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { varglobal } from 'src/var-global/var-global';
import { ImagesCompress, user } from 'src/interface';
@Injectable({
  providedIn: 'root'
})
export class Messenger {

  public menuControl: EventEmitter<number> = new EventEmitter();
  public categorySelect: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) { }

  //Cambiar el menu de control cuentas
  setMenuControl(option: number) {
    this.menuControl.emit(option);
  }

  //Establecer categoria en control cuentas
  setCategory(option: string) {
    this.categorySelect.emit(option);
  }
}
