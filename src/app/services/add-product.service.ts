import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class AddProductService{
    constructor(private http:HttpClient){ }

    GetProductform():Observable<any[]>{
        return this.http.get<any[]>('./assets/Addproduct.json')
    }
}