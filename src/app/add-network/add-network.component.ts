import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-network',
  templateUrl: './add-network.component.html',
  styleUrls: ['./add-network.component.scss']
})
export class AddNetworkComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { }

  ngOnInit() {
  }

  imagePath=null;

  network = { 
    network_name: '',
    network_file:''
  };

  id;

  addNetwork(){
    console.log("called");
    console.log(this.network);
    this.spinner.show();
    this.adminService.addNetwork(this.network).subscribe(res => {
      console.log("this" + res)
      if (this.imagePath==null){
        this.spinner.hide();
        this.adminService.networksPage  = new Object(); 
        this.router.navigate(['/networks']);  
      }else{
        this.adminService.uploadNetworkImage(this.imagePath).subscribe(
          (res) => {
            this.spinner.hide();
            this.adminService.networksPage  = new Object(); 
            this.router.navigate(['/networks']);
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
  const file: File = image.files[0];
  const reader = new FileReader();
  console.log(file);
  reader.addEventListener('load', (event: any) => {
    this.imagePath = event.target.result;
    console.log(this.imagePath);
   
   });

  reader.readAsDataURL(file);
}

goToNetwork(){
  this.router.navigate(['/networks']);
  }

}
