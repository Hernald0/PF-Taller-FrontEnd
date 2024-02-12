import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupGenericoComponent } from './popup-generico.component';

describe('PopupGenericoComponent', () => {
  let component: PopupGenericoComponent;
  let fixture: ComponentFixture<PopupGenericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupGenericoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
