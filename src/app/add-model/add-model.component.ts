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
      console.log(this.brands);
      this.adminService.updatePrice(this.brands).subscribe(res => {
        console.log(res);
        this.ngOnInit();
      });
    }
  
  }