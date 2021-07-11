import { Component, OnInit, Input } from '@angular/core';
import { employee } from 'src/app/domain/employee';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  
  tempEmp: employee;
  employeeDialog: boolean;
  submitted: boolean;
  id: string;
  constructor(private router: ActivatedRoute, public empService: EmployeeService) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      console.log('reachedEditComp');
      this.id = params['id'];
      this.empService.getById(this.id).subscribe((data: employee) => {
        this.tempEmp = data;
      });
      this.openNew();
    });

    this.submitted = false;
    this.employeeDialog = true;

    
    
  }

  openNew() {    
    
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
    });
    
  }

}
