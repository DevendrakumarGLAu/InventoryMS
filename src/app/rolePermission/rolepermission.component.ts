import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { sidebarMenuConfig } from "../common/sidebar/config";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: 'app-rolepermission',
    templateUrl: './rolepermission.component.html',
    styleUrls: ['./rolepermission.component.css']
})
export class rolePermissionComponent implements OnInit { 
  sidebarMenuConfig = sidebarMenuConfig;
  displayedColumns: string[] = ['sno', 'menuItem', 'view', 'add', 'edit', 'delete'];
  dataSource!: MatTableDataSource<any>;
  panelOpenState = false;
    constructor() {}

    ngOnInit(): void {
      this.dataSource = new MatTableDataSource(this.sidebarMenuConfig);
    // this.createForm();
  }

}