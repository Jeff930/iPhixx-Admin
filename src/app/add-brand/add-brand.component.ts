import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {

  locations: any;

  constructor(  private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { 
     }
  
    brand = { 
      brand_name: '',
      brand_file:'',
      device_type:''
    };

    imagePath=null;
    file:File;
    showError=false;
    devtypes;
    id;
  
    ngOnInit() {
      this.adminService.getDevtypeList().subscribe(res => {
        this.devtypes = res;
      });
    } 
  
    addBrand(){
      console.log("called");
      console.log(this.brand);
      this.spinner.show();
      if (this.imagePath==null){
        this.showError = true;
      }else{
        this.adminService.addBrand(this.brand).subscribe(res => {
          console.log(res);
          console.log(res['devicebrand_id']);
          if (res['devicebrand_id']>=0){
            if (this.imagePath==null){
              this.showError = true;
            }else{
              this.adminService.uploadBrandImage(this.file,res['device_brand']).subscribe(
                (res) => {
                  this.showError = false;
                  console.log(res);
                  this.spinner.hide();
                  this.adminService.brandsPage  = new Object(); 
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
  }
  
  acceptImage(image){
    console.log(image);
    this.file = image.files[0];
    console.log(this.file);
    const reader = new FileReader();
    console.log(this.file);
    reader.addEventListener('load', (event: any) => {
      this.imagePath = event.target.result;
      this.file = this.imagePath;
      console.log(this.imagePath); 
    });
  
    reader.readAsDataURL(this.file);
  }
  
    goToDevices(){
    this.router.navigate(['/devices']);
    }
  
  }