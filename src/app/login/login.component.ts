import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute  } from '@angular/router';
import { Agents, AdminService } from '../admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  getStartedForm: FormGroup;
  message: any;
  user = {
    email : '',
    password : '',
  };
  return ;
  isChecked: Boolean;
  validation= false;
  constructor(public router: Router, private route: ActivatedRoute, private adminservice: AdminService) {
    this.getStartedForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
    });
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
    this.adminservice.getAgents(1).subscribe(
      (res) => {
        console.log(res);
        this.message = res.agents;
      },
      (err) => console.log(err));
     this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/admin');
  }

  login() {
    console.log(this.getStartedForm.get('email').value);
    console.log(this.message);
    for (let agent = 0; agent < this.message.length; agent++) {
      if (this.getStartedForm.get('email').value === this.message[agent].agent_email 
      && this.getStartedForm.get('password').value === this.message[agent].agent_password ) {
      console.log(this.isChecked);
      localStorage.setItem('authenticated' , 'true');
      this.router.navigateByUrl(this.return);
        this.adminservice.user = this.message[agent].agent_username;
        localStorage.setItem('user', this.message[agent].agent_username);
      if (this.isChecked) {
        localStorage.setItem('isChecked', 't');
        localStorage.setItem('remeberCreds', JSON.stringify(this.user));
      } else {
        localStorage.removeItem('isChecked');
        localStorage.removeItem('remeberCreds');
      }
    }
      console.log(this.message[agent].agent_password);
    }
    this.validation = true;
    // if (this.user.email === 'admin' && this.user.password === 'admin') {
    //   console.log(this.isChecked);
    //   localStorage.setItem('authenticated' , 'true');
    //   this.router.navigateByUrl(this.return);
    //   this.adminservice.user = this.user.email;
    //   localStorage.setItem('user', this.user.email);
    //   if (this.isChecked) {
    //     localStorage.setItem('isChecked', 't');
    //     localStorage.setItem('remeberCreds', JSON.stringify(this.user));
    //   } else {
    //     localStorage.removeItem('isChecked');
    //     localStorage.removeItem('remeberCreds');
    //   }
    // } else {

    }
}
