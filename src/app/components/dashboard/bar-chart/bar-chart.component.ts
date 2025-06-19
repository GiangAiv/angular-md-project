import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnChanges,
} from '@angular/core';

import { Chart, registerables } from 'chart.js';
import { BaseComponent } from '../../base-component';

// Register all Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | null = null;

  override ngOnInit() {
    super.ngOnInit(); // Set up variable subscriptions
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnChanges(): void {
    // Re-render chart when props change
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    if (this.chartCanvas) {
      this.renderChart();
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy(); // Clean up variable subscriptions
    if (this.chart) {
      this.chart.destroy();
    }
  }

  protected override onVariablesChanged(_variables: Record<string, any>): void {
    // Re-render chart when variables change
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    if (this.chartCanvas) {
      this.renderChart();
    }
  }

  private renderChart(): void {
    if (!this.props || !this.chartCanvas) {
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }

    // Resolve data (could be a variable reference)
    const resolvedData = this.resolveValue(this.props.data);
    if (!resolvedData || !Array.isArray(resolvedData)) {
      return;
    }
    const xKey = this.props.x || 'region';
    const yKey = this.props.y || 'revenue';

    // Format labels and data
    const labels = resolvedData.map((item: any) => item[xKey]);
    const values = resolvedData.map((item: any) => {
      // Handle formatting for currency if needed
      if (typeof item[yKey] === 'string' && item[yKey].startsWith('$')) {
        return parseFloat(item[yKey].replace(/[$,]/g, ''));
      }
      return item[yKey];
    });

    // Chart configuration
    const chartHeight = this.props.chartAreaHeight || 300;
    const chartType = this.props.type || 'bar';
    const showLabels = this.props.labels !== false;

    // Create formatter based on yFmt
    const formatter = (value: number) => {
      if (this.props.yFmt === 'usd') {
        return '$' + value.toLocaleString();
      }
      return value.toLocaleString();
    };

    // Create chart
    this.chart = new Chart(ctx, {
      type: chartType === 'grouped' ? 'bar' : 'bar', // Default to 'bar' even for 'grouped'
      data: {
        labels: labels,
        datasets: [
          {
            label: this.props.yAxisTitle || yKey,
            data: values,
            backgroundColor: this.props.barColor || '#0070f3',
            borderColor: this.props.borderColor || '#0070f3',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: this.props.showLegend !== false,
            position: 'top',
          },
          title: {
            display: !!this.props.title,
            text: this.props.title || '',
            font: {
              size: 16,
              weight: 'bold',
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return formatter(context.parsed.y);
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: !!this.props.yAxisTitle,
              text: this.props.yAxisTitle || '',
              font: {
                weight: 'bold',
              },
            },
            ticks: {
              // Fix with proper type annotations
              callback: function (
                this: any,
                tickValue: number | string,
                index: number,
                ticks: any[],
              ): string | number {
                // Store reference to component props to avoid 'this' context issues
                const yFmt = this.props?.yFmt;

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
              display: !!this.props.xAxisTitle,
              text: this.props.xAxisTitle || '',
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
    link.download = `${this.props?.title || 'chart'}.png`;
    link.click();
  }
}
