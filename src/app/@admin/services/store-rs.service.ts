import { Injectable } from '@angular/core';
import { AD_HOST_URL, AdResponse } from '../http';
import { HttpClient } from '@angular/common/http';
import { StoreRsResponse, StoreRsParams, StoreRsTreeResponse } from '../types';

@Injectable()
export class StoreRsService {
  private _baseUrl = AD_HOST_URL().clone().push('store_rs');

  constructor(private httpClient: HttpClient) { }

  // 获取所有文件类型
  getStoreRsTree(param?: StoreRsParams) {
    const _url = this._baseUrl.clone().params(param).push('tree').value();
    return this.httpClient.get<AdResponse<StoreRsTreeResponse>>(_url).toPromise();
  }
}
