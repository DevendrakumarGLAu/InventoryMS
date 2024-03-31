import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  GetProductform(): Observable<any[]> {
    return this.http.get<any[]>('./assets/Addproduct.json');
  }
  getProductDetails(productId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getproduct/${productId}`);
  }

  addProduct(productData: any) {
    return this.http.post<any[]>(`${this.apiUrl}/addproduct`, productData);
  }
  getProductData() {
    return this.http.get<any[]>(`${this.apiUrl}/getproducts`);
  }
  getProductById(productId: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/get_productby_id?id=${productId}`
    );
  }
  deleteProduct(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/db_operation`, payload);
  }
}