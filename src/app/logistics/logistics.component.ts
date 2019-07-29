import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.scss']
})
export class LogisticsComponent implements OnInit {

  tickets = [];
  ticketPages: any;
  ticketsPage = new Object();
  ticketPageActive: number;
  location;
  constructor(public adminService: AdminService, private spinner: NgxSpinnerService) {

    this.ticketPageActive = this.adminService.ticketPageActive;
    this.adminService.ticketsPage['page' + this.ticketPageActive] ? this.tickets = this.adminService.ticketsPage['page' + this.ticketPageActive] : '';
    this.ticketPages = this.adminService.ticketPages;

  }

  ngOnInit() {
    if (this.tickets.length === 0) {
      this.ticketPageActive = 1;
      this.adminService.ticketPageActive = this.ticketPageActive;
      this.spinner.show();
      this.adminService.getTickets().subscribe((res) => {
        console.log('this res:'  + JSON.stringify(res));
        this.ticketPages = Array(res.total_page);
        this.adminService.ticketPages = this.ticketPages;
        console.log(this.ticketPages);
        this.adminService.ticketsPage['page' + 1] = res.tickets;
        console.log(this.ticketsPage);
        this.tickets = this.adminService.ticketsPage['page' + 1];
        console.log(this.tickets);
        this.spinner.hide();
        this.adminService.global.tickets = this.tickets;
        console.log(this.location);
      });
    }
  }
  goToPage(number) {
    console.log(number);
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

}
