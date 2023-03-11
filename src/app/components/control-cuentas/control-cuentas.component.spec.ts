import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCuentasComponent } from './control-cuentas.component';

describe('ControlCuentasComponent', () => {
  let component: ControlCuentasComponent;
  let fixture: ComponentFixture<ControlCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlCuentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
