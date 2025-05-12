import { Component } from '@angular/core';
import { AreaChartComponent } from 'src/app/code/area-chart/area-chart.component';

@Component({
  selector: 'app-area-chart-demo',
  standalone: true,
  imports: [AreaChartComponent],
  template: `
    <div class="space-y-8">
      <!-- Basic Area Chart -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Basic Area Chart</h3>
        <app-area-chart
          [data]="[
            { month: 'Jan', sales: 100 },
            { month: 'Feb', sales: 150 },
            { month: 'Mar', sales: 200 }
          ]"
          x="month"
          y="sales"
          title="Monthly Sales"
          [downloadableImage]="true"
        ></app-area-chart>
      </div>

      <!-- Stacked Area Chart with Custom Styling -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Stacked Area Chart with Custom Styling</h3>
        <app-area-chart
          [data]="[
            { month: 'Jan', sales: 100, category: 'Electronics' },
            { month: 'Feb', sales: 150, category: 'Electronics' },
            { month: 'Mar', sales: 200, category: 'Electronics' },
            { month: 'Jan', sales: 80, category: 'Clothing' },
            { month: 'Feb', sales: 120, category: 'Clothing' },
            { month: 'Mar', sales: 160, category: 'Clothing' }
          ]"
          x="month"
          y="sales"
          series="category"
          chartType="stacked"
          title="Sales by Category"
          fillColor="rgba(75, 192, 192, 0.2)"
          lineColor="rgba(75, 192, 192, 1)"
          [markers]="true"
          [markerSize]="6"
          [showLabels]="true"
          labelPosition="top"
        ></app-area-chart>
      </div>

      <!-- 100% Stacked Area Chart with Missing Data Handling -->
      <div>
        <h3 class="text-lg font-semibold mb-4">100% Stacked Area Chart with Missing Data Handling</h3>
        <app-area-chart
          [data]="[
            { month: 'Jan', sales: 100, category: 'Electronics' },
            { month: 'Feb', sales: null, category: 'Electronics' },
            { month: 'Mar', sales: 200, category: 'Electronics' },
            { month: 'Jan', sales: 80, category: 'Clothing' },
            { month: 'Feb', sales: 120, category: 'Clothing' },
            { month: 'Mar', sales: null, category: 'Clothing' }
          ]"
          x="month"
          y="sales"
          series="category"
          chartType="stacked100"
          handleMissing="zero"
          title="Sales Distribution by Category"
          xAxisTitle="Month"
          yAxisTitle="Percentage"
        ></app-area-chart>
      </div>

      <!-- Stepped Line Chart with Custom Series Order -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Stepped Line Chart with Custom Series Order</h3>
        <app-area-chart
          [data]="[
            { month: 'Jan', sales: 100, category: 'Electronics' },
            { month: 'Feb', sales: 150, category: 'Electronics' },
            { month: 'Mar', sales: 200, category: 'Electronics' },
            { month: 'Jan', sales: 80, category: 'Clothing' },
            { month: 'Feb', sales: 120, category: 'Clothing' },
            { month: 'Mar', sales: 160, category: 'Clothing' }
          ]"
          x="month"
          y="sales"
          series="category"
          chartType="stepped"
          stepPosition="middle"
          [seriesOrder]="['Clothing', 'Electronics']"
          title="Monthly Sales Trend"
          [downloadableImage]="true"
        ></app-area-chart>
      </div>
    </div>
  `
})
export class AreaChartDemoComponent {} 