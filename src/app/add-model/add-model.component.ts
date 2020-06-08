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
    devtype:0,
    brand:0,
    modelName:"",
    modelNum:"",
    screenrep_price:0,
    microphone_price:0,
    earrep_price:0,
    rearcamrep_price:0,
    homerep_price:0,
    trackpad_price:0,
    backglass_price:0,
    headrep_price:0,
    chargeport_price:0,
    volumerep_price:0,
    hdmirep_price:0,
    signalrep_price:0,
    powerrep_price:0,
    frontcamrep_price:0,
    battrep_price:0,
    harddrive_rep:0  
  };

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
  
    updatePrice(){
      console.log(this.device);
      this.adminService.addModel(this.device).subscribe(res => {
        console.log(res);
        this.ngOnInit();
      });
    }
  
  }