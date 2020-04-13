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

goToPage(number){
  console.log(number);
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
      this.adminService.locationsPage  = new Object(); 
      location.reload();
    },
    err =>{
        alert('Error! Please Try again.')
        this.spinner.hide();
    }
  )
//  	$.ajax({
//   type: "DELETE",
//   url: 'https://iphixx.repairshopr.com/api/v1/locations/'+id+'?api_key=b60db6c6-2740-48c0-a0fa-34a49ecf6b3f',
 
//   success: (res) => {
//   	this.spinner.hide();
//   	console.log(res);
//   	this.adminService.locationsPage  = new Object(); 
//   	// this.router.navigate(['/locations']);
//   },
//   error:(err)=>{
//    console.log(err);
//    alert('Error! Please Try again.')
//    this.spinner.hide();
//   }
  
// });
}

}
