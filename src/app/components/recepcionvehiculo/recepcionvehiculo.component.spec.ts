import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionvehiculoComponent } from './recepcionvehiculo.component';

describe('RecepcionvehiculoComponent', () => {
  let component: RecepcionvehiculoComponent;
  let fixture: ComponentFixture<RecepcionvehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepcionvehiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionvehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
