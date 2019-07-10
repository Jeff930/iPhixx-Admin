import * as $ from 'jquery';

import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute  } from '@angular/router';

import { Agents, AdminService } from '../admin.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user;
  userCreds =  {
    email: '',
    password : '',
  };
  isChecked;
  constructor( public router: Router, private adminservice: AdminService) {
    this.user = localStorage.getItem('user');
   }

  ngOnInit() {
      $('.btn-toggle-fullwidth').on('click', function() {
    if(!$('body').hasClass('layout-fullwidth')) {
      $('body').addClass('layout-fullwidth');

    } else {
      $('body').removeClass('layout-fullwidth');
      $('body').removeClass('layout-default'); // also remove default behaviour if set
    }

    $(this).find('.lnr').toggleClass('lnr-arrow-left-circle lnr-arrow-right-circle');

    if($(window).innerWidth() < 1025) {
      if(!$('body').hasClass('offcanvas-active')) {
        $('body').addClass('offcanvas-active');
      } else {
        $('body').removeClass('offcanvas-active');
      }
    }
  });
  }

  logout() {
    if (localStorage.getItem('isChecked')) {
      this.userCreds = JSON.parse(localStorage.getItem('remeberCreds'));
      console.log(this.userCreds);
    }
  localStorage.clear();
  console.log(this.userCreds);
  if (this.userCreds.email !== '') {
    console.log('checking');
    localStorage.setItem('isChecked', 't');
    localStorage.setItem('remeberCreds', JSON.stringify(this.userCreds));
  }
  this.router.navigate(['/login']);
  }

}
