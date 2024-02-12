import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVehiculoComponent } from './popup-vehiculo.component';

describe('PopupVehiculoComponent', () => {
  let component: PopupVehiculoComponent;
  let fixture: ComponentFixture<PopupVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupVehiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
