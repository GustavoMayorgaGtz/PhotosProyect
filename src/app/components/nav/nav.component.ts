import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss', './nav.component.mobile.scss']
})
export class NavComponent implements OnInit {

  constructor(){

  }
  ngOnInit(): void {
  }

  public change_menu: boolean = false;
  menu_slide_change(){
    this.change_menu = !this.change_menu;
  }

  facebook(){
    window.open("https://www.facebook.com/Photo-Republic-367008857203792");
  }

  whatsapp(){
    window.open("https://wa.link/cpkj0g");
  }

  instagram(){
    window.open("https://www.instagram.com/photorepublicmx/");
  }

}
