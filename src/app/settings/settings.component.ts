import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  pager = 'general';
  constructor() { }

  ngOnInit() {
  }
  openPager(page) {
    switch (page) {
      case 'general':
        this.pager = 'general';
        break;
      case 'repair':
        this.pager = 'repair';
        break;
      case 'invoice':
        this.pager = 'invoice';
        break;
      case 'sms':
        this.pager = 'sms';
        break;
      case 'payment':
        this.pager = 'payment';
        break;
      case 'tickets':
        this.pager = 'tickets';
        break;
      default:
        this.pager = 'updates';
        break;
    }
  }
}
