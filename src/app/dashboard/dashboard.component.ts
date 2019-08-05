import { Component, OnInit } from '@angular/core';


import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../admin.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';

declare var Chartist: any ;
declare var easyPieChart: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    pages = 1;
    overview = {
        totalSales: 0,
        tax: 0,
        discounts: 0,
        cogs: 0,
        netProfit: 0
    };
    counter = [];
    quickAccess = [
        {name: 'Add Customer', funct: 'newCustomer()'},
        { name: 'New Ticket', funct: 'editBooking()'},
        { name: 'Add Tax', funct: 'goToTax'}
    ];

    reminders = [];
    constructor(private adminservice: AdminService,
        private spinner: NgxSpinnerService,
        public router: Router,
        private adminService: AdminService) {
  }

    ngOnInit() {
        this.spinner.show();
        this.adminservice.getCustomersCount().subscribe(res => {
          console.log(res);
          this.counter.push({ name: 'Customer', value: res });
      });
      this.adminservice.getInventoryCount().subscribe(res => {
          console.log(res);
          this.counter.push({ name: 'Inventory', value: res });
      });
      this.adminservice.getInvoicesCount().subscribe(res => {
          console.log(res);
          this.counter.push({ name: 'Invoices', value: res });
      });
      this.adminservice.getTicketsCount().subscribe(res => {
          console.log(res);
          this.counter.push({ name: 'Tickets', value: res });
          console.log(this.counter);
          this.spinner.hide();
      });
    if ( localStorage.getItem('reminders')) {
        console.log(JSON.parse(localStorage.getItem('reminders')));
        this.reminders = JSON.parse(localStorage.getItem('reminders'));
    }
    //   this.customerspageActive = this.adminService.customerspageActive;
    //   this.adminService.customersPage['page' + this.customerspageActive] ? this.customers = this.adminService.customersPage['page' + this.customerspageActive] : '';
    //   this.adminService.customerspages ? this.customerspages = this.adminService.customerspages : '';

    //   if (this.customers.length === 0) {
    //       this.customerspageActive = 1;
    //       this.adminService.customerspageActive = this.customerspageActive;
    //       this.spinner.show();
    //       this.adminService.getCustomers().subscribe((res) => {
    //           console.log(res);
    //           this.customerspages = Array(res.total_page);
    //           this.adminService.customerspages = this.customerspages;

    //           this.adminService.customersPage['page' + 1] = res.customers;

    //           this.customers = this.adminService.customersPage['page' + 1];

    //           console.log(this.customers)
    //           this.spinner.hide();
    //           this.adminService.global.customers = this.customers;

    //       })
    //   }
      for (let i = 1; i <= 5; i++) {
          switch (i) {
              case 1:
                // for (; this.pages !==0; this.pages++) {
                //   this.adminservice.getCustomers(this.pages).subscribe(res => {
                //       if (res) {
                //       console.log(res.customers.length);
                //       this.overview.totalSales += res.customers.length;
                //       }
                //   }, err => {
                //       this.pages = 0;
                //   });
                // }
                    this.overview.totalSales = 11;
                  break;
              case 2:
                  this.overview.tax = 0.22;
                  break;
              case 3:
                  this.overview.discounts = 0.33;
                  break;
              case 4:
                  this.overview.cogs = 0.44;
                  break;
              default:
                  this.overview.netProfit = 0.55;
                  break;
          }
      }
    this.headLineCharts();
    // this.visitTrendCharts();
    // this.visitsChart();
    // this.realTimePieChart();
  }

  headLineCharts() {

      const data = {
        // labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        // series: [
        //     [23, 29, 24, 40, 25, 24, 35],
        //     [14, 25, 18, 34, 29, 38, 44],
        // ]
    };

    const options = {
        height: 300,
        showArea: true,
        showLine: false,
        showPoint: false,
        fullWidth: true,
        axisX: {
            showGrid: false
        },
        lineSmooth: false,
    };

    new Chartist.Line('#headline-chart', data, options);

  }

//   visitTrendCharts() {

//       // visits trend charts
//     const	data = {
//             labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//             series: [{
//                 name: 'series-real',
//                 data: [200, 380, 350, 320, 410, 450, 570, 400, 555, 620, 750, 900],
//             }, {
//                 name: 'series-projection',
//                 data: [240, 350, 360, 380, 400, 450, 480, 523, 555, 600, 700, 800],
//             }]
//         };

//     const	options = {
//             fullWidth: true,
//             lineSmooth: false,
//             height: '270px',
//             low: 0,
//             high: 'auto',
//             series: {
//                 'series-projection': {
//                     showArea: true,
//                     showPoint: false,
//                     showLine: false
//                 },
//             },
//             axisX: {
//                 showGrid: false,

//             },
//             axisY: {
//                 showGrid: false,
//                 onlyInteger: true,
//                 offset: 0,
//             },
//             chartPadding: {
//                 left: 20,
//                 right: 20
//             }
//         };

//     new Chartist.Line('#visits-trends-chart', data, options);
//   }

//   visitsChart() {
//       // visits chart
//     const data = {
//             labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//             series: [
//                 [6384, 6342, 5437, 2764, 3958, 5068, 7654]
//             ]
//         };

//     const options = {
//             height: 300,
//             axisX: {
//                 showGrid: false
//             },
//         };

//         new Chartist.Bar('#visits-chart', data, options);
//   }

//   realTimePieChart() {
//       // real-time pie chart
//         const sysLoad = $('#system-load').easyPieChart({
//             size: 130,
//             barColor: function(percent) {
//                 return 'rgb(" + Math.round(200 * percent / 100) + ", " + Math.round(200 * (1.1 - percent / 100)) + ", 0)';
//             },
//             trackColor: 'rgba(245, 245, 245, 0.8)',
//             scaleColor: false,
//             lineWidth: 5,
//             lineCap: 'square',
//             animate: 800
//         });

//         const updateInterval = 3000; // in milliseconds

//         setInterval( () => {
//             let randomVal;
//             randomVal = this.getRandomInt(0, 100);

//             sysLoad.data('easyPieChart').update(randomVal);
//             sysLoad.find('.percent').text(randomVal);
//         }, updateInterval);
//   }

  getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
  }
    goToTax() {
        this.router.navigate(['/edit-tax', '']);
    }
    editBooking() {
        this.router.navigate(['/edit-booking', '', '']);
    }
    newCustomer() {
        this.adminService.customersAction = 'new';
        this.router.navigate(['/edit-customer']);
    }
    removeReminder(e, index) {
        console.log(index);
        if (e.target.checked) {
            this.reminders[index].isCanceled = true;
        } else {
            this.reminders[index].isCanceled = false;
        }
    }
    deleteReminder(index) {
        console.log(index);
        this.reminders.splice(index, 1);
        localStorage.setItem( 'reminders', JSON.stringify(this.reminders));
    }
    editReminder(index) {
        console.log(index);
        this.router.navigate(['/add-reminder/' + index]);
    }
}
