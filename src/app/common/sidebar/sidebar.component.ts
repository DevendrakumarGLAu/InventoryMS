import { Component } from '@angular/core';
import {sidebarMenuConfig} from './config'

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  submenu?: MenuItem[];
  showSubmenu?: boolean; // This property is optional as it's added dynamically
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  sidebaritems = sidebarMenuConfig;

  toggleSubmenu(event: MouseEvent, menuItem: MenuItem) {
    event.preventDefault();
    menuItem.showSubmenu = !menuItem.showSubmenu;
  }
}
