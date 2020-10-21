import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';

import { PagesRoutingModule } from './pages-routing.module';
import { AllFilesComponent } from './all-files/all-files.component';
import { NgoModule } from '@ngo';


@NgModule({
  declarations: [
    PagesComponent,
    AllFilesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgoModule
  ]
})
export class PagesModule { }
