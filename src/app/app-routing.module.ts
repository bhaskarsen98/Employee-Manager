import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddEmployeeComponent } from './component/add-employee/add-employee.component';
import { EditEmployeeComponent } from './component/edit-employee/edit-employee.component';
import { TableComponent } from './component/table/table.component';
import { RemEmployeeComponent } from './component/rem-employee/rem-employee.component';

const routes: Routes = [
  { path: 'POC', redirectTo: 'POC/table', pathMatch: 'full'},
  { path: 'POC/table', component: TableComponent },
  { path: 'POC/add', component: AddEmployeeComponent },
  { 
    path: 'POC/:id', component: EditEmployeeComponent,
    children: [
      { path: '', redirectTo: 'edit', pathMatch: 'full' },
      { path: 'edit', component: EditEmployeeComponent },
      ],
  } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
