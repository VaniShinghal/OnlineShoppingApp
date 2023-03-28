import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { ErrorComponent } from './error/error.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    LoginFormComponent,
    ForgotPasswordFormComponent,
    CustomerHomeComponent,
    AdminHomeComponent,
    AddProductFormComponent,
    ErrorComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
