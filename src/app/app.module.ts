import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule,HttpHeaders} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';

//components

import { TableComponent } from './component/table/table.component';
import { AddEmployeeComponent } from './component/add-employee/add-employee.component';
import { EditEmployeeComponent } from './component/edit-employee/edit-employee.component';
import { RemEmployeeComponent } from './component/rem-employee/rem-employee.component';

//primeNg imports

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog'; //to-do
// import {ConfirmationService} from 'primeng/api';  //to-do
import {RadioButtonModule} from 'primeng/radiobutton';
import {ToolbarModule} from 'primeng/toolbar';
import {TabViewModule} from 'primeng/tabview';
import {PaginatorModule} from 'primeng/paginator';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    RemEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // HttpHeaders,
    TableModule,
    InputTextModule,
    FormsModule,
    ToggleButtonModule,
    DialogModule,
    ConfirmDialogModule,
    // ConfirmationService,
    RadioButtonModule,
    ToolbarModule,
    TabViewModule,
    PaginatorModule,
    ProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
