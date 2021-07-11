import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddEmployeeComponent } from './component/add-employee/add-employee.component';
import { EditEmployeeComponent } from './component/edit-employee/edit-employee.component';
import { TableComponent } from './component/table/table.component';
import { RemEmployeeComponent } from './component/rem-employee/rem-employee.component';

const routes: Routes = [
  // { path: '', redirectTo: 'table', pathMatch: 'full'},
  // { path: 'table', component: TableComponent },
  // { path: 'table/add', component: AddEmployeeComponent },
  // { 
  //   path: 'table/edit/:id', component: EditEmployeeComponent,
  //   // children: [
  //   //   { path: '', redirectTo: 'edit', pathMatch: 'full' },
  //   //   { path: 'edit', component: EditEmployeeComponent },
  //   //   ],
  // } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
