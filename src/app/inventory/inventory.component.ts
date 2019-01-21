import * as $ from 'jquery';

import { Component, OnInit , AfterViewInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router , ActivatedRoute  } from '@angular/router';

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

  constructor( public adminService : AdminService , private spinner: NgxSpinnerService,public router : Router ) { 
  		
    this.inventoryPageActive = this.adminService.inventoryPageActive;
    this.adminService.inventoryPage['page'+this.inventoryPageActive ] ? this.inventory = this.adminService.inventoryPage['page'+this.inventoryPageActive ] : '';
    this.inventoryPages = this.adminService.inventoryPages;

}

ngOnInit() {
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

ngAfterViewInit(){

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

}
