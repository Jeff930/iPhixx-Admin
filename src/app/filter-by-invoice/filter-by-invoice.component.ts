import * as $ from 'jquery';

import { Component, OnInit , AfterViewInit } from '@angular/core';
import { Leads, AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router , ActivatedRoute  } from '@angular/router';
import { TimelineElement } from '../timeline/timeline-element';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-filter-by-invoice',
  templateUrl: './filter-by-invoice.component.html',
  styleUrls: ['./filter-by-invoice.component.scss']
})
export class FilterByInvoiceComponent implements OnInit {

  leads = [];	
  
  notifs=["Repair with Invoice No.10566 has been marked as paid on 2018-12-11 03:04:24",
  "Repair with Invoice No.10566 has been marked as resolved on 2018-12-10 11:21:20",
  "Repair with Invoice No.10566 has been marked as ongoing on 2018-12-10 11:20:50",
  "Repair with Invoice No.10566 has been created on 2018-12-07 08:04:32",
  ];

  invoice="10566";

  invoiceno: number;
  closeResult: string;
  constructor( public adminService : AdminService , public spinner : NgxSpinnerService, public router : Router,public ngxSmartModalService2: NgxSmartModalService ) {


   }

  ngOnInit() {
    this.notifs=this.adminService.notifs;
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
      this.router.navigate(['/notifications']);
    }else{
      console.log(this.invoiceno)
      this.router.navigate(['filter-by-invoice']);
    }
  }

}
