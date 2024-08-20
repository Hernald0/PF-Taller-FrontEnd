import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientevehiculosComponent } from './clientevehiculos.component';

describe('ClientevehiculosComponent', () => {
  let component: ClientevehiculosComponent;
  let fixture: ComponentFixture<ClientevehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientevehiculosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientevehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
