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
  currentPage:number;
  pagerThird;
  models;
  allModels: any;
  constructor(public adminService: AdminService, private spinner: NgxSpinnerService, public router: Router, public route: ActivatedRoute) { 
  		
    this.inventoryPageActive = this.adminService.inventoryPageActive;
    this.adminService.inventoryPage['page'+this.inventoryPageActive ] ? this.inventory = this.adminService.inventoryPage['page'+this.inventoryPageActive ] : '';
    this.inventoryPages = this.adminService.inventoryPages;

}

  ngOnInit() {
    this.inventoryPageActive = this.adminService.networkspageActive;
    this.adminService.inventoryPage['page'+this.inventoryPageActive ] ? this.inventory = this.adminService.inventoryPage['page'+this.inventoryPageActive ] : '';
    this.adminService.inventoryPages ? this.inventoryPages = this.adminService.inventoryPages : '';
  //   this.route.paramMap.subscribe((params: ParamMap) => {
  //     if (params.get('page') !== 'invt') {
  //       this.pager = 'categories';
  //     } else {
  //       this.pager = 'products';
  //     }
  //   });
  // this.adminService.getModels().subscribe(res => {
  //   console.log(res);
  //   this.allModels = res;
  // });
  

    if (this.inventory.length == 0) {
      this.spinner.show();
      this.adminService. currentInventoryPage = 0;
    this.inventoryPageActive = 1;
    this.adminService.inventoryPageActive = this.inventoryPageActive;
    this.adminService.getInventory(1).subscribe( ( res ) => {
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

goToPage(i){
  console.log("called");
  this.adminService. currentInventoryPage = i;
	var number = parseInt(i)+1;
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
  this.adminService. currentInventoryPage = this.adminService. currentInventoryPage + 1;
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
  this.adminService. currentInventoryPage = this.adminService. currentInventoryPage - 1;
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

restock(id){
  this.router.navigate(['/restock',id]);
}

newItem(){
  this.router.navigate(['/add-item']);
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
        this.models = [];
        break;
      case 'tablet':
        this.pagerSecond = 'tablet';
        this.models = [];
        break;
      case 'laptop':
        this.pagerSecond = 'laptop';
        this.models = [];
        break;
      case 'macbook':
        this.pagerSecond = 'macbook';
        this.models = [];
        break;
      default:
        this.pagerSecond = 'gaming';
        this.models = [];
        break;
    }
  }
  openThirdPager(page) {
    switch (page) {
      case 'iphone-phone':
        this.pagerThird = 'iphone-phone';
        this.models = [];
        for ( const model of this.allModels) {
          console.log(model);
          if ( model.type === 'Phone' && model.phone_brand === 'iPhone') {
            this.models.push(model);
          }
        }
        console.log(this.models);
        break;
      case 'samsung-phone':
        this.pagerThird = 'samsung-phone';
        this.models = [];
        for (const model of this.allModels) {
          console.log(model);
          if (model.type === 'Phone' && model.phone_brand === 'Samsung') {
            this.models.push(model);
          }
        }
        console.log(this.models);
        break;
      case 'huawei-phone':
        this.pagerThird = 'huawei-phone';
        this.models = [];
        for (const model of this.allModels) {
          console.log(model);
          if (model.type === 'Phone' && model.phone_brand === 'Huawei') {
            this.models.push(model);
          }
        }
        console.log(this.models);
        break;
      case 'sony-phone':
        this.pagerThird = 'sony-phone';
        this.models = [];
        for (const model of this.allModels) {
          console.log(model);
          if (model.type === 'Phone' && model.phone_brand === 'Sony') {
            this.models.push(model);
          }
        }
        console.log(this.models);
        break;
      case 'nokia-phone':
        this.pagerThird = 'nokia-phone';
        this.models = [];
        for (const model of this.allModels) {
          console.log(model);
          if (model.type === 'Phone' && model.phone_brand === 'Nokia') {
            this.models.push(model);
          }
        }
        console.log(this.models);
        break;
      case 'ipad-tablet':
        this.pagerThird = 'ipad-tablet';
        this.models = [];
        for (const model of this.allModels) {
          console.log(model);
          if (model.type === 'Tablet' && model.phone_brand === 'iPad') {
            this.models.push(model);
          }
        }
        console.log(this.models);
        break;
      case 'samsung-tablet':
        this.pagerThird = 'samsung-tablet';
        this.models = [];
        for (const model of this.allModels) {
          console.log(model);
          if (model.type === 'Tablet' && model.phone_brand === 'Samsung') {
            this.models.push(model);
          }
        }
        console.log(this.models);
        break;
      case 'huawei-tablet':
        this.pagerThird = 'huawei-tablet';
        this.models = [];
        for (const model of this.allModels) {
          console.log(model);
          if (model.type === 'Tablet' && model.phone_brand === 'Huawei') {
            console.log('es');
            this.models.push(model);
          }
        }
        console.log(this.models);
        break;
      case 'hp-laptop':
        this.pagerThird = 'hp-laptop';
        this.models = [];
        break;
      case 'lenovo-laptop':
        this.pagerThird = 'lenovo-laptop';
        this.models = [];
        break;
      case 'dell-laptop':
        this.pagerThird = 'dell-laptop';
        this.models = [];
        break;
      case 'asus-laptop':
        this.pagerThird = 'asus-laptop';
        this.models = [];
        break;
      case 'huawei-laptop':
        this.pagerThird = 'huawei-laptop';
        this.models = [];
        break;
      case 'acer-laptop':
        this.pagerThird = 'acer-laptop';
        this.models = [];
        break;
      case 'microsoft-laptop':
        this.pagerThird = 'microsoft-laptop';
        this.models = [];
        break;
      case 'chrome-laptop':
        this.pagerThird = 'chrome-laptop';
        this.models = [];
        break;
      case 'toshiba-laptop':
        this.pagerThird = 'toshiba-laptop';
        this.models = [];
        break;
      case 'macbook':
        this.pagerThird = 'macbook';
        this.models = [];
        break;
      default:
        this.pagerThird = 'gaming';
        this.models = [];
        break;
    }
  }
}
