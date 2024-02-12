import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupClienteComponent } from './popup-cliente.component';

describe('PopupClienteComponent', () => {
  let component: PopupClienteComponent;
  let fixture: ComponentFixture<PopupClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
