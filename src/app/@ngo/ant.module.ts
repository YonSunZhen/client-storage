import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCommentModule } from 'ng-zorro-antd/comment';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMentionModule } from 'ng-zorro-antd/mention';

import { NzNotificationModule } from 'ng-zorro-antd/notification';

import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzProgressModule } from 'ng-zorro-antd/progress';

import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzRateModule } from 'ng-zorro-antd/rate';

import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

const MODULES = [
  NzAffixModule,
  NzAlertModule,
  NzAnchorModule,
  NzAvatarModule,
  NzAutocompleteModule,

  NzBackTopModule,
  NzBadgeModule,
  NzButtonModule,
  NzBreadCrumbModule,

  NzCollapseModule,
  NzCalendarModule,
  NzCardModule,
  NzCarouselModule,
  NzCascaderModule,
  NzCheckboxModule,
  NzCommentModule,

  NzDatePickerModule,
  NzDescriptionsModule,
  NzDividerModule,
  NzDrawerModule,
  NzDropDownModule,

  NzEmptyModule,
  NzFormModule,
  NzGridModule,

  NzIconModule,
  NzInputModule,
  NzInputNumberModule,

  NzLayoutModule,
  NzListModule,

  NzMessageModule,
  NzMenuModule,
  NzModalModule,
  NzMentionModule,

  NzNotificationModule,

  NzPageHeaderModule,
  NzPaginationModule,
  NzPopoverModule,
  NzPopconfirmModule,
  NzProgressModule,

  NzRadioModule,
  NzRateModule,
  NzResultModule,

  NzSpaceModule,
  NzSelectModule,
  NzStepsModule,
  NzSliderModule,
  NzSwitchModule,
  NzSkeletonModule,
  NzSpinModule,
  NzStatisticModule,

  NzTagModule,
  NzTableModule,
  NzTabsModule,
  NzToolTipModule,
  NzTimelineModule,
  NzTreeModule,
  NzTransferModule,
  NzTreeSelectModule,
  NzTypographyModule
];
@NgModule({
  declarations: [],
  imports: [CommonModule],
  entryComponents: [],
  exports: [...MODULES]
})
export class NzAntModule {
  static forRoot(): ModuleWithProviders<NzAntModule> {
    return {
      ngModule: NzAntModule
    };
  }

  static forChild(): ModuleWithProviders<NzAntModule> {
    return {
      ngModule: NzAntModule
    };
  }
}
