import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Agents, AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router , ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {

  agents = []; 	
  agentsPage  = new Object();	
  agentspages : any;
  agentspageActive : number;
  pager: any = 'agents';

  constructor( public adminService : AdminService , private spinner: NgxSpinnerService , public router : Router ) { 

  }

  ngOnInit() {

  	// $('[data-toggle="popover"]').popover();

      this.agentspageActive = this.adminService.agentspageActive;
      this.adminService.agentsPage['page'+this.agentspageActive ] ? this.agents = this.adminService.agentsPage['page'+this.agentspageActive ] : '';
      this.adminService.agentspages ? this.agentspages = this.adminService.agentspages : '';

  	if (this.agents.length == 0) {
  		this.agentspageActive = 1;
  		this.adminService.agentspageActive = this.agentspageActive;
  		this.spinner.show();
  		this.adminService.getAgents(1).subscribe( ( res ) => {
  	  console.log(res);
  		this.agentspages = Array(res.total_page);
  		this.adminService.agentspages = this.agentspages;
  	
  		this.adminService.agentsPage['page'+1 ] = res.agents;

  		this.agents = this.adminService.agentsPage['page'+1 ];

  		console.log(this.agents)
  		this.spinner.hide();
  		this.adminService.global.agents = this.agents;	

  	})
  	}

  }

  goToPage(number){
		console.log(number);
		this.agentspageActive = number;
		this.adminService.agentspageActive = this.agentspageActive;
		this.spinner.show();
		if(this.adminService.agentsPage['page'+number ]){

	  		this.agents = this.adminService.agentsPage['page'+number ];
	  		this.spinner.hide();
		}
		else{
  		this.adminService.getAgents(number).subscribe( ( res ) => {
  		this.adminService.agentsPage['page'+number ] = res.agents;
  		this.agents = this.adminService.agentsPage['page'+number ];
  		this.spinner.hide();
  		this.adminService.global.agents = this.agents;	
  		console.log(this.adminService.agentsPage)
  	})}
	}

  NextPage(){



  	if(this.agentspageActive !== this.agentspages.length){
  		this.agentspageActive = this.agentspageActive+1;
		this.adminService.agentspageActive = this.agentspageActive;
		this.spinner.show();
		if(this.adminService.agentsPage['page'+this.agentspageActive ]){

	  		this.agents = this.adminService.agentsPage['page'+this.agentspageActive ];
	  		this.spinner.hide();
		}
		else{
  		this.adminService.getAgents(this.agentspageActive).subscribe( ( res ) => {
  		this.adminService.agentsPage['page'+this.agentspageActive ] = res.agents;
  		this.agents = this.adminService.agentsPage['page'+this.agentspageActive ];
  		this.spinner.hide();
  		this.adminService.global.agents = this.agents;	
  		console.log(this.adminService.agentsPage)
  	})}
  	}
  }

  PreviosPage(){
  	if(this.agentspageActive !== 1){
  		this.agentspageActive = this.agentspageActive-1;
		this.adminService.agentspageActive = this.agentspageActive;
		this.spinner.show();
		if(this.adminService.agentsPage['page'+this.agentspageActive ]){

	  		this.agents = this.adminService.agentsPage['page'+this.agentspageActive ];
	  		this.spinner.hide();
		}
		else{
  		this.adminService.getAgents(this.agentspageActive).subscribe( ( res ) => {
  		this.adminService.agentsPage['page'+this.agentspageActive ] = res.agents;
  		this.agents = this.adminService.agentsPage['page'+this.agentspageActive ];
  		this.spinner.hide();
  		this.adminService.global.agents = this.agents;	
  		console.log(this.adminService.agentsPage)
  	})}
  	}	
  }

  editAgent(id , index){
  	console.log(id);
	  this.adminService.agentsAction = 'update';
  	this.router.navigate(['/edit-agent' , id]);
  }

  newAgent(){
	  console.log("called");
  	this.adminService.agentsAction = 'new';
  	this.router.navigate(['/add-agent']);
  }
  
  deleteAgent(id){
	  this.spinner.show();
	  console.log(id);
    this.adminService.deleteAgent(id).subscribe(res=>{
      // this.spinner.hide();
      console.log(res);
      this.adminService.agentsPage  = new Object(); 
      location.reload();
    },
    err =>{
      alert('Error! Please Try again.')
      this.spinner.hide();

    }
    )
 //  	$.ajax({
	//   type: "DELETE",
	//   url: 'https://iphixx.repairshopr.com/api/v1/agents/'+id+'?api_key=b60db6c6-2740-48c0-a0fa-34a49ecf6b3f',
	 
	//   success: (res) => {
	//   	this.spinner.hide();
	//   	console.log(res);
	//   	this.adminService.agentsPage  = new Object(); 
	//   	// this.router.navigate(['/agents']);
	//   },
	//   error:(err)=>{
	//    console.log(err);
	//    alert('Error! Please Try again.')
	//    this.spinner.hide();
	//   }
	  
	// });
  }

}
