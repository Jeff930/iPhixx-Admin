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
  taxes: any;
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
  constructor( public NgxSmartModalService: NgxSmartModalService,public adminService : AdminService , private spinner: NgxSpinnerService,public router : Router ) {
    this.invoicePageActive = this.adminService.invoicePageActive;
    this.adminService.invoicesPage['page'+this.invoicePageActive ] ? this.invoices = this.adminService.invoicesPage['page'+this.invoicePageActive ] : '';
    this.invoicespages = this.adminService.invoicespages;
    this.getStartedForm = new FormGroup({
      'subject': new FormControl('', Validators.required),
      'message': new FormControl('', Validators.required),
    });
}

  ngOnInit() {
    this.spinner.show();
  this.adminService.getTax().subscribe( res => {
    console.log(res);
    this.taxes = res;
    console.log(this.taxes);
  });
  if (this.invoices.length == 0) {
    this.adminService.currentInvoicesPage = 0;
    this.invoicePageActive = 1;
    this.adminService.invoicePageActive = this.invoicePageActive;
    this.adminService.getInvoices(1).subscribe( ( res ) => {
      this.spinner.hide();
  console.log("this res:"+ JSON.stringify(res));
  console.log(res);
  this.invoicespages = Array(res.total_page);
    this.adminService.invoicespages = this.invoicespages;
    console.log(this.invoicespages)	
    this.adminService.invoicesPage['page'+1 ] = res.invoices;
    console.log(this.invoicesPage)
    this.invoices = this.adminService.invoicesPage['page'+1 ];
    console.log(JSON.stringify(this.invoices));
    
    this.adminService.global.invoices = this.invoices;	
  });
  }
  this.spinner.hide();
}

ngAfterViewInit(){}

goToPage(i){
  console.log(i);
		this.adminService.currentInvoicesPage = i;
		var number = parseInt(i)+1;
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
  this.adminService.currentInvoicesPage = this.adminService.currentInvoicesPage + 1;
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
  this.adminService.currentInvoicesPage = this.adminService.currentInvoicesPage - 1;
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

// updateStatus(id){
// this.spinner.show();
//   this.adminService.updateBookingStatus(id).subscribe(res=>{
//     console.log(res);
//     location.reload();
//   },
//   err => {
//     console.log(err);
//     location.reload();
//   }
//   )
// }

// updatePaymentStatus(id){
//   this.spinner.show();
//     this.adminService.updatePaymentStatus(id).subscribe(res=>{
//       console.log(res);
//       location.reload();
//     },
//     err => {
//       console.log(err);
//       location.reload();
//     }
//     )
//   }

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

  viewRepair(id, index) {
    console.log(index);
    this.router.navigate(['/view-repair', index, id]);
  }

  viewInvoice(id) {
    console.log(id);
    this.router.navigate(['/view-invoice', id]);
  }

saveTax() {
  this.taxes.push(this.addTax);
  console.log(this.taxes);
  localStorage.setItem('tax', JSON.stringify(this.taxes));
}

  goToTax() { this.router.navigate(['/add-tax']); }
  editTax(id) {
    console.log(id);
    this.router.navigate(['/edit-tax'], { queryParams: { tax_id: this.taxes[id].tax_id } } );
  }

  deleteTax(id) {
    this.spinner.show();
    this.adminService.deleteTax(id).subscribe( res => {
      console.log(res);
    });
    this.spinner.hide();
    location.reload();
  }

  leadLost(id){
    this.spinner.show();
    this.adminService.leadLost(id).subscribe(res=>{
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

    check(data){
      if (data === null)
        return 'N/A';
      else
        return data;
    }

    confirmPayment(invoice){
      this.adminService.invoiceDetails = invoice;
      this.NgxSmartModalService.getModal('confirmPayment').open();
    }

    applyTax(invoice){
      this.adminService.invoiceDetails = invoice;
      this.NgxSmartModalService.getModal('applyTax').open();
    }

    getTax(name, value){
      if (name == null || value == null){
        return "N/A";
      }else{
        return name + " ( " + value + " % )";
      }
    }

    getTotal(totalprice, tax){
      if (tax == null){
        return "N/A";
      }else{
        let value = parseInt(totalprice) + (totalprice * (tax / 100)); 
        return value;
      }
    }
}
