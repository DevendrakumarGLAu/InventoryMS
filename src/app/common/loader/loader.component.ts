import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  loading:boolean = false;

  constructor(public LoaderService:LoaderService){
  }
  ngOnInit(){
    this.LoaderService.getisLoading().subscribe(loading =>{
      this.loading=loading;
      console.log(this.loading,"loader")
    })
  }
}
