import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InvoicesComponent } from '../invoices/invoices.component';
import { AdminService } from '../admin.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-tax',
  templateUrl: './add-tax.component.html',
  styleUrls: ['./add-tax.component.scss']
})
export class AddTaxComponent implements OnInit {
  id;
  checkPage;
  title;
  buttonName;
  checkFrom;
  taxName;
  taxValue;
  taxes = [];
  tax: {
    tax_name,
    tax_value
  };
  saved = true;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private adminService: AdminService) { }

  ngOnInit() {
  }
  goToBooking() {
    this.router.navigate(['/invoices']);
  }
  saveTax() {
    this.spinner.show();
    this.tax = {
      tax_name: this.taxName,
      tax_value: this.taxValue
    };
    console.log(this.tax);
    this.adminService.addTax(this.tax).subscribe( res => {
      console.log(res);
      this.spinner.hide();
      alert('Tax saved');
      this.saved = false;
    }, err => {
      this.spinner.hide();
      console.log(err);
      alert('Tax not saved');
    });
  }
}
