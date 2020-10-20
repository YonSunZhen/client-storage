import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdHttpModule } from './http';

import { StoreRsService } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdHttpModule
  ],
  providers: [
    StoreRsService
  ]
})
export class AdminModule { }
