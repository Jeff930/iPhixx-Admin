import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrls: ['./edit-price.component.scss']
})
export class EditPriceComponent implements OnInit {

  price;
  id;

  constructor(private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
        this.adminService.getDevice(id).subscribe(res => {
          console.log(res);
          this.price = res;
          if (this.price.screenrep_price == null){
            console.log('empty')
          }else{
            console.log('nempty')
          }
        });
    });
      //     if (res) {
         
      //     }
         
      //   }, err => {
         
      //   });

      // });
     
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

}
