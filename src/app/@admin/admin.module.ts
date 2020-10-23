import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdHttpModule } from './http';

import { StoreRsService, FolderService, ImageService } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdHttpModule
  ],
  providers: [
    StoreRsService,
    FolderService,
    ImageService
  ]
})
export class AdminModule { }
