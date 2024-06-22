import { Component, OnInit } from '@angular/core';
import {sidebarMenuConfig} from './config'
import { AddProductService } from 'src/app/services/add-product.service';
interface MenuItem {
  label: string;
  route: string;
  icon: string;
  submenu?: MenuItem[];
  showSubmenu?: boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  // sidebaritems = sidebarMenuConfig;
  sidebaritems:any = [];
  constructor(private AddProductService:AddProductService){}

  // toggleSubmenu(event: MouseEvent, menuItem: MenuItem) {
  //   event.preventDefault();
  //   menuItem.showSubmenu = !menuItem.showSubmenu;
  // }
  ngOnInit(): void {
    const AccountId = localStorage.getItem('id')
    console.log(AccountId)
    const value = {
      id:AccountId
    }
    this.AddProductService.sidebarConfig(value).subscribe(data =>{
      console.log(data)
      this.sidebaritems = data
    })
  }
}
