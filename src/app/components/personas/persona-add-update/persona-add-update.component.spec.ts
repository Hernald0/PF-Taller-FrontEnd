import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaAddUpdateComponent } from './persona-add-update.component';

describe('PersonaAddUpdateComponent', () => {
  let component: PersonaAddUpdateComponent;
  let fixture: ComponentFixture<PersonaAddUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaAddUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
