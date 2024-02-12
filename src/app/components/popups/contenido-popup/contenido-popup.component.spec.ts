import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoPopupComponent } from './contenido-popup.component';

describe('ContenidoPopupComponent', () => {
  let component: ContenidoPopupComponent;
  let fixture: ComponentFixture<ContenidoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
