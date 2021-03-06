import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

	title;
	buttonName;
  constructor(  private route: ActivatedRoute,
  private router: Router , public adminService : AdminService,
  public spinner : NgxSpinnerService) { 
 
   }

  customer = { 
  	customer_fname: '',
  	customer_lname :'',
  	email : '',
  	phone : '',
  	address :'',
  	birthdate : '',
	location_id: '',
	smsOption:'',  
  	// city : '',
  	// state : '',
  	// zip : '',
  	id : 0,
  	// password : '',
  };

  id ;

  ngOnInit() {
  	if(this.adminService.customersAction == 'update'){
	this.title = 'Edit Customer';
	this.buttonName = 'Save Changes';
  	this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
 		console.log(this.adminService.customersPage['page'+this.adminService.customerspageActive ][this.id])
 		this.customer = this.adminService.customersPage['page'+this.adminService.customerspageActive ][this.id];
    });
   } else {
		this.buttonName = 'Save New Customer';
		this.title = 'New Customer';
   }
  } 
  
  updateCustomer(){
	this.customer.id
  	this.spinner.show();
 //  	$.ajax({
	//   method: "PUT",
	//   url: 'https://iphixx.repairshopr.com/api/v1/customers/'+this.customer.id+'?api_key=b60db6c6-2740-48c0-a0fa-34a49ecf6b3f&firstname='+this.customer.firstname+'&lastname='+
	//   this.customer.lastname+'&email='+this.customer.email+'&phone='+this.customer.phone+'&address='+this.customer.address
	//   +'&city='+this.customer.city+'&state='+this.customer.state+'&zip='+this.customer.zip,
	//   data: {
	//   			firstname: this.customer.firstname, 
	//   			lastname: this.customer.lastname,
	//   			email : this.customer.email,
	//   			phone : this.customer.phone,
	//   			address : this.customer.address,
	//   			city : this.customer.city,
	//   			state : this.customer.state,
	//   			zip : this.customer.zip
	  		
	//   		},
	//   success: (res) => {
	//   	this.spinner.hide();
	//   	console.log(res);
	//   	this.adminService.customersPage  = new Object(); 
	//   	this.router.navigate(['/customers']);
	//   },
	//   error:(err)=>{
	//    console.log(err);
	//    alert('Error! Please Try again.')
	//    this.spinner.hide();
	//   }
	  
	// });

	this.adminService.updateCustomer(this.customer).subscribe(res => {
		console.log(res)
		this.spinner.hide();
		this.adminService.customersPage  = new Object(); 
	  	this.router.navigate(['/customers']);
	},
	 (err)=>{
	   console.log(err);
	   alert('Error! Please Try again.')
	   this.spinner.hide();
	  }


	)
  }

  newCustomer(){
	console.log(this.customer.address);
	  this.spinner.show();
	  this.adminService.addCustomer(this.customer).subscribe(res => {
		console.log("this " + res)
		this.spinner.hide();
		this.adminService.customersPage  = new Object(); 
	  	this.router.navigate(['/customers']);
	},
	 (err)=>{
	   console.log(err);
	   alert('Error! Please Try again.')
	   this.spinner.hide();
	  }


	)
 //  	$.ajax({
	//   type: "POST",
	//   url: 'https://iphixx.repairshopr.com/api/v1/customers/?api_key=b60db6c6-2740-48c0-a0fa-34a49ecf6b3f&firstname='+this.customer.firstname+'&lastname='+
	//   this.customer.lastname+'&email='+this.customer.email+'&phone='+this.customer.phone+'&address='+this.customer.address
	//   +'&city='+this.customer.city+'&state='+this.customer.state+'&zip='+this.customer.zip,
	//   data: {
	//   			firstname: this.customer.firstname, 
	//   			lastname: this.customer.lastname,
	//   			email : this.customer.email,
	//   			phone : this.customer.phone,
	//   			address : this.customer.address,
	//   			city : this.customer.city,
	//   			state : this.customer.state,
	//   			zip : this.customer.zip
	  		
	//   		},
	//   success: (res) => {
	//   	this.spinner.hide();
	//   	console.log(res);
	//   	this.adminService.customersPage  = new Object(); 
	//   	this.router.navigate(['/customers']);
	//   },
	//   error:(err)=>{
	//    console.log(err);
	//    alert('Error! Please Try again.')
	//    this.spinner.hide();
	//   }
	  
	// });
	//  let form = new FormData();
    //     form.append("fullname", this.customer.fullname);
    //     form.append("business_name", this.customer.business_name);
    //     form.append("email", this.customer.email);
    //     form.append("phone", this.customer.phone);
    //     form.append("address", this.customer.address);
    //     form.append("username", this.customer.email);
    //     form.append("password",  this.customer.password);
    //     form.append("address_2", this.customer.address_2);
    //     form.append("city", this.customer.city);
    //     form.append("state", this.customer.state);
    //     form.append("zip", this.customer.zip);

	// 	console.log(JSON.stringify(form));
    //     let xhr = new XMLHttpRequest();
    //     xhr.withCredentials = true;

    //     xhr.addEventListener("readystatechange",  ()=> {
    //       if (xhr.readyState === 4) {
    //         console.log(JSON.parse(xhr.responseText));
    //        this.spinner.hide();
	
	// 	  	this.adminService.customersPage  = new Object(); 
	// 	  	this.router.navigate(['/customers']);


    //       }

    //       else{


    //       }
    //     });



    //     xhr.open("POST", "http://admin.iphixx.com/api/v1/customers/");


    //     xhr.send(form);

  }

  actionCustomer(){
	console.log(this.adminService.customersAction);
  	if(this.adminService.customersAction == 'update'){
  		this.updateCustomer();
  	}
  	else{
  		this.newCustomer();
  	}
  }

  goToCustomer(){
	this.router.navigate(['/customers']);
  }

}
