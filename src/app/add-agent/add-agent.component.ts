import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {

  locations: any;

  constructor(  private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { 
     }
  
    agent = { 
      agent_fname: '',
      agent_lname :'',
      agent_username:'',
      email : '',
      phone : '',
      address :'',
      location : '',
      // state : '',
      // zip : '',
      password : '',
    };
  
    id ;
  
    ngOnInit() { 
      this.adminService.getLocationList().subscribe( ( res ) => {
        console.log(res);
        this.locations = res;
      })
    } 
  
    addAgent(){
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
  
  
    goToAgent(){
    this.router.navigate(['/agents']);
    }
  
  }
  