import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TableComponent } from './table.component';
import { employee } from 'src/app/domain/employee';
import { EmployeeService } from '../../services/employee.service'
import { of } from 'rxjs';


const mockObj = {
  "id": 99,
  "empName": "Kimmi",
  "status": "true",
  "jobTitle": "VP Marketing"
};

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let httpc: HttpClient;
  let httpTestingController: HttpTestingController
  let service: EmployeeService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpc = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(EmployeeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set default params and load the data for table', () => {
    spyOn(service, 'get').and.returnValue(of([mockObj]));
    component.ngOnInit();
    expect(service.get).toHaveBeenCalled();
    expect(component.temp).toEqual([mockObj]);
  });

  it('should delete an employee', () => {
    spyOn(service, 'delete').and.returnValue(of(mockObj.id));
    spyOn(component, 'ngOnInit');
    component.deleteEmployee(mockObj);
    expect(service.delete).toHaveBeenCalledWith(mockObj.id);
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should open the dialog with emp details if edit mode is called', () => {
    component.useCase = '';
    component.id = '';
    component.tempEmp = null;
    spyOn(service, 'getById').and.returnValue(of(mockObj));

    component.openNew(mockObj.id.toString());

    expect(component.useCase).toEqual('Edit');
    expect(component.id).toEqual(mockObj.id.toString());
    expect(service.getById).toHaveBeenCalledWith(mockObj.id.toString());
    expect(component.tempEmp).toEqual(mockObj);

  });

  it('should open dialog with default values if new emp is added', () => {
    component.useCase = null;
    component.id = null;
    component.tempEmp = null;

    component.openNew('');

    expect(component.useCase).toEqual('Add');
    expect(component.tempEmp).toEqual({
      empName: '',
      jobTitle: '',
      status: 'false'
    });
  });

  it('should set flags when dialog is opened', () => {
    component.openNew('');
    expect(component.submitted).toBeFalse();
    expect(component.employeeDialog).toBeTrue();
  });

  it('should unset flags when dialog is closed', () => {
    component.hideDialog();
    expect(component.submitted).toBeFalse();
    expect(component.employeeDialog).toBeFalse();
  });

  it('should call the method based on use case', () => {
    // when use case is 'Edit'
    component.useCase = 'Edit';
    spyOn(component, 'editEmployee');
    component.saveChanges();
    expect(component.editEmployee).toHaveBeenCalled();

    // when use case is 'Add'
    component.useCase = 'Add';
    spyOn(component, 'saveEmployee');
    component.saveChanges();
    expect(component.saveEmployee).toHaveBeenCalled();
  });

  it('should edit employee details when called', () => {
    const newMock = mockObj;
    newMock.empName = 'Rocketman';
    component.tempEmp = newMock;
    component.id = newMock.id.toString();
    spyOn(service, 'update').and.returnValue(of(newMock));
    spyOn(component, 'ngOnInit');
    spyOn(component, 'hideDialog');
    component.editEmployee();

    expect(component.submitted).toBeTrue();
    expect(service.update).toHaveBeenCalledWith(mockObj.id.toString(), newMock);
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.hideDialog).toHaveBeenCalled();
  });

  it('save employee details', () => {
    component.tempEmp = mockObj;
    component.id = mockObj.id.toString();
    spyOn(service, 'create').and.returnValue(of(mockObj));
    spyOn(component, 'ngOnInit');
    spyOn(component, 'hideDialog');
    component.saveEmployee();

    expect(component.submitted).toBeTrue();
    expect(service.create).toHaveBeenCalledWith(mockObj);
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.hideDialog).toHaveBeenCalled();
  });

  it('should not save details if name job is empty', () => {
    component.tempEmp = mockObj;
    component.tempEmp.empName = '';
    component.tempEmp.jobTitle = '';
    spyOn(service, 'create').and.returnValue(of(mockObj));

    component.saveEmployee();

    expect(component.submitted).toBeTrue();
    expect(service.create).not.toHaveBeenCalled()

  });

  it('should not save edited details if name job is empty', () => {
    const newMock = mockObj;
    newMock.empName = '';
    component.tempEmp = newMock;
    component.id = newMock.id.toString();
    spyOn(service, 'update').and.returnValue(of(newMock));
    component.editEmployee();

    expect(component.submitted).toBeTrue();
    expect(service.update).not.toHaveBeenCalled()

  });
});
