import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Devices,AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router , ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  pager = 'devices';
  devices = []; 	
  devicesPage  = new Object();	
  devicespages : any;
  devicespageActive : number;

  devtypes = []; 	
  devtypesPage  = new Object();	
  devtypespages : any;
  devtypespageActive : number;
  constructor( public adminService : AdminService , private spinner: NgxSpinnerService , public router : Router ) { 

  }

  ngOnInit() {
      this.devicespageActive = this.adminService.devicespageActive;
      this.adminService.devicesPage['page'+this.devicespageActive ] ? this.devices = this.adminService.devicesPage['page'+this.devicespageActive ] : '';
      this.adminService.devicespages ? this.devicespages = this.adminService.devicespages : '';

  	if (this.devices.length == 0) {
  		this.devicespageActive = 1;
  		this.adminService.devicespageActive = this.devicespageActive;
  		this.spinner.show();
  		this.adminService.getDevices(1).subscribe( ( res ) => {
  	  console.log(res);
		  this.devicespages = Array(res.total_page);
		  console.log(this.devicespages.length);
  		this.adminService.devicespages = this.devicespages;
  	
  		this.adminService.devicesPage['page'+1 ] = res.devices;

  		this.devices = this.adminService.devicesPage['page'+1 ];

  		console.log(this.devices)
  		this.spinner.hide();
  		this.adminService.global.devices = this.devices;	

  	})
	}


	this.devtypespageActive = this.adminService.devtypespageActive;
      this.adminService.devtypesPage['page'+this.devtypespageActive ] ? this.devtypes = this.adminService.devtypesPage['page'+this.devtypespageActive ] : '';
      this.adminService.devtypespages ? this.devtypespages = this.adminService.devtypespages : '';

  	if (this.devtypes.length == 0) {
  		this.devtypespageActive = 1;
  		this.adminService.devtypespageActive = this.devtypespageActive;
  		this.spinner.show();
  		this.adminService.getDevtypes(1).subscribe( ( res ) => {
  	  console.log(res);
		  this.devtypespages = Array(res.total_page);
		  console.log(this.devtypespages.length);
  		this.adminService.devtypespages = this.devtypespages;
  	
  		this.adminService.devtypesPage['page'+1 ] = res.devtypes;

  		this.devtypes = this.adminService.devtypesPage['page'+1 ];

  		console.log(this.devtypes)
  		this.spinner.hide();
  		this.adminService.global.devtypes = this.devtypes;	

  	})
  	}

	  


  }

  openPager(page) {
    switch (page) {
      case 'brands':
        this.pager = 'brands';
        break;
      case 'devtypes':
        this.pager = 'devtypes';
        break;
      default:
        this.pager = 'devices';
        break;
    }
  }

  goToDevicesPage(number){
		console.log(number);
		this.devicespageActive = number;
		this.adminService.devicespageActive = this.devicespageActive;
		this.spinner.show();
		if(this.adminService.devicesPage['page'+number ]){

	  		this.devices = this.adminService.devicesPage['page'+number ];
	  		this.spinner.hide();
		}
		else{
  		this.adminService.getDevices(number).subscribe( ( res ) => {
  		this.adminService.devicesPage['page'+number ] = res.devices;
  		this.devices = this.adminService.devicesPage['page'+number ];
  		this.spinner.hide();
  		this.adminService.global.devices = this.devices;	
  		console.log(this.adminService.devicesPage)
  	})}
	}

  NextDevicesPage(){
  	if(this.devicespageActive !== this.devicespages.length){
  		this.devicespageActive = this.devicespageActive+1;
		this.adminService.devicespageActive = this.devicespageActive;
		this.spinner.show();
		if(this.adminService.devicesPage['page'+this.devicespageActive ]){

	  		this.devices = this.adminService.devicesPage['page'+this.devicespageActive ];
	  		this.spinner.hide();
		}
		else{
  		this.adminService.getDevices(this.devicespageActive).subscribe( ( res ) => {
  		this.adminService.devicesPage['page'+this.devicespageActive ] = res.devices;
  		this.devices = this.adminService.devicesPage['page'+this.devicespageActive ];
  		this.spinner.hide();
  		this.adminService.global.devices = this.devices;	
  		console.log(this.adminService.devicesPage)
  	})}
  	}
  }

  PreviosDevicesPage(){
  	if(this.devicespageActive !== 1){
  		this.devicespageActive = this.devicespageActive-1;
		this.adminService.devicespageActive = this.devicespageActive;
		this.spinner.show();
		if(this.adminService.devicesPage['page'+this.devicespageActive ]){

	  		this.devices = this.adminService.devicesPage['page'+this.devicespageActive ];
	  		this.spinner.hide();
		}
		else{
  		this.adminService.getDevices(this.devicespageActive).subscribe( ( res ) => {
  		this.adminService.devicesPage['page'+this.devicespageActive ] = res.devices;
  		this.devices = this.adminService.devicesPage['page'+this.devicespageActive ];
  		this.spinner.hide();
  		this.adminService.global.devices = this.devices;	
  		console.log(this.adminService.devicesPage)
  	})}
  	}	
  }

  editPrice(id , index){
  	console.log(index);
	  this.adminService.devicesAction = 'update';
  	this.router.navigate(['/edit-price' , id]);
  }

  editLaptopPrice(){
	this.router.navigate(['/edit-laptop-price']);
}

goToAddDevice(){
	this.router.navigate(['/add-device']);
}

  newAgent(){
	  console.log("called");
  	this.adminService.devicesAction = 'new';
  	this.router.navigate(['/edit-agent']);
  }
  
  getType(type){
    if (type=='1')
      return "Phone";
    if (type=='2')
      return "Tablet";
    if (type=='3')
      return "Laptop";
    if (type=='4')
      return "MacBook";
    if (type=='5')
      return "Gaming Console";
  }

  getBrand(brand){
    if (brand=='1')
      return "iPhone";
    if (brand=='2')
      return "Samsung";
    if (brand=='3')
      return "Huawei";
    if (brand=='4')
      return "Sony";
    if (brand=='5')
      return "Nokia";
    if (brand=='6')
      return "iPad";
    if (brand=='7')
      return "Hewlett Packard";
    if (brand=='8')
      return "Lenovo";
    if (brand=='9')
      return "Dell";
    if (brand=='10')
      return "Asus";
    if (brand=='11')
      return "Acer";
    if (brand=='12')
      return "Microsoft";
    if (brand=='13')
      return "Chromebook";
    if (brand=='14')
      return "Toshiba";
    if (brand=='15')
      return "MacBook";
  }

  deleteAgent(id){
	  this.spinner.show();
	  console.log(id);
    this.adminService.deleteAgent(id).subscribe(res=>{
      // this.spinner.hide();
      console.log(res);
      this.adminService.devicesPage  = new Object(); 
      location.reload();
    },
    err =>{
      alert('Error! Please Try again.')
      this.spinner.hide();

    }
    )
 //  	$.ajax({
	//   type: "DELETE",
	//   url: 'https://iphixx.repairshopr.com/api/v1/devices/'+id+'?api_key=b60db6c6-2740-48c0-a0fa-34a49ecf6b3f',
	 
	//   success: (res) => {
	//   	this.spinner.hide();
	//   	console.log(res);
	//   	this.adminService.devicesPage  = new Object(); 
	//   	// this.router.navigate(['/devices']);
	//   },
	//   error:(err)=>{
	//    console.log(err);
	//    alert('Error! Please Try again.')
	//    this.spinner.hide();
	//   }
	  
	// });
  }

}