import { NgModule } from "@angular/core";
import { SellingComponent } from "./selling.component";
import { CommonModule } from "@angular/common";
import { sellingRoutingModule } from "./selling.routing.module";

@NgModule({
  declarations: [SellingComponent],
  imports: [sellingRoutingModule,CommonModule],
})
export class sellingModule {}