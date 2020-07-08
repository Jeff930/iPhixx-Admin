import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
  styleUrls: ['./edit-model.component.scss']
})
export class EditModelComponent implements OnInit {

  device = { 
    devicemodel_id:'',
  	devtype_id: '',
    model_number :'',
    devicebrand_id: '',
    model_name :''
  };

  devtypes;
  brands;
  id;
  imagePath=null;
  file:File;


  constructor(private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { }

    ngOnInit() {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.id = parseInt(params.get('id'));
          this.adminService.getDevice(this.id).subscribe(res => {
            console.log(res);
            if (res) {
                this.device = res;
            }
           });
      });
      this.adminService.getDevtypeList().subscribe(res => {
        this.devtypes = res;
        this.adminService.getBrandList().subscribe(res => {
          this.brands = res;
          this.getImagePath();
        });
      });
    }

    getImagePath(){
      for (let i=0;i<this.brands.length;i++){
        console.log(this.device.devicebrand_id);
        console.log("brands",this.brands[i].devicebrand_id);
        if (this.brands[i].devicebrand_id == this.device.devicebrand_id){
          this.imagePath = 'https://admin.iphixx.com/images/models/'+ this.brands[i].device_brand+'/'+ this.device.model_name +'.jpg';
          console.log(this.imagePath);
        }
      }
    }

    updateDevice(){
      this.spinner.show();
      this.adminService.updateDevice(this.device).subscribe(res => {
        if (this.imagePath==null){
          console.log(res)
        this.spinner.hide();
        this.adminService.devicesPage  = new Object(); 
          this.router.navigate(['/devices']);
        }else{
          this.adminService.uploadModelImage(this.imagePath,res['model_name'],this.device.devicebrand_id).subscribe(
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
