import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  title;
  locations: any;
	
  constructor(  private route: ActivatedRoute,
  private router: Router , public adminService : AdminService,
  public spinner : NgxSpinnerService) { 
  	//this.adminService.get().subscribe( res => console.log(res))
 
   }

  agent = { 
  	agent_fname: '',
	agent_lname :'',
	agent_username:'',
  	email : '',
  	phone : '',
  	address :'',
  	location_id : '',
  	id : 0
  };

  id ;

  ngOnInit() {
  		this.route.paramMap.subscribe((params: ParamMap) => {
	  		this.id = parseInt(params.get('id'));
	  		this.adminService.getAgent(this.id).subscribe(res => {
				console.log(res);
				if (res) {
					this.agent = res;
					this.adminService.getLocationList().subscribe( ( res ) => {
						console.log(res);
						this.locations = res;
					  })
				}
	  		});
    	});
   	
  } 
  
  updateAgent(){
		this.agent.id
  		this.spinner.show();
		this.adminService.updateAgent(this.agent).subscribe(res => {
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
