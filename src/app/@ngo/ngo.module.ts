import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAntModule } from './ant.module';

@NgModule({
  imports: [CommonModule, NzAntModule.forRoot()],
  exports: [NzAntModule]
})
export class NgoModule {
  static forRoot(): ModuleWithProviders<NgoModule> {
    return {
      ngModule: NgoModule
    };
  }

  static forChild(): ModuleWithProviders<NgoModule> {
    return {
      ngModule: NgoModule
    };
  }
}
