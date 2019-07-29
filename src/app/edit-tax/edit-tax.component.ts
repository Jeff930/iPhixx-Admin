import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InvoicesComponent } from '../invoices/invoices.component';

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
  taxes = [];
  tax:  {
    tax_name,
    tax_value
  };
  saved = true;
  constructor(private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const num = params.get('id');
      this.id = num;
      this.checkFrom = num;
      this.checkPage = params.get('page');
      console.log(this.title);
      this.id = parseInt(num, 10);
     
      // console.log(this.adminService.leadsPage['page' + page ][this.id]);
      //   this.lead = this.adminService.leadsPage['page' + page ];
      // console.log(this.lead.bookings_id);
      // this.adminService.getOwner(this.id).subscribe(res => {
      //   if (res) {
      //     this.owner = res;
      //     console.log(this.owner);
      //     this.customerName = this.owner.customer_fname + ' ' + this.owner.customer_lname;
      //     console.log(this.customerName);
      //   }
      // }, err => {
      //   this.owner = {
      //     customer_id: '',
      //     email: '',
      //     birthdate: '',
      //     phone: '',
      //     phone2: ''
      //   };
      //   console.log(this.owner);
      // });

    });
    if (this.checkFrom !== '') {
      this.title = 'Edit Tax';
      this.buttonName = 'Save Changes';
      if (localStorage.getItem('tax')) {
        this.taxes = JSON.parse(localStorage.getItem('tax'));
      }
      this.tax = this.taxes[this.id];
      console.log(this.tax);
    } else {
      this.title = 'Add  Tax';
      this.buttonName = 'Save New Tax';
      this.tax = {
        tax_name: 'New Tax Name',
        tax_value: '00.00'
      };
    }
    this.saved = true;
  }
  goToBooking() {
      this.router.navigate(['/invoices']);
  }
  saveTax() {
    this.tax = {
      tax_name: this.taxName,
      tax_value: this.taxValue
    };
    console.log(this.tax);
    if (localStorage.getItem('tax')) {
      this.taxes = JSON.parse(localStorage.getItem('tax'));
    }
    this.taxes.push(this.tax);
    console.log(this.taxes);
    localStorage.setItem('tax', JSON.stringify(this.taxes));
    this.saved = false;
  }
}
