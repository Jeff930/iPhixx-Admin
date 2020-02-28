import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-logistics',
  templateUrl: './view-logistics.component.html',
  styleUrls: ['./view-logistics.component.scss']
})
export class ViewLogisticsComponent implements OnInit {

  id;

  lead = {
    bookings_id: ''
  };

  logistic;


  constructor(private route: ActivatedRoute,
    private router: Router, public adminService: AdminService,
    public spinner: NgxSpinnerService) { }

    ngOnInit() {
      this.route.paramMap.subscribe((params: ParamMap) => {
        console.log(params);
        this.id = parseInt(params.get('id'));
        console.log(this.adminService.leadsPage['page' + this.adminService.pageActive][this.id])
        this.lead = this.adminService.leadsPage['page' + this.adminService.pageActive][this.id];
        console.log(this.lead.bookings_id);
        //this.adminService.getRepair(this.lead.bookings_id);
      });
      this.adminService.getLogistic(this.id).subscribe(res => {
        console.log(res);
        this.logistic = res;
      })
    }

    getLocation(id){
      switch(id){
        case '1':
          return 'Joyces of Wexford';
      }
    }

    getBookingStatus(id){
      switch(id){
        case null:
          return 'N/A';
        case '1':
          return 'New';
        case '2':
          return 'Transferred';
        case '3':
          return 'Lost';
      }
    }

    getTicketStatus(id){
      switch(id){
        case null:
          return 'N/A';
        case '1':
          return 'New';
        case '2':
          return 'Outbound';
        case '3':
          return 'For Repair';
        case '4':
          return 'Inbound';
        case '5':
          return 'Resolved';
        case '6':
          return 'Cancelled';
      }
    }

}
