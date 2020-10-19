import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgoModule } from '@ngo';
import { IconsProviderModule } from './icons-provider.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgoModule.forRoot(),
    BrowserAnimationsModule,
    IconsProviderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
