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
  locations;

  constructor( public adminService : AdminService , private spinner: NgxSpinnerService , public router : Router ) { 

  }

  ngOnInit() {
	this.adminService.getLocationList().subscribe(
		res=>{
		  this.locations = res;
		  console.log(this.locations);
		  this.adminService.global.locationList = this.locations;
		});


      this.agentspageActive = this.adminService.agentspageActive;
      this.adminService.agentsPage['page'+this.agentspageActive ] ? this.agents = this.adminService.agentsPage['page'+this.agentspageActive ] : '';
      this.adminService.agentspages ? this.agentspages = this.adminService.agentspages : '';

  	if (this.agents.length == 0) {
		this.adminService.currentAgentsPage = 0;
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

  goToPage(i){
		this.adminService.currentAgentsPage = i;
		var number = parseInt(i)+1;
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
	this.adminService.currentAgentsPage = this.adminService.currentAgentsPage + 1;
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
	this.adminService.currentAgentsPage = this.adminService.currentAgentsPage - 1;
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
  
  deactivateAgent(id){
	  this.spinner.show();
	  console.log(id);
      this.adminService.deactivateAgent(id).subscribe(res=>{
      	// this.spinner.hide();
		  console.log(res);
		  alert("Agent Successfully Deactivated!");
      	this.adminService.agentsPage  = new Object(); 
      	location.reload();
    	},
    	err =>{
      		alert('Error! Please Try again.')
      		this.spinner.hide();
    	}
	)
  }

  activateAgent(id){
	this.spinner.show();
	console.log(id);
	this.adminService.activateAgent(id).subscribe(res=>{
		// this.spinner.hide();
		console.log(res);
		alert("Agent Successfully Activated!");
		this.adminService.agentsPage  = new Object(); 
		location.reload();
	  },
	  err =>{
			alert('Error! Please Try again.')
			this.spinner.hide();
	  }
  )
}

getLocation(id){
	//console.log(id);
	var locations = this.adminService.global.locationList;
	//console.log(locations);
	//console.log(locations.length);
	for (var i=1;i<=locations.length;i++){
		console.log(id,locations[id-1].location_id);
		if (id == locations[i-1].location_id){
			//console.log(id,locations[id].location_id);
			return locations[i-1].location_name;
		}
	}
}

}
