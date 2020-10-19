import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;

  menus = [
    {
      title: 'demo',
      icon: 'bars',
      open: false,
      children: [
        { link: './demo/demo1', name: 'demo1' },
        { link: './demo/demo2', name: 'demo2' }
      ]
    }
  ];

  user = {
    name: 'syz',
    picture: 'http://qiniu.yonsunzhen.cn/%E5%A4%B4%E5%83%8F.jpg'
  };

  async logout() {

  }
}
