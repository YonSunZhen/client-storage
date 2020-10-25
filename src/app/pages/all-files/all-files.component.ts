import { Component, OnInit } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import {
  StoreRsService, StoreRsResponse, StoreRsTreeResponse,
  FolderService,
  ImageService, ImagePostParams
 } from '@admin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { copy } from 'iclipboard';

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
  isNewFolder = false;
  isCardLoading = false;
  newFolderForm: FormGroup;

  constructor(
    private nzContextMenuService: NzContextMenuService,
    private fb: FormBuilder,
    private storeRsService: StoreRsService,
    private folderService: FolderService,
    private imageService: ImageService
  ) { }

  async ngOnInit() {
    this.isCardLoading = true;
    this.fileTreeData = await this.storeRsService.getStoreRsTree();
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

  onNewFolder() {
    this._openNewFolderInput();
    this._initNewFolderForm();
  }

  async onNewCheck(check: boolean) {
    if (check) {
      const _folderName = this.newFolderForm.get('folderName').value;
      const _curNo = this.currNo;
      const _addRes = await this.folderService.addFolder({rsParentNo: _curNo, folderName: _folderName});
      if (_addRes.code === 0) {
        this._closeNewFolderInput();
        await this._reloadFileList();
      }
    } else {
      this._closeNewFolderInput();
    }

  }

  // 必须是箭头函数这种写法
  onUploadFiles = (files: NzUploadXHRArgs) => {
    const _file = files.file;
    const _rsParentNo = this.currNo;
    const _imgType = _file.type.split('/')[1];
    const _imgOriginName = _file.name.includes('.') ? _file.name.split('.')[0] : _file.name;
    const _sendData: ImagePostParams = {
      rsParentNo: _rsParentNo,
      imgType: _imgType,
      imgOriginName: _imgOriginName,
      imgData: _file
    };
    const addRes = this.imageService.addImage(_sendData);
    return addRes.subscribe(async res => {
      if (res.code === 0) {
        await this._reloadFileList();
      }
    });
  }

  onClickCopy(path: string) {
    copy(path);
  }

  async onDelRs(rsNo: string) {
    const _updateRsRes = await this.storeRsService.updateRs(rsNo, {rsStatus: 0});
    if (_updateRsRes.code === 0) {
      await this._reloadFileList();
    } else {

    }
  }

  private async _reloadFileList() {
    this.fileTreeData = await this.storeRsService.getStoreRsTree();
    this.fileList = this._getFileList(this.currNo, this.fileTreeData);
  }

  private _getFileList(no: string, treeData: StoreRsTreeResponse) {
    const res = this._getStoreRsByNo(no, treeData);
    return res;
  }

  private _openNewFolderInput() {
    this.isNewFolder = true;
  }

  private _closeNewFolderInput() {
    this.isNewFolder = false;
  }

  private _initNewFolderForm() {
    this.newFolderForm = this.fb.group({
      folderName: ['新建文件夹']
    });
  }



  private _updateClickData(no?: string, name?: string) {
    this._closeNewFolderInput();
    this.currNo = no;
    this.clickQueue.push({no, name});
  }

  private _getStoreRsByNo(no: string, treeData: StoreRsTreeResponse): StoreRsResponse[] {
    let res: StoreRsResponse[] = [];
    const _recursionTreeFn = (data: StoreRsTreeResponse) => {
      const _data: StoreRsTreeResponse = JSON.parse(JSON.stringify(data));
      if (no === _data.data.rsNo) {
        res = _data.children.map(_d => _d.data);
        return;
      } else {
        _data.children.forEach(_d => {
          _recursionTreeFn(_d);
        });
      }
    };
    _recursionTreeFn(treeData);
    return res;
  }

}
