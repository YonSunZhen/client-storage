import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdHttpInterceptor } from './ad-http.interceptor';
import { AdHttpClient } from './ad-http-client';
import { AdHttpService } from './ad-http.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [

  ],
  exports: [

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AdHttpInterceptor, multi: true },
    AdHttpClient,
    AdHttpService
  ]
})

export class AdHttpModule { }
