import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap  } from '@angular/router';

@Component({
  selector: 'view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router ,) {
  }

  ngOnInit(){}

  public log(msg: string) {
    console.log(msg);
  }


}
