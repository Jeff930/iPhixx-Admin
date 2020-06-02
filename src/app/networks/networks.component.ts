import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Agents, AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router , ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent implements OnInit {

  networks = []; 	
  networksPage  = new Object();	
  networkspages : any;
  networkspageActive : number;
  pager: any = 'networks';

  constructor(public adminService : AdminService , private spinner: NgxSpinnerService , public router : Router) { }

  ngOnInit() {
    this.networkspageActive = this.adminService.networkspageActive;
    this.adminService.networksPage['page'+this.networkspageActive ] ? this.networks = this.adminService.networksPage['page'+this.networkspageActive ] : '';
    this.adminService.networkspages ? this.networkspages = this.adminService.networkspages : '';

  if (this.networks.length == 0) {
    this.networkspageActive = 1;
    this.adminService.networkspageActive = this.networkspageActive;
    this.spinner.show();
    this.adminService.getNetworks(1).subscribe( ( res ) => {
    console.log(res);
    this.networkspages = Array(res.total_page);
    this.adminService.networkspages = this.networkspages;
  
    this.adminService.networksPage['page'+1 ] = res.networks;

    this.networks = this.adminService.networksPage['page'+1 ];

    console.log(this.networks)
    this.spinner.hide();
    this.adminService.global.networks = this.networks;	

  })
  }
}

goToPage(number){
  console.log(number);
  this.networkspageActive = number;
  this.adminService.networkspageActive = this.networkspageActive;
  this.spinner.show();
  if(this.adminService.networksPage['page'+number ]){

      this.networks = this.adminService.networksPage['page'+number ];
      this.spinner.hide();
  }
  else{
    this.adminService.getNetworks(number).subscribe( ( res ) => {
    this.adminService.networksPage['page'+number ] = res.networks;
    this.networks = this.adminService.networksPage['page'+number ];
    this.spinner.hide();
    this.adminService.global.networks = this.networks;	
    console.log(this.adminService.networksPage)
  })}
}

NextPage(){
  if(this.networkspageActive !== this.networkspages.length){
    this.networkspageActive = this.networkspageActive+1;
  this.adminService.networkspageActive = this.networkspageActive;
  this.spinner.show();
  if(this.adminService.networksPage['page'+this.networkspageActive ]){

      this.networks = this.adminService.networksPage['page'+this.networkspageActive ];
      this.spinner.hide();
  }
  else{
    this.adminService.getNetworks(this.networkspageActive).subscribe( ( res ) => {
    this.adminService.networksPage['page'+this.networkspageActive ] = res.networks;
    this.networks = this.adminService.networksPage['page'+this.networkspageActive ];
    this.spinner.hide();
    this.adminService.global.networks = this.networks;	
    console.log(this.adminService.networksPage)
  })}
  }
}

PreviosPage(){
  if(this.networkspageActive !== 1){
    this.networkspageActive = this.networkspageActive-1;
  this.adminService.networkspageActive = this.networkspageActive;
  this.spinner.show();
  if(this.adminService.networksPage['page'+this.networkspageActive ]){

      this.networks = this.adminService.networksPage['page'+this.networkspageActive ];
      this.spinner.hide();
  }
  else{
    this.adminService.getNetworks(this.networkspageActive).subscribe( ( res ) => {
    this.adminService.networksPage['page'+this.networkspageActive ] = res.networks;
    this.networks = this.adminService.networksPage['page'+this.networkspageActive ];
    this.spinner.hide();
    this.adminService.global.networks = this.networks;	
    console.log(this.adminService.networksPage)
  })}
  }	
}

editNetwork(id , index){
  console.log(id);
 // this.adminService.networksAction = 'update';
  this.router.navigate(['/edit-network' , id]);
}

goToAddNetwork(){
	this.router.navigate(['/add-network']);
}

}
