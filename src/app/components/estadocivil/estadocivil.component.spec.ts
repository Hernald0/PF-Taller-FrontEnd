import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadocivilComponent } from './estadocivil.component';

describe('EstadocivilComponent', () => {
  let component: EstadocivilComponent;
  let fixture: ComponentFixture<EstadocivilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadocivilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadocivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
