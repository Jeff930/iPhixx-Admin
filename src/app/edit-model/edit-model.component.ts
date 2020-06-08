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
  id ;

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
        });
      });
    }

    updateDevice(){
      this.spinner.show();
      this.adminService.updateDevice(this.device).subscribe(res => {
        console.log(res)
        this.spinner.hide();
        this.adminService.devicesPage  = new Object(); 
          this.router.navigate(['/devices']);
      },
       (err)=>{
           console.log(err);
           alert('Error! Please Try again.')
           this.spinner.hide();
        }
    )
    }
    
  
    goToDevices(){
      this.router.navigate(['/devices']);
    }

}
