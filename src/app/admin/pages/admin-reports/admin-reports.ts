import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCustomerService, AdminOrderService, AdminProductService } from '../../services';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { ApexResponsive } from 'apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  responsive: ApexResponsive;
};

// import { Chart, ChartConfiguration, registerables } from 'chart.js';

// Chart.register(...registerables);

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './admin-reports.html',
})
export class AdminReportsComponent implements OnInit, AfterViewInit {
  readonly chartRef = viewChild.required<ElementRef<HTMLCanvasElement>>('categoryChart');

  orderService: AdminOrderService = inject(AdminOrderService);
  customerService: AdminCustomerService = inject(AdminCustomerService);
  productService: AdminProductService = inject(AdminProductService);

  salesByCategory = computed(() => {
    const orders = this.orderService.orders();

    const grouped: Record<string, number> = {};

    orders.forEach((order) =>
      order.items?.forEach((item) => {
        const total = item.price * item.quantity;

        if (!grouped[item.category]) {
          grouped[item.category] = 0;
        }

        grouped[item.category] += total;
      }),
    );

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
    }));
  });

  chartOptions = computed(() => {
    const data = this.salesByCategory();

    return {
      series: data.map((d) => d.value),
      chart: {
        type: 'donut' as const,
        height: 400,
        width: 350,
      },

      legend: {
        position: 'right',
      },

      labels: data.map((d) => d.name),

      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              width: 400,
              height: 400,
            },
            legend: {
              position: 'right',
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              width: 250,
              height: 250,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
        {
          breakpoint: 640,
          options: {
            chart: {
              width: 200,
              height: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],

      // title: {
      //   text: 'Sales by Category',
      // },
    };
  });

  conversionRate = computed(() => {
    const totalVisitors = this.customerService.customers().length;
    const totalOrders = this.orderService.orders().length;

    if (!totalVisitors) return 0;

    return ((totalOrders / totalVisitors) * 100).toFixed(2);
  });

  fiveStarReview = computed(() => {
    const review = this.productService.allReviews().filter((r) => r.rating === 5);

    return review.length;
  });

  fourStarReview = computed(() => {
    const review = this.productService.allReviews().filter((r) => r.rating === 4);

    return review.length;
  });

  threeStarAndBelowReview = computed(() => {
    const review = this.productService.allReviews().filter((r) => r.rating <= 3);

    return review.length;
  });

  constructor() {
    // effect(() => {
    //   const data = this.salesByCategory();
    //   if (!this.chartRef) return;
    //   // this.renderChart(data);
    // });
  }

  ngOnInit(): void {
    this.productService.getAllReviews();
  }

  ngAfterViewInit(): void {}

  // renderChart(data: Record<string, number>) {
  //   const labels = Object.keys(data);
  //   const values = Object.values(data);

  //   console.log(labels, values);

  //   if (this.chart) {
  //     this.chart.destroy();
  //   }

  //   this.chart = new Chart(this.chartRef.nativeElement, {
  //     type: 'doughnut', // or 'pie', 'bar', 'doughnut
  //     data: {
  //       labels,
  //       datasets: [
  //         {
  //           data: values,
  //           backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
  //         },
  //       ],
  //     },
  //     options: {
  //       cutout: '65%',
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: 'bottom',
  //         },
  //       },
  //     },
  //   });
  // }
}
