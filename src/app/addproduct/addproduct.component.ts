import { Component,OnInit } from '@angular/core';
import { AddProductService } from '../services/add-product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  productdata: any;

  constructor(private AddProductService: AddProductService) {}
  ngOnInit(): void {
    this.AddProductService.getProductData().subscribe(data =>{
      this.productdata= data;
      this.productdata=this.productdata.data
      console.log(this.productdata);
    })
  }

  
}
