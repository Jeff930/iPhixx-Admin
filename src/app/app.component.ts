import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';

import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
	
  title = 'admin-iphixx';

  constructor(public router : Router , public adminService : AdminService) { 

  	
  }

  ngOnInit() {
  }

}
