import * as $ from 'jquery';

import { Component, OnInit , AfterViewInit } from '@angular/core';
import { Leads, AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router , ActivatedRoute  } from '@angular/router';
import { TimelineElement } from '../timeline/timeline-element';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-filter-by-type',
  templateUrl: './filter-by-type.component.html',
  styleUrls: ['./filter-by-type.component.scss']
})
export class FilterByTypeComponent implements OnInit {

  leads = [];	
  invoice="10566";
  notif="";
  closeResult: string;
  constructor( public adminService : AdminService , public spinner : NgxSpinnerService, public router : Router,public ngxSmartModalService2: NgxSmartModalService ) {


   }

  ngOnInit() {
    this.notif=this.adminService.notif;
    if (this.leads.length == 0) {
  		
  		this.adminService.getLeads().subscribe( ( res ) => {
  			this.spinner.show();
  		
  		this.adminService.leadsPage['page'+1 ] = res.bookings;
  	
  		this.leads = this.adminService.leadsPage['page'+1 ];

  		console.log(this.leads)
  		this.spinner.hide();
  		

  	})
  }}

  viewInvoice(id , index){
    console.log(index);
    this.router.navigate(['/view-invoice' , index]);
  }

  showByDate(value){
    switch(value){
      case 'All':
        this.router.navigate(['/notifications']);
        break;
      case 'Created':
        this.notif="Repair with Invoice No.10566 has been created on 2018-12-07 08:04:32";
        //location.reload();
        break;
      case 'Ongoing':
        this.notif= "Repair with Invoice No.10566 has been marked as ongoing on 2018-12-10 11:20:50";
        //location.reload();
        break;
      case 'Resolved':
        this.notif= "Repair with Invoice No.10566 has been marked as resolved on 2018-12-10 11:21:20";
        //location.reload();
        break;
      case 'Paid':
        this.notif="Repair with Invoice No.10566 has been marked as paid on 2018-12-11 03:04:24";
        //location.reload();
        break;
      }
  }

}
