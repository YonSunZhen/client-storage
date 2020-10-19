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
}
