import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
  HttpEvent
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AdHttpService } from './ad-http.service';
import { AdHttpErrorStatus } from './ad-http-error';

@Injectable()
export class AdHttpInterceptor implements HttpInterceptor {
  hasLoginModalOpen = false;
  constructor(private adhttpService: AdHttpService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access_token = localStorage['access_token'] ? localStorage['access_token'] : '';
    if (req.url.includes('pwdAuthorize2') || req.url.includes('getPublicKey')) {
      return next.handle(req);
    }
    const reqNew = req.clone({
      headers: req.headers.set('Access-Token', access_token)
    });
    return next.handle(reqNew).pipe(
      mergeMap((event: any) => {
        return this.handleData(reqNew, event);
      })
    );
  }

  private handleData(req: HttpRequest<any>, event: HttpResponse<any> | HttpErrorResponse)
    : Observable<any> {
    switch (event.status) {
      case 200:
        if (event['body'] && !event['body']['success']) {
          if (event['body']['error_no']) {
            this.adhttpService.emitHttpApiError(req.urlWithParams, event['body']);
          }
        }
        break;
      case 401:
        this.adhttpService.emitHttpCommonError(req.urlWithParams, AdHttpErrorStatus.AD_HTTP_401_ERROR);
        break;
      case 403:
      case 404:
      case 500:
        this.adhttpService.emitHttpCommonError(req.urlWithParams, AdHttpErrorStatus.AD_HTTP_500_ERROR);
        break;
      default:
        break;
    }
    return of(event);
  }

}
