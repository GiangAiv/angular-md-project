import { Component } from '@angular/core';
import { BarChartComponent } from 'src/app/code/bar-chart/bar-chart.component';

@Component({
  selector: 'app-bar-chart-demo',
  standalone: true,
  imports: [BarChartComponent],
  template: `
    <div class="space-y-8">
      <!-- Basic Bar Chart -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Basic Bar Chart</h3>
        <app-bar-chart
          [data]="[
            { month: 'Jan', sales: 100 },
            { month: 'Feb', sales: 200 },
            { month: 'Mar', sales: 150 }
          ]"
          x="month"
          y="sales"
          title="Monthly Sales"
        ></app-bar-chart>
      </div>

      <!-- Horizontal Bar Chart -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Horizontal Bar Chart</h3>
        <app-bar-chart
          [data]="[
            { product: 'Product A', sales: 100 },
            { product: 'Product B', sales: 200 },
            { product: 'Product C', sales: 150 },
            { product: 'Product D', sales: 300 },
            { product: 'Product E', sales: 250 }
          ]"
          x="product"
          y="sales"
          type="horizontalBar"
          title="Product Sales"
        ></app-bar-chart>
      </div>

      <!-- Styled Bar Chart -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Styled Bar Chart</h3>
        <app-bar-chart
          [data]="[
            { month: 'Jan', sales: 100 },
            { month: 'Feb', sales: 200 },
            { month: 'Mar', sales: 150 },
            { month: 'Apr', sales: 300 },
            { month: 'May', sales: 250 }
          ]"
          x="month"
          y="sales"
          title="Monthly Sales (Styled)"
          barColor="rgb(59, 130, 246)"
          borderColor="rgb(37, 99, 235)"
          [showLegend]="true"
          yAxisTitle="Sales"
          xAxisTitle="Month"
        ></app-bar-chart>
      </div>

      <!-- Currency Formatted Bar Chart -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Currency Formatted Bar Chart</h3>
        <app-bar-chart
          [data]="[
            { month: 'Jan', revenue: 1000 },
            { month: 'Feb', revenue: 2000 },
            { month: 'Mar', revenue: 1500 },
            { month: 'Apr', revenue: 3000 },
            { month: 'May', revenue: 2500 }
          ]"
          x="month"
          y="revenue"
          title="Monthly Revenue"
          yFmt="usd"
          yAxisTitle="Revenue (USD)"
        ></app-bar-chart>
      </div>
    </div>
  `
})
export class BarChartDemoComponent {} 