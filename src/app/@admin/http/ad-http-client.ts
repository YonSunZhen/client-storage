import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AdHttpCustomError, AdHttpErrorStatus } from './ad-http-error';
import { AdHttpService } from './ad-http.service';

export interface AdHttpParams {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  params?: HttpParams | {
    [param: string]: any;
  };
  customErrors?: AdHttpCustomError[];
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
}

@Injectable()
export class AdHttpClient extends HttpClient {
  constructor(handler: HttpHandler, private adHttpService: AdHttpService) {
    super(handler);
  }

  /**
   * http get
   */
  async hoGet(url: string, options?: AdHttpParams) {
    const customErrors = options ? options.customErrors : null;
    let result;
    try {
      result = await this.get(url, { withCredentials: true, ...options }).toPromise();
    } catch (e) {
      console.error(e);
      // 当服务器出错就会进入这里，暂时这么处理
      result = {};
      this.adHttpService.emitHttpCommonError(e.url, AdHttpErrorStatus.AD_HTTP_500_ERROR);
    }
    if (customErrors && result['error_no']) {
      this.emitCustomError(result['error_no'], customErrors);
    }
    return result;
  }

  /**
   * http post
   */
  async hoPost(url: string, body: any | null, options?: AdHttpParams) {
    const params = options ? options.params : {};
    const customErrors = options ? options.customErrors : null;
    let result;
    try {
      result = await this.post(url, body, { params: params, withCredentials: true }).toPromise();
    } catch (e) {
      console.error(e);
      result = {};
      this.adHttpService.emitHttpCommonError(e.url, AdHttpErrorStatus.AD_HTTP_500_ERROR);
    }
    // tslint:disable-next-line: no-unused-expression
    customErrors && result['error_no'] && this.emitCustomError(result['error_no'], customErrors);
    return result;
  }

  /**
   * http put
   */
  async hoPut(url: string, body: any | null, options?: AdHttpParams) {
    const params = options ? options.params : {};
    const customErrors = options ? options.customErrors : null;
    let result;
    try {
      result = await this.put(url, body, { params: params, withCredentials: true }).toPromise();
    } catch (e) {
      console.error(e);
      result = {};
      this.adHttpService.emitHttpCommonError(e.url, AdHttpErrorStatus.AD_HTTP_500_ERROR);
    }
    // tslint:disable-next-line: no-unused-expression
    customErrors && result['error_no'] && this.emitCustomError(result['error_no'], customErrors);
    return result;
  }

  /**
   * http delete
   */
  async hoDelete(url: string, options?: AdHttpParams) {
    const params = options ? options.params : {};
    const customErrors = options ? options.customErrors : null;
    let result;
    try {
      result = await this.delete(url, { params: params, withCredentials: true }).toPromise();
    } catch (e) {
      console.error(e);
      result = {};
      this.adHttpService.emitHttpCommonError(e.url, AdHttpErrorStatus.AD_HTTP_500_ERROR);
    }
    // tslint:disable-next-line: no-unused-expression
    customErrors && result['error_no'] && this.emitCustomError(result['error_no'], customErrors);
    return result;
  }

  /**
   * 发送错误返回码为errcode的AdHttpCustomError通知
   * @param errcode 错误返回码
   * @param customErrors api调用者定制的错误信息
   */
  emitCustomError(errcode, customErrors: AdHttpCustomError[]) {
    customErrors.forEach((customError) => {
      customError.errcode === errcode
        // tslint:disable-next-line: no-unused-expression
        ? this.adHttpService.emitHttpCustomError(customError) : null;
    });
  }

}
