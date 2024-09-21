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

        // Set active menu on route change
        this.router.events.subscribe(() => {
          const currentMenuId = this.sidebaritems.find((item: any) => this.router.isActive(item.route, true))?.id || null;
          if (currentMenuId !== this.activeMenuId) {
            this.setActiveSubMenu(this.sidebaritems.find((item:any) => item.id === currentMenuId));
          }
        });
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      }
    }
  }

  setActiveSubMenu(menuItem: any): void {
    // Close any open submenu if a different menu item is clicked
    if (this.openSubmenuId$.value !== menuItem.id) {
      this.openSubmenuId$.next(menuItem.id);
      localStorage.setItem('openSubmenuId', menuItem.id.toString());
    } else {
      this.openSubmenuId$.next(null);
      localStorage.removeItem('openSubmenuId');
    }
    localStorage.setItem('activeMenuId', menuItem.id.toString());
    this.activeMenuId = menuItem.id; // Update active menu
  }

  isSubmenuOpen(menuItem: any): boolean {
    return this.openSubmenuId$.value === menuItem.id;
  }
}
