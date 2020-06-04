import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit {

  brand = { 
  	devicebrand_id: '',
    device_brand :'',
  };

  id;

  constructor(private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
        this.adminService.getBrand(this.id).subscribe(res => {
          console.log(res);
          if (res) {
              this.brand = res;
          }
         });
    });
  }

  updateBrand(){
  	this.spinner.show();
    this.adminService.updateDevtype(this.brand).subscribe(res => {
			console.log(res)
			this.spinner.hide();
			this.adminService.brandsPage  = new Object(); 
	  		this.router.navigate(['/devices']);
		},
	 	(err)=>{
	   		console.log(err);
	   		alert('Error! Please Try again.')
	   		this.spinner.hide();
	  	}
	)
  }

  goToDevices(){
    this.router.navigate(['/devices']);
  }

}
