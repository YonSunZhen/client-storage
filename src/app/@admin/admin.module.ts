import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdHttpModule } from './http';

import { StoreRsService, FolderService, ImageService } from './services';
import { StoreRsApi } from './services';

const SERVICES = [StoreRsService, FolderService, ImageService ];
const API = [ StoreRsApi ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdHttpModule
  ],
  providers: [
    ...SERVICES,
    ...API
  ]
})
export class AdminModule { }
