import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

declare var Chartist: any ;
declare var easyPieChart: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {




  constructor() {



  }

  ngOnInit() {
    this.headLineCharts();
    this.visitTrendCharts();
    this.visitsChart();
    this.realTimePieChart();

  }

  headLineCharts() {

      const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [
            [23, 29, 24, 40, 25, 24, 35],
            [14, 25, 18, 34, 29, 38, 44],
        ]
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

  visitTrendCharts() {

      // visits trend charts
    const	data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [{
                name: 'series-real',
                data: [200, 380, 350, 320, 410, 450, 570, 400, 555, 620, 750, 900],
            }, {
                name: 'series-projection',
                data: [240, 350, 360, 380, 400, 450, 480, 523, 555, 600, 700, 800],
            }]
        };

    const	options = {
            fullWidth: true,
            lineSmooth: false,
            height: '270px',
            low: 0,
            high: 'auto',
            series: {
                'series-projection': {
                    showArea: true,
                    showPoint: false,
                    showLine: false
                },
            },
            axisX: {
                showGrid: false,

            },
            axisY: {
                showGrid: false,
                onlyInteger: true,
                offset: 0,
            },
            chartPadding: {
                left: 20,
                right: 20
            }
        };

    new Chartist.Line('#visits-trends-chart', data, options);
  }

  visitsChart() {
      // visits chart
    const data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            series: [
                [6384, 6342, 5437, 2764, 3958, 5068, 7654]
            ]
        };

    const options = {
            height: 300,
            axisX: {
                showGrid: false
            },
        };

        new Chartist.Bar('#visits-chart', data, options);
  }

  realTimePieChart() {
      // real-time pie chart
        const sysLoad = $('#system-load').easyPieChart({
            size: 130,
            barColor: function(percent) {
                return 'rgb(" + Math.round(200 * percent / 100) + ", " + Math.round(200 * (1.1 - percent / 100)) + ", 0)';
            },
            trackColor: 'rgba(245, 245, 245, 0.8)',
            scaleColor: false,
            lineWidth: 5,
            lineCap: 'square',
            animate: 800
        });

        const updateInterval = 3000; // in milliseconds

        setInterval( () => {
            let randomVal;
            randomVal = this.getRandomInt(0, 100);

            sysLoad.data('easyPieChart').update(randomVal);
            sysLoad.find('.percent').text(randomVal);
        }, updateInterval);
  }

  getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
