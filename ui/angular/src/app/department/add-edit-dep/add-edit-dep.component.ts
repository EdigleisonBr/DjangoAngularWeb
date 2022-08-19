import { Component, OnInit, Input } from '@angular/core';

import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {

  constructor( private service: SharedService ) { }

  @Input() dep:any;

  DepartmentId?:string;
  DepartmentName?:string;

  ngOnInit(): void {
    this.DepartmentId = this.dep.department_id;
    this.DepartmentName = this.dep.department_name;
    console.log(this.DepartmentId)
  }
  
  addDepartment(){
    var val = {
      department_id: this.DepartmentId,
      department_name: this.DepartmentName
    };
    console.log('add: ',val)
    this.service.addDepartment(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateDepartment(){
    var val = {
      department_id: this.DepartmentId,
      department_name: this.DepartmentName
    };
      this.service.updateDepartment(val).subscribe(res => {
      alert(res.toString());
    });
  }

}
