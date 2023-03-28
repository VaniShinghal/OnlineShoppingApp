import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { ErrorComponent } from './error/error.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes: Routes = [
  {path:'register',component:RegisterFormComponent},
  {path:'login',component:LoginFormComponent},
  {path:'forgot',component:ForgotPasswordFormComponent},
  {path:'customerHome',component:CustomerHomeComponent},
  {path:'adminHome', component:AdminHomeComponent},
  {path:'addProduct',component:AddProductFormComponent},
  {path:'error',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
