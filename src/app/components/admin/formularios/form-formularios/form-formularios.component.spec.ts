import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFormulariosComponent } from './form-formularios.component';

describe('FormFormulariosComponent', () => {
  let component: FormFormulariosComponent;
  let fixture: ComponentFixture<FormFormulariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFormulariosComponent]
    });
    fixture = TestBed.createComponent(FormFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
