import * as $ from 'jquery';

import { Component, OnInit , AfterViewInit } from '@angular/core';
import { Leads, AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router , ActivatedRoute  } from '@angular/router';



@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {

  leads = [] ;
  leadsPage  = new Object();
  pages : any;
  pageActive : number;

  constructor( public adminService : AdminService , private spinner: NgxSpinnerService,public router : Router ) { 
  		
  		this.pageActive = this.adminService.pageActive;
  		this.adminService.leadsPage['page'+this.pageActive ] ? this.leads = this.adminService.leadsPage['page'+this.pageActive ] : '';
  		this.pages = this.adminService.pages;

  }

  ngOnInit() {
  	if (this.leads.length == 0) {
  		this.pageActive = 1;
  		this.adminService.pageActive = this.pageActive;
  		this.spinner.show();
  		this.adminService.getLeads().subscribe( ( res ) => {
		console.log("this res:"+ JSON.stringify(res));
		this.pages = Array(res.total_page);
  		this.adminService.pages = this.pages;
  		console.log(this.pages)	
  		this.adminService.leadsPage['page'+1 ] = res.bookings;
  		console.log(this.leadsPage)
  		this.leads = this.adminService.leadsPage['page'+1 ];
  		console.log(this.leads)
  		this.spinner.hide();
  		this.adminService.global.leads = this.leads;	

  	})
  	}
  }

	goToPage(number){
		console.log(number);
		this.pageActive = number;
		this.adminService.pageActive = this.pageActive;
		this.spinner.show();
		if(this.adminService.leadsPage['page' + number ]) {

	  		this.leads = this.adminService.leadsPage['page' + number ];
	  		this.spinner.hide();
		}
		else{
  		this.adminService.getLeads(number).subscribe( ( res ) => {
  		this.adminService.leadsPage['page'+number ] = res.bookings;
  		this.leads = this.adminService.leadsPage['page'+number ];
  		this.spinner.hide();
  		this.adminService.global.leads = this.leads;	
  		console.log(this.adminService.leadsPage)
  	})}
	}

  NextPage(){
  	if(this.pageActive !== this.pages.length){
  		this.pageActive = this.pageActive+1;
		this.adminService.pageActive = this.pageActive;
		this.spinner.show();
		if(this.adminService.leadsPage['page'+this.pageActive ]){

	  		this.leads = this.adminService.leadsPage['page'+this.pageActive ];
	  		this.spinner.hide();
		}
		else{
  		this.adminService.getLeads(this.pageActive).subscribe( ( res ) => {
  		this.adminService.leadsPage['page'+this.pageActive ] = res.bookings;
  		this.leads = this.adminService.leadsPage['page'+this.pageActive ];
  		this.spinner.hide();
  		this.adminService.global.leads = this.leads;	
  		console.log(this.adminService.leadsPage)
  	})}
  	}
  }

  PreviosPage(){
  	if(this.pageActive !== 1){
  		this.pageActive = this.pageActive-1;
		this.adminService.pageActive = this.pageActive;
		this.spinner.show();
		if(this.adminService.leadsPage['page'+this.pageActive ]){

	  		this.leads = this.adminService.leadsPage['page'+this.pageActive ];
	  		this.spinner.hide();
		}
		else{
  		this.adminService.getLeads(this.pageActive).subscribe( ( res ) => {
  		this.adminService.leadsPage['page'+this.pageActive ] = res.bookings;
  		this.leads = this.adminService.leadsPage['page'+this.pageActive ];
  		this.spinner.hide();
  		this.adminService.global.leads = this.leads;	
  		console.log(this.adminService.leadsPage)
  	})}
  	}	
  }

  updateStatus(id){
	this.spinner.show();
    this.adminService.updateBookingStatus(id).subscribe(res=>{
	  console.log(res);
	  console.log("worked")
      location.reload();
    },
    err => {
	  console.log(err);
	  console.log("notworked")
      location.reload();
    }
    )
	}

	checkStatus(id, status){
		console.log(id);
		if (status == "Resolved"){
			console.log("Already Resolved");
		} else {
			this.updateStatus(id);
		}
	}
	
	updatePaymentStatus(id){
		this.spinner.show();
			this.adminService.updatePaymentStatus(id).subscribe(res=>{
				console.log(res);
				location.reload();
			},
			err => {
				console.log(err);
				location.reload();
			}
			)
		}

  cancelBooking(id){
	this.spinner.show();
  this.adminService.cancelBooking(id).subscribe(res=>{
	this.spinner.hide();
	console.log(res);
	this.adminService.leadsPage  = new Object(); 
	 location.reload();
  },
  err =>{
	console.log(err);
	this.spinner.hide();
  }
  )}

viewCustomer(id,index){
	console.log(index);
	this.router.navigate(['/view-customer' , index]);
}

viewRepair(id,index){
	console.log(index);
	this.router.navigate(['/view-repair' , index]);
}

processLeads(id, index) {
	console.log(index);
	this.router.navigate(['/process-leads', index]);

}
}
