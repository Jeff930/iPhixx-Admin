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


	leads = [];
	leadsPage = new Object();
	pages: any;
	pageActive: number;
	location;
	constructor(public adminService: AdminService, private spinner: NgxSpinnerService, public router: Router) {

		this.pageActive = this.adminService.pageActive;
		this.adminService.leadsPage['page' + this.pageActive] ? this.leads = this.adminService.leadsPage['page' + this.pageActive] : '';
		this.pages = this.adminService.pages;

	}

	ngOnInit() {
		if (this.leads.length == 0) {
			this.pageActive = 1;
			this.adminService.pageActive = this.pageActive;
			this.spinner.show();
			this.adminService.getLeads().subscribe((res) => {
				console.log("this res:" + JSON.stringify(res));
				this.pages = Array(res.total_page);
				this.adminService.pages = this.pages;
				console.log(this.pages)
				this.adminService.leadsPage['page' + 1] = res.bookings;
				console.log(this.leadsPage)
				this.leads = this.adminService.leadsPage['page' + 1];
				console.log(this.leads)
				this.spinner.hide();
				this.adminService.global.leads = this.leads;

			})
		}
	}

	goToPage(number) {
		console.log(number);
		this.pageActive = number;
		this.adminService.pageActive = this.pageActive;
		this.spinner.show();
		if (this.adminService.leadsPage['page' + number]) {

			this.leads = this.adminService.leadsPage['page' + number];
			this.spinner.hide();
		}
		else {
			this.adminService.getLeads(number).subscribe((res) => {
				this.adminService.leadsPage['page' + number] = res.bookings;
				this.leads = this.adminService.leadsPage['page' + number];
				this.spinner.hide();
				this.adminService.global.leads = this.leads;
				console.log(this.adminService.leadsPage)
			})
		}
	}

	NextPage() {
		if (this.pageActive !== this.pages.length) {
			this.pageActive = this.pageActive + 1;
			this.adminService.pageActive = this.pageActive;
			this.spinner.show();
			if (this.adminService.leadsPage['page' + this.pageActive]) {

				this.leads = this.adminService.leadsPage['page' + this.pageActive];
				this.spinner.hide();
			}
			else {
				this.adminService.getLeads(this.pageActive).subscribe((res) => {
					this.adminService.leadsPage['page' + this.pageActive] = res.bookings;
					this.leads = this.adminService.leadsPage['page' + this.pageActive];
					this.spinner.hide();
					this.adminService.global.leads = this.leads;
					console.log(this.adminService.leadsPage)
				})
			}
		}
	}

	PreviosPage() {
		if (this.pageActive !== 1) {
			this.pageActive = this.pageActive - 1;
			this.adminService.pageActive = this.pageActive;
			this.spinner.show();
			if (this.adminService.leadsPage['page' + this.pageActive]) {

				this.leads = this.adminService.leadsPage['page' + this.pageActive];
				this.spinner.hide();
			}
			else {
				this.adminService.getLeads(this.pageActive).subscribe((res) => {
					this.adminService.leadsPage['page' + this.pageActive] = res.bookings;
					this.leads = this.adminService.leadsPage['page' + this.pageActive];
					this.spinner.hide();
					this.adminService.global.leads = this.leads;
					console.log(this.adminService.leadsPage)
				})
			}
		}
	}

	updateStatus(id) {
		this.spinner.show();
		this.adminService.updateBookingStatus(id).subscribe(res => {
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

	checkStatus(id, status) {
		console.log(id);
		if (status == "Resolved") {
			console.log("Already Resolved");
		} else {
			this.updateStatus(id);
		}
	}

	updatePaymentStatus(id) {
		this.spinner.show();
		this.adminService.updatePaymentStatus(id).subscribe(res => {
			console.log(res);
			location.reload();
		},
			err => {
				console.log(err);
				location.reload();
			}
		)
	}

	cancelBooking(id) {
		this.spinner.show();
		this.adminService.cancelBooking(id).subscribe(res => {
			this.spinner.hide();
			console.log(res);
			this.adminService.leadsPage = new Object();
			location.reload();
		},
			err => {
				console.log(err);
				this.spinner.hide();
			}
		)
	}

	viewCustomer(id, index) {
		console.log(index);
		this.router.navigate(['/view-customer', index]);
	}

	viewRepair(id, index) {
		console.log(index);
		this.router.navigate(['/view-repair', index]);
	}

	processLeads(id, index) {
		console.log(index);
		this.router.navigate(['/process-leads', index]);

	}

//   tickets = [] ;
//   ticketsPage  = new Object();	
//   ticketPages : any;
//   ticketPageActive : number;
// 	location;
//   constructor( public adminService : AdminService , private spinner: NgxSpinnerService,public router : Router ) { 
  		
//   		this.ticketPageActive = this.adminService.ticketPageActive;
//   		this.adminService.ticketsPage['page'+this.ticketPageActive ] ? this.tickets = this.adminService.ticketsPage['page'+this.ticketPageActive ] : '';
//   		this.ticketPages = this.adminService.ticketPages;

//   }

//   ngOnInit() {
//   	if (this.tickets.length == 0) {
//   		this.ticketPageActive = 1;
//   		this.adminService.ticketPageActive = this.ticketPageActive;
//   		this.spinner.show();
//   		this.adminService.getTickets().subscribe( ( res ) => {
// 		console.log("this res:"+ JSON.stringify(res));
// 		this.ticketPages = Array(res.total_page);
//   		this.adminService.ticketPages = this.ticketPages;
//   		console.log(this.ticketPages)	
//   		this.adminService.ticketsPage['page'+1 ] = res.tickets;
//   		console.log(this.ticketsPage)
//   		this.tickets = this.adminService.ticketsPage['page'+1 ];
//   		console.log(this.tickets)
//   		this.spinner.hide();
//   		this.adminService.global.tickets = this.tickets;	
// 		console.log(this.location);
//   	})
//   	}


//   }

// 	ngAfterViewInit(){

// 	}

// 	goToPage(number){
// 		console.log(number);
// 		this.ticketPageActive = number;
// 		this.adminService.ticketPageActive = this.ticketPageActive;
// 		this.spinner.show();
// 		if(this.adminService.ticketsPage['page'+number ]){

// 	  		this.tickets = this.adminService.ticketsPage['page'+number ];
// 	  		this.spinner.hide();
// 		}
// 		else{
//   		this.adminService.getTickets(number).subscribe( ( res ) => {
//   		this.adminService.ticketsPage['page'+number ] = res.tickets;
//   		this.tickets = this.adminService.ticketsPage['page'+number ];
//   		this.spinner.hide();
//   		this.adminService.global.tickets = this.tickets;	
//   		console.log(this.adminService.ticketsPage)
//   	})}
// 	}

//   NextPage(){



//   	if(this.ticketPageActive !== this.ticketPages.length){
//   		this.ticketPageActive = this.ticketPageActive+1;
// 		this.adminService.ticketPageActive = this.ticketPageActive;
// 		this.spinner.show();
// 		if(this.adminService.ticketsPage['page'+this.ticketPageActive ]){

// 	  		this.tickets = this.adminService.ticketsPage['page'+this.ticketPageActive ];
// 	  		this.spinner.hide();
// 		}
// 		else{
//   		this.adminService.getTickets(this.ticketPageActive).subscribe( ( res ) => {
//   		this.adminService.ticketsPage['page'+this.ticketPageActive ] = res.tickets;
//   		this.tickets = this.adminService.ticketsPage['page'+this.ticketPageActive ];
//   		this.spinner.hide();
//   		this.adminService.global.tickets = this.tickets;	
//   		console.log(this.adminService.ticketsPage)
//   	})}
//   	}
//   }

//   PreviosPage(){
//   	if(this.ticketPageActive !== 1){
//   		this.ticketPageActive = this.ticketPageActive-1;
// 		this.adminService.ticketPageActive = this.ticketPageActive;
// 		this.spinner.show();
// 		if(this.adminService.ticketsPage['page'+this.ticketPageActive ]){

// 	  		this.tickets = this.adminService.ticketsPage['page'+this.ticketPageActive ];
// 	  		this.spinner.hide();
// 		}
// 		else{
//   		this.adminService.getTickets(this.ticketPageActive).subscribe( ( res ) => {
//   		this.adminService.ticketsPage['page'+this.ticketPageActive ] = res.tickets;
//   		this.tickets = this.adminService.ticketsPage['page'+this.ticketPageActive ];
//   		this.spinner.hide();
//   		this.adminService.global.tickets = this.tickets;	
//   		console.log(this.adminService.ticketsPage)
//   	})}
//   	}	
//   }

	
// 	updatePaymentStatus(id){
// 		this.spinner.show();
// 			this.adminService.updatePaymentStatus(id).subscribe(res=>{
// 				console.log(res);
// 				location.reload();
// 			},
// 			err => {
// 				console.log(err);
// 				location.reload();
// 			}
// 			)
// 		}

//   deleteBooking(id){
// 	this.spinner.show();
//   this.adminService.deleteBooking(id).subscribe(res=>{
// 	// this.spinner.hide();
// 	console.log(res);
// 	this.adminService.ticketsPage  = new Object(); 
// 	 location.reload();
//   },
//   err =>{
// 	alert('Error! Please Try again.')
// 	this.spinner.hide();
//   }
//   )}

//   editBooking(id , index){
// 	console.log(index);
   
// 	  this.router.navigate(['/edit-booking', index, this.ticketPageActive]);
// }

// viewRepair(index){
// 	console.log(index);
// 	this.router.navigate(['/view-repair' , index]);
// }
}
