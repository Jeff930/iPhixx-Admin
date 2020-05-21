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
      brand_path :'',
      brand_file:''
    };
  
    id ;
  
    ngOnInit() {} 
  
    addBrand(){
      console.log("called");
      console.log(this.brand);
      this.spinner.show();
      this.adminService.addBrand(this.brand).subscribe(res => {
        console.log("this" + res)
        this.spinner.hide();
        this.adminService.brandsPage  = new Object(); 
        this.router.navigate(['/brands']);
      },
      (err)=>{
         console.log(err);
         alert('Error! Please Try again.')
         this.spinner.hide();
      }
    )
  }
  
  
    goToBrand(){
    this.router.navigate(['/brands']);
    }
  
  }