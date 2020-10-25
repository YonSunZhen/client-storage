import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AllFilesComponent } from './all-files/all-files.component';
import { RecycleComponent } from './recycle/recycle.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'files',
        children: [
          {
            path: 'all-files',
            component: AllFilesComponent,
          },
          {
            path: '',
            redirectTo: 'all-files',
            pathMatch: 'full'
          },
        ],
      },
      {
        path: 'recycle',
        component: RecycleComponent,
      },
      {
        path: '',
        redirectTo: 'files',
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

