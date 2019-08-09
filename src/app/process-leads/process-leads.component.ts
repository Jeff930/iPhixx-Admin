import { Component, OnInit } from '@angular/core';
import { Leads, AdminService } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-process-leads',
  templateUrl: './process-leads.component.html',
  styleUrls: ['./process-leads.component.scss']
})
export class ProcessLeadsComponent implements OnInit {
 leads = [] ;
  leadsPage  = new Object();
  pages : any;
  lead;
  pageActive : number;
  id;
  pager= 'sales';
  constructor(public adminService: AdminService, private spinner: NgxSpinnerService, public router: Router,
    private routes: ActivatedRoute) {

    this.pageActive = this.adminService.pageActive;
    this.adminService.leadsPage['page' + this.pageActive] ? this.leads = this.adminService.leadsPage['page' + this.pageActive] : '';
    this.pages = this.adminService.pages;

  }

  ngOnInit() {
    this.routes.paramMap.subscribe( res => {
      this.id = res.get('id');
      console.log(this.id);
      console.log(this.adminService.leadsPage['page' + this.adminService.pageActive][this.id]);
      this.lead = this.adminService.leadsPage['page' + this.adminService.pageActive][this.id];
      console.log(this.lead);
    });
    // if (this.leads.length === 0) {
    //   this.pageActive = 1;
    //   this.adminService.pageActive = this.pageActive;
    //   this.spinner.show();
    //   this.adminService.getLeads().subscribe((res) => {
    //     console.log('this res:' + JSON.stringify(res));
    //     this.pages = Array(res.total_page);
    //     this.adminService.pages = this.pages;
    //     console.log(this.pages);
    //     this.adminService.leadsPage['page' + 1] = res.bookings;
    //     console.log(this.leadsPage);
    //     this.leads = this.adminService.leadsPage['page' + 1];
    //     console.log(this.leads);
    //     this.spinner.hide();
    //     this.adminService.global.leads = this.leads;
    //   });
    // }
  }
  openPager(page) {
    switch (page) {
      case 'sales':
        this.pager = 'sales';
        break;
      case 'appointments':
        this.pager = 'appointments';
        break;
      case 'attachments':
        this.pager = 'attachments';
        break;
      case 'sms':
        this.pager = 'sms';
        break;
      // default:
      //   this.pager = 'merge';
      //   break;
    }
  }
}
