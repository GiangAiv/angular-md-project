import { AfterViewInit, Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseComponent } from '../../base-component';

interface BubbleChartProps {
  data: any[];
  x?: string;
  y?: string;
  r?: string;
  series?: string;
  xType?: string;
  yType?: string;
  xLog?: boolean;
  yLog?: boolean;
  xLogBase?: number;
  yLogBase?: number;
  xFmt?: string;
  yFmt?: string;
  rFmt?: string;
  title?: string;
  subtitle?: string;
  legend?: boolean;
  xAxisTitle?: string;
  yAxisTitle?: string;
  xGridlines?: boolean;
  yGridlines?: boolean;
  xAxisLabels?: boolean;
  yAxisLabels?: boolean;
  xBaseline?: boolean;
  yBaseline?: boolean;
  xTickMarks?: boolean;
  yTickMarks?: boolean;
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  rMin?: number;
  rMax?: number;
  swapXY?: boolean;
  chartAreaHeight?: number;
  downloadableImage?: boolean;
  seriesColors?: string[];
  bubbleOpacity?: number;
  bubbleBorderWidth?: number;
  bubbleBorderColor?: string;
  bubbleHoverRadius?: number;
  bubbleHoverBorderWidth?: number;
  bubbleHoverBackgroundColor?: string;
  bubbleHoverBorderColor?: string;
}

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent extends BaseComponent<BubbleChartProps> implements OnChanges, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chart?: Chart;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      if (changes['props'] && (changes['props'].currentValue.data || changes['props'].currentValue.x || changes['props'].currentValue.y)) {
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
            text: this.props.title || ''
          },
          legend: {
            position: 'top',
            display: this.props.legend ?? true
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const data = context.raw as any;
                const labels = [];
                if (this.props.x) labels.push(`X: ${this.formatValue(data.x, this.props.xFmt)}`);
                if (this.props.y) labels.push(`Y: ${this.formatValue(data.y, this.props.yFmt)}`);
                if (this.props.r) labels.push(`Size: ${this.formatValue(data.r, this.props.rFmt)}`);
                return labels;
              }
            }
          }
        },
        scales: {
          x: {
            type: this.props.xLog ? 'logarithmic' : 'linear',
            min: this.props.xMin,
            max: this.props.xMax,
            title: {
              display: !!this.props.xAxisTitle,
              text: this.props.xAxisTitle
            },
            grid: {
              display: this.props.xGridlines ?? true
            },
            ticks: {
              display: this.props.xAxisLabels ?? true
            }
          },
          y: {
            type: this.props.yLog ? 'logarithmic' : 'linear',
            min: this.props.yMin,
            max: this.props.yMax,
            title: {
              display: !!this.props.yAxisTitle,
              text: this.props.yAxisTitle
            },
            grid: {
              display: this.props.yGridlines ?? true
            },
            ticks: {
              display: this.props.yAxisLabels ?? true
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
    if (!this.props.data || !this.props.x || !this.props.y) return [];

    const seriesField = this.props.series;
    const datasets: any[] = [];

    if (seriesField) {
      const seriesGroups = this.props.data.reduce<Record<string, any[]>>((groups, item) => {
        const series = item[seriesField];
        if (!groups[series]) {
          groups[series] = [];
        }
        groups[series].push(item);
        return groups;
      }, {});

      Object.entries(seriesGroups).forEach(([series, items], index) => {
        const bubbleData = items.map(item => ({
          x: item[this.props.x!],
          y: item[this.props.y!],
          r: this.props.r ? this.calculateRadius(item[this.props.r]) : 5
        }));

        datasets.push({
          label: series,
          data: bubbleData,
          backgroundColor: this.props.seriesColors?.[index] || this.getRandomColor(this.props.bubbleOpacity || 0.5),
          borderColor: this.props.bubbleBorderColor || this.getRandomColor(1),
          borderWidth: this.props.bubbleBorderWidth || 1,
          hoverRadius: this.props.bubbleHoverRadius || 8,
          hoverBorderWidth: this.props.bubbleHoverBorderWidth || 2,
          hoverBackgroundColor: this.props.bubbleHoverBackgroundColor,
          hoverBorderColor: this.props.bubbleHoverBorderColor
        });
      });
    } else {
      const bubbleData = this.props.data.map(item => ({
        x: item[this.props.x!],
        y: item[this.props.y!],
        r: this.props.r ? this.calculateRadius(item[this.props.r]) : 5
      }));

      datasets.push({
        label: 'Bubbles',
        data: bubbleData,
        backgroundColor: this.getRandomColor(this.props.bubbleOpacity || 0.5),
        borderColor: this.props.bubbleBorderColor || this.getRandomColor(1),
        borderWidth: this.props.bubbleBorderWidth || 1,
        hoverRadius: this.props.bubbleHoverRadius || 8,
        hoverBorderWidth: this.props.bubbleHoverBorderWidth || 2,
        hoverBackgroundColor: this.props.bubbleHoverBackgroundColor,
        hoverBorderColor: this.props.bubbleHoverBorderColor
      });
    }

    return datasets;
  }

  private calculateRadius(value: number): number {
    if (!this.props.rMin || !this.props.rMax) return value;
    const min = this.props.rMin;
    const max = this.props.rMax;
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
    if (this.chart && this.props.downloadableImage) {
      const link = document.createElement('a');
      link.download = 'bubble-chart.png';
      link.href = this.chart.toBase64Image();
      link.click();
    }
  }
} 