import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-network',
  templateUrl: './edit-network.component.html',
  styleUrls: ['./edit-network.component.scss']
})
export class EditNetworkComponent implements OnInit {

  network = { 
  	carrier_no: '',
    carrier_name :'',
  };

  network_file;
  imagePath=null;

  id;

  constructor(private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
        this.adminService.getNetwork(this.id).subscribe(res => {
          console.log(res);
          if (res) {
              this.network = res;
          }
         });
    });
  }

  updateNetwork(){
  	this.spinner.show();
    this.adminService.updateNetwork(this.network).subscribe(res => {
			console.log(res)
			this.spinner.hide();
			this.adminService.networksPage  = new Object(); 
	  		this.router.navigate(['/networks']);
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
    const file: File = image.files[0];
    const reader = new FileReader();
    console.log(file);
    reader.addEventListener('load', (event: any) => {
      this.imagePath = event.target.result;
      console.log(this.imagePath);
     
     });
  
    reader.readAsDataURL(file);
  }

  goToNetworks(){
    this.router.navigate(['/networks']);
  }

}
