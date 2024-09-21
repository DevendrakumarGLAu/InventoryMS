import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddProductService } from '../services/add-product.service';
import { SnackBarService } from '../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
  displayedColumns: string[] = ['Sno', 'vendorName',  'companyName', 'email', 'mobile', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  length: number = 0;
  hasData: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  product_id: any;
  constructor(private AddProductService:AddProductService,
    private snackBar:SnackBarService,
    private router:Router,
    ){}

  ngOnInit(): void {
    
    this.loadData();
    
  }
  loadData(){
    const payload = {
      Table_name:'vendors'
    }
    this.AddProductService.getData(payload).subscribe(data =>{
      console.log("data", data.data);
      data.data.forEach((vendor:any) => {
        const prodPayload = {
          id: vendor.product_id,
          Table_name: 'productname'
        };
        this.AddProductService.getData_common(prodPayload).subscribe(data => {
          console.log("Product Name:", data.data);
        });
      });
      
      this.hasData = data.data.length > 0;
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  editProduct(id: number) {
    this.router.navigate(['/vendors/add'], {
      queryParams: { id: id },
    });
  }
  dataProcessingDeletes(id: number) {
    return {
      table_name: 'vendors',
      row_ids: id,
      action: 'delete',
    };
  }
  delete(id: number) {
    const payload = {
      table_name: 'vendors',
      row_ids: id,
      action: 'delete',
    }
    // const payload = this.dataProcessingDeletes(id);
    // console.log(payload);
    this.AddProductService.deleteProduct(payload).subscribe(
      (response) => {
        if (response.status === 'success') {
          let message = response.message;
          this.snackBar.openSnackBarSuccess([message]);
          this.loadData();
        } else {
          this.snackBar.openSnackBarError([response.message]);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
