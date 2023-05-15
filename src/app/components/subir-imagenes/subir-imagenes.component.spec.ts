import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirImagenesComponent } from './subir-imagenes.component';

describe('SubirImagenesComponent', () => {
  let component: SubirImagenesComponent;
  let fixture: ComponentFixture<SubirImagenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirImagenesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
