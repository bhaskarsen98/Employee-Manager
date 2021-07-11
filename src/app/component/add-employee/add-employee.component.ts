import { Component, OnInit, Input } from '@angular/core';
import { employee } from 'src/app/domain/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  
  employeeDialog: boolean;
  submitted: boolean;
  tempEmp: employee;
  constructor(private router: Router,public empService: EmployeeService) { }

  ngOnInit(): void {
    this.submitted = false;
    this.employeeDialog = true;
    this.tempEmp = {
      empName: '',
      jobTitle: '',
      status: "false"
    };
   }

  hideDialog() {
    this.employeeDialog = false;
    this.submitted = false;
    this.router.navigate(['table']);

  }
  saveEmployee() {
    this.submitted = true;
    if(this.tempEmp.empName != '' && this.tempEmp.jobTitle != ''){

      this.empService.create(this.tempEmp).subscribe(res =>{ 
        console.log('employee added!');
        this.employeeDialog = false;
        this.submitted = true;
        // location.reload(true); //wrong way , use routes and shift button to table component. Call ngOnINit hook there
        this.router.navigate(['table']);

      })
    }
  }

}
