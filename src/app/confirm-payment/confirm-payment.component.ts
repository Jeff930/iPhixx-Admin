import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.scss']
})
export class ConfirmPaymentComponent {

  invoice;

  constructor(private spinner: NgxSpinnerService,public ngxSmartModalService: NgxSmartModalService, public adminService : AdminService) {
    
  }

  assignData(){
    this.invoice = this.adminService.invoiceDetails;
    this.ngxSmartModalService.setModalData(this.invoice, 'confirmPayment');
    console.log(this.invoice);  
  }

  updatePaymentStatus(id){
    this.spinner.show();
      this.adminService.updateInvoiceStatus(id).subscribe(res=>{
        console.log(res);
        location.reload();
      },
      err => {
        console.log(err);
        this.spinner.hide();
        this.ngxSmartModalService.close('confirmPayment');
      }
      )
    }  
}
