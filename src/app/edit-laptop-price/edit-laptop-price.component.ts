import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-laptop-price',
  templateUrl: './edit-laptop-price.component.html',
  styleUrls: ['./edit-laptop-price.component.scss']
})
export class EditLaptopPriceComponent implements OnInit {

  price;

  constructor(public adminService : AdminService) { }

  ngOnInit() {
        this.adminService.getLaptopPrice().subscribe(res => {
          console.log(res);
          this.price = res['result'][0];
          console.log(this.price);
        });
      //     if (res) {
         
      //     }
         
      //   }, err => {
         
      //   });

      // });
     
  }

}
