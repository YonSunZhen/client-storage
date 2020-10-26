import { Injectable } from '@angular/core';
import { StoreRsApi } from './store-rs.api';
import { StoreRsParams, StoreRsResponse, StoreRsTreeResponse } from '../../types';

@Injectable()
export class StoreRsService {

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

  private _formatRs(data: StoreRsResponse[]) {

    const host = 'http://localhost:8080'; // 注入依赖
    const _data: StoreRsResponse[] = JSON.parse(JSON.stringify(data));
    _data.forEach(_d => {
      if (_d.entityType === 2) {
        _d.rsPath = `${host}${_d.rsPath}`;
      }
    });
    return _data;
  }
}
