import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ContentInterceptor } from './interceptors/content.interceptor';





@NgModule({
  declarations: [
    RegisterFormComponent,
    LoginFormComponent,
  ],
  imports: [
	  CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContentInterceptor,
      multi: true,
    },
    
  ],
  exports: [
    LoginFormComponent, RegisterFormComponent
  ]
})
export class SharedAuthModule { }
