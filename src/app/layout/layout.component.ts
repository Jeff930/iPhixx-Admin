import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  isLogIn : any;

  constructor() {
  	if(localStorage.getItem('authenticated')){
  			
  			
  		 		this.isLogIn = true;
  		// location.href = './admin';

  	}
  	else{
  		this.isLogIn = false;
  	}
  
   }

  ngOnInit() {
  }

}
