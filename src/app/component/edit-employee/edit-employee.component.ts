import { Component, OnInit } from '@angular/core';
import { employee } from 'src/app/domain/employee';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employeeDialog: boolean;
  submitted: boolean;
  tempEmp: employee;
  id: string;
  constructor(private route: ActivatedRoute, public empService: EmployeeService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('reachedEditComp');
      this.id = params['id'];
      this.empService.getById(this.id).subscribe((data: employee) => {
        this.tempEmp = data;
      });
      this.openNew();
    });

    
    
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
