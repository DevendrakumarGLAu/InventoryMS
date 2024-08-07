import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddProductService } from '../services/add-product.service';
import { SnackBarService } from '../services/snackbar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
userData: any;
hasData: boolean = false;
displayedColumns: string[] = ['Sno', 'name', 'email', 'phone','address','role', 'action'];
dataSource!: MatTableDataSource<any>;
pageSize = 10;
pageSizeOptions = [10, 25, 100];
length = 100;
roleid:any
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(private AddProductService:AddProductService,
    private snackbar:SnackBarService,
    private router:Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    const role_payload = {
      Table_name: 'roles',
    }
    this.AddProductService.getData_common(role_payload).subscribe(data =>{
      this.roleid = data.data[0]['id']
      console.log(data.data)
    })
    const value = {
      Table_name: 'users_details',
    }
    this.AddProductService.getData_common(value).subscribe(data => {
      this.userData = data.data;
      console.log("this userData",this.userData);
      const roleId = this.roleid.id;
  const roleName = this.roleid.role_name;

  this.userData.forEach((user: any) => {
    if (user.role == roleId) {
      user.role = roleName;
    }
  });
      this.hasData = this.userData.length > 0;
      // console.log("has data", this.hasData)
      // this.productdata = this.productdata.data;
      this.dataSource = new MatTableDataSource(this.userData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }
  editProduct(id: number) {
    this.router.navigate(['/selling/add'], {
      queryParams: { id: id },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
}

}
