import { Component, OnInit } from '@angular/core';

import { StoreRsService } from '@admin';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss']
})
export class Demo1Component implements OnInit {

  constructor(
    private storeRsService: StoreRsService
  ) { }

  async ngOnInit() {
    // const test = await this.storeRsService.getStoreRsTree();
    // console.log('这里是调试1');
    // console.log(test);

  }

}
