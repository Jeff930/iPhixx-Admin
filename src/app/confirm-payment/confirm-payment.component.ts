import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.scss']
})
export class ConfirmPaymentComponent {

  invoice; 

  constructor(public ngxSmartModalService: NgxSmartModalService, public adminService : AdminService) {
    
  }

  assignData(){
    this.invoice = this.adminService.invoiceDetails;
    this.ngxSmartModalService.setModalData(this.invoice, 'confirmPayment');
    console.log(this.invoice);  
  }

  
}
