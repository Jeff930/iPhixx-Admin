import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  title;
  locations: any;
	
  constructor(  private route: ActivatedRoute,
  private router: Router , public adminService : AdminService,
  public spinner : NgxSpinnerService) { 
  	//this.adminService.get().subscribe( res => console.log(res))
 
   }

  password = { 
  	current_password: '',
	  new_password :'',
    confirm_password:'',
    id:0
  };

  id ;

  ngOnInit() {
  		this.route.paramMap.subscribe((params: ParamMap) => {
        this.password.id = parseInt(params.get('id'));
    	});
   	
  } 
  
  updatePassword(){
    this.spinner.show();
    if (this.password.new_password != "" && this.password.new_password == this.password.confirm_password){
      this.adminService.checkPassword(Md5.hashStr(this.password.current_password), JSON.parse(localStorage.getItem('authenticated')).agent_id).subscribe(res => {
        console.log(res);
        if (res != null && res['agent_id'] > 0){
          this.spinner.hide();
          this.changePassword();
        }else{
          alert('Error! Check your current password.')
          this.spinner.hide();
        }
      },
       (err)=>{
           console.log(err);
           alert('Error! Current Password Mismatch.')
           this.spinner.hide();
        }
    )
    }else{
      alert('Error! Check your new password.')
      this.spinner.hide();
    }
  }

  changePassword(){
    this.spinner.show();
    this.adminService.updatePassword(Md5.hashStr(this.password.new_password), JSON.parse(localStorage.getItem('authenticated')).agent_id).subscribe(res => {
      console.log(res)
      this.spinner.hide();
      if (res['new_password'] == Md5.hashStr(this.password.new_password)){
        alert('Success! Password updated.')
        this.spinner.hide();
        this.adminService.agentsPage  = new Object(); 
        this.router.navigate(['/leads']);
      }else{
        alert('Error! Password not updated.')
        this.spinner.hide();
      }
    },
     (err)=>{
         console.log(err);
         alert('Error! Please Try again.')
         this.spinner.hide();
      })
  }

  goToLeads(){
	this.router.navigate(['/leads']);
  }

}
