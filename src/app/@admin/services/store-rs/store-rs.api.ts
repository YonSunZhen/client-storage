import { Injectable } from '@angular/core';
import { AD_HOST_URL, AdResponse } from '../../http';
import { HttpClient } from '@angular/common/http';
import { StoreRsResponse, StoreRsParams, StoreRsTreeResponse } from '../../types';

@Injectable()
export class StoreRsApi {
  private _baseUrl = AD_HOST_URL().clone().push('store_rs');

  constructor(private httpClient: HttpClient) { }

  // 获取所有文件类型
  getStoreRsTree(param?: StoreRsParams) {
    const _url = this._baseUrl.clone().params(param).push('tree').value();
    return this.httpClient.get<AdResponse<StoreRsTreeResponse>>(_url).toPromise();
  }

  updateRs(rsNo: string, param?: StoreRsParams) {
    const _url = this._baseUrl.clone().push(rsNo).value();
    return this.httpClient.put<AdResponse<number>>(_url, param).toPromise();
  }

  getStoreRs(param?: StoreRsParams) {
    const _url = this._baseUrl.clone().params(param).value();
    return this.httpClient.get<AdResponse<StoreRsResponse[]>>(_url).toPromise();
  }

  delRecycle(rsNo: string) {
    console.log('这里是调试2');
    console.log({rsNo});

    const _url = this._baseUrl.clone().params({rsNo}).push('recycle').value();
    return this.httpClient.delete<AdResponse<string>>(_url).toPromise();
  }
}
