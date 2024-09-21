import { Component, OnInit } from '@angular/core';
import { AddProductService } from 'src/app/services/add-product.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sidebaritems: any = [];
  activeMenuId: number | null = null;
  AccountId: any;
  openSubmenuId$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  constructor(private AddProductService: AddProductService, private router: Router) {
    this.AccountId = localStorage.getItem('AccountId');
  }

  async ngOnInit(): Promise<void> {
    this.AccountId = localStorage.getItem('AccountId');
    if (this.AccountId) {
      const value = { id: this.AccountId };
      try {
        const data = await this.AddProductService.sidebarConfig(value).toPromise();
        this.sidebaritems = data;

        const storedOpenSubmenuId = localStorage.getItem('openSubmenuId');
        const storedActiveMenuId = localStorage.getItem('activeMenuId');

        if (storedOpenSubmenuId) {
          this.openSubmenuId$.next(Number(storedOpenSubmenuId));
        }
        if (storedActiveMenuId) {
          this.activeMenuId = Number(storedActiveMenuId);
        }

        // Set active menu and submenu on route change
        this.router.events.subscribe(() => {
          this.setActiveMenuAndSubMenu();
        });
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      }
    }
  }

  setActiveMenuAndSubMenu(): void {
    const currentRoute = this.router.url.split('?')[0]; // Get the base URL without query params
    let foundActiveMenuId = null;
    let foundOpenSubmenuId = null;

    for (const menuItem of this.sidebaritems) {
      if (menuItem.childmenu) {
        for (const subMenuItem of menuItem.childmenu) {
          if (currentRoute.includes(subMenuItem.route)) {
            foundActiveMenuId = menuItem.id;
            foundOpenSubmenuId = menuItem.id;
            break;
          }
        }
      }
    }

    // Update states based on found IDs
    if (foundActiveMenuId) {
      this.activeMenuId = foundActiveMenuId;
      this.openSubmenuId$.next(foundOpenSubmenuId);
      localStorage.setItem('openSubmenuId', foundOpenSubmenuId.toString());
      localStorage.setItem('activeMenuId', foundActiveMenuId.toString());
    }
  }

  setActiveSubMenu(menuItem: any): void {
    const newOpenSubmenuId = this.openSubmenuId$.value === menuItem.id ? null : menuItem.id;
    this.openSubmenuId$.next(newOpenSubmenuId);
    if (newOpenSubmenuId) {
      localStorage.setItem('openSubmenuId', newOpenSubmenuId.toString());
    } else {
      localStorage.removeItem('openSubmenuId');
    }
    localStorage.setItem('activeMenuId', menuItem.id.toString());
    this.activeMenuId = menuItem.id; // Update active menu
  }

  isSubmenuOpen(menuItem: any): boolean {
    const currentRoute = this.router.url.split('?')[0];
  
    // Check if the current route matches specific routes where submenu should not open
    const excludedRoutes = [
      '/admin/dashboard',
      '/admin/addproduct',
      '/admin/vendors',
      '/admin/printbill',
      '/admin/selling'
    ];
    if (currentRoute == '/admin') {
      return this.openSubmenuId$.value === menuItem.id; // Allow submenu toggle
    }
    // If current route is in excluded routes, return false
    if (excludedRoutes.includes(currentRoute)) {
      return false;
    }
  
    // Check if the menu item is currently open
    return this.openSubmenuId$.value === menuItem.id;
  }
  
  // isSubmenuOpen(menuItem: any): boolean {
  //   const currentRoute = this.router.url.split('?')[0];
  //   // Check if current route matches any child routes
  //   if (menuItem.childmenu) {
  //     return menuItem.childmenu.some((subMenuItem: any) => currentRoute.includes(subMenuItem.route));
  //   }
  //   return false;
  // }
}
