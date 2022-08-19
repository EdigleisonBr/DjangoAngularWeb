import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: SharedService) { }

  Employees:any = [];

  ngOnInit(): void {
    this.refreshEmployees();  
  }

  refreshEmployees(){
    this.service.getAllEmployeeNames().subscribe(data => {
      this.Employees = data;
    })
  }

}
