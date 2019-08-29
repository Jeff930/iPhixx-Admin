import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute  } from '@angular/router';
import { Agents, AdminService } from '../admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertsService } from 'angular-alert-module';


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
  constructor(public router: Router, private route: ActivatedRoute, private adminservice: AdminService, public alert:AlertsService) {
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
    // this.adminservice.getAgents(1).subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.message = res.agents;
    //   },
    //   (err) => console.log(err));
    //  this.route.queryParams
    //   .subscribe(params => this.return = params['return'] || '/admin');
  }

  login() {
  
      this.adminservice.loginAgent(this.getStartedForm.get('email').value,this.getStartedForm.get('password').value)
      .subscribe(res=>{
        console.log(res);
        console.log(res['agent'][0]);
        if (res['agent'][0]!=undefined){
          localStorage.setItem('authenticated' , 'true');
          this.router.navigateByUrl(this.return);
        }else{
          this.alert.setMessage('No matching account found','error');
        }        
    })
    
    //console.log(this.message);

    
    // for (let agent = 0; agent < this.message.length; agent++) {
    //   if (this.getStartedForm.get('email').value === this.message[agent].agent_email 
    //   && this.getStartedForm.get('password').value === this.message[agent].agent_password ) {
    //   console.log(this.isChecked);
    //   localStorage.setItem('authenticated' , 'true');
    //   this.router.navigateByUrl(this.return);
    //     this.adminservice.user = this.message[agent].agent_username;
    //     localStorage.setItem('user', this.message[agent].agent_username);
    //   if (this.isChecked) {
    //     localStorage.setItem('isChecked', 't');
    //     localStorage.setItem('remeberCreds', JSON.stringify(this.user));
    //   } else {
    //     localStorage.removeItem('isChecked');
    //     localStorage.removeItem('remeberCreds');
    //   }
    // }
    //   console.log(this.message[agent].agent_password);
    // }
    // this.validation = true;
    // if (this.getStartedForm.get('email').value === 'admin' && this.getStartedForm.get('password').value === 'admin') {
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
