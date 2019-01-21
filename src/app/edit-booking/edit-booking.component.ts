import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Leads,AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { getLocaleWeekEndRange } from '@angular/common';
import { getComponentViewDefinitionFactory } from '@angular/core/src/view';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.scss']
})
export class EditBookingComponent implements OnInit {

  constructor(  private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { 
      // this.adminService.updateCustomer().subscribe( res => console.log(res))
   
     }

    lead = { 
      bookings_id: ''
    };

    owner: any;
  
    id ;

    ngOnInit() {
      this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
      console.log(this.adminService.leadsPage['page'+this.adminService.pageActive ][this.id])
      this.lead = this.adminService.leadsPage['page'+this.adminService.pageActive ][this.id];
      console.log(this.lead.bookings_id);
      this.adminService.getOwner(this.lead.bookings_id);
      });
      this.adminService.getOwner(this.lead.bookings_id).subscribe(res => {
        
        this.owner = res;
 
        })
    } 
  
    editBooking(){
      this.spinner.show();
   //  	$.ajax({
    //   method: "PUT",
    //   url: 'https://iphixx.repairshopr.com/api/v1/customers/'+this.customer.id+'?api_key=b60db6c6-2740-48c0-a0fa-34a49ecf6b3f&firstname='+this.customer.firstname+'&lastname='+
    //   this.customer.lastname+'&email='+this.customer.email+'&phone='+this.customer.phone+'&address='+this.customer.address
    //   +'&city='+this.customer.city+'&state='+this.customer.state+'&zip='+this.customer.zip,
    //   data: {
    //   			firstname: this.customer.firstname, 
    //   			lastname: this.customer.lastname,
    //   			email : this.customer.email,
    //   			phone : this.customer.phone,
    //   			address : this.customer.address,
    //   			city : this.customer.city,
    //   			state : this.customer.state,
    //   			zip : this.customer.zip
          
    //   		},
    //   success: (res) => {
    //   	this.spinner.hide();
    //   	console.log(res);
    //   	this.adminService.customersPage  = new Object(); 
    //   	this.router.navigate(['/customers']);
    //   },
    //   error:(err)=>{
    //    console.log(err);
    //    alert('Error! Please Try again.')
    //    this.spinner.hide();
    //   }
      
    // });
  
    this.adminService.editOwner(this.owner).subscribe(res => {
      console.log(res)
      this.spinner.hide();
      this.adminService.leadsPage  = new Object(); 
      this.router.navigate(['/leads']);
    },
     (err)=>{
       console.log(err);
       alert('Error! Please Try again.')
       this.spinner.hide();
      }
  
  
    )
    }

    goToBooking(){
      this.router.navigate(['/leads']);
    }

}
