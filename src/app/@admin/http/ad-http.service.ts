import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  AdHttpErrorStatus,
  AdHttpCommonError,
  AdHttpApiError,
  AdHttpCustomError,
  getAdHttpErrorString
} from './ad-http-error';

@Injectable()
export class AdHttpService {
  // http 通用错误
  private _httpCommonError: Subject<AdHttpCommonError> = new Subject<AdHttpCommonError>();
  // http api 错误
  private _httpApiError: Subject<AdHttpApiError> = new Subject<AdHttpApiError>();
  // http 定制错误
  private _httpCustomError: Subject<AdHttpCustomError> = new Subject<AdHttpCustomError>();

  constructor() { }

  getHttpCommonError(): Observable<AdHttpCommonError> {
    return this._httpCommonError.asObservable();
  }

  getHttpApiError(): Observable<AdHttpApiError> {
    return this._httpApiError.asObservable();
  }

  getHttpCustomError(): Observable<AdHttpCustomError> {
    return this._httpCustomError.asObservable();
  }

  emitHttpCommonError(urlWithParams, errorStatus: AdHttpErrorStatus) {
    console.error('http common error: ' + getAdHttpErrorString(errorStatus) + '!');
    const AdHttpCommonError: AdHttpCommonError = {
      urlWithParams: urlWithParams,
      errorStatus: errorStatus,
      errorMsg: getAdHttpErrorString(errorStatus)
    };
    this._httpCommonError.next(AdHttpCommonError);
  }

  emitHttpApiError(urlWithParams: string, responseErr: any) {
    console.error('http api error: ' + JSON.stringify(responseErr) + '!');
    const AdHttpApiError: AdHttpApiError = {
      urlWithParams: urlWithParams,
      responseErr: responseErr
    };
    this._httpApiError.next(AdHttpApiError);
  }

  emitHttpCustomError(customError: AdHttpCustomError) {
    this._httpCustomError.next(customError);
  }

}
