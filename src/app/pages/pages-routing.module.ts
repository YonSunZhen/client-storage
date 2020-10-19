import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { Demo1Component } from './demo1/demo1.component';
import { Demo2Component } from './demo2/demo2.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'demo',
        children: [
          {
            path: 'demo1',
            component: Demo1Component,
          },
          {
            path: 'demo2',
            component: Demo2Component,
          },
          {
            path: '',
            redirectTo: 'demo1',
            pathMatch: 'full'
          },
        ],
      },
      {
        path: '',
        redirectTo: 'demo',
        pathMatch: 'full'
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

