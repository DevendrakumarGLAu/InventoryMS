import { Component,OnInit } from '@angular/core';
import { AddProductService } from '../services/add-product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  productdata: any;
  totalCostPrice: number = 0;
  totalSellingPrice: number = 0;
  totalCategories: number = 0;
  totalProfit: number = 0;
  constructor(private AddProductService: AddProductService){}
  ngOnInit(): void {
    this.AddProductService.getProductData().subscribe((data: any) => {
      this.productdata = data;
      this.productdata = this.productdata.data;

      // Calculate total cost price, selling price, categories, and profit
      this.productdata.forEach((product: any) => {
        this.totalCostPrice += product.costPrice;
        this.totalSellingPrice += product.sellingPrice;
        if (!this.productdata.some((p: any) => p.category === product.category)) {
          this.totalCategories++;
        }
        this.totalProfit += (product.sellingPrice - product.costPrice);
      });

      // Difference between cost and profit
      const costProfitDiff = this.totalSellingPrice - this.totalCostPrice;
      console.log("Total Cost Price:", this.totalCostPrice);
      console.log("Total Selling Price:", this.totalSellingPrice);
      console.log("Total Categories:", this.totalCategories);
      console.log("Total Profit:", this.totalProfit);
      console.log("Difference between Cost and Profit:", costProfitDiff);
    });
  }
}
