import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AddProductService } from '../services/add-product.service';
import { Chart, registerables } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
Chart.register(...registerables);
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
  Total_product: number = 0;
  // totalCategories:any=[];
  totalProfit: number = 0;
  Total_sale: number = 0;
  Total_vendors: number = 0;
  @ViewChild('bar') private barCanvas!: ElementRef<HTMLCanvasElement>
  @ViewChild('pie') private pieCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  pieChart!: Chart;
  // productData: any;
  productDetails:any[]=[];
  displayedColumns: string[] = ['category_name', 'expiryDate', 'manufacturingDate', 'price', 'product_name', 'quantity'];
  // dataSource: any;
  dataSource = new MatTableDataSource<Element>(this.productDetails);
  constructor(private AddProductService: AddProductService) { }

  ngOnInit(): void {
    this.calculate_catrgory()
  }
  async calculate_catrgory(): Promise<void> {
    const productVal = {
      Table_name: "add_product_details",
      column_string: "sum(price) as cost, sum(total_selling_price) as selling_price"
    };

    const categoryVal = {
      Table_name: "category",
      column_string: "count(*) as Totalcategory"
    };

    const productNameVal = {
      Table_name: "productname",
      column_string: "count(*) as Totalproduct"
    };
    const vendorval = {
      Table_name: "vendors",
      column_string: "count(*) as Totalvendors"
    };

    try {
      const [productData, categoryData, productNameData, vendorData] = await Promise.all([
        this.AddProductService.getData_common(productVal).toPromise(),
        this.AddProductService.getData_common(categoryVal).toPromise(),
        this.AddProductService.getData_common(productNameVal).toPromise(),
        this.AddProductService.getData_common(vendorval).toPromise()
      ]);

      this.totalCostPrice = productData.data[0]['cost'];
      this.Total_sale = productData.data[0]['selling_price'];
      this.totalProfit = this.Total_sale - this.totalCostPrice;
      this.totalCategories = categoryData.data[0]['Totalcategory'];
      this.Total_product = productNameData.data[0]['Totalproduct'];
      this.Total_vendors = vendorData.data[0]['Totalvendors']
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
    }
    this.createBarChart();
    this.createPieChart();
    this.loadProducts();
  }

  createBarChart(): void {
    const ctx = this.barCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Sales Data',
              data: [65, 59, 80, 81, 56, 55, 40],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          layout: {
            padding: 10,
          },
          plugins:{
            title: {
              display: true,
              text: 'Chart.js bar Chart',
              align: 'start',
              padding:10,
              font:{
                size:15,
                weight:'bolder'
              },
              color:'black'
            },
          },
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
  createPieChart(): void {
    const ctx = this.pieCanvas.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Sales Data',
              data: [65, 59, 80, 81, 56, 55, 40],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: 10,
          },
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Pie Chart',
              align: 'start',
              padding:10,
              
              font:{
                size:15,
                weight:'bolder'
              },
              color:'black'
            
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                }
              }
            }
          }
        }
      });
    }
  }
  loadProducts() {
    const productVal = {
      Table_name: "add_product_details apd JOIN productname p ON apd.productName = p.id JOIN category c ON p.category_id = c.id ORDER BY apd.expiryDate DESC;",
      column_string:"c.name AS category_name, p.name AS product_name,apd.quantity,apd.price,apd.manufacturingDate,apd.expiryDate",
    };
    this.AddProductService.getData_common(productVal).subscribe((res) => {
      this.productDetails = res.data;
      // console.log(this.productDetails)
      this.dataSource = new MatTableDataSource<any>(this.productDetails);
      // this.dataSource.data = this.productDetails;
    });
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }
}
