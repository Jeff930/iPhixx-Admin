import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Agents, AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router , ActivatedRoute  } from '@angular/router';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  brands = []; 	
  brandsPage  = new Object();	
  brandspages : any;
  brandspageActive : number;
  pager: any = 'brands';

  constructor( public adminService : AdminService , private spinner: NgxSpinnerService , public router : Router ) { 

  }

  ngOnInit() {
    this.brandspageActive = this.adminService.brandspageActive;
    this.adminService.brandsPage['page'+this.brandspageActive ] ? this.brands = this.adminService.brandsPage['page'+this.brandspageActive ] : '';
    this.adminService.brandspages ? this.brandspages = this.adminService.brandspages : '';

  if (this.brands.length == 0) {
    this.brandspageActive = 1;
    this.adminService.brandspageActive = this.brandspageActive;
    this.spinner.show();
    this.adminService.getBrands(1).subscribe( ( res ) => {
    console.log(res);
    this.brandspages = Array(res.total_page);
    this.adminService.brandspages = this.brandspages;
  
    this.adminService.brandsPage['page'+1 ] = res.brands;

    this.brands = this.adminService.brandsPage['page'+1 ];

    console.log(this.brands)
    this.spinner.hide();
    this.adminService.global.brands = this.brands;	

  })
  }
}

goToPage(number){
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

NextPage(){



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

PreviosPage(){
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

editBrand(id , index){
  console.log(id);
  this.router.navigate(['/edit-brand' , id]);
}

newBrand(){
  console.log("called");
  this.router.navigate(['/add-brand']);
}

deleteBrand(id){
  this.spinner.show();
  console.log(id);
    this.adminService.deleteBrand(id).subscribe(res=>{
      // this.spinner.hide();
      console.log(res);
      this.adminService.brandsPage  = new Object(); 
      location.reload();
    },
    err =>{
        alert('Error! Please Try again.')
        this.spinner.hide();
    }
  )
//  	$.ajax({
//   type: "DELETE",
//   url: 'https://iphixx.repairshopr.com/api/v1/brands/'+id+'?api_key=b60db6c6-2740-48c0-a0fa-34a49ecf6b3f',
 
//   success: (res) => {
//   	this.spinner.hide();
//   	console.log(res);
//   	this.adminService.brandsPage  = new Object(); 
//   	// this.router.navigate(['/brands']);
//   },
//   error:(err)=>{
//    console.log(err);
//    alert('Error! Please Try again.')
//    this.spinner.hide();
//   }
  
// });
}

}

