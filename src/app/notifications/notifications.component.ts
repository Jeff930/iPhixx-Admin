import * as $ from 'jquery';

import { Component, OnInit , AfterViewInit } from '@angular/core';
import { Leads, AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router , ActivatedRoute  } from '@angular/router';
import { TimelineElement } from '../timeline/timeline-element';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit{
  // name = 'Angular 6';
  // content1 = `Repair with Invoice No. has been created on 2018-12-07 08:04:32`;
  // content2 = `Repair with Invoice No. has been marked as ongoing on 2018-12-9 11:20:50`;
  // content3 = `Repair with Invoice No. has been marked as resolved on 2018-12-10 11:21:20`;
  // content4 = `Repair with Invoice No. has been marked as paid on 2018-12-11 03:04:24`;
  
  // timeline: TimelineElement[] = [];

  // ngOnInit() {this.load()}

  // load() {
  //   this.timeline = [];
 
  //     this.timeline = [
  //   { caption: 'December 7', date: new Date(2018, 11, 7),title: 'Booking created', content: this.content1 },
  //   { caption: 'December 9', date: new Date(2018, 11, 9), title: 'Repair ongoing', content: this.content2 },
  //   { caption: 'December 10', date: new Date(2018, 11, 10),  title: 'Repair completed', content: this.content3 },
  //   { caption: 'December 11', date: new Date(2018, 11, 11), selected: true, title: 'Services paid', content: this.content4 },
  //   ];

  // }
  leads = [];	
  
  notifs=["Repair with Invoice No.10566 has been marked as paid on 2018-12-11 03:04:24",
  "Repair with Invoice No.10566 has been marked as resolved on 2018-12-10 11:21:20",
  "Repair with Invoice No.10566 has been marked as ongoing on 2018-12-10 11:20:50",
  "Repair with Invoice No.10566 has been created on 2018-12-07 08:04:32",
  ];

  status="Paid";

  invoice="10566";

  invoiceno: number;
  closeResult: string;
  constructor( public adminService : AdminService , public spinner : NgxSpinnerService, public router : Router,public ngxSmartModalService2: NgxSmartModalService ) {


   }

  ngOnInit() {
    this.notifs=this.adminService.notifs;
    if (this.leads.length == 0) {
  		
  		this.adminService.getLeads(1).subscribe( ( res ) => {
  			this.spinner.show();
  		
  		this.adminService.leadsPage['page'+1 ] = res.bookings;
  	
  		this.leads = this.adminService.leadsPage['page'+1 ];

  		console.log(this.leads)
  		this.spinner.hide();
  		

  	})
  }
}

  viewInvoice(id , index){
    console.log(index);
    this.router.navigate(['/view-invoice' , index]);
  }

  showByDate(value){
    this.adminService.type=value;
    switch(value){
      case 'All':
        location.reload();
        break;
      case 'Created':
        this.router.navigate(['/filter-by-type']);
        break;
      case 'Ongoing':
        this.router.navigate(['/filter-by-type']);
        break;
      case 'Resolved':
        this.router.navigate(['/filter-by-type']);
        break;
      case 'Paid':
        this.router.navigate(['/filter-by-type']);
        break;
      }
  }

  showByInvoice(){
    if (this.invoiceno==10566){
      location.reload;
    }else{
      console.log(this.invoiceno)
      this.router.navigate(['filter-by-invoice']);
    }
  }
}
