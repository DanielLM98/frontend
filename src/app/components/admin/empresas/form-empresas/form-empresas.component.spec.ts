import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEmpresasComponent } from './form-empresas.component';

describe('FormEmpresasComponent', () => {
  let component: FormEmpresasComponent;
  let fixture: ComponentFixture<FormEmpresasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEmpresasComponent]
    });
    fixture = TestBed.createComponent(FormEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});