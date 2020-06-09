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

  brands = []; 	
  brandsPage  = new Object();	
  brandspages : any;
  brandspageActive : number;
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

	console.log(this.devtypes.length);
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
	 
	this.brandspageActive = this.adminService.brandspageActive;
      this.adminService.brandsPage['page'+this.brandspageActive ] ? this.brands = this.adminService.brandsPage['page'+this.brandspageActive ] : '';
      this.adminService.brandspages ? this.brandspages = this.adminService.brandspages : '';

	console.log(this.brands.length);
  	if (this.brands.length == 0) {
  		this.brandspageActive = 1;
  		this.adminService.brandspageActive = this.brandspageActive;
  		this.spinner.show();
  		this.adminService.getBrands(1).subscribe( ( res ) => {
  	  console.log(res);
		  this.brandspages = Array(res.total_page);
		  console.log(this.brandspages.length);
  		this.adminService.brandspages = this.brandspages;
  	
  		this.adminService.brandsPage['page'+1 ] = res.brands;

  		this.brands = this.adminService.brandsPage['page'+1 ];

  		console.log(this.brands)
  		this.spinner.hide();
  		this.adminService.global.brands = this.brands;	

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

  goToDevtypesPage(number){
	console.log(number);
	this.devtypespageActive = number;
	this.adminService.devtypespageActive = this.devtypespageActive;
	this.spinner.show();
	if(this.adminService.devtypesPage['page'+number ]){

		  this.devtypes = this.adminService.devtypesPage['page'+number ];
		  this.spinner.hide();
	}
	else{
	  this.adminService.getDevtypes(number).subscribe( ( res ) => {
	  this.adminService.devtypesPage['page'+number ] = res.devtypes;
	  this.devtypes = this.adminService.devtypesPage['page'+number ];
	  this.spinner.hide();
	  this.adminService.global.devtypes = this.devtypes;	
	  console.log(this.adminService.devtypesPage)
  })}
}

NextDevtypesPage(){
  if(this.devtypespageActive !== this.devtypespages.length){
	  this.devtypespageActive = this.devtypespageActive+1;
	this.adminService.devtypespageActive = this.devtypespageActive;
	this.spinner.show();
	if(this.adminService.devtypesPage['page'+this.devtypespageActive ]){

		  this.devtypes = this.adminService.devtypesPage['page'+this.devtypespageActive ];
		  this.spinner.hide();
	}
	else{
	  this.adminService.getDevtypes(this.devtypespageActive).subscribe( ( res ) => {
	  this.adminService.devtypesPage['page'+this.devtypespageActive ] = res.devtypes;
	  this.devtypes = this.adminService.devtypesPage['page'+this.devtypespageActive ];
	  this.spinner.hide();
	  this.adminService.global.devtypes = this.devtypes;	
	  console.log(this.adminService.devtypesPage)
  })}
  }
}

PreviosDevtypesPage(){
  if(this.devtypespageActive !== 1){
	  this.devtypespageActive = this.devtypespageActive-1;
	this.adminService.devtypespageActive = this.devtypespageActive;
	this.spinner.show();
	if(this.adminService.devtypesPage['page'+this.devtypespageActive ]){

		  this.devtypes = this.adminService.devtypesPage['page'+this.devtypespageActive ];
		  this.spinner.hide();
	}
	else{
	  this.adminService.getDevtypes(this.devtypespageActive).subscribe( ( res ) => {
	  this.adminService.devtypesPage['page'+this.devtypespageActive ] = res.devtypes;
	  this.devtypes = this.adminService.devtypesPage['page'+this.devtypespageActive ];
	  this.spinner.hide();
	  this.adminService.global.devtypes = this.devtypes;	
	  console.log(this.adminService.devtypesPage)
  })}
  }	
}

goToBrandsPage(number){
	console.log(number);
	this.brandspageActive = number;
	this.adminService.brandspageActive = this.brandspageActive;
	this.spinner.show();
	if(this.adminService.brandsPage['page'+number ]){

		  this.brands = this.adminService.brandsPage['page'+number ];
		  this.spinner.hide();
	}
	else{
	  this.adminService.getBrands(number).subscribe( ( res ) => {
	  this.adminService.brandsPage['page'+number ] = res.brands;
	  this.brands = this.adminService.brandsPage['page'+number ];
	  this.spinner.hide();
	  this.adminService.global.brands = this.brands;	
	  console.log(this.adminService.brandsPage)
  })}
}

NextBrandsPage(){
  if(this.brandspageActive !== this.brandspages.length){
	  this.brandspageActive = this.brandspageActive+1;
	this.adminService.brandspageActive = this.brandspageActive;
	this.spinner.show();
	if(this.adminService.brandsPage['page'+this.brandspageActive ]){

		  this.brands = this.adminService.brandsPage['page'+this.brandspageActive ];
		  this.spinner.hide();
	}
	else{
	  this.adminService.getBrands(this.brandspageActive).subscribe( ( res ) => {
	  this.adminService.brandsPage['page'+this.brandspageActive ] = res.brands;
	  this.brands = this.adminService.brandsPage['page'+this.brandspageActive ];
	  this.spinner.hide();
	  this.adminService.global.brands = this.brands;	
	  console.log(this.adminService.brandsPage)
  })}
  }
}

PreviosBrandsPage(){
  if(this.brandspageActive !== 1){
	  this.brandspageActive = this.brandspageActive-1;
	this.adminService.brandspageActive = this.brandspageActive;
	this.spinner.show();
	if(this.adminService.brandsPage['page'+this.brandspageActive ]){

		  this.brands = this.adminService.brandsPage['page'+this.brandspageActive ];
		  this.spinner.hide();
	}
	else{
	  this.adminService.getBrands(this.brandspageActive).subscribe( ( res ) => {
	  this.adminService.brandsPage['page'+this.brandspageActive ] = res.brands;
	  this.brands = this.adminService.brandsPage['page'+this.brandspageActive ];
	  this.spinner.hide();
	  this.adminService.global.brands = this.brands;	
	  console.log(this.adminService.brandsPage)
  })}
  }	
}

  editPrice(id , index){
  	console.log(index);
	  this.adminService.devicesAction = 'update';
  	this.router.navigate(['/edit-price' , id]);
  }

  editType(id , index){
	console.log(index)
	this.router.navigate(['/edit-devtype' , id]);
}

editBrand(id , index){
	console.log(index)
	this.router.navigate(['/edit-brand' , id]);
}

editModel(id , index){
	console.log(index)
	this.router.navigate(['/edit-model' , id]);
}

  editLaptopPrice(){
	this.router.navigate(['/edit-laptop-price']);
}

goToAddDevice(){
	this.router.navigate(['/add-model']);
}

goToAddDeviceType(){
	this.router.navigate(['/add-devtype']);
}

goToAddBrand(){
	this.router.navigate(['/add-brand']);
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