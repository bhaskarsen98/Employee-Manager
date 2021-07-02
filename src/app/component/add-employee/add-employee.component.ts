import { Component, OnInit } from '@angular/core';
import { employee } from 'src/app/domain/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  
  employeeDialog: boolean;
  submitted: boolean;
  tempEmp: employee;
  constructor(public empService: EmployeeService) { }

  ngOnInit(): void { 
  }

  openNew() {
    this.tempEmp = {
      empName: '',
      jobTitle: '',
      status: false
    };
    this.submitted = false;
    this.employeeDialog = true;
}

  hideDialog() {
    this.employeeDialog = false;
    this.submitted = false;
  }
  saveEmployee() {
    this.empService.create(this.tempEmp).subscribe(res =>{ 
      console.log('employee added!');
      this.employeeDialog = false;
      location.reload(true); //wrong way , use routes and shift button to table component. Call ngOnINit hook there

    })
  }

}
