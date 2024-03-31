import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AddComponent } from "./add.component";
import { AddSellerRouting } from './app.routing.module';


@NgModule({
  declarations: [AddComponent],
  imports: [ CommonModule,AddSellerRouting],
})
export class AddsellerModule {}
