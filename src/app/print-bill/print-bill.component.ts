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
  displayedColumns: string[] = ['Sno', 'category_id', 'category_name', 'product_id', 'product_name', 'quantity'];
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
    this.AddProductService.get_saved_order().subscribe((data: any) => {
      this.productdata = data.data;
      console.log("this product", this.productdata);
      this.hasData = this.productdata.orders.length > 0;
      this.dataSource = new MatTableDataSource(this.productdata.orders);
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

  delete(id: any) {
    // Implement your delete logic here
  }
}
