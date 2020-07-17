import { Component, OnInit } from '@angular/core';
import { Locations, AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router , ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  locations = []; 	
  locationsPage  = new Object();	
  locationspages : any;
  locationspageActive : number;
  pager: any = 'locations';

  constructor( public adminService : AdminService , private spinner: NgxSpinnerService , public router : Router ) { }

  ngOnInit() {
    this.locationspageActive = this.adminService.locationspageActive;
    this.adminService.locationsPage['page'+this.locationspageActive ] ? this.locations = this.adminService.locationsPage['page'+this.locationspageActive ] : '';
    this.adminService.locationspages ? this.locationspages = this.adminService.locationspages : '';

  if (this.locations.length == 0) {
    this.adminService.currentLocationsPage = 0;
    this.locationspageActive = 1;
    this.adminService.locationspageActive = this.locationspageActive;
    this.spinner.show();
    this.adminService.getLocations(1).subscribe( ( res ) => {
    console.log(res);
    this.locationspages = Array(res.total_page);
    this.adminService.locationspages = this.locationspages;
  
    this.adminService.locationsPage['page'+1 ] = res.locations;

    this.locations = this.adminService.locationsPage['page'+1 ];

    console.log(this.locations)
    this.spinner.hide();
    this.adminService.global.locations = this.locations;	

  })
  }
}

goToPage(i){
  console.log(i);
		this.adminService.currentLocationsPage = i;
		var number = parseInt(i)+1;
		this.locationspageActive = number;
  this.locationspageActive = number;
  this.adminService.locationspageActive = this.locationspageActive;
  this.spinner.show();
  if(this.adminService.locationsPage['page'+number ]){

      this.locations = this.adminService.locationsPage['page'+number ];
      this.spinner.hide();
  }
  else{
    this.adminService.getLocations(number).subscribe( ( res ) => {
    this.adminService.locationsPage['page'+number ] = res.locations;
    this.locations = this.adminService.locationsPage['page'+number ];
    this.spinner.hide();
    this.adminService.global.locations = this.locations;	
    console.log(this.adminService.locationsPage)
  })}
}

NextPage(){
  this.adminService.currentLocationsPage = this.adminService.currentLocationsPage + 1;
  if(this.locationspageActive !== this.locationspages.length){
    this.locationspageActive = this.locationspageActive+1;
  this.adminService.locationspageActive = this.locationspageActive;
  this.spinner.show();
  if(this.adminService.locationsPage['page'+this.locationspageActive ]){

      this.locations = this.adminService.locationsPage['page'+this.locationspageActive ];
      this.spinner.hide();
  }
  else{
    this.adminService.getLocations(this.locationspageActive).subscribe( ( res ) => {
    this.adminService.locationsPage['page'+this.locationspageActive ] = res.locations;
    this.locations = this.adminService.locationsPage['page'+this.locationspageActive ];
    this.spinner.hide();
    this.adminService.global.locations = this.locations;	
    console.log(this.adminService.locationsPage)
  })}
  }
}

PreviosPage(){
  this.adminService.currentLocationsPage = this.adminService.currentLocationsPage - 1;
  if(this.locationspageActive !== 1){
    this.locationspageActive = this.locationspageActive-1;
  this.adminService.locationspageActive = this.locationspageActive;
  this.spinner.show();
  if(this.adminService.locationsPage['page'+this.locationspageActive ]){
      this.locations = this.adminService.locationsPage['page'+this.locationspageActive ];
      this.spinner.hide();
  }
  else{
    this.adminService.getLocations(this.locationspageActive).subscribe( ( res ) => {
    this.adminService.locationsPage['page'+this.locationspageActive ] = res.locations;
    this.locations = this.adminService.locationsPage['page'+this.locationspageActive ];
    this.spinner.hide();
    this.adminService.global.locations = this.locations;	
    console.log(this.adminService.locationsPage)
  })}
  }	
}

editLocation(id , index){
  console.log(id);
  this.router.navigate(['/edit-location', id]);
}

newLocation(){
  console.log("called");
  this.router.navigate(['/add-location']);
}

deactivateLocation(id){
  this.spinner.show();
  console.log(id);
    this.adminService.deactivateLocation(id).subscribe(res=>{
      // this.spinner.hide();
      console.log(res);
      this.adminService.locationsPage  = new Object(); 
      location.reload();
    },
    err =>{
        alert('Error! Please Try again.')
        this.spinner.hide();
    }
  )}

  activateLocation(id){
    this.spinner.show();
    console.log(id);
    this.adminService.activateLocation(id).subscribe(res=>{
      // this.spinner.hide();
      console.log(res);
      alert("Location Successfully Activated!");
      this.adminService.locationsPage  = new Object(); 
      location.reload();
      },
      err =>{
        alert('Error! Please Try again.')
        this.spinner.hide();
      }
    )
  }
}
