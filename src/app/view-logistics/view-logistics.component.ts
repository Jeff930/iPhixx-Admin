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

}
