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

  imagePath;
  
  devtype = { 
    devtype_name: '',
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

acceptImage(image){
  console.log(image);
  const file: File = image.files[0];
  const reader = new FileReader();
  console.log(file);
  reader.addEventListener('load', (event: any) => {
    this.imagePath = event.target.result;
    console.log(this.imagePath);
  //   this.apiService.uploadImage(this.selectedFile.file).subscribe(
  //     (res) => {
      
  //     },
  //     (err) => {
      
  //     })
   });

  var test= reader.readAsDataURL(file);
  console.log(test);
}

goToDevices(){
  this.router.navigate(['/devices']);
  }

}
