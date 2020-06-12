import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss']
})
export class AddModelComponent implements OnInit {

  device = {
    devtype_id:0,
    devicebrand_id:0,
    model_name:"",
    model_number:"",
    device_file:'',
    screenrep_price:null,
    microphone_price:null,
    earrep_price:null,
    rearcamrep_price:null,
    homerep_price:null,
    trackpad_price:null,
    backglass_price:null,
    headrep_price:null,
    chargeport_price:null,
    volumerep_price:null,
    hdmirep_price:null,
    signalrep_price:null,
    powerrep_price:null,
    frontcamrep_price:null,
    battrep_price:null,
    harddrive_rep:null
  };

  imagePath;
  devtypes;
  brands;
  id;

  constructor(private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { }

    ngOnInit() {
      this.adminService.getDevtypeList().subscribe(res => {
        this.devtypes = res;
        this.adminService.getBrandList().subscribe(res => {
          this.brands = res;
        });
      });
    }
  
    getBrand(brand){
      console.log(brand);
      if (brand=='1')
        return "iPhone";
      if (brand=='2')
        return "Samsung";
      if (brand=='3')
        return "Huawei";
      if (brand=='4')
        return "Sony";
      if (brand=='5')
        return "Nokia";
      if (brand=='6')
        return "iPad";
      if (brand=='7')
        return "Hewlett Packard";
      if (brand=='8')
        return "Lenovo";
      if (brand=='9')
        return "Dell";
      if (brand=='10')
        return "Asus";
      if (brand=='11')
        return "Acer";
      if (brand=='12')
        return "Microsoft";
      if (brand=='13')
        return "Chromebook";
      if (brand=='14')
        return "Toshiba";
      if (brand=='15')
        return "MacBook";
    }
  
    goToDevices(){
      this.router.navigate(['/devices']);
    }

    acceptImage(image){
      console.log(image);
      var file:File = image.files[0];
      const reader = new FileReader();
      console.log(file);
      reader.addEventListener('load', (event: any) => {
        this.imagePath = event.target.result;
        console.log(this.imagePath);
       });
    
      reader.readAsDataURL(file);
    }
  
    addModel(){
      console.log(this.device);
      this.adminService.addModel(this.device).subscribe(res => {
        console.log(res);
        if (res){
          this.router.navigate(['/devices']);
        }else{
          alert('Error! Please Try again.');
        }
      },err=>{
        alert('Error! Please Try again.');
      });
    }
  
  }