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
  isBusy: boolean = false;

  // edit-employee
  employeeDialog: boolean;
  submitted: boolean;
  tempEmp: employee;
  id: string;

  constructor(public empService: EmployeeService) { }

  ngOnInit(): void { 
    //loads table using get req
    this.empService.get().subscribe((data: employee[]) => {
      this.temp = data;
    })
  }

  //delete func calls delete req
  deleteEmployee(e: employee) {
    this.isBusy = true;
    this.empService.delete(e.id).subscribe(() => {  
      this.isBusy = false;
      this.ngOnInit();  //reloads the table by get call in oninit hook 
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
    // console.log(this.tempEmp);
    this.empService.update(this.id, this.tempEmp).subscribe(() => {
      console.log("employeeUpdated");
      this.hideDialog();
      this.ngOnInit();  //reload table
    });
    
  }

}


