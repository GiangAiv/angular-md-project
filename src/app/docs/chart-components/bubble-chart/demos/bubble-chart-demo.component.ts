import { Component } from '@angular/core';
import { BubbleChartComponent } from 'src/app/code/bubble-chart/bubble-chart.component';

@Component({
  selector: 'app-bubble-chart-demo',
  standalone: true,
  imports: [BubbleChartComponent],
  template: `
    <div class="space-y-8">
      <!-- Basic Bubble Chart -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Basic Bubble Chart</h3>
        <app-bubble-chart
          [data]="[
            { x: 10, y: 20, r: 5 },
            { x: 15, y: 30, r: 8 },
            { x: 20, y: 25, r: 6 },
            { x: 25, y: 35, r: 10 }
          ]"
          x="x"
          y="y"
          r="r"
          title="Sample Bubble Chart"
        ></app-bubble-chart>
      </div>

      <!-- Multi-Series Bubble Chart -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Multi-Series Bubble Chart</h3>
        <app-bubble-chart
          [data]="[
            { x: 10, y: 20, r: 5, category: 'A' },
            { x: 15, y: 30, r: 8, category: 'A' },
            { x: 20, y: 25, r: 6, category: 'B' },
            { x: 25, y: 35, r: 10, category: 'B' }
          ]"
          x="x"
          y="y"
          r="r"
          series="category"
          title="Multi-Series Bubble Chart"
          [bubbleOpacity]="0.6"
        ></app-bubble-chart>
      </div>

      <!-- Logarithmic Scale Bubble Chart -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Logarithmic Scale Bubble Chart</h3>
        <app-bubble-chart
          [data]="[
            { x: 1, y: 10, r: 5 },
            { x: 10, y: 100, r: 8 },
            { x: 100, y: 1000, r: 6 },
            { x: 1000, y: 10000, r: 10 }
          ]"
          x="x"
          y="y"
          r="r"
          title="Logarithmic Scale Bubble Chart"
          [xLog]="true"
          [yLog]="true"
          xAxisTitle="X (log scale)"
          yAxisTitle="Y (log scale)"
        ></app-bubble-chart>
      </div>

      <!-- Styled Bubble Chart -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Styled Bubble Chart</h3>
        <app-bubble-chart
          [data]="[
            { x: 10, y: 20, r: 5, category: 'A' },
            { x: 15, y: 30, r: 8, category: 'A' },
            { x: 20, y: 25, r: 6, category: 'B' },
            { x: 25, y: 35, r: 10, category: 'B' }
          ]"
          x="x"
          y="y"
          r="r"
          series="category"
          title="Styled Bubble Chart"
          [bubbleOpacity]="0.6"
          [bubbleBorderWidth]="1"
          bubbleBorderColor="rgba(0, 0, 0, 0.1)"
          [bubbleHoverRadius]="8"
          [bubbleHoverBorderWidth]="2"
          [downloadableImage]="true"
        ></app-bubble-chart>
      </div>
    </div>
  `
})
export class BubbleChartDemoComponent {} 