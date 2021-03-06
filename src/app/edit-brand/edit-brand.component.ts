import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit {

  brand = { 
  	devicebrand_id: '',
    device_brand :'',
    devtype_id:''
  };

  brand_file:'';
  devtypes;
  imagePath=null;
  file:File;

  id;

  constructor(private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
        this.adminService.getBrand(this.id).subscribe(res => {
          console.log(res);
          if (res) {
              this.brand = res;
              this.adminService.getDevtypeList().subscribe(res => {
                this.devtypes = res;
                this.getImagePath();
              });
          }
         });
    });
  }

  getImagePath(){
    for (let i=0;i<this.devtypes.length;i++){
      console.log(this.brand.devtype_id);
      console.log("type",this.devtypes[i].type);
      if (this.devtypes[i].devtype_id == this.brand.devtype_id){
        this.imagePath = 'https://admin.iphixx.com/images/brands/'+ this.devtypes[i].type+'/'+ this.brand.device_brand +'.jpg';
        console.log(this.imagePath);
      }
    }
  }

  updateBrand(){
  	this.spinner.show();
    this.adminService.updateBrand(this.brand).subscribe(res => {
      if (this.imagePath==null){
        console.log(res);
        this.spinner.hide();
        this.adminService.brandsPage  = new Object(); 
        this.router.navigate(['/devices']);
      }else{
        this.adminService.uploadBrandImage(this.file,res['device_brand']).subscribe(
          (res) => {
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
			console.log(res)
			this.spinner.hide();
			this.adminService.brandsPage  = new Object(); 
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
