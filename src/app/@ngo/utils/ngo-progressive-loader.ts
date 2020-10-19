export interface NgoProgressiveConfig<T> {
  step?: number;
  fetcher: (param: any) => Promise<object>;
  formatter?: (content: object) => T | Promise<T>;
}

export class NgoProgressiveLoader<T> {
  private _conf: NgoProgressiveConfig<T>;

  private _busying = false;
  private _nextPage = 1;
  private _totalPages = 0;
  private _totalElements = 0;
  private _filters = new Map<string, string>();

  private _data: Array<T> = [];

  constructor(conf: NgoProgressiveConfig<T>) {
    this._conf = conf;
    if (!this._conf.step) {
      this._conf.step = 10;
    }
  }

  busying() {
    return this._busying;
  }

  data(): Array<T> {
    return this._data;
  }

  totalElements(): number {
    return this._totalElements;
  }

  setFilter(key?: string, value?: string, emit = true) {
    this._filters.set(key, value);
    if (emit) {
      this.refresh();
      this.next();
    }
  }

  refresh() {
    this._nextPage = 1;
    this._totalPages = 0;
    this._totalElements = 0;
    this._data = [];
  }

  reset() {
    this._filters.clear();
    this.refresh();
  }

  async next() {
    if (this._busying || (this._totalPages !== 0 && this._nextPage > this._totalPages)) {
      return;
    }

    this._busying = true;
    const _res = await this._loadNextPage();
    if (!_res.status) {
      console.warn(`progressive load page ${_res.currPage}/${_res.totalPages} fail: ${_res.message}`);
    } else {
    }
    this._busying = false;
  }

  async loadAll() {
    if (this._totalPages !== 0 && this._nextPage === this._totalPages + 1) {
      return true;
    }

    if (this._busying || (this._totalPages !== 0 && this._nextPage > this._totalPages)) {
      return false;
    }

    this._busying = true;
    let _res = null;
    do {
      _res = await this._loadNextPage();
      if (!_res.status) {
        console.warn(`progressive load page ${_res.currPage}/${_res.totalPages} fail: ${_res.message}`);
        break;
      } else {
      }
    } while (
      _res.status &&
      _res.totalPages &&
      _res.totalPages !== 0 &&
      _res.currPage &&
      _res.currPage !== _res.totalPages
    );
    this._busying = false;
    return _res.status;
  }

  private async _loadNextPage(): Promise<{ status: boolean; message: string; currPage: number; totalPages: number }> {
    const _param = { pageNo: this._nextPage, pageSize: this._conf.step };
    const _filterChecker = JSON.stringify(Array.from(this._filters));
    this._filters.forEach((value, key) => {
      if (value !== '') {
        _param[key] = value;
      }
    });

    const _res = (await this._conf.fetcher(_param)) as {
      code: number;
      message: string;
      data: [];
      pageCount: number;
      totalCount: number;
    };

    const _currPage = this._nextPage;
    if (_res.code === 0 && _res.data) {
      if (_filterChecker !== JSON.stringify(Array.from(this._filters))) {
        this.refresh();
        return this._loadNextPage();
      }
      if (!_res.pageCount && !_res.totalCount) {
        this._totalPages = 1;
        this._totalElements = 1;
      } else {
        this._totalPages = _res.pageCount;
        this._totalElements = _res.totalCount;
      }
      if (this._conf.formatter) {
        for (const _c of _res.data) {
          this._data.push(await this._conf.formatter(_c));
        }
      } else {
        this._data.push(..._res.data);
      }
      this._nextPage++;
    }
    return { status: _res.code === 0, message: _res.message, currPage: _currPage, totalPages: this._totalPages };
  }
}
