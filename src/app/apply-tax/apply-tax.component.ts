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
  taxes;
  selectedTax;
  totalTax;
  total;

  constructor(private spinner: NgxSpinnerService,public ngxSmartModalService: NgxSmartModalService, public adminService : AdminService) {  
  }

  ngOnInit(){
    this.adminService.getTaxList().subscribe(
      res =>{
        this.taxes = res;
        console.log(this.taxes);
      }
    )
  }

  assignData(){
    this.invoice = this.adminService.invoiceDetails;
    this.ngxSmartModalService.setModalData(this.invoice, 'applyTax');
    console.log(this.invoice);  
  }

  calculateTotal(event){
    console.log(event);
    this.selectedTax = event;
    this.totalTax = this.invoice.total_price * (this.taxes[event].tax_value / 100);
    console.log(this.totalTax);
    this.total = parseFloat(this.totalTax) + parseFloat(this.invoice.total_price); 
  }

  applyTax(){
    this.spinner.show();
    this.adminService.applyTax(this.invoice.invoice_no, this.taxes[this.selectedTax].tax_value).subscribe(res=>{
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
