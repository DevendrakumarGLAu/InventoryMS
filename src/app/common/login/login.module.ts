import { NgModule } from '@angular/core';
import { loginRoutemodule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    declarations:[LoginComponent],
    imports:[loginRoutemodule]
})

export class loginModule{}