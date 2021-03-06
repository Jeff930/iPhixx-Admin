import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Customers, AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router , ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
pager = 'customers';
customers = []; 	
customersPage  = new Object();	
customerspages : any;
customerspageActive : number;

  constructor( public adminService : AdminService , private spinner: NgxSpinnerService , public router : Router ) { 
  }

  ngOnInit() {
      this.customerspageActive = this.adminService.customerspageActive;
      this.adminService.customersPage['page'+this.customerspageActive ] ? this.customers = this.adminService.customersPage['page'+this.customerspageActive ] : '';
	  this.adminService.customerspages ? this.customerspages = this.adminService.customerspages : '';
	  
  	if (this.customers.length == 0) {
		this.adminService.currentCustomersPage = 0;
  		this.customerspageActive = 1;
  		this.adminService.customerspageActive = this.customerspageActive;
  		this.spinner.show();
  		this.adminService.getCustomers(1).subscribe( ( res ) => {
  	  	console.log(res);
		this.customerspages = Array(res.total_page);
		console.log(this.customerspages);  
  		this.adminService.customerspages = this.customerspages;
  	
  		this.adminService.customersPage['page'+1 ] = res.customers;

  		this.customers = this.adminService.customersPage['page'+1 ];

  		console.log(this.customers)
  		this.spinner.hide();
  		this.adminService.global.customers = this.customers;	

  	})
	  }
	this.adminService.getCustomers(1).subscribe( res => {
		console.log(res);
		this.customers = res.customers;
	});

  }

  goToPage(i){
		console.log(i);
		this.adminService.currentCustomersPage = i;
		var number = parseInt(i)+1;
		this.customerspageActive = number;
		this.adminService.customerspageActive = this.customerspageActive;
		this.spinner.show();
		if(this.adminService.customersPage['page'+number ]){
	  		this.customers = this.adminService.customersPage['page'+number ];
	  		this.spinner.hide();
		}
		else{
  		this.adminService.getCustomers(number).subscribe( ( res ) => {
  		this.adminService.customersPage['page'+number ] = res.customers;
  		this.customers = this.adminService.customersPage['page'+number ];
  		this.spinner.hide();
  		this.adminService.global.customers = this.customers;	
  		console.log(this.adminService.customersPage)
  	})}
	}

	openPager(page) {
		switch (page) {
			case 'customers':
				this.pager = 'customers';
				break;
			default:
				this.pager = 'manages';
				break;
		}
	}

  NextPage(){
	this.adminService.currentCustomersPage = this.adminService.currentCustomersPage + 1;
  	if(this.customerspageActive !== this.customerspages.length){
  		this.customerspageActive = this.customerspageActive+1;
		this.adminService.customerspageActive = this.customerspageActive;
		this.spinner.show();
		if(this.adminService.customersPage['page'+this.customerspageActive ]){

	  		this.customers = this.adminService.customersPage['page'+this.customerspageActive ];
	  		this.spinner.hide();
		}
		else{
  		this.adminService.getCustomers(this.customerspageActive).subscribe( ( res ) => {
  		this.adminService.customersPage['page'+this.customerspageActive ] = res.customers;
  		this.customers = this.adminService.customersPage['page'+this.customerspageActive ];
  		this.spinner.hide();
  		this.adminService.global.customers = this.customers;	
  		console.log(this.adminService.customersPage)
  	})}
  	}
  }

  PreviosPage(){
	this.adminService.currentCustomersPage = this.adminService.currentCustomersPage - 1;
  	if(this.customerspageActive !== 1){
  		this.customerspageActive = this.customerspageActive-1;
		this.adminService.customerspageActive = this.customerspageActive;
		this.spinner.show();
		if(this.adminService.customersPage['page'+this.customerspageActive ]){
	  		this.customers = this.adminService.customersPage['page'+this.customerspageActive ];
	  		this.spinner.hide();
		}
		else{
  		this.adminService.getCustomers(this.customerspageActive).subscribe( ( res ) => {
  		this.adminService.customersPage['page'+this.customerspageActive ] = res.customers;
  		this.customers = this.adminService.customersPage['page'+this.customerspageActive ];
  		this.spinner.hide();
  		this.adminService.global.customers = this.customers;	
  		console.log(this.adminService.customersPage)
  	})}
  	}	
  }

  editCustomer(id , index) {
  	console.log(index);
	  this.adminService.customersAction = 'update';
  	this.router.navigate(['/edit-customer' , index]);
  }

  newCustomer() {
  	this.adminService.customersAction = 'new';
  	this.router.navigate(['/edit-customer']);
  }
  
  deleteCustomer(id){
	  this.spinner.show();
	  console.log(id);
    this.adminService.deleteCustomer(id).subscribe(res=>{
      // this.spinner.hide();
      console.log(res);
      this.adminService.customersPage  = new Object(); 
      location.reload();
    },
    err =>{
      alert('Error! Please Try again.')
      this.spinner.hide();

    })
  }

}
