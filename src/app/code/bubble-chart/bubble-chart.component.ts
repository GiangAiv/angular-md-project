import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BubbleChartComponent implements OnChanges, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chart?: Chart;

  @Input() data: any[] = [];
  @Input() x?: string;
  @Input() y?: string;
  @Input() r?: string;
  @Input() series?: string;
  @Input() xType?: string;
  @Input() yType?: string;
  @Input() xLog?: boolean;
  @Input() yLog?: boolean;
  @Input() xLogBase?: number;
  @Input() yLogBase?: number;
  @Input() xFmt?: string;
  @Input() yFmt?: string;
  @Input() rFmt?: string;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() legend: boolean = true;
  @Input() xAxisTitle?: string;
  @Input() yAxisTitle?: string;
  @Input() xGridlines: boolean = true;
  @Input() yGridlines: boolean = true;
  @Input() xAxisLabels: boolean = true;
  @Input() yAxisLabels: boolean = true;
  @Input() xBaseline?: boolean;
  @Input() yBaseline?: boolean;
  @Input() xTickMarks?: boolean;
  @Input() yTickMarks?: boolean;
  @Input() xMin?: number;
  @Input() xMax?: number;
  @Input() yMin?: number;
  @Input() yMax?: number;
  @Input() rMin?: number;
  @Input() rMax?: number;
  @Input() swapXY?: boolean;
  @Input() chartAreaHeight?: number;
  @Input() downloadableImage?: boolean;
  @Input() seriesColors?: string[];
  @Input() bubbleOpacity: number = 0.5;
  @Input() bubbleBorderWidth: number = 1;
  @Input() bubbleBorderColor?: string;
  @Input() bubbleHoverRadius: number = 8;
  @Input() bubbleHoverBorderWidth: number = 2;
  @Input() bubbleHoverBackgroundColor?: string;
  @Input() bubbleHoverBorderColor?: string;

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      if (changes['data'] || changes['x'] || changes['y']) {
        this.updateChart();
      }
    }
  }

  private createChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const config: ChartConfiguration = {
      type: 'bubble' as ChartType,
      data: {
        datasets: this.getDatasets()
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: this.title || ''
          },
          legend: {
            position: 'top',
            display: this.legend
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const data = context.raw as any;
                const labels = [];
                if (this.x) labels.push(`X: ${this.formatValue(data.x, this.xFmt)}`);
                if (this.y) labels.push(`Y: ${this.formatValue(data.y, this.yFmt)}`);
                if (this.r) labels.push(`Size: ${this.formatValue(data.r, this.rFmt)}`);
                return labels;
              }
            }
          }
        },
        scales: {
          x: {
            type: this.xLog ? 'logarithmic' : 'linear',
            min: this.xMin,
            max: this.xMax,
            title: {
              display: !!this.xAxisTitle,
              text: this.xAxisTitle
            },
            grid: {
              display: this.xGridlines
            },
            ticks: {
              display: this.xAxisLabels
            }
          },
          y: {
            type: this.yLog ? 'logarithmic' : 'linear',
            min: this.yMin,
            max: this.yMax,
            title: {
              display: !!this.yAxisTitle,
              text: this.yAxisTitle
            },
            grid: {
              display: this.yGridlines
            },
            ticks: {
              display: this.yAxisLabels
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }

  private updateChart(): void {
    if (this.chart) {
      this.chart.data.datasets = this.getDatasets();
      this.chart.update();
    }
  }

  private getDatasets(): any[] {
    if (!this.data || !this.x || !this.y) return [];

    const seriesField = this.series;
    const datasets: any[] = [];

    if (seriesField) {
      const seriesGroups = this.data.reduce<Record<string, any[]>>((groups, item) => {
        const series = item[seriesField];
        if (!groups[series]) {
          groups[series] = [];
        }
        groups[series].push(item);
        return groups;
      }, {});

      Object.entries(seriesGroups).forEach(([series, items], index) => {
        const bubbleData = items.map(item => ({
          x: item[this.x!],
          y: item[this.y!],
          r: this.r ? this.calculateRadius(item[this.r]) : 5
        }));

        datasets.push({
          label: series,
          data: bubbleData,
          backgroundColor: this.seriesColors?.[index] || this.getRandomColor(this.bubbleOpacity),
          borderColor: this.bubbleBorderColor || this.getRandomColor(1),
          borderWidth: this.bubbleBorderWidth,
          hoverRadius: this.bubbleHoverRadius,
          hoverBorderWidth: this.bubbleHoverBorderWidth,
          hoverBackgroundColor: this.bubbleHoverBackgroundColor,
          hoverBorderColor: this.bubbleHoverBorderColor
        });
      });
    } else {
      const bubbleData = this.data.map(item => ({
        x: item[this.x!],
        y: item[this.y!],
        r: this.r ? this.calculateRadius(item[this.r]) : 5
      }));

      datasets.push({
        label: 'Bubbles',
        data: bubbleData,
        backgroundColor: this.getRandomColor(this.bubbleOpacity),
        borderColor: this.bubbleBorderColor || this.getRandomColor(1),
        borderWidth: this.bubbleBorderWidth,
        hoverRadius: this.bubbleHoverRadius,
        hoverBorderWidth: this.bubbleHoverBorderWidth,
        hoverBackgroundColor: this.bubbleHoverBackgroundColor,
        hoverBorderColor: this.bubbleHoverBorderColor
      });
    }

    return datasets;
  }

  private calculateRadius(value: number): number {
    if (!this.rMin || !this.rMax) return value;
    const min = this.rMin;
    const max = this.rMax;
    return ((value - min) / (max - min)) * 20 + 5; // Scale radius between 5 and 25
  }

  private formatValue(value: number, format?: string): string {
    if (format) {
      // Implement formatting based on format string
      return value.toString();
    }
    return value.toString();
  }

  private getRandomColor(alpha: number): string {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  public downloadImage(): void {
    if (this.chart && this.downloadableImage) {
      const link = document.createElement('a');
      link.download = 'bubble-chart.png';
      link.href = this.chart.toBase64Image();
      link.click();
    }
  }
} 