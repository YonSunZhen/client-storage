import { Component } from '@angular/core';
import { NzMenu } from '@ngo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;

  menus: NzMenu = {
    mode: 'inline',
    data: [
      {
        title: '全部文件',
        icon: 'folder',
        open: true,
        children: [
          { link: './files/all-files', name: '所有文件', matchRouter: true }
        ]
      },
      {
        name: '回收站',
        icon: 'delete',
        matchRouter: true,
        link: './recycle'
      }
    ]
  };

  user = {
    name: 'syz',
    picture: 'http://qiniu.yonsunzhen.cn/%E5%A4%B4%E5%83%8F.jpg'
  };

  async logout() {

  }
}
