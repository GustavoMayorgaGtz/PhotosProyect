import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregadoComponent } from './agregado.component';

describe('AgregadoComponent', () => {
  let component: AgregadoComponent;
  let fixture: ComponentFixture<AgregadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
