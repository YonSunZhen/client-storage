import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';

export interface NgoDataSourceConfig<T> {
  step?: number;
  fetcher: (param: any) => Promise<any>;
}

export class NgoDataSource<T> extends DataSource<T> {
  totalCount = 0;
  private _conf: NgoDataSourceConfig<T>;

  private _pageSize = 20;
  private _fetchedPages = new Set<number>();
  private _cachedData: Array<T> = Array.from<T>({ length: 100 });
  private _dataSubject = new BehaviorSubject<T[]>(this._cachedData);
  private _subscription = new Subscription();

  private _filters = new Map<string, string>();

  constructor(private config: NgoDataSourceConfig<T>) {
    super();
    this._conf = this.config;
    if (this.config.step) {
      this._pageSize = this.config.step;
    }
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    this._subscription.add(
      collectionViewer.viewChange.subscribe(range => {
        const startPage = this._getPageForIndex(range.start);
        const endPage = this._getPageForIndex(range.end - 1);
        for (let i = startPage; i <= endPage; i++) {
          this._fetchData(i);
        }
      })
    );
    return this._dataSubject;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  async updateItem(index) {
    let _page = Math.ceil(index / this._pageSize);
    if (_page === 0) {
      _page = 1;
    }
    this._fetchedPages.delete(_page);
    await this._fetchData(_page);
  }

  setFilter(key?: string, value?: string, emit = true) {
    this._filters.set(key, value);
    if (emit) {
      this.refresh();
      this._fetchData(1);
    }
  }

  refresh() {
    this._fetchedPages.clear();
    this._cachedData = Array.from<T>({ length: 100 });
  }

  reset() {
    this._filters.clear();
    this._fetchedPages.clear();
    this._cachedData = Array.from<T>({ length: 100 });
    this._fetchData(1);
  }

  private _getPageForIndex(index: number): number {
    return Math.ceil(index / this._pageSize);
  }

  private async _fetchData(page: number) {
    if (page === 0 || this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);

    const _param = {
      pageNo: page,
      pageSize: this._pageSize
    };

    this._filters.forEach((value, key) => {
      if (value !== '') {
        _param[key] = value;
      }
    });

    const res = (await this._conf.fetcher(_param)) as {
      code: number;
      message: string;
      data: [];
      pageNo: number;
      pageSize: number;
      pageCount: number;
      totalCount: number;
    };
    if (res && res.code === 0) {
      if (page === 1) {
        this._cachedData = Array.from<T>({ length: res.totalCount });
        this.totalCount = res.totalCount;
      }
      this._cachedData.splice((page - 1) * this._pageSize, this._pageSize, ...res.data);
      this._dataSubject.next(this._cachedData);
    }
  }
}
