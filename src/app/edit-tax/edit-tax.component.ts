import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InvoicesComponent } from '../invoices/invoices.component';
import { AdminService } from '../admin.service';

import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-edit-tax',
  templateUrl: './edit-tax.component.html',
  styleUrls: ['./edit-tax.component.scss']
})
export class EditTaxComponent implements OnInit {
  id;
  checkPage;
  title;
  buttonName;
  checkFrom;
  taxName;
  taxValue;
  taxes: any;
  tax:  {
    tax_name,
    tax_value
  };
  saved = true;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private adminService: AdminService) { }

  ngOnInit() {
    this.route.queryParams.subscribe( params => {
      console.log(params);
      this.id = params.tax_id;
      this.adminService.getOneTax(this.id).subscribe( res => {
        console.log(res);
        this.taxes = res;
        console.log(this.taxes);
        this.tax = {
          tax_name: this.taxes[0].tax_name,
          tax_value: this.taxes[0].tax_value
        };
      });
    });
  }
  goToBooking() {
      this.router.navigate(['/invoices']);
  }
  saveTax() {
    const _tax = {
      tax_name: this.taxName,
      tax_value: this.taxValue
    };
    console.log(_tax);
    if (_tax.tax_name === undefined && _tax.tax_value === undefined) {
      alert('No Changes Made');
    } else {
      this.adminService.updateTax(this.id , _tax).subscribe( res=> {
        console.log(res);
        alert('Updated Tax');
        this.router.navigate(['/invoices']);
      }, err => {
        console.log(err);
        alert('Tax not updated, please try again');
      });
    }
  }
}
