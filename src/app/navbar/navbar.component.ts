import * as $ from 'jquery';

import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor( public router : Router ) { }

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

  logout(){
  	localStorage.clear();
  	this.router.navigate(['/login']);
  }

}
