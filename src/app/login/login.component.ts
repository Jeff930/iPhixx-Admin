import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	
  user = {
  	email : '',
  	password : '',
  }
  return ; 

  constructor( public router : Router , private route: ActivatedRoute ) { }

  ngOnInit() {

  	 this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/admin');
  }

  login(){
  	console.log(this.user)
  	if(this.user.email == 'admin' && this.user.password == 'admin'){
  		localStorage.setItem('authenticated' ,'true')
  		this.router.navigateByUrl(this.return);
  	}
  	else{

  	}
  }

}
