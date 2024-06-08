import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddProductService } from '../services/add-product.service';
import { SnackBarService } from '../services/snackbar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class Role {
  RoleData: any;
  hasData: boolean = false;
  displayedColumns: string[] = ['Sno', 'Rolename', 'Status', 'action'];
  dataSource!: MatTableDataSource<any>;
  pageSize = 10;
  pageSizeOptions = [10, 25, 100];
  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(private AddProductService: AddProductService,
    private snackbar: SnackBarService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    const value = {
      Table_name: 'roles',
    }
    this.AddProductService.getData_common(value).subscribe(data => {
      this.RoleData = data.data;
      // console.log("this userData", this.RoleData);
      this.hasData = this.RoleData.length > 0;
      this.RoleData.forEach((element: any) => {
        element.statusString = element.status === 1 ? 'Active' : 'Inactive';
      });
      this.dataSource = new MatTableDataSource(this.RoleData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  editProduct(id: number) {
    this.router.navigate(['/roles/addRole'], {
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