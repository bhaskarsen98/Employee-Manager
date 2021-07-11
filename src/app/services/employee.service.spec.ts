import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'; 
import { EmployeeService } from './employee.service';
import { employee } from '../domain/employee';
import { HttpClient, HttpResponse } from '@angular/common/http';



describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpc: HttpClient;
  let httpTestingController: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EmployeeService);
    httpc = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  
  //test 1
  //check if component/service is created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //test 2
  describe('service.get()', () => {
    let expEmp: employee[];
    beforeEach(() =>{
      //create mock data before response
      expEmp = [
        {id : 1, empName: 'a', jobTitle: 'manager', status: 'true'},
        {id : 2, empName: 'b', jobTitle: 'general manager', status: 'true'},
        {id : 3, empName: 'c', jobTitle: 'assistant manager', status: 'true'},

      ] as employee[];
    });
    it('should return list of employees present in db when called', () => {
      service.get().subscribe(data => expect(data).toEqual(expEmp)
      );
      //mention the type and format of req
      const req = httpTestingController.expectOne(service.apiServer+service.dbFile);
      expect(req.request.method).toEqual('GET');
      //data for request to return 
      req.flush(expEmp);
    });
  });


  // test 3
  describe('service.create()', () => {
    it('should add new employee passed as arg', () => {
      const expEmp: employee = {
        id: 1,
        empName: 'abc',
        jobTitle: 'intern',
        status: 'true',
      };
      service.create(expEmp).subscribe(
        //removed json.stringify or the object props are changed to string
        data => expect(data).toEqual(expEmp)
      );
      //create makes 1 Post request
      const req = httpTestingController.expectOne(service.apiServer+service.dbFile);

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(expEmp);

      //return the object that was sent with POST
      const expRes = new HttpResponse({status: 201, statusText: 'Create successful', body: expEmp});
      req.event(expRes);
    });  
  });

  // test 4
  describe('service.delete()', () => {
    it('should delete the correct id passed to it and return it', () =>{
      
      const id = 1;
      service.delete(id).subscribe((data) => {
        // console.log(data);
        expect(data).toEqual(id)
      });

      const req = httpTestingController.expectOne(service.apiServer + service.dbFile + id);
      // toBe() versus toEqual(): toEqual() checks equivalence. toBe(),
      //  on the other hand, makes sure that they're the exact same object.
      // == vs ===
      expect(req.request.method).toEqual('DELETE');

      req.flush(id);

    });
  });

  //test 5
  describe('service.update()', () => {
    let expEmp: employee;
    beforeEach(() =>{
      //create mock data before response
      expEmp =  {
        id : 1, 
        empName: 'a', 
        jobTitle: 'manager', 
        status: 'true'
      } as employee;
    });
    it('should update the correct record', () => {
      service.update(expEmp.id, expEmp).subscribe((data) => {
        console.log(data);
        expect(data).toEqual(expEmp)
      });


    const req = httpTestingController.expectOne(service.apiServer + service.dbFile + expEmp.id);
    expect(req.request.method).toEqual('PUT');

    req.flush(expEmp);

    });
  });
  //test 6
  describe('service.getById()', () => {
    let expEmp: employee;
    beforeEach(() =>{
      //create mock data before response
      expEmp =  {
        id : 1, 
        empName: 'a', 
        jobTitle: 'manager', 
        status: 'true'
      };
    });
    it('should get the correct record', () => {
      service.getById(expEmp.id).subscribe(data => {
        // console.log(data);
        expect(data).toEqual(expEmp)
      });
    

    const req = httpTestingController.expectOne(service.apiServer+service.dbFile+expEmp.id);
    expect(req.request.method).toEqual('GET');
    //make a Get request
    req.flush(expEmp);

    });
  });  
});
