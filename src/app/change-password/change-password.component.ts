import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  title;
  locations: any;
	
  constructor(  private route: ActivatedRoute,
  private router: Router , public adminService : AdminService,
  public spinner : NgxSpinnerService) { 
  	//this.adminService.get().subscribe( res => console.log(res))
 
   }

  password = { 
  	current_password: '',
	  new_password :'',
    confirm_password:'',
    id:0
  };

  id ;

  ngOnInit() {
  		this.route.paramMap.subscribe((params: ParamMap) => {
        this.password.id = parseInt(params.get('id'));
        
    	});
   	
  } 
  
  updatePassword(){
  	this.spinner.show();
    this.adminService.updatePassword(this.password).subscribe(res => {
			console.log(res)
			this.spinner.hide();
			this.adminService.agentsPage  = new Object(); 
	  		this.router.navigate(['/leads']);
		},
	 	(err)=>{
	   		console.log(err);
	   		alert('Error! Please Try again.')
	   		this.spinner.hide();
	  	}
	)
  }

  goToAgent(){
	this.router.navigate(['/leads']);
  }

}
