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
      brand_file:''
    };

    imagePath=null;
  
    id;
  
    ngOnInit() {} 
  
    addBrand(){
      console.log("called");
      console.log(this.brand);
      this.spinner.show();
      this.adminService.addBrand(this.brand).subscribe(res => {
        console.log("this" + res)
        if (this.imagePath==null){
          this.spinner.hide();
          this.adminService.brandsPage  = new Object(); 
          this.router.navigate(['/brands']);
        }else{
          this.adminService.uploadBrandImage(this.imagePath).subscribe(
            (res) => {
              this.spinner.hide();
              this.adminService.brandsPage  = new Object(); 
              this.router.navigate(['/brands']);
            },
            (err) => {
              console.log(err);
              alert('Error! Please Try again.')
              this.spinner.hide();
            })
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
    const file: File = image.files[0];
    const reader = new FileReader();
    console.log(file);
    reader.addEventListener('load', (event: any) => {
      this.imagePath = event.target.result;
      console.log(this.imagePath); 
    });
  
    reader.readAsDataURL(file);
  }
  
    goToDevices(){
    this.router.navigate(['/devices']);
    }
  
  }