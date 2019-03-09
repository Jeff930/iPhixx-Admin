import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Leads,AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {

  constructor( private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { }

    lead = { 
      bookings_id: ''
    };

    customer: any;
  
    id ;

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
      console.log(this.adminService.leadsPage['page'+this.adminService.pageActive ][this.id])
      this.lead = this.adminService.leadsPage['page'+this.adminService.pageActive ][this.id];
      console.log(this.lead.bookings_id);
      this.adminService.getOwner(this.lead.bookings_id);
      });
      this.adminService.getOwner(this.lead.bookings_id).subscribe(res => {
        console.log(res);
        this.customer = res;
        })
    }
    
    goToBooking(){
      this.router.navigate(['/leads']);
    }

}
