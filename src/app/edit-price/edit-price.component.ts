import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrls: ['./edit-price.component.scss']
})
export class EditPriceComponent implements OnInit {

  price;
  id;

  constructor(private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { }

  ngOnInit() {
   
  	this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
 		console.log(this.adminService.customersPage['page'+this.adminService.customerspageActive ][this.id])
 		this.customer = this.adminService.customersPage['page'+this.adminService.customerspageActive ][this.id];
    });
  }

}
