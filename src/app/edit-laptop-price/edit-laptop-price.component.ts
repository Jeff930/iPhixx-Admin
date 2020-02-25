import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-laptop-price',
  templateUrl: './edit-laptop-price.component.html',
  styleUrls: ['./edit-laptop-price.component.scss']
})
export class EditLaptopPriceComponent implements OnInit {

  price;

  constructor(private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { }

  ngOnInit() {
        this.adminService.getLaptopPrice().subscribe(res => {
          console.log(res);
          this.price = res['result'][0];
          console.log(this.price);
        });
  }

  goToDevices(){
    this.router.navigate(['/devices']);
  }

  updateLaptopPrice(){
    console.log(this.price);
    this.adminService.updateLaptopPrice(this.price).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    });
  }

}
