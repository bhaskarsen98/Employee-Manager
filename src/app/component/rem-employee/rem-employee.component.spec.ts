import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemEmployeeComponent } from './rem-employee.component';

describe('RemEmployeeComponent', () => {
  let component: RemEmployeeComponent;
  let fixture: ComponentFixture<RemEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
