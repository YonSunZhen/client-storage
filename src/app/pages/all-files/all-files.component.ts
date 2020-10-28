import { Component, OnInit } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import {
  StoreRsService, StoreRsResponse, StoreRsTreeResponse,
  FolderService,
  ImageService, ImagePostParams
 } from '@admin';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { copy } from 'iclipboard';
import { FileNameInput } from './file-name-input/file-name-input.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.scss']
})
export class AllFilesComponent implements OnInit {

  clickQueue: {no: string, name: string}[] = [{no: '100', name: '所有文件'}];
  currNo = '100';
  editFolderForm: FormGroup;
  fileList: StoreRsResponse[];
  fileTreeData: StoreRsTreeResponse;
  isNewFolder = false;
  isCardLoading = false;
  isImgModalVisible = false;
  newFolderForm: FormGroup;
  clickedImgPath = '';

  constructor(
    private fb: FormBuilder,
    private folderService: FolderService,
    private imageService: ImageService,
    private message: NzMessageService,
    private nzContextMenuService: NzContextMenuService,
    private storeRsService: StoreRsService,
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

  onClickFolder(data: StoreRsResponse) {
    const _rsNo = data.rsNo;
    const _folderName = data.folderName;
    this.fileList = this._getFileList(_rsNo, this.fileTreeData);
    this._updateClickData(_rsNo, _folderName);
  }

  onClickImg(data: StoreRsResponse) {
    // this._updateClickData(imgNo);
    this.isImgModalVisible = true;
    this.clickedImgPath = data.rsPath;
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

  async onAddfolder(data: FileNameInput) {
    if (data.check) {
      const _folderName = data.name;
      const _curNo = this.currNo;
      const _addRes = await this.folderService.addFolder({rsParentNo: _curNo, folderName: _folderName});
      if (_addRes.code === 0) {
        this._closeNewFolderInput();
        await this._reloadFileList();
        this.message.success('添加成功');
      } else {
        this.message.error('添加失败');
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
        this.message.success('上传成功');
      } else {
        this.message.error('上传失败');
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
      this.message.success('删除成功');
    } else {
      this.message.error('删除失败');
    }
  }

  onHandleCancel() {
    this.isImgModalVisible = false;
  }

  onRename(data: StoreRsResponse) {
    const _rsId = data.rsId;
    const _entityName = data.folderName || data.imgOriginName;
    this.fileList.map(f => {
      if (f.rsId === _rsId) {
        f.isEdit = true;
      }
    });
    this._initEditFolderForm(data.rsNo, _entityName);
  }

  async onEditfolder(data: FileNameInput, file: StoreRsResponse) {
    const _rsId = file.rsId;
    const _rsNo = file.rsNo;
    if (data.check) {
      const _name = data.name;
      const _updateRes = await this.storeRsService.updateRsDetail(_rsNo, {
        fileName: _name,
        rsParentNo: file.rsParentNo
      });
      if (_updateRes.code === 0) {
        await this._reloadFileList();
        this.message.success('修改成功');
      } else {
        this.message.error('修改失败');
      }
    } else {
      this.fileList.map(f => {
        if (f.rsId === _rsId) {
          f.isEdit = false;
        }
      });
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
      folderName: ['']
    });
  }

  private _initEditFolderForm(controlName: string, folderName: string) {
    if (!this.editFolderForm) {
      this.editFolderForm = this.fb.group({
        [controlName]: [folderName]
      });
    } else {
      this.editFolderForm.addControl(controlName, new FormControl(folderName));
    }
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
