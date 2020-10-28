import { Component, OnInit } from '@angular/core';
import { StoreRsService, StoreRsResponse } from '@admin';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-recycle',
  templateUrl: './recycle.component.html',
  styleUrls: ['./recycle.component.scss']
})
export class RecycleComponent implements OnInit {

  fileList: StoreRsResponse[];
  isCardLoading = false;
  constructor(
    private message: NzMessageService,
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
      this.message.success('还原成功');
    } else {
      this.message.error('还原失败');
    }
    this.isCardLoading = false;
  }

  async onDel(rsNo: string) {
    const _rsNo = `${rsNo}`;
    const _delRes = await this.storeRsService.delRecycle(_rsNo);
    if (_delRes.code === 0) {
      this.fileList = await this._getFileList();
      this.message.success('已彻底删除');
    } else {
      this.message.error('删除失败');
    }
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
