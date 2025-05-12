import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BarChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | null = null;

  @Input() data: any[] = [];
  @Input() x: string = 'region';
  @Input() y: string = 'revenue';
  @Input() chartAreaHeight: number = 300;
  @Input() type: string = 'bar';
  @Input() labels: boolean = true;
  @Input() yFmt: string = '';
  @Input() yAxisTitle: string = '';
  @Input() barColor: string = '#0070f3';
  @Input() borderColor: string = '#0070f3';
  @Input() showLegend: boolean = true;
  @Input() title: string = '';
  @Input() xAxisTitle: string = '';
  @Input() downloadableImage: boolean = true;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private renderChart(): void {
    if (!this.data || !this.chartCanvas) {
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }

    // Parse data
    const xKey = this.x;
    const yKey = this.y;

    // Format labels and data
    const labels = this.data.map((item: any) => item[xKey]);
    const values = this.data.map((item: any) => {
      // Handle formatting for currency if needed
      if (typeof item[yKey] === 'string' && item[yKey].startsWith('$')) {
        return parseFloat(item[yKey].replace(/[$,]/g, ''));
      }
      return item[yKey];
    });

    // Create formatter based on yFmt
    const formatter = (value: number) => {
      if (this.yFmt === 'usd') {
        return '$' + value.toLocaleString();
      }
      return value.toLocaleString();
    };

    // Create chart
    this.chart = new Chart(ctx, {
      type: this.type === 'grouped' ? 'bar' : 'bar', // Default to 'bar' even for 'grouped'
      data: {
        labels: labels,
        datasets: [
          {
            label: this.yAxisTitle || yKey,
            data: values,
            backgroundColor: this.barColor,
            borderColor: this.borderColor,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: this.showLegend,
            position: 'top',
          },
          title: {
            display: !!this.title,
            text: this.title,
            font: {
              size: 16,
              weight: 'bold',
            },
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                return formatter(context.parsed.y);
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: !!this.yAxisTitle,
              text: this.yAxisTitle,
              font: {
                weight: 'bold',
              },
            },
            ticks: {
              callback: function (
                this: any,
                tickValue: number | string,
                index: number,
                ticks: any[],
              ): string | number {
                // Store reference to component props to avoid 'this' context issues
                const yFmt = this.yFmt;

                // Ensure tickValue is a number before formatting
                if (typeof tickValue === 'number') {
                  if (yFmt === 'usd') {
                    return '$' + tickValue.toLocaleString();
                  }
                  return tickValue.toLocaleString();
                }
                return tickValue;
              }.bind(this), // Bind component's 'this' context
            },
          },
          x: {
            title: {
              display: !!this.xAxisTitle,
              text: this.xAxisTitle,
              font: {
                weight: 'bold',
              },
            },
          },
        },
      },
    });
  }

  downloadImage(): void {
    if (!this.chartCanvas) {
      return;
    }

    const canvas = this.chartCanvas.nativeElement;
    const image = canvas.toDataURL('image/png');

    // Create download link
    const link = document.createElement('a');
    link.href = image;
    link.download = `${this.title || 'chart'}.png`;
    link.click();
  }
}
