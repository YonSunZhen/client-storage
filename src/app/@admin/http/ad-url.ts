import { DefaultUrlSerializer, UrlTree, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { HOST_URL } from '../api.url';
const HO_URL_SERIALIZER = new DefaultUrlSerializer();
const HO_DEFAULT_SCHEME = 'http';

export class AdURL {
  private _url: UrlTree;
  private _scheme = '';
  constructor(url: string | AdURL) {
    const _u = (typeof url === 'string') ? url : (url as AdURL).value();
    if (_u.trim() === '') {
      throw new Error('URL is empty!');
    }
    const _s = _u.split('://');
    if (_s.length === 1) {
      this._scheme = HO_DEFAULT_SCHEME;
      this._url = HO_URL_SERIALIZER.parse(_s[0]);
    } else if (_s.length === 2) {
      this._scheme = _s[0];
      this._url = HO_URL_SERIALIZER.parse(_s[1]);
    } else {
      throw new Error('URL with multi "://" is not supported!');
    }
  }

  clone(): AdURL {
    return new AdURL(this);
  }

  push(segment: string): AdURL {
    this._url.root.children[PRIMARY_OUTLET].segments.push(new UrlSegment(segment, {}));
    return this;
  }

  pop(): AdURL {
    this._url.root.children[PRIMARY_OUTLET].segments.pop();
    return this;
  }

  params(obj: object): AdURL {
    Object.assign(this._url.queryParams, obj);
    return this;
  }

  param(key: string, value: string): AdURL {
    this._url.queryParams[key] = value;
    return this;
  }

  clear(key?: string): AdURL {
    if (key) {
      delete this._url.queryParams[key];
    } else {
      this._url.queryParams = {};
    }
    return this;
  }

  value(): string {
    return `${this._scheme}:/${HO_URL_SERIALIZER.serialize(this._url)}`;
  }
}

export const AD_HOST_URL = () => new AdURL(HOST_URL);
