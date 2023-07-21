import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrosComponent } from './centros.component';

describe('CentrosComponent', () => {
  let component: CentrosComponent;
  let fixture: ComponentFixture<CentrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CentrosComponent]
    });
    fixture = TestBed.createComponent(CentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
