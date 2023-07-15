import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoidentificadorComponent } from './tipoidentificador.component';

describe('TipoidentificadorComponent', () => {
  let component: TipoidentificadorComponent;
  let fixture: ComponentFixture<TipoidentificadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoidentificadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoidentificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
