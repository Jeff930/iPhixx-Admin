import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.scss']
})
export class EditAgentComponent implements OnInit {

	
  constructor(  private route: ActivatedRoute,
  private router: Router , public adminService : AdminService,
  public spinner : NgxSpinnerService) { 
  	// this.adminService.updateCustomer().subscribe( res => console.log(res))
 
   }

  agent = { 
  	agent_fname: '',
	agent_lname :'',
	agent_username:'',
	password :'',  
  	email : '',
  	phone : '',
  	address :'',
  	pin : '',
  	store_assigned : '',
  	// state : '',
  	// zip : '',
  	id : 0,
  	// password : '',

  };

  id ;

  ngOnInit() {
  	if(this.adminService.customersAction == 'update'){
  	this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
 		console.log(this.adminService.customersPage['page'+this.adminService.customerspageActive ][this.id])
 		this.agent = this.adminService.customersPage['page'+this.adminService.customerspageActive ][this.id];
    });
   }
  } 
  
  updateAgent(){
	this.agent.id
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

	this.adminService.updateAgent(this.agent).subscribe(res => {
		console.log(res)
		this.spinner.hide();
		this.adminService.agentsPage  = new Object(); 
	  	this.router.navigate(['/agent']);
	},
	 (err)=>{
	   console.log(err);
	   alert('Error! Please Try again.')
	   this.spinner.hide();
	  }


	)
  }

  newAgent(){
	console.log("called");
	console.log(this.agent.agent_fname);
	  this.spinner.show();
	  this.adminService.addAgent(this.agent).subscribe(res => {
		console.log("this" + res)
		this.spinner.hide();
		this.adminService.agentsPage  = new Object(); 
	  	this.router.navigate(['/agents']);
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

  actionAgent(){
  	if(this.adminService.customersAction == 'update'){
  		this.updateAgent();
  	}
  	else{
  		this.newAgent();
  	}
  }

  goToAgent(){
	this.router.navigate(['/agents']);
  }

}
