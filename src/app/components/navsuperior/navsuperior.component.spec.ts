import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavsuperiorComponent } from './navsuperior.component';

describe('NavsuperiorComponent', () => {
  let component: NavsuperiorComponent;
  let fixture: ComponentFixture<NavsuperiorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavsuperiorComponent]
    });
    fixture = TestBed.createComponent(NavsuperiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
