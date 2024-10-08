import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddProductService } from '../services/add-product.service';
import { SnackBarService } from '../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-print-bill',
  templateUrl: './print-bill.component.html',
  styleUrls: ['./print-bill.component.css']
})
export class PrintBillComponent implements OnInit {
  displayedColumns: string[] = ['Sno','name', 'mobile', 'actions'];
  dataSource!: MatTableDataSource<any>;
  hasData: boolean = false;
  productdata: any;
  length: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private AddProductService: AddProductService,
    private snackBar: SnackBarService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const val = {
      Table_name: "customer_orders_bill"
  }
  this.AddProductService.getData_common(val).subscribe(data =>{
    console.log(data.data)
  // })
  //   this.AddProductService.get_saved_order().subscribe((data: any) => {
      this.productdata = data.data;
      console.log("this product", this.productdata);
      this.hasData = this.productdata.length > 0;
      this.dataSource = new MatTableDataSource(this.productdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: number) {
    const payload = {
      table_name: 'customer_orders_bill',
      row_ids: id,
      action: 'delete',
    }
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
}
