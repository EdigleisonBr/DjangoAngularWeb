import { Component, OnInit, Input } from '@angular/core';

import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor( private service: SharedService ) { }

  @Input() emp:any;

  EmployeeId?:string;
  EmployeeName?:string;
  Deparment?:string;
  DateOfJoining?:string;
  PhotoFileName?:string;
  PhotoFilePath?:string;

  DepartmentsList:any = []; 

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  loadDepartmentList(){
    this.service.getAllDepartmentNames().subscribe( (data:any) => {
      this.DepartmentsList = data;

      this.EmployeeId = this.emp.employee_id;
      this.EmployeeName = this.emp.employee_name;
      this.Deparment = this.emp.department;
      this.DateOfJoining = this.emp.date_of_joining;
      this.PhotoFileName = this.emp.photo_file_name;
      this.PhotoFilePath = this.service.PhotoUrl + this.emp.photo_file_name;
    })
    console.log(this.service.PhotoUrl + this.emp.photo_file_name)
  }
  
  addEmployee(){
    var val = {
      employee_id: this.EmployeeId,
      employee_name: this.EmployeeName,
      department: this.Deparment,
      date_of_joining: this.DateOfJoining,
      photo_file_name: this.PhotoFileName
    };
    this.service.addEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateEmployee(){
    var val = {
      employee_id: this.EmployeeId,
      employee_name: this.EmployeeName,
      department: this.Deparment,
      date_of_joining: this.DateOfJoining,
      photo_file_name: this.PhotoFileName
    };
      this.service.updateEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }

  uploadPhoto(event:any){
    var file = event.target.files[0];
    
    const formData:FormData = new FormData();
    formData.append('uploaded_file', file, file.name);
    console.log(file)

    this.service.uploadPhoto(formData).subscribe((data:any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
    })
  }

}
