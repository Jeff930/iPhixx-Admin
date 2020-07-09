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

	pager = 'tickets';
	tickets = [];
	ticketsPage = new Object();
	ticketPages: any;
	ticketPageActive: number;
	location;
	currentPage: number;
	constructor(public adminService: AdminService, private spinner: NgxSpinnerService, public router: Router) {
		this.ticketPageActive = this.adminService.ticketPageActive;
		this.adminService.ticketsPage['page' + this.ticketPageActive] ? this.tickets = this.adminService.ticketsPage['page' + this.ticketPageActive] : '';
		this.ticketPages = this.adminService.ticketPages;
	}

	ngOnInit() {
		if (this.tickets.length == 0) {
			this.currentPage = 0;
			this.ticketPageActive = 1;
			this.adminService.ticketPageActive = this.ticketPageActive;
			this.spinner.show();
			this.adminService.getTickets(1).subscribe((res) => {
				console.log("this res:" + JSON.stringify(res));
				this.ticketPages = Array(res.total_page);
				console.log(Array(res.total_page));
				console.log(res.tickets);
				this.adminService.ticketPages = this.ticketPages;
				console.log(this.ticketPages)
				this.adminService.ticketsPage['page' + 1] = res.tickets;
				console.log(this.ticketsPage)
				this.tickets = this.adminService.ticketsPage['page' + 1];
				console.log(this.tickets)
				this.spinner.hide();
				this.adminService.global.tickets = this.tickets;

			})
		}
	}

	goToPage(i) {
		this.currentPage = i;
		var number = parseInt(i)+1;
		this.ticketPageActive = number;
		this.adminService.ticketPageActive = this.ticketPageActive;
		this.spinner.show();
		if (this.adminService.ticketsPage['page' + number]) {

			this.tickets = this.adminService.ticketsPage['page' + number];
			this.spinner.hide();
		}
		else {
			this.adminService.getTickets(number).subscribe((res) => {
				this.adminService.ticketsPage['page' + number] = res.tickets;
				this.tickets = this.adminService.ticketsPage['page' + number];
				this.spinner.hide();
				this.adminService.global.tickets = this.tickets;
				console.log(this.adminService.ticketsPage)
			})
		}
	}

	NextPage() {
		this.currentPage = this.currentPage + 1;
		if (this.ticketPageActive !== this.ticketPages.length) {
			this.ticketPageActive = this.ticketPageActive + 1;
			this.adminService.ticketPageActive = this.ticketPageActive;
			this.spinner.show();
			if (this.adminService.ticketsPage['page' + this.ticketPageActive]) {

				this.tickets = this.adminService.ticketsPage['page' + this.ticketPageActive];
				this.spinner.hide();
			}
			else {
				this.adminService.getTickets(this.ticketPageActive).subscribe((res) => {
					this.adminService.ticketsPage['page' + this.ticketPageActive] = res.tickets;
					this.tickets = this.adminService.ticketsPage['page' + this.ticketPageActive];
					this.spinner.hide();
					this.adminService.global.tickets = this.tickets;
					console.log(this.adminService.ticketsPage)
				})
			}
		}
	}

	PreviosPage() {
		this.currentPage = this.currentPage - 1;
		if (this.ticketPageActive !== 1) {
			this.ticketPageActive = this.ticketPageActive - 1;
			this.adminService.ticketPageActive = this.ticketPageActive;
			this.spinner.show();
			if (this.adminService.ticketsPage['page' + this.ticketPageActive]) {

				this.tickets = this.adminService.ticketsPage['page' + this.ticketPageActive];
				this.spinner.hide();
			}
			else {
				this.adminService.getTickets(this.ticketPageActive).subscribe((res) => {
					this.adminService.ticketsPage['page' + this.ticketPageActive] = res.tickets;
					this.tickets = this.adminService.ticketsPage['page' + this.ticketPageActive];
					this.spinner.hide();
					this.adminService.global.tickets = this.tickets;
					console.log(this.adminService.ticketsPage)
				})
			}
		}
	}

	updateStatus(id) {
		this.spinner.show();
		this.adminService.updateTicketStatus(id).subscribe(res => {
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
		if (status == "Resolved" || status == "Cancelled") {
			console.log("Ticket status is either resolved or cancelled.");
		} else {
			this.updateStatus(id);
		}
	}

	// updatePaymentStatus(id) {
	// 	this.spinner.show();
	// 	this.adminService.updatePaymentStatus(id).subscribe(res => {
	// 		console.log(res);
	// 		location.reload();
	// 	},
	// 		err => {
	// 			console.log(err);
	// 			location.reload();
	// 		}
	// 	)
	// }

	// cancelBooking(id) {
	// 	this.spinner.show();
	// 	this.adminService.cancelBooking(id).subscribe(res => {
	// 		this.spinner.hide();
	// 		console.log(res);
	// 		this.adminService.leadsPage = new Object();
	// 		location.reload();
	// 	},
	// 		err => {
	// 			console.log(err);
	// 			this.spinner.hide();
	// 		}
	// 	)
	// }

	viewCustomer(id, index) {
		console.log(index);
		this.adminService.from = 'tickets';
		this.router.navigate(['/view-customer', index]);
	}

	viewTicket(id) {
		//console.log(index);
		this.router.navigate(['/view-ticket', id]);
	}

}
