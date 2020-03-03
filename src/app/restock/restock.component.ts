import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.scss']
})
export class RestockComponent implements OnInit {
  price;
  bookingId;
  title;
  stock;

  constructor(private route: ActivatedRoute,
    private router: Router, public adminService: AdminService,
    public spinner: NgxSpinnerService) { }

    lead = {
      bookings_id: ''
    };
  
    repair: any;
  
    id;
    selectedRepairs: Array<string> = [];
  
    ngOnInit() {
      this.route.paramMap.subscribe((params: ParamMap) => {
        console.log(params);
        this.id = parseInt(params.get('id'));
        console.log(this.adminService.leadsPage['page' + this.adminService.pageActive][this.id])
        this.lead = this.adminService.leadsPage['page' + this.adminService.pageActive][this.id];
        console.log(this.lead.bookings_id);
        //this.adminService.getRepair(this.lead.bookings_id);
      });
      this.adminService.getStock(this.id).subscribe(res => {
        console.log(res);
        this.stock = res;
      })
    }
  
    goToInventory() {
        this.router.navigate(['/inventory']);
    }

    updateStock(){
      console.log(this.stock);
      this.adminService.updateStock(this.stock).subscribe(res => {
        console.log(res);
        this.ngOnInit();
      });
    }
}
