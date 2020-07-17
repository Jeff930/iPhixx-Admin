import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

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
      location_id : '',
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
  
  
    goToInventory(){
    this.router.navigate(['/inventory/invt']);
    }
  
  }
  