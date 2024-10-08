import { Component, OnInit, ViewChild } from '@angular/core';
import { AddProductService } from '../services/add-product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snackbar.service';
// import { dataProcesingDelete } from './config';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  productdata: any;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Sno',
    'category',
    'productName',
    'price',
    'quantity',
    'manufacturingDate',
    'expiryDate',
    'actions'
  ];

  pageSize = 10;
  pageSizeOptions = [10, 25, 100];
  length = 100;
  hasData: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private AddProductService: AddProductService,
    private router: Router,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.loaddata();
  }
  loaddata() {
    const val ={
      Table_name:"add_product_details apd LEFT JOIN category c ON apd.category = c.id LEFT JOIN productname p ON apd.productName = p.id ORDER BY apd.id desc",
      column_string:"apd.id, apd.quantity, apd.price, apd.manufacturingDate, apd.expiryDate, c.name AS category, p.name AS productName",
    }
    
    this.AddProductService.getData_common(val).subscribe((data: any) => {
      // this.productdata = data['data'][0];
      this.productdata = data.data;
      console.log("this product",this.productdata);
      this.hasData = this.productdata.length > 0;
        this.dataSource = new MatTableDataSource(this.productdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  editProduct(id: number) {
    this.router.navigate(['/addproduct/adddetails'], {
      queryParams: { id: id },
    });
  }
  dataProcessingDeletes(id: number) {
    return {
      table_name: 'add_product_details',
      row_ids: id,
      action: 'delete',
    };
  }
  delete(id: number) {
    const payload = this.dataProcessingDeletes(id);
    // console.log(payload);
    this.AddProductService.deleteProduct(payload).subscribe(
      (response) => {
        if (response.status === 'success') {
          let message = response.message;
          this.snackBar.openSnackBarSuccess([message]);
          this.loaddata();
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

