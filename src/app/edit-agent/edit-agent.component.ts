import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.scss']
})
export class EditAgentComponent implements OnInit {

	title;
	
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
  	store_assigned : '',
  	// state : '',
  	// zip : '',
  	id : 0,
  	// password : '',
  };

  id ;

  ngOnInit() {
  	if(this.adminService.agentsAction == 'update'){
			this.title="Edit Agent"
  	this.route.paramMap.subscribe((params: ParamMap) => {
	  this.id = parseInt(params.get('id'));
	  this.adminService.getAgent(this.id).subscribe(res => {
		console.log(res);
		if (res) {
		this.agent = res;
		}
	  });
 		// console.log(this.adminService.agentsPage['page'+this.adminService.agentspageActive ][this.id])
 		// this.agent = this.adminService.agentsPage['page'+this.adminService.agentspageActive ][this.id];
    });
   }else{
		 this.title="New Agent"
	 }
  } 
  
  updateAgent(){
		this.title="Edit Agent";
		this.agent.id
  		this.spinner.show();
 

		this.adminService.updateAgent(this.agent).subscribe(res => {
			console.log(res)
			this.spinner.hide();
			this.adminService.agentsPage  = new Object(); 
	  		this.router.navigate(['/agents']);
		},
	 	(err)=>{
	   		console.log(err);
	   		alert('Error! Please Try again.')
	   		this.spinner.hide();
	  	}
	)
  }

  newAgent(){
	console.log("called");
	console.log(this.agent);
	this.spinner.show();
	this.adminService.addAgent(this.agent).subscribe(res => {
	console.log("this" + res)
		this.spinner.hide();
		this.adminService.agentsPage  = new Object(); 
	  	this.router.navigate(['/agents']);
	},
	 (err)=>{
	   console.log(err);
	   alert('Error! Please Try again.')
	   this.spinner.hide();
	  }
	)
}

  actionAgent(){
  	if(this.adminService.customersAction == 'update'){
			this.title="Edit Agent";
			console.log(this.title);
  		this.updateAgent();
  	}
  	else{
			this.title="New Agent";
			console.log(this.title);
  		this.newAgent();
  	}
  }

  goToAgent(){
	this.router.navigate(['/agents']);
  }

}
