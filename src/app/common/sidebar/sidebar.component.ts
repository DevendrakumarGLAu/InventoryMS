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

        // Set active menu on route change
        this.router.events.subscribe(() => {
          this.activeMenuId = this.sidebaritems.find((item:any) => this.router.isActive(item.route, true))?.id || null;
        });
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      }
    }
  }

  setActiveSubMenu(menuItem: any): void {
    this.openSubmenuId$.next(this.openSubmenuId$.value === menuItem.id ? null : menuItem.id);
  }

  isSubmenuOpen(menuItem: any): boolean {
    return this.openSubmenuId$.value === menuItem.id;
  }
}
