import { Injectable } from '@angular/core';
import { AD_HOST_URL } from '../../http';
import { StoreRsApi } from './store-rs.api';
import { StoreRsParams, StoreRsResponse, StoreRsTreeResponse, StoreRsDetailParams } from '../../types';

@Injectable()
export class StoreRsService {

  private _baseUrl = AD_HOST_URL().clone().value();

  constructor(private storeRsApi: StoreRsApi) { }

  // 获取所有文件类型
  async getStoreRsTree(param?: StoreRsParams) {
    const _res = await this.storeRsApi.getStoreRsTree(param);
    const _resData = _res.code === 0 ? _res.data : [];
    const res: StoreRsTreeResponse = JSON.parse(JSON.stringify(_resData));
    const _recursion = (data: StoreRsTreeResponse) => {
      const _item: StoreRsResponse = this._formatRs([data.data])[0];
      data.data = _item;
      if (data.children && data.children.length > 0) {
        data.children.forEach((d) => {
          _recursion(d);
        });
      }
    };
    _recursion(res);
    return res;
  }

  async updateRs(rsNo: string, param?: StoreRsParams) {
    const _res = await this.storeRsApi.updateRs(rsNo, param);
    return _res;
  }

  async getStoreRs(param?: StoreRsParams): Promise<StoreRsResponse[]> {
    const _res = await this.storeRsApi.getStoreRs(param);
    const res = _res.code === 0 ? this._formatRs(_res.data) : [];
    return res;
  }

  async delRecycle(rsNo: string) {
    const _res = await this.storeRsApi.delRecycle(rsNo);
    return _res;
  }

  async updateRsDetail(rsNo: string, param?: StoreRsDetailParams) {
    const _res = await this.storeRsApi.updateRsDetail(rsNo, param);
    return _res;
  }

  private _formatRs(data: StoreRsResponse[]) {

    // const host = 'http://localhost:8080'; // 注入依赖
    const _data: StoreRsResponse[] = JSON.parse(JSON.stringify(data));
    _data.forEach(_d => {
      _d.isEdit = false;
      if (_d.entityType === 2) {
        // _d.rsPath = `${host}${_d.rsPathName}`;
        _d.rsPath = `${this._baseUrl}${_d.rsPath}`;
        _d.thumRsPath = _d.thumRsPath ? `${this._baseUrl}${_d.thumRsPath}` : null;
      }
    });
    return _data;
  }
}
