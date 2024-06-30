import { Component, OnInit } from '@angular/core';
import { sidebarMenuConfig } from './config'
import { AddProductService } from 'src/app/services/add-product.service';
// import { Router } from '@angular/router';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // sidebaritems = sidebarMenuConfig;
  sidebaritems: any = [];
  childMenu:any =[];
  activeMenuId: number | null = null;
  AccountId: any
  // route!: string;
  constructor(private AddProductService: AddProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.AccountId = localStorage.getItem('AccountId')
  }

  // toggleSubmenu(event: MouseEvent, menuItem: MenuItem) {
  //   event.preventDefault();
  //   menuItem.showSubmenu = !menuItem.showSubmenu;
  // }
  async ngOnInit(): Promise<void> {
    this.AccountId = localStorage.getItem('AccountId');
    if (this.AccountId) {
      const value = {
        id: this.AccountId
      };

      try {
        const data = await this.AddProductService.sidebarConfig(value).toPromise();
        console.log(data);
        this.sidebaritems = data;
        
        
        // this.getActiveMenuId();
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
        // Handle error if needed
      }
    }
  }

  // getActiveMenuId(): void {
  //   const queryParams = this.route.snapshot.queryParams;
  //   if (queryParams?.['menuid']) {
  //     this.activeMenuId = parseInt(atob(queryParams?.['menuid']), 10);
  //   } else {
  //     this.activeMenuId = null;
  //   }
  // }

}
