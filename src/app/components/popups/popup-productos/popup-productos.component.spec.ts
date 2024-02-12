import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupProductosComponent } from './popup-productos.component';

describe('PopupProductosComponent', () => {
  let component: PopupProductosComponent;
  let fixture: ComponentFixture<PopupProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
