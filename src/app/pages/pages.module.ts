import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';

import { PagesRoutingModule } from './pages-routing.module';
import { AllFilesComponent } from './all-files/all-files.component';
import { NgoModule } from '@ngo';
import { RecycleComponent } from './recycle/recycle.component';


@NgModule({
  declarations: [
    PagesComponent,
    AllFilesComponent,
    RecycleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    NgoModule
  ]
})
export class PagesModule { }
