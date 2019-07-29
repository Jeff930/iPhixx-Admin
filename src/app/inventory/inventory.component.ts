import * as $ from 'jquery';

import { Component, OnInit , AfterViewInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  inventory = [] ;
  inventoryPage  = new Object();	
  inventoryPages : any;
  inventoryPageActive : number;
  pager = 'products';
  pagerSecond = 'phone';
  pagerThird;
  models = [];
  constructor(public adminService: AdminService, private spinner: NgxSpinnerService, public router: Router, public route: ActivatedRoute) { 
  		
    this.inventoryPageActive = this.adminService.inventoryPageActive;
    this.adminService.inventoryPage['page'+this.inventoryPageActive ] ? this.inventory = this.adminService.inventoryPage['page'+this.inventoryPageActive ] : '';
    this.inventoryPages = this.adminService.inventoryPages;

}

ngOnInit() {
  this.route.paramMap.subscribe((params: ParamMap) => {
    if (params.get('page') !== 'invt') {
      this.pager = 'categories';
    } else {
      this.pager = 'products';
    }
  });

  if (this.inventory.length == 0) {
    this.inventoryPageActive = 1;
    this.adminService.inventoryPageActive = this.inventoryPageActive;
    this.spinner.show();
    this.adminService.getInventory().subscribe( ( res ) => {
  console.log("this res:"+ JSON.stringify(res));
  this.inventoryPages = Array(res.total_page);
    this.adminService.inventoryPages = this.inventoryPages;
    console.log(this.inventoryPages)	
    this.adminService.inventoryPage['page'+1 ] = res.inventory;
    console.log(this.inventoryPage)
    this.inventory = this.adminService.inventoryPage['page'+1 ];
    console.log(this.inventory)
    this.spinner.hide();
    this.adminService.global.inventory = this.inventory;	
  })
  }


}

ngAfterViewInit() {
  
}

goToPage(number){
  console.log(number);
  this.inventoryPageActive = number;
  this.adminService.inventoryPageActive = this.inventoryPageActive;
  this.spinner.show();
  if(this.adminService.inventoryPage['page'+number ]){

      this.inventory = this.adminService.inventoryPage['page'+number ];
      this.spinner.hide();
  }
  else{
    this.adminService.getInventory(number).subscribe( ( res ) => {
    this.adminService.inventoryPage['page'+number ] = res.inventory;
    this.inventory = this.adminService.inventoryPage['page'+number ];
    this.spinner.hide();
    this.adminService.global.inventory = this.inventory;	
    console.log(this.adminService.inventoryPage)
  })}
}

NextPage(){



  if(this.inventoryPageActive !== this.inventoryPages.length){
    this.inventoryPageActive = this.inventoryPageActive+1;
  this.adminService.inventoryPageActive = this.inventoryPageActive;
  this.spinner.show();
  if(this.adminService.inventoryPage['page'+this.inventoryPageActive ]){

      this.inventory = this.adminService.inventoryPage['page'+this.inventoryPageActive ];
      this.spinner.hide();
  }
  else{
    this.adminService.getInventory(this.inventoryPageActive).subscribe( ( res ) => {
    this.adminService.inventoryPage['page'+this.inventoryPageActive ] = res.inventory;
    this.inventory = this.adminService.inventoryPage['page'+this.inventoryPageActive ];
    this.spinner.hide();
    this.adminService.global.inventory = this.inventory;	
    console.log(this.adminService.inventoryPage)
  })}
  }
}

PreviosPage(){
  if(this.inventoryPageActive !== 1){
    this.inventoryPageActive = this.inventoryPageActive-1;
  this.adminService.inventoryPageActive = this.inventoryPageActive;
  this.spinner.show();
  if(this.adminService.inventoryPage['page'+this.inventoryPageActive ]){

      this.inventory = this.adminService.inventoryPage['page'+this.inventoryPageActive ];
      this.spinner.hide();
  }
  else{
    this.adminService.getInventory(this.inventoryPageActive).subscribe( ( res ) => {
    this.adminService.inventoryPage['page'+this.inventoryPageActive ] = res.inventory;
    this.inventory = this.adminService.inventoryPage['page'+this.inventoryPageActive ];
    this.spinner.hide();
    this.adminService.global.inventory = this.inventory;	
    console.log(this.adminService.inventoryPage)
  })}
  }	
}
  openPager(page) {
    switch (page) {
      case 'inventory':
        this.pager = 'inventory';
        break;
      case 'products':
        this.pager = 'products';
        break;
      case 'sales':
        this.pager = 'sales';
        break;
      default:
        this.pager = 'categories';
        break;
    }
  }
  openSecondPager(page) {
    switch (page) {
      case 'phone':
        this.pagerSecond = 'phone';
        break;
      case 'tablet':
        this.pagerSecond = 'tablet';
        break;
      case 'laptop':
        this.pagerSecond = 'laptop';
        break;
      case 'macbook':
        this.pagerSecond = 'macbook';
        break;
      default:
        this.pagerSecond = 'gaming';
        break;
    }
  }
  openThirdPager(page) {
    switch (page) {
      case 'iphone-phone':
        this.pagerThird = 'iphone-phone';
        this.adminService.getAllModels().subscribe( res => {
          console.log(res);
          this.models = res.Iphone;
          console.log(this.models);
        });
        break;
      case 'samsung-phone':
        this.pagerThird = 'samsung-phone';
        this.adminService.getAllModels().subscribe(res => {
          console.log(res);
          this.models = res.Samsung;
          console.log(this.models);
        });
        break;
      case 'huawei-phone':
        this.pagerThird = 'huawei-phone';
        break;
      case 'sony-phone':
        this.pagerThird = 'sony-phone';
        break;
      case 'nokia-phone':
        this.pagerThird = 'nokia-phone';
        break;
      case 'ipad-tablet':
        this.pagerThird = 'ipad-tablet';
        break;
      case 'samsung-tablet':
        this.pagerThird = 'samsung-tablet';
        break;
      case 'huawei-tablet':
        this.pagerThird = 'huawei-tablet';
        break;
      case 'hp-laptop':
        this.pagerThird = 'hp-laptop';
        break;
      case 'lenovo-laptop':
        this.pagerThird = 'lenovo-laptop';
        break;
      case 'dell-laptop':
        this.pagerThird = 'dell-laptop';
        break;
      case 'asus-laptop':
        this.pagerThird = 'asus-laptop';
        break;
      case 'huawei-laptop':
        this.pagerThird = 'huawei-laptop';
        break;
      case 'acer-laptop':
        this.pagerThird = 'acer-laptop';
        break;
      case 'microsoft-laptop':
        this.pagerThird = 'microsoft-laptop';
        break;
      case 'chrome-laptop':
        this.pagerThird = 'chrome-laptop';
        break;
      case 'toshiba-laptop':
        this.pagerThird = 'toshiba-laptop';
        break;
      case 'macbook':
        this.pagerThird = 'macbook';
        break;
      default:
        this.pagerThird = 'gaming';
        break;
    }
  }
}
