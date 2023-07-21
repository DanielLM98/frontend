import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCentrosComponent } from './form-centros.component';

describe('FormCentrosComponent', () => {
  let component: FormCentrosComponent;
  let fixture: ComponentFixture<FormCentrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCentrosComponent]
    });
    fixture = TestBed.createComponent(FormCentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
