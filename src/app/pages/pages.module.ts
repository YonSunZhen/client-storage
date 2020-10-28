import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';

import { PagesRoutingModule } from './pages-routing.module';
import { AllFilesComponent } from './all-files/all-files.component';
import { NgoModule } from '@ngo';
import { RecycleComponent } from './recycle/recycle.component';
import { FileNameInputComponent } from './all-files/file-name-input/file-name-input.component';


@NgModule({
  declarations: [
    PagesComponent,
    AllFilesComponent,
    RecycleComponent,
    FileNameInputComponent,
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
