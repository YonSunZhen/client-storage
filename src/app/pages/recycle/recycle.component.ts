import { Component, OnInit } from '@angular/core';
import { StoreRsService, StoreRsResponse } from '@admin';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-recycle',
  templateUrl: './recycle.component.html',
  styleUrls: ['./recycle.component.scss']
})
export class RecycleComponent implements OnInit {

  fileList: StoreRsResponse[];
  isCardLoading = false;
  constructor(
    private nzContextMenuService: NzContextMenuService,
    private storeRsService: StoreRsService,
  ) { }

  async ngOnInit() {
    this.isCardLoading = true;
    this.fileList = await this._getFileList();
    this.isCardLoading = false;
  }

  async onRestore(rsNo: string) {
    this.isCardLoading = true;
    const _updateRes = await this.storeRsService.updateRs(rsNo, {rsStatus: 1});
    if (_updateRes.code === 0) {
      this.fileList = await this._getFileList();
    } else {

    }
    this.isCardLoading = false;
  }

  async onDel(rsNo: string) {

  }

  onClearRecycle() {

  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  private async _getFileList() {
    const res = await this.storeRsService.getStoreRs({rsStatus: 0});
    return res;
  }

}
