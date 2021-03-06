import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {
  price;
  bookingId;
  title;
  invoice;
  constructor(private route: ActivatedRoute,
    private router: Router, public adminService: AdminService,
    public spinner: NgxSpinnerService) {
    // this.adminService.updateCustomer().subscribe( res => console.log(res))

  }
  lead = {
    bookings_id: ''
  };

  repair: any;

  id;
  selectedRepairs: Array<string> = [];

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
      this.id = parseInt(params.get('id'));
      console.log(this.adminService.leadsPage['page' + this.adminService.pageActive][this.id])
      this.lead = this.adminService.leadsPage['page' + this.adminService.pageActive][this.id];
      console.log(this.lead.bookings_id);
      //this.adminService.getRepair(this.lead.bookings_id);
    });
    this.adminService.getInvoice(this.id).subscribe(res => {
      console.log(res);
      this.invoice = res;
      this.adminService.getRepair(this.invoice.bookings_id).subscribe(res => {
      console.log(JSON.stringify(res));
      this.repair = res;
      if (this.repair.screenrep_selected == 1)
        this.selectedRepairs.push("Screen Replacement");
      if (this.repair.headrep_selected == 1)
        this.selectedRepairs.push("Headphone Repair");
      if (this.repair.earrep_selected == 1)
        this.selectedRepairs.push("Ear Piece Repair");
      if (this.repair.powerrep_selected == 1)
        this.selectedRepairs.push("Power Button Repair");
      if (this.repair.rearcamrep_selected == 1)
        this.selectedRepairs.push("Rear Camera Repair");
      if (this.repair.frontcamrep_selected == 1)
        this.selectedRepairs.push("Front Camera Repair");
      if (this.repair.homerep_selected == 1)
        this.selectedRepairs.push("Home Button Repair");
      if (this.repair.microphone_selected == 1)
        this.selectedRepairs.push("Microphone Repair");
      if (this.repair.chargeport_selected == 1)
        this.selectedRepairs.push("Charging Port Repair");
      if (this.repair.volumerep_selected == 1)
        this.selectedRepairs.push("Volume Repair");
      if (this.repair.battrep_selected == 1)
        this.selectedRepairs.push("Battery Replacement");
      if (this.repair.signalrep_selected == 1)
        this.selectedRepairs.push("Cellular Signal Repair");
      if (this.repair.backglassrep_selected == 1)
        this.selectedRepairs.push("Back Glass Replacement");
      if (this.repair.protector_selected == 1)
        this.selectedRepairs.push("Screen Protector");
      if (this.repair.tempPhone_selected == 1)
        this.selectedRepairs.push("Temporary Phone");
      if (this.repair.keyboardrep_selected == 1)
        this.selectedRepairs.push("Keyboard Repair");
      if (this.repair.fanrep_selected == 1)
        this.selectedRepairs.push("Fan Repair");
      if (this.repair.laptopcamrep_selected == 1)
        this.selectedRepairs.push("Laptop Camera Repair");
      if (this.repair.laptopscreenrep_selected == 1)
        this.selectedRepairs.push("Laptop Screen Repair");
      if (this.repair.laptopspeakerrep_selected == 1)
        this.selectedRepairs.push("Laptop Speaker Repair");
      if (this.repair.datarecovery == 1)
        this.selectedRepairs.push("Data Recovery");
      if (this.repair.virusremoval == 1)
        this.selectedRepairs.push("Virus Removal");
      if (this.repair.virusremoval_withsoftware == 1)
        this.selectedRepairs.push("Virus Removal w/ software");
      if (this.repair.HDDHalfTeraWithDataTransfer == 1)
        this.selectedRepairs.push("500GB HDD w/ OS Reinstall & Data Transfer");
      if (this.repair.HDDTeraWithDataTransfer == 1)
        this.selectedRepairs.push("1TB HDD w/ OS Reinstall & Data Transfer");
      if (this.repair.HDDHalfTera == 1)
        this.selectedRepairs.push("500GB HDD w/ OS Reinstall");
      if (this.repair.HDDTera == 1)
        this.selectedRepairs.push("1TB HDD w/ OS Reinstall");
      if (this.repair.SSDHalfTeraWithDataTransfer == 1)
        this.selectedRepairs.push("500GB SSD w/ OS Reinstall & Data Transfer");
      if (this.repair.SSDTeraWithDataTransfer == 1)
        this.selectedRepairs.push("1TB SSD w/ OS Reinstall & Data Transfer");
      if (this.repair.SSDHalfTera == 1)
        this.selectedRepairs.push("500GB SSD w/ OS Reinstall");
      if (this.repair.SSDTera == 1)
        this.selectedRepairs.push("1TB SSD w/ OS Reinstall");
      if (this.repair.hdmirep_selected == 1)
        this.selectedRepairs.push("HDMI Repair");
      if (this.repair.harddrive_selected == 1)
        this.selectedRepairs.push("Hard Drive Repair");

      console.log(JSON.stringify(this.repair));

    })
    })
  }

  goToBooking() {
      this.router.navigate(['/invoices']);
  
  }

  getLocation(id){
    switch(id){
      case '1':
        return 'Joyces of Wexford';
    }

  }


}
