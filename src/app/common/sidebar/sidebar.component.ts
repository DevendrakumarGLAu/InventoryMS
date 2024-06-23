import { Component, OnInit } from '@angular/core';
import {sidebarMenuConfig} from './config'
import { AddProductService } from 'src/app/services/add-product.service';
// import { Router } from '@angular/router';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
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
  activeMenuId: number | null = null;
  // route!: string;
  constructor(private AddProductService:AddProductService,
    private router:Router,
    private route:ActivatedRoute
  ){}

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
    this.getActiveMenuId()
  }
  getActiveMenuId(): void {
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams?.['menuid']) {
      this.activeMenuId = parseInt(atob(queryParams?.['menuid']), 10);
    } else {
      this.activeMenuId = null;
    }
  }
}
