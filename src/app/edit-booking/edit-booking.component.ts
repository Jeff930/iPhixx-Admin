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

  customerName;
  checkPage;
  title;
  buttonName;
  checkFrom;
  locations: any;
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
      const num = params.get('id');
      this.checkFrom = num;
      this.checkPage = params.get('page');
      console.log(this.title);
      console.log(num);
      this.id = parseInt(num, 10);
      // console.log(this.adminService.leadsPage['page' + page ][this.id]);
      //   this.lead = this.adminService.leadsPage['page' + page ];
      // console.log(this.lead.bookings_id);
        this.adminService.getOwner(num).subscribe(res => {
          console.log(res);
          if (res) {
          this.owner = res;
          console.log(this.owner);
          this.customerName = this.owner.customer_fname + ' ' + this.owner.customer_lname;
          console.log(this.customerName);
          }
          if ( this.owner.location === 'Iphixx Booking') {
            this.locations = 'Joyces of Wexford' ;
          } else {
            this.locations = 'Iphixx Booking';
          }
          console.log(this.locations);
          console.log(this.owner.location);
        }, err => {
          this.owner = {
            customer_id: '',
            email: '',
            birthdate: '',
            phone: '',
            location: 'Iphixx Booking'
          };
          this.locations = 'Joyces of Wexford';
          console.log(this.owner);
        });

      });
      if (this.checkFrom !== '') {
        this.title = 'Edit Booking';
        this.buttonName = 'Save Changes';
      } else {
        this.title = 'Add  Booking';
        this.buttonName = 'Save New Booking';
      }
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

      if (this.checkPage) {
        this.router.navigate(['/tickets']);
      } else {
        this.router.navigate(['/leads']);
      }
    },
     (err)=>{
       console.log(err);
       alert('Error! Please Try again.')
       this.spinner.hide();
      }
  
  
    )
    }

    goToBooking() {
      if (this.checkPage) {
      this.router.navigate(['/tickets']);
      } else {
      this.router.navigate(['/leads']);
      }
    }

}
