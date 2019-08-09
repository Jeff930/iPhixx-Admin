import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {

  constructor( private route: ActivatedRoute,
    private router: Router , public adminService: AdminService,
    private spinner: NgxSpinnerService) { }

    lead = {
      bookings_id: ''
    }
    customer: any;
    id ;

  ngOnInit() {
    this.spinner.show();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
      console.log(this.adminService.leadsPage['page' + this.adminService.pageActive ][this.id])
      this.lead = this.adminService.leadsPage['page' + this.adminService.pageActive ][this.id];
      console.log(this.lead.bookings_id);
      this.adminService.getOwner(this.lead.bookings_id);
      });
    this.adminService.getOwner(this.lead.bookings_id).subscribe(res => {
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 3000);
        console.log(res);
        this.customer = res;
        });
    }
    
    goToBooking(){
      this.router.navigate(['/tickets']);
    }

}
