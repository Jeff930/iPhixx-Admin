import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-repair',
  templateUrl: './view-repair.component.html',
  styleUrls: ['./view-repair.component.scss']
})
export class ViewRepairComponent implements OnInit {
  type;
  title;
  constructor(  private route: ActivatedRoute,
    private router: Router , public adminService : AdminService,
    public spinner : NgxSpinnerService) { 
      // this.adminService.updateCustomer().subscribe( res => console.log(res))
   
     }

    lead = { 
      bookings_id: ''
    };
  
    repair: any;

    id ;
    selectedRepairs:Array<string>=[];

    ngOnInit() {
      
      this.route.paramMap.subscribe((params: ParamMap) => {
        console.log(params);
      this.id = parseInt(params.get('id'));
      this.type = params.get('type');
      console.log(this.adminService.leadsPage['page'+this.adminService.pageActive ][this.id])
      this.lead = this.adminService.leadsPage['page'+this.adminService.pageActive ][this.id];
      console.log(this.lead.bookings_id);
      this.adminService.getRepair(this.lead.bookings_id);
      });
      this.adminService.getRepair(this.lead.bookings_id).subscribe(res => {
        console.log(JSON.stringify(res));
        this.repair = res;
        if (this.repair.screenrep_selected==1)
          this.selectedRepairs.push("Screen Replacement");
        if (this.repair.headrep_selected==1)
          this.selectedRepairs.push("Headphone Repair");
        if (this.repair.earrep_selected==1)
          this.selectedRepairs.push("Ear Piece Repair");
        if (this.repair.powerrep_selected==1)
          this.selectedRepairs.push("Power Button Repair");
        if (this.repair.rearcamrep_selected==1)
          this.selectedRepairs.push("Rear Camera Repair");
        if (this.repair.frontcamrep_selected==1)
          this.selectedRepairs.push("Front Camera Repair");
        if (this.repair.homerep_selected==1)
          this.selectedRepairs.push("Home Button Repair");
        if (this.repair.microphone_selected==1)
          this.selectedRepairs.push("Microphone Repair");
        if (this.repair.chargeport_selected==1)
          this.selectedRepairs.push("Charging Port Repair");
        if (this.repair.volumerep_selected==1)
          this.selectedRepairs.push("Volume Repair");
        if (this.repair.battrep_selected==1)
          this.selectedRepairs.push("Battery Replacement");
        if (this.repair.signalrep_selected==1)
          this.selectedRepairs.push("Cellular Signal Repair");
        if (this.repair.backglassrep_selected==1)
          this.selectedRepairs.push("Back Glass Replacement");
        
        console.log(JSON.stringify(this.repair));

        })
    } 
    
    goToBooking(){
        this.router.navigate(['/tickets']);
      
    }
  
    

}
