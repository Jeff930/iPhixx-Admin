import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';


@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.scss']
})
export class ConfirmPaymentComponent {
  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }
}
