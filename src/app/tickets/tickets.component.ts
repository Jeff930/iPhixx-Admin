import * as $ from 'jquery';

import { Component, OnInit , AfterViewInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router , ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  tickets = [] ;
  ticketsPage  = new Object();	
  ticketPages : any;
  ticketPageActive : number;

  constructor( public adminService : AdminService , private spinner: NgxSpinnerService,public router : Router ) { 
  		
  		this.ticketPageActive = this.adminService.ticketPageActive;
  		this.adminService.ticketsPage['page'+this.ticketPageActive ] ? this.tickets = this.adminService.ticketsPage['page'+this.ticketPageActive ] : '';
  		this.ticketPages = this.adminService.ticketPages;

  }

  ngOnInit() {
  	if (this.tickets.length == 0) {
  		this.ticketPageActive = 1;
  		this.adminService.ticketPageActive = this.ticketPageActive;
  		this.spinner.show();
  		this.adminService.getTickets().subscribe( ( res ) => {
		console.log("this res:"+ JSON.stringify(res));
		this.ticketPages = Array(res.total_page);
  		this.adminService.ticketPages = this.ticketPages;
  		console.log(this.ticketPages)	
  		this.adminService.ticketsPage['page'+1 ] = res.tickets;
  		console.log(this.ticketsPage)
  		this.tickets = this.adminService.ticketsPage['page'+1 ];
  		console.log(this.tickets)
  		this.spinner.hide();
  		this.adminService.global.tickets = this.tickets;	

  	})
  	}


  }

	ngAfterViewInit(){

	}

	goToPage(number){
		console.log(number);
		this.ticketPageActive = number;
		this.adminService.ticketPageActive = this.ticketPageActive;
		this.spinner.show();
		if(this.adminService.ticketsPage['page'+number ]){

	  		this.tickets = this.adminService.ticketsPage['page'+number ];
	  		this.spinner.hide();
		}
		else{
  		this.adminService.getTickets(number).subscribe( ( res ) => {
  		this.adminService.ticketsPage['page'+number ] = res.tickets;
  		this.tickets = this.adminService.ticketsPage['page'+number ];
  		this.spinner.hide();
  		this.adminService.global.tickets = this.tickets;	
  		console.log(this.adminService.ticketsPage)
  	})}
	}

  NextPage(){



  	if(this.ticketPageActive !== this.ticketPages.length){
  		this.ticketPageActive = this.ticketPageActive+1;
		this.adminService.ticketPageActive = this.ticketPageActive;
		this.spinner.show();
		if(this.adminService.ticketsPage['page'+this.ticketPageActive ]){

	  		this.tickets = this.adminService.ticketsPage['page'+this.ticketPageActive ];
	  		this.spinner.hide();
		}
		else{
  		this.adminService.getTickets(this.ticketPageActive).subscribe( ( res ) => {
  		this.adminService.ticketsPage['page'+this.ticketPageActive ] = res.tickets;
  		this.tickets = this.adminService.ticketsPage['page'+this.ticketPageActive ];
  		this.spinner.hide();
  		this.adminService.global.tickets = this.tickets;	
  		console.log(this.adminService.ticketsPage)
  	})}
  	}
  }

  PreviosPage(){
  	if(this.ticketPageActive !== 1){
  		this.ticketPageActive = this.ticketPageActive-1;
		this.adminService.ticketPageActive = this.ticketPageActive;
		this.spinner.show();
		if(this.adminService.ticketsPage['page'+this.ticketPageActive ]){

	  		this.tickets = this.adminService.ticketsPage['page'+this.ticketPageActive ];
	  		this.spinner.hide();
		}
		else{
  		this.adminService.getTickets(this.ticketPageActive).subscribe( ( res ) => {
  		this.adminService.ticketsPage['page'+this.ticketPageActive ] = res.tickets;
  		this.tickets = this.adminService.ticketsPage['page'+this.ticketPageActive ];
  		this.spinner.hide();
  		this.adminService.global.tickets = this.tickets;	
  		console.log(this.adminService.ticketsPage)
  	})}
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

//   deleteBooking(id){
// 	this.spinner.show();
//   this.adminService.deleteBooking(id).subscribe(res=>{
// 	this.spinner.hide();
// 	console.log(res);
// 	this.adminService.ticketsPage  = new Object(); 
// 	 location.reload();
//   },
//   err =>{
// 	alert('Error! Please Try again.')
// 	this.spinner.hide();

//   }
//   )}

  editBooking(id , index){
	console.log(index);
	this.router.navigate(['/edit-booking' , index]);
}

viewRepair(id , index){
	console.log(index);
	this.router.navigate(['/view-repair' , index]);
}
}
