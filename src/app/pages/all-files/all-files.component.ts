import { Component, OnInit } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { StoreRsService, StoreRsResponse, StoreRsTreeResponse } from '@admin';

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.scss']
})
export class AllFilesComponent implements OnInit {

  clickQueue: {no: string, name: string}[] = [{no: '100', name: '所有文件'}];
  currNo = '100';
  fileList: StoreRsResponse[];
  fileTreeData: StoreRsTreeResponse;
  isCardLoading = false;
  constructor(
    private nzContextMenuService: NzContextMenuService,
    private storeRsService: StoreRsService
  ) { }

  async ngOnInit() {
    this.isCardLoading = true;
    this.fileTreeData = (await this.storeRsService.getStoreRsTree()).data;
    this.fileList = this._getFileList('100', this.fileTreeData);
    this.isCardLoading = false;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  onClickFolder(folderNo?: string, folderName?: string) {
    this.fileList = this._getFileList(folderNo, this.fileTreeData);
    this._updateClickData(folderNo, folderName);
  }

  onClickImg(imgNo?: string, imgName?: string) {
    // this._updateClickData(imgNo);
  }

  onClickBack(data) {
    this.clickQueue.pop();
    const _noObj = this.clickQueue[this.clickQueue.length - 1];
    this.currNo = _noObj.no;
    this.fileList = this._getFileList(_noObj.no, this.fileTreeData);
  }

  private _updateClickData(no?: string, name?: string) {
    this.currNo = no;
    this.clickQueue.push({no, name});
  }

  private _getStoreRsByNo(no: string, treeData: StoreRsTreeResponse): StoreRsResponse[] {
    let res: StoreRsResponse[] = [];
    const _recursionTree = (data: StoreRsTreeResponse) => {
      const _data: StoreRsTreeResponse = JSON.parse(JSON.stringify(data));
      if (no === _data.data.rsNo) {
        res = _data.children.map(_d => _d.data);
        return;
      } else {
        _data.children.forEach(_d => {
          _recursionTree(_d);
        });
      }
    };
    _recursionTree(treeData);
    return res;
  }

  private _formatStoreRs(data: StoreRsResponse[]) {
    const host = 'http://localhost:8080'; // 注入依赖
    const _data: StoreRsResponse[] = JSON.parse(JSON.stringify(data));
    _data.forEach(_d => {
      if (_d.entityType === 2) {
        _d.rsPath = `${host}${_d.rsPath }`;
      }
    });
    return _data;
  }

  private _getFileList(no: string, treeData: StoreRsTreeResponse) {
    const _fileList = this._getStoreRsByNo(no, treeData);
    const res = this._formatStoreRs(_fileList);
    return res;
  }

}
