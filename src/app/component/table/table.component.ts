import { Component, OnInit } from '@angular/core';
import { employee } from 'src/app/domain/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  temp: employee[] = [];
  isBusy: boolean = false;  //when dialog is open

  // edit-employee
  employeeDialog: boolean;
  submitted: boolean; //invalid/empty field
  tempEmp: employee;
  id: string;

  constructor(public empService: EmployeeService) { }

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

  //edit-employee
  openNew(CurrId: string) { 
    console.log("inOpen");
    this.id = CurrId;
    this.empService.getById(this.id).subscribe((data: employee) => {  //prepopulate data
      this.tempEmp = data;
    });
    this.submitted = false;
    this.employeeDialog = true;
  }

  hideDialog() {
    this.employeeDialog = false;
    this.submitted = false;
  }
  editEmployee() {
    this.submitted = true;
    // console.log(this.tempEmp);
    if(this.tempEmp.empName != '' && this.tempEmp.jobTitle != ''){
      this.empService.update(this.id, this.tempEmp).subscribe(() => {
        // console.log("employeeUpdated");
        this.ngOnInit();  //reload table
        this.hideDialog();
        
      });
    }
  }

}


