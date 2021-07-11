import { Component, OnInit } from '@angular/core';
import { employee } from 'src/app/domain/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  temp: employee[] = [];
  isBusy: boolean = false;  //when dialog is open
  useCase: string = ''; //for opening add/edit dialog
  
  // add-edit-employee dialog
  employeeDialog: boolean;
  submitted: boolean; //invalid/empty field
  tempEmp: employee;
  id: string;

  constructor(private httpc: HttpClient, public empService: EmployeeService) { }

  ngOnInit(): void { 
    //loads table using get req
    this.isBusy = true;
    this.empService.get().subscribe((data: employee[]) => {
      this.temp = data;
      this.isBusy = false;
    })
  }

  //delete func calls delete req
  deleteEmployee(e: employee) {
    this.empService.delete(e.id).subscribe(() => {  
      this.ngOnInit();  //reloads the table by get call in ngOninit hook 
    });
    
  };

  //add-edit-employee
  //open dialog and initialize the fields
  openNew(CurrId: string) { 
    console.log("inOpen");
    if(CurrId != '') {
      this.useCase = 'Edit';
      this.id = CurrId;
      this.empService.getById(this.id).subscribe((data: employee) => {  //prepopulate data
        this.tempEmp = data;
      });
    } else {
      this.useCase = 'Add';
      this.tempEmp = {
        empName: '',
        jobTitle: '',
        status: 'false'
      };
    }
    this.submitted = false;
    this.employeeDialog = true;
  }

  //hide dialog using cancel button
  hideDialog() {
    this.employeeDialog = false;
    this.submitted = false;
  }

  //save changes based useCase 
  saveChanges() {
    if(this.useCase == 'Edit'){
      this.editEmployee();
    } else if(this.useCase == 'Add'){
      this.saveEmployee();
    } else {

    }

  }
  editEmployee() {
    this.submitted = true;
    if(this.tempEmp.empName != '' && this.tempEmp.jobTitle != ''){
      this.empService.update(this.id, this.tempEmp).subscribe(() => {
        this.ngOnInit();  //reload table
        this.hideDialog();
        
      });
    }
  }

  saveEmployee() {
    this.submitted = true;
    if(this.tempEmp.empName != '' && this.tempEmp.jobTitle != ''){
      this.empService.create(this.tempEmp).subscribe(res =>{ 
        console.log('employee added!');
        this.employeeDialog = false;
        this.submitted = true;
        // location.reload(true); //wrong way , use routes and shift button to table component. Call ngOnINit hook there(get call to reload table)
        this.ngOnInit();  //reload table
        this.hideDialog();

      })
    }
  }

}


