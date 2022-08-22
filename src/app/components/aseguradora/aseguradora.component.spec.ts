import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AseguradoraComponent } from './aseguradora.component';

describe('AseguradoraComponent', () => {
  let component: AseguradoraComponent;
  let fixture: ComponentFixture<AseguradoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AseguradoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AseguradoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
