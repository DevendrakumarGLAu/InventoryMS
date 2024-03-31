import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-productdialogue',
  templateUrl: './productdialogue.component.html',
  styleUrls: ['./productdialogue.component.css'],
})
export class ProductDialogueComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductDialogueComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}