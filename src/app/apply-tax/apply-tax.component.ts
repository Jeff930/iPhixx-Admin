import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-apply-tax',
  templateUrl: './apply-tax.component.html',
  styleUrls: ['./apply-tax.component.scss']
})
export class ApplyTaxComponent {

  invoice;

  constructor(private spinner: NgxSpinnerService,public ngxSmartModalService: NgxSmartModalService, public adminService : AdminService) {
    
  }

  assignData(){
    this.invoice = this.adminService.invoiceDetails;
    this.ngxSmartModalService.setModalData(this.invoice, 'applyTax');
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
        this.ngxSmartModalService.close('applyTax');
      }
      )
    }  
}
