import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  constructor(  private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { 
     }
  
    location = { 
      location_name: '',
    };
  
    id ;
  
    ngOnInit() {    } 
  
    addLocation(){
    console.log("called");
    console.log(this.location);
      this.spinner.show();
      this.adminService.addLocation(this.location).subscribe(res => {
      console.log("this" + res)
      this.spinner.hide();
      this.adminService.locationsPage  = new Object(); 
        this.router.navigate(['/locations']);
    },
     (err)=>{
       console.log(err);
       alert('Error! Please Try again.')
       this.spinner.hide();
      }
    )  
  }
  
  goToLocation(){
    this.router.navigate(['/locations']);
  }
  
}
  
