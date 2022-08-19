import { Component, OnInit } from '@angular/core';

import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(private service:SharedService) { }

  Departments:any=[];

  ngOnInit(): void {
    this.RefreshDepartmens();
  }

  RefreshDepartmens(){
    this.service.getAllDepartmentNames().subscribe(data => {
      this.Departments = data;
    })
  }

}
