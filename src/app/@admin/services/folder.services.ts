import { Injectable } from '@angular/core';
import { AD_HOST_URL, AdResponse } from '../http';
import { HttpClient } from '@angular/common/http';
import { FolderPostParams, FolderResponse, FolderGetParams, StoreRsResponse } from '../types';

@Injectable()
export class FolderService {
  private _baseUrl = AD_HOST_URL().clone().push('folders');

  constructor(private httpClient: HttpClient) { }

  // 新建文件夹
  addFolder(param?: FolderPostParams) {
    const _url = this._baseUrl.clone().value();
    return this.httpClient.post<AdResponse<StoreRsResponse>>(_url, param).toPromise();
  }
}
