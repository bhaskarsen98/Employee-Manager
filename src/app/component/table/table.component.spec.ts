import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'; 
import { TableComponent } from './table.component';
import { By } from '@angular/platform-browser';
import { employee } from 'src/app/domain/employee';




describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let httpc: HttpClient;
  let httpTestingController: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpc = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click refresh button and call ngOnInit', fakeAsync(() =>{
    let button = fixture.debugElement.query(By.css('.refresh-button'));
    spyOn(component, 'ngOnInit');
    button.triggerEventHandler('click',null);
    tick();
    expect(component.ngOnInit).toHaveBeenCalled();
  }));

  // it('should click new button and call delete', fakeAsync(() =>{
    
  //   const expEmp: employee = {
  //     id: 1,
  //     empName: 'abc',
  //     jobTitle: 'intern',
  //     status: 'true',
  //   };t
  //   component.temp.push(expEmp);
  //   component.temp.push(expEmp);
  //   component.temp.push(expEmp);
  //   console.log(component.temp.length);
  //   let button = fixture.debugElement.query(By.css('.delete-button'));
  //   spyOn(component, 'deleteEmployee');
  //   button.triggerEventHandler('click',expEmp);
  //   tick();
  //   expect(component.deleteEmployee).toHaveBeenCalled();
  // }));
});
