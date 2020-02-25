import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.scss']
})
export class LogisticsComponent implements OnInit {

  logistics = [];
  logisticPages: any;
  logisticsPage = new Object();
  logisticPageActive: number;
  location;
  constructor(public adminService: AdminService, private spinner: NgxSpinnerService) {

    this.logisticPageActive = this.adminService.logisticPageActive;
    this.adminService.logisticsPage['page' + this.logisticPageActive] ? this.logistics = this.adminService.logisticsPage['page' + this.logisticPageActive] : '';
    this.logisticPages = this.adminService.logisticPages;

  }

  ngOnInit() {
    if (this.logistics.length === 0) {
      this.logisticPageActive = 1;
      this.adminService.logisticPageActive = this.logisticPageActive;
      this.spinner.show();
      this.adminService.getLogistics().subscribe((res) => {
        console.log('this res:'  + JSON.stringify(res));
        this.logisticPages = Array(res.total_page);
        this.adminService.logisticPages = this.logisticPages;
        console.log(this.logisticPages);
        this.adminService.logisticsPage['page' + 1] = res.logistics;
        console.log(this.logisticsPage);
        this.logistics = this.adminService.logisticsPage['page' + 1];
        console.log(this.logistics);
        this.spinner.hide();
        this.adminService.global.logistics = this.logistics;
        console.log(this.location);
      });
    }
  }
  goToPage(number) {
    console.log(number);
    this.logisticPageActive = number;
    this.adminService.logisticPageActive = this.logisticPageActive;
    this.spinner.show();
    if (this.adminService.logisticsPage['page' + number]) {
      this.logistics = this.adminService.logisticsPage['page' + number];
      this.spinner.hide();
    }
    else {
      this.adminService.getLogistics(number).subscribe((res) => {
        this.adminService.logisticsPage['page' + number] = res.logistics;
        this.logistics = this.adminService.logisticsPage['page' + number];
        this.spinner.hide();
        this.adminService.global.logistics = this.logistics;
        console.log(this.adminService.logisticsPage)
      })
    }
  }

  NextPage() {



    if (this.logisticPageActive !== this.logisticPages.length) {
      this.logisticPageActive = this.logisticPageActive + 1;
      this.adminService.logisticPageActive = this.logisticPageActive;
      this.spinner.show();
      if (this.adminService.logisticsPage['page' + this.logisticPageActive]) {

        this.logistics = this.adminService.logisticsPage['page' + this.logisticPageActive];
        this.spinner.hide();
      }
      else {
        this.adminService.getLogistics(this.logisticPageActive).subscribe((res) => {
          this.adminService.logisticsPage['page' + this.logisticPageActive] = res.logistics;
          this.logistics = this.adminService.logisticsPage['page' + this.logisticPageActive];
          this.spinner.hide();
          this.adminService.global.logistics = this.logistics;
          console.log(this.adminService.logisticsPage)
        })
      }
    }
  }

  PreviosPage() {
    if (this.logisticPageActive !== 1) {
      this.logisticPageActive = this.logisticPageActive - 1;
      this.adminService.logisticPageActive = this.logisticPageActive;
      this.spinner.show();
      if (this.adminService.logisticsPage['page' + this.logisticPageActive]) {

        this.logistics = this.adminService.logisticsPage['page' + this.logisticPageActive];
        this.spinner.hide();
      }
      else {
        this.adminService.getLogistics(this.logisticPageActive).subscribe((res) => {
          this.adminService.logisticsPage['page' + this.logisticPageActive] = res.logistics;
          this.logistics = this.adminService.logisticsPage['page' + this.logisticPageActive];
          this.spinner.hide();
          this.adminService.global.logistics = this.logistics;
          console.log(this.adminService.logisticsPage)
        })
      }
    }
  }

  getBookingStatus(id){
    switch(id){
      case null:
        return 'N/A';
      case '1':
        return 'New';
      case '2':
        return 'Transferred';
      case '3':
        return 'Lost';
    }
  }

  getTicketStatus(id){
    switch(id){
      case null:
        return 'N/A';
      case '1':
        return 'New';
      case '2':
        return 'Outbound';
      case '3':
        return 'For Repair';
      case '4':
        return 'Inbound';
      case '5':
        return 'Resolved';
      case '6':
        return 'Cancelled';
    }
  }

  getTicket(id){
    if (id === null){
      return 'N/A';
    }else{
      return id;
    }
  }

}
