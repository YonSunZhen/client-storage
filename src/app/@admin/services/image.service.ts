import { Injectable } from '@angular/core';
import { AD_HOST_URL, AdResponse } from '../http';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ImagePostParams, StoreRsResponse, ImageResponse } from '../types';

@Injectable()
export class ImageService {
  private _baseUrl = AD_HOST_URL().clone().push('images');

  constructor(private httpClient: HttpClient) { }

  // 上传图片
  addImage(param?: ImagePostParams) {
    const _url = this._baseUrl.clone().value();
    // 将json转化为form-data格式数据
    const _formData = new FormData();
    // tslint:disable-next-line: forin
    for (const p in param) {
      _formData.append(p, param[p]);
    }
    return this.httpClient.post<AdResponse<StoreRsResponse>>(_url, _formData);
  }
}
