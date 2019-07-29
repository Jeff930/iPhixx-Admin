import * as $ from 'jquery';

import { Component, OnInit , AfterViewInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router , ActivatedRoute  } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NullInjector } from '@angular/core/src/di/injector';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  getStartedForm: FormGroup;
  taxes = [];
  addTax: {
      tax_name,
      tax_value
    }
  ;
  invoices = [] ;
  invoicesPage  = new Object();	
  invoicespages : any;
  invoicePageActive : number;
	pager: any = 'invoices';
  closeResult: string;
  constructor( public adminService : AdminService , private spinner: NgxSpinnerService,public router : Router ) {
    this.invoicePageActive = this.adminService.invoicePageActive;
    this.adminService.invoicesPage['page'+this.invoicePageActive ] ? this.invoices = this.adminService.invoicesPage['page'+this.invoicePageActive ] : '';
    this.invoicespages = this.adminService.invoicespages;
    this.getStartedForm = new FormGroup({
      'subject': new FormControl('', Validators.required),
      'message': new FormControl('', Validators.required),
    });
}

ngOnInit() {
  if (this.invoices.length == 0) {
    this.invoicePageActive = 1;
    this.adminService.invoicePageActive = this.invoicePageActive;
    this.spinner.show();
    this.adminService.getInvoices().subscribe( ( res ) => {
  console.log("this res:"+ JSON.stringify(res));
  this.invoicespages = Array(res.total_page);
    this.adminService.invoicespages = this.invoicespages;
    console.log(this.invoicespages)	
    this.adminService.invoicesPage['page'+1 ] = res.invoices;
    console.log(this.invoicesPage)
    this.invoices = this.adminService.invoicesPage['page'+1 ];
    console.log(JSON.stringify(this.invoices));
    this.spinner.hide();
    this.adminService.global.invoices = this.invoices;	
  });
  }
}

ngAfterViewInit(){

}

goToPage(number){
  console.log(number);
  this.invoicePageActive = number;
  this.adminService.invoicePageActive = this.invoicePageActive;
  this.spinner.show();
  if(this.adminService.invoicesPage['page'+number ]){

      this.invoices = this.adminService.invoicesPage['page'+number ];
      this.spinner.hide();
  }
  else{
    this.adminService.getInvoices(number).subscribe( ( res ) => {
    this.adminService.invoicesPage['page'+number ] = res.invoices;
    this.invoices = this.adminService.invoicesPage['page'+number ];
    this.spinner.hide();
    this.adminService.global.invoices = this.invoices;	
    console.log(this.adminService.invoicesPage)
  })}
}

NextPage(){



  if(this.invoicePageActive !== this.invoicespages.length){
    this.invoicePageActive = this.invoicePageActive+1;
  this.adminService.invoicePageActive = this.invoicePageActive;
  this.spinner.show();
  if(this.adminService.invoicesPage['page'+this.invoicePageActive ]){

      this.invoices = this.adminService.invoicesPage['page'+this.invoicePageActive ];
      this.spinner.hide();
  }
  else{
    this.adminService.getInvoices(this.invoicePageActive).subscribe( ( res ) => {
    this.adminService.invoicesPage['page'+this.invoicePageActive ] = res.invoices;
    this.invoices = this.adminService.invoicesPage['page'+this.invoicePageActive ];
    this.spinner.hide();
    this.adminService.global.invoices = this.invoices;	
    console.log(this.adminService.invoicesPage)
  })}
  }
}

PreviosPage(){
  if(this.invoicePageActive !== 1){
    this.invoicePageActive = this.invoicePageActive-1;
  this.adminService.invoicePageActive = this.invoicePageActive;
  this.spinner.show();
  if(this.adminService.invoicesPage['page'+this.invoicePageActive ]){

      this.invoices = this.adminService.invoicesPage['page'+this.invoicePageActive ];
      this.spinner.hide();
  }
  else{
    this.adminService.getInvoices(this.invoicePageActive).subscribe( ( res ) => {
    this.adminService.invoicesPage['page'+this.invoicePageActive ] = res.invoices;
    this.invoices = this.adminService.invoicesPage['page'+this.invoicePageActive ];
    this.spinner.hide();
    this.adminService.global.invoices = this.invoices;	
    console.log(this.adminService.invoicesPage)
  })}
  }	
}

updateStatus(id){
this.spinner.show();
  this.adminService.updateBookingStatus(id).subscribe(res=>{
    console.log(res);
    location.reload();
  },
  err => {
    console.log(err);
    location.reload();
  }
  )
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

// deleteBooking(id){
// this.spinner.show();
// this.adminService.deleteBooking(id).subscribe(res=>{
// this.spinner.hide();
// console.log(res);
// this.adminService.invoicesPage  = new Object(); 
//  location.reload();
// },
// err =>{
// alert('Error! Please Try again.')
// this.spinner.hide();

// }
// )}

  openPager(page) {
    switch (page) {
      case 'invoices':
        this.pager = 'invoices';
        break;
      case 'tax':
        this.pager = 'tax';
        this.spinner.show();
        // this.taxes = JSON.parse();
        console.log(localStorage.getItem('tax'));
        if (localStorage.getItem('tax')) {
        this.taxes = JSON.parse(localStorage.getItem('tax'));
        }
        this.spinner.hide();
        break;
      default:
        this.pager = 'reports';
        break;
    }
  }

editBooking(id , index){
console.log(index);
this.router.navigate(['/edit-booking' , index]);
}

viewRepair(id , index){
console.log(index);
this.router.navigate(['/view-repair' , index]);
}

  viewInvoice(id , index){
    console.log(index);
    this.router.navigate(['/view-invoice' , index]);
  }

saveTax() {
  this.taxes.push(this.addTax);
  console.log(this.taxes);
  localStorage.setItem('tax', JSON.stringify(this.taxes));
}

  goToTax(id, index) {
    this.router.navigate(['/edit-tax', index]);
  }
}
