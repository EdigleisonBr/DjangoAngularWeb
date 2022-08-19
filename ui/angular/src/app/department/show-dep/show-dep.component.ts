import { Component, OnInit } from '@angular/core';

import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService) { }

  DepartmentList:any = [];

  ModalTitle?:string;
  ActivateAddEditDepComp?:boolean = false;
  dep:any;

  DepartmentIdFilter:string = "";
  DepartmentNameFilter:string = "";
  DepartmentListWithoutFilter:any = [];

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick(){
    this.dep={
      department_id: 0,
      depatment_name: ""
    }
    this.ModalTitle="Add Department";
    this.ActivateAddEditDepComp = true;
    console.log('show: ',this.dep);
  }

  editClick(item:any){
    this.dep = item;
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditDepComp = true;

  }

  deleteClick(item:any){
    console.log(item.department_id)
    if(confirm('Are you sure??')){
      this.service.deleteDepartment(item.department_id).subscribe(data => {
        alert(data.toString());
        this.refreshDepList();
      })
    }
  }

  closeClick(){
    this.ActivateAddEditDepComp = false;
    this.refreshDepList();
  }

  refreshDepList(){
    this.service.getDepList().subscribe(data=>{
      this.DepartmentList = data;
      this.DepartmentListWithoutFilter = data;
    })
  }

  FilterFn(){
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (el:any){
      return el.department_id.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      )&&
      el.department_name.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      )
    })
  }

  sortResult(prop:any, asc:any){
    console.log('1: ',prop,asc)
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a:any,b:any){
      console.log('2: ',a,b)
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }
      else{
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }
    })
  }

}
