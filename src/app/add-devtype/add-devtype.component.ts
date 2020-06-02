import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add-devtype',
  templateUrl: './add-devtype.component.html',
  styleUrls: ['./add-devtype.component.scss']
})
export class AddDevtypeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { }

  ngOnInit() {
  }

  devtype = { 
    devtype_name: '',
    devtype_path :'',
    devtype_file:''
  };

  addDevtype(){
    console.log("called");
    console.log(this.devtype);
    this.spinner.show();
    this.adminService.addDevtype(this.devtype).subscribe(res => {
      console.log("this" + res)
      this.spinner.hide();
      this.adminService.devicesPage  = new Object(); 
      this.router.navigate(['/devices']);
    },
    (err)=>{
       console.log(err);
       alert('Error! Please Try again.')
       this.spinner.hide();
    }
  )
}

goToDevices(){
  this.router.navigate(['/devices']);
  }

}
