import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute  } from '@angular/router';
import { Agents, AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email : '',
    password : '',
  };
  return ;
  isChecked: Boolean;

  constructor(public router: Router, private route: ActivatedRoute, private adminservice: AdminService ) {
    // localStorage.clear();
    console.log(this.isChecked);
    if (localStorage.getItem('isChecked')) {
      this.isChecked = true;
      console.log(this.isChecked);
      if (localStorage.getItem('remeberCreds')) {
        this.user = JSON.parse(localStorage.getItem('remeberCreds'));
      }
    } else {
      this.user = {
        email: '',
        password: '',
      };
    }
   }

  ngOnInit() {

     this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/admin');
  }

  login() {
    console.log(this.user);
    if (this.user.email === 'admin' && this.user.password === 'admin') {
      console.log(this.isChecked);
      localStorage.setItem('authenticated' , 'true');
      this.router.navigateByUrl(this.return);
      this.adminservice.user = this.user.email;
      localStorage.setItem('user', this.user.email);
      if (this.isChecked) {
        localStorage.setItem('isChecked', 't');
        localStorage.setItem('remeberCreds', JSON.stringify(this.user));
      } else {
        localStorage.removeItem('isChecked');
        localStorage.removeItem('remeberCreds');
      }
    } else {

    }
  }
}
