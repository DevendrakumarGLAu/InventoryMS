import { Component, OnInit, ViewChild } from '@angular/core';
import { AddProductService } from '../services/add-product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  productdata: any;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'category', 'productName', 'costPrice', 'sellingPrice', 'quantity'];

  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  length = 100;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private AddProductService: AddProductService) {}

  ngOnInit(): void {
    this.AddProductService.getProductData().subscribe(data => {
      this.productdata = data;
      this.productdata = this.productdata.data;
      this.dataSource = new MatTableDataSource<any>(this.productdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

