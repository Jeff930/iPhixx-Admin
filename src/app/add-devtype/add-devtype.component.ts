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

  imagePath=null;
  file:File;
  
  devtype = { 
    devtype_name: '',
    devtype_file:''
  };

  addDevtype(){
    console.log("called");
    console.log(this.devtype);
    this.spinner.show();
    this.adminService.addDevtype(this.devtype).subscribe(res => {
      console.log(res);
      console.log(res['devtype_id']);
      if (res['devtype_id']>=0){
        if (this.imagePath==null){
          this.spinner.hide();
          this.adminService.devicesPage  = new Object(); 
          this.router.navigate(['/devices']);
        }else{
          this.adminService.uploadDevtypeImage(this.file,res['type']).subscribe(
            (res) => {
              this.spinner.hide();
              this.adminService.devicesPage  = new Object(); 
              this.router.navigate(['/devices']);
            },
            (err) => {
              console.log(err);
              alert('Error! Please Try again.')
              this.spinner.hide();
            })
        }
      }else{
        alert('Error! Please Try again.')
        this.spinner.hide();
      }  
    },
    (err)=>{
       console.log(err);
       alert('Error! Please Try again.')
       this.spinner.hide();
    }
  )
}

acceptImage(image){
  console.log(image);
  this.file = image.files[0];
  const reader = new FileReader();
  console.log(this.file);
  reader.addEventListener('load', (event: any) => {
    this.imagePath = event.target.result;
    console.log(this.imagePath);
   });

  reader.readAsDataURL(this.file);
}

goToDevices(){
  this.router.navigate(['/devices']);
  }

}
