import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddProductService } from "src/app/services/add-product.service";
import { SnackBarService } from "src/app/services/snackbar.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { AddCategoryDialogueComponent } from "../add-category.component";
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-cat-dial-table',
  templateUrl: './cat-dial-table.component.html',
  styleUrls: ['./cat-dial-table.component.css'],
})
export class CatDialTableComponent implements OnInit {
  // categories: any[] = [];
  categories!: MatTableDataSource<any>;
  displayedColumns: string[] = ['sno', 'name','Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CatDialTableComponent>,
    private AddProductService:AddProductService,
    private snackBar: SnackBarService,
    public dialog: MatDialog

  ) {}
  hasData: boolean = false;

  ngOnInit(): void {
   
    const val ={
      Table_name:"category"
    }
    this.AddProductService.getData_common(val).subscribe(data=>{
    //   console.log(data.data)
    this.hasData = data.data.length > 0;
      this.categories = new MatTableDataSource(data.data);
      this.categories.paginator = this.paginator;
      this.categories.sort = this.sort;
    })

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categories.filter = filterValue.trim().toLowerCase();

    if (this.categories.paginator) {
      this.categories.paginator.firstPage();
    }
  }

  opencategoryDialogue(id: number): void {
    const dialogRef = this.dialog.open(AddCategoryDialogueComponent, {
      width: '600px',
      height: '250px',
      data: { 
        id:id,
        flag:'edit'
      }  
    });
    this.dialogRef.close();
  
    dialogRef.afterClosed().subscribe((result: any) => {
        // console.log(result)
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}