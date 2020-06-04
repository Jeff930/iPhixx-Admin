import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-devtype',
  templateUrl: './edit-devtype.component.html',
  styleUrls: ['./edit-devtype.component.scss']
})
export class EditDevtypeComponent implements OnInit {

  devtype = { 
  	devtype_id: '',
    type :'',
  };

  id ;

  constructor(private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
        this.adminService.getDevtype(this.id).subscribe(res => {
          console.log(res);
          if (res) {
              this.devtype = res;
          }
         });
    });
  }

  updateDevtype(){
  	this.spinner.show();
    this.adminService.updateDevtype(this.devtype).subscribe(res => {
			console.log(res)
			this.spinner.hide();
			this.adminService.devtypesPage  = new Object(); 
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
