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

  	// $('[data-toggle="popover"]').popover();

      this.customerspageActive = this.adminService.customerspageActive;
      this.adminService.customersPage['page'+this.customerspageActive ] ? this.customers = this.adminService.customersPage['page'+this.customerspageActive ] : '';
      this.adminService.customerspages ? this.customerspages = this.adminService.customerspages : '';

  	if (this.customers.length == 0) {
  		this.customerspageActive = 1;
  		this.adminService.customerspageActive = this.customerspageActive;
  		this.spinner.show();
  		this.adminService.getCustomers().subscribe( ( res ) => {
  	  console.log(res);
  		this.customerspages = Array(res.total_page);
  		this.adminService.customerspages = this.customerspages;
  	
  		this.adminService.customersPage['page'+1 ] = res.customers;

  		this.customers = this.adminService.customersPage['page'+1 ];

  		console.log(this.customers)
  		this.spinner.hide();
  		this.adminService.global.customers = this.customers;	

  	})
  	}

  }

  goToPage(number){
		console.log(number);
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

    }
    )
 //  	$.ajax({
	//   type: "DELETE",
	//   url: 'https://iphixx.repairshopr.com/api/v1/customers/'+id+'?api_key=b60db6c6-2740-48c0-a0fa-34a49ecf6b3f',
	 
	//   success: (res) => {
	//   	this.spinner.hide();
	//   	console.log(res);
	//   	this.adminService.customersPage  = new Object(); 
	//   	// this.router.navigate(['/customers']);
	//   },
	//   error:(err)=>{
	//    console.log(err);
	//    alert('Error! Please Try again.')
	//    this.spinner.hide();
	//   }
	  
	// });
  }

}
