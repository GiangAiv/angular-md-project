import { AfterViewInit, Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseComponent } from '../../base-component';

interface LineChartProps {
  data: any[];
  x?: string;
  y?: string | string[];
  series?: string;
  xType?: string;
  yType?: string;
  xLog?: boolean;
  yLog?: boolean;
  xLogBase?: number;
  yLogBase?: number;
  xFmt?: string;
  yFmt?: string;
  title?: string;
  subtitle?: string;
  legend?: boolean;
  xAxisTitle?: string;
  yAxisTitle?: string;
  y2AxisTitle?: string;
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
  y2Min?: number;
  y2Max?: number;
  swapXY?: boolean;
  chartAreaHeight?: number;
  downloadableImage?: boolean;
  seriesColors?: string[];
  lineWidth?: number;
  lineTension?: number;
  showPoints?: boolean;
  pointRadius?: number;
  pointHoverRadius?: number;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
  pointBorderWidth?: number;
  pointHoverBackgroundColor?: string;
  pointHoverBorderColor?: string;
  pointHoverBorderWidth?: number;
  fill?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  stepped?: boolean;
  stepPosition?: 'before' | 'after' | 'middle';
  handleMissing?: 'zero' | 'connect' | 'gap';
  chartType?: 'basic' | 'multi-series' | 'multi-series-steps' | 'multi-y' | 'secondary-y' | 'secondary-y-bar' | 'value-labels';
  showValueLabels?: boolean;
  valueLabelPosition?: 'top' | 'bottom' | 'left' | 'right';
  barWidth?: number;
  barSpacing?: number;
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent extends BaseComponent<LineChartProps> implements OnChanges, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chart?: Chart;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    if (this.props?.data?.length > 0) {
      this.createChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['props']) {
      if (this.chart) {
        this.updateChart();
      } else if (this.props?.data?.length > 0) {
        this.createChart();
      }
    }
  }

  private createChart(): void {
    if (!this.chartCanvas?.nativeElement) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: this.getChartType(),
      data: {
        labels: this.getLabels(),
        datasets: this.getDatasets()
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: !!this.props.title,
            text: this.props.title || ''
          },
          legend: {
            position: 'top',
            display: this.props.legend ?? true
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw as number;
                return `${context.dataset.label}: ${this.formatValue(value, this.props.yFmt)}`;
              }
            }
          }
        },
        scales: this.getScales()
      }
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, config);
  }

  private getChartType(): ChartType {
    if (this.props.chartType === 'secondary-y-bar') {
      return 'bar';
    }
    return 'line';
  }

  private getScales(): any {
    const scales: any = {
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
      }
    };

    // Handle multiple y-axes
    if (this.props.chartType === 'multi-y' || this.props.chartType === 'secondary-y' || this.props.chartType === 'secondary-y-bar') {
      scales.y = {
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
        },
        position: 'left'
      };

      scales.y2 = {
        type: this.props.yLog ? 'logarithmic' : 'linear',
        min: this.props.y2Min,
        max: this.props.y2Max,
        title: {
          display: !!this.props.y2AxisTitle,
          text: this.props.y2AxisTitle
        },
        grid: {
          display: false
        },
        ticks: {
          display: this.props.yAxisLabels ?? true
        },
        position: 'right'
      };
    } else {
      scales.y = {
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
      };
    }

    return scales;
  }

  private updateChart(): void {
    if (!this.chart) return;

    this.chart.data.labels = this.getLabels();
    this.chart.data.datasets = this.getDatasets();
    this.chart.update();
  }

  private getLabels(): string[] {
    if (!this.props?.data || !this.props.x) return [];
    return [...new Set(this.props.data.map(item => item[this.props.x!]))].sort();
  }

  private getDatasets(): any[] {
    if (!this.props?.data || !this.props.x) return [];

    const datasets: any[] = [];

    switch (this.props.chartType) {
      case 'multi-series':
      case 'multi-series-steps':
        return this.getMultiSeriesDatasets();
      case 'multi-y':
        return this.getMultiYDatasets();
      case 'secondary-y':
      case 'secondary-y-bar':
        return this.getSecondaryYDatasets();
      case 'value-labels':
        return this.getValueLabelDatasets();
      default:
        return this.getBasicDatasets();
    }
  }

  private getBasicDatasets(): any[] {
    if (!this.props.y) return [];
    const yField = typeof this.props.y === 'string' ? this.props.y : this.props.y[0];
    const lineData = this.getLineData(this.props.data, yField);
    return [{
      label: yField,
      data: lineData,
      borderColor: this.props.seriesColors?.[0] || this.getRandomColor(1),
      backgroundColor: this.props.fill ? (this.props.fillColor || this.getRandomColor(this.props.fillOpacity || 0.2)) : undefined,
      borderWidth: this.props.lineWidth || 2,
      tension: this.props.lineTension || 0.4,
      pointRadius: this.props.showPoints ? (this.props.pointRadius || 3) : 0,
      pointHoverRadius: this.props.pointHoverRadius || 5,
      fill: this.props.fill,
      stepped: false,
      spanGaps: this.props.handleMissing === 'connect'
    }];
  }

  private getMultiSeriesDatasets(): any[] {
    if (!this.props.series || !this.props.y) return [];
    const yField = typeof this.props.y === 'string' ? this.props.y : this.props.y[0];

    const seriesGroups = this.props.data.reduce<Record<string, any[]>>((groups, item) => {
      const series = item[this.props.series!];
      if (!groups[series]) {
        groups[series] = [];
      }
      groups[series].push(item);
      return groups;
    }, {});

    return Object.entries(seriesGroups).map(([series, items], index) => {
      const lineData = this.getLineData(items, yField);
      return {
        label: series,
        data: lineData,
        borderColor: this.props.seriesColors?.[index] || this.getRandomColor(1),
        backgroundColor: this.props.fill ? (this.props.fillColor || this.getRandomColor(this.props.fillOpacity || 0.2)) : undefined,
        borderWidth: this.props.lineWidth || 2,
        tension: this.props.lineTension || 0.4,
        pointRadius: this.props.showPoints ? (this.props.pointRadius || 3) : 0,
        pointHoverRadius: this.props.pointHoverRadius || 5,
        fill: this.props.fill,
        stepped: this.props.chartType === 'multi-series-steps',
        spanGaps: this.props.handleMissing === 'connect'
      };
    });
  }

  private getMultiYDatasets(): any[] {
    if (!Array.isArray(this.props.y)) return [];
    
    return this.props.y.map((yField, index) => {
      const lineData = this.getLineData(this.props.data, yField);
      return {
        label: yField,
        data: lineData,
        borderColor: this.props.seriesColors?.[index] || this.getRandomColor(1),
        backgroundColor: this.props.fill ? (this.props.fillColor || this.getRandomColor(this.props.fillOpacity || 0.2)) : undefined,
        borderWidth: this.props.lineWidth || 2,
        tension: this.props.lineTension || 0.4,
        pointRadius: this.props.showPoints ? (this.props.pointRadius || 3) : 0,
        pointHoverRadius: this.props.pointHoverRadius || 5,
        fill: this.props.fill,
        stepped: this.props.stepped,
        spanGaps: this.props.handleMissing === 'connect'
      };
    });
  }

  private getSecondaryYDatasets(): any[] {
    if (!Array.isArray(this.props.y) || this.props.y.length < 2) return [];
    
    const datasets: any[] = [];
    
    // Primary Y-axis dataset
    datasets.push({
      label: this.props.y[0],
      data: this.getLineData(this.props.data, this.props.y[0]),
      borderColor: this.props.seriesColors?.[0] || this.getRandomColor(1),
      backgroundColor: this.props.fill ? (this.props.fillColor || this.getRandomColor(this.props.fillOpacity || 0.2)) : undefined,
      borderWidth: this.props.lineWidth || 2,
      tension: this.props.lineTension || 0.4,
      pointRadius: this.props.showPoints ? (this.props.pointRadius || 3) : 0,
      pointHoverRadius: this.props.pointHoverRadius || 5,
      fill: this.props.fill,
      stepped: this.props.stepped,
      spanGaps: this.props.handleMissing === 'connect',
      yAxisID: 'y'
    });

    // Secondary Y-axis dataset
    const secondaryDataset: any = {
      label: this.props.y[1],
      data: this.getLineData(this.props.data, this.props.y[1]),
      borderColor: this.props.seriesColors?.[1] || this.getRandomColor(1),
      backgroundColor: this.props.fill ? (this.props.fillColor || this.getRandomColor(this.props.fillOpacity || 0.2)) : undefined,
      borderWidth: this.props.lineWidth || 2,
      tension: this.props.lineTension || 0.4,
      pointRadius: this.props.showPoints ? (this.props.pointRadius || 3) : 0,
      pointHoverRadius: this.props.pointHoverRadius || 5,
      fill: this.props.fill,
      stepped: this.props.stepped,
      spanGaps: this.props.handleMissing === 'connect',
      yAxisID: 'y2'
    };

    if (this.props.chartType === 'secondary-y-bar') {
      secondaryDataset.type = 'bar';
      secondaryDataset.barThickness = this.props.barWidth || 20;
    }

    datasets.push(secondaryDataset);
    return datasets;
  }

  private getValueLabelDatasets(): any[] {
    if (!this.props.y) return [];
    const yField = typeof this.props.y === 'string' ? this.props.y : this.props.y[0];
    const lineData = this.getLineData(this.props.data, yField);
    
    return [{
      label: yField,
      data: lineData,
      borderColor: this.props.seriesColors?.[0] || this.getRandomColor(1),
      backgroundColor: this.props.fill ? (this.props.fillColor || this.getRandomColor(this.props.fillOpacity || 0.2)) : undefined,
      borderWidth: this.props.lineWidth || 2,
      tension: this.props.lineTension || 0.4,
      pointRadius: this.props.showPoints ? (this.props.pointRadius || 3) : 0,
      pointHoverRadius: this.props.pointHoverRadius || 5,
      fill: this.props.fill,
      stepped: this.props.stepped,
      spanGaps: this.props.handleMissing === 'connect',
      datalabels: {
        display: this.props.showValueLabels,
        align: this.props.valueLabelPosition || 'top',
        formatter: (value: number) => this.formatValue(value, this.props.yFmt)
      }
    }];
  }

  private getLineData(items: any[], yField: string): number[] {
    const labels = this.getLabels();
    return labels.map(label => {
      const item = items.find(i => i[this.props.x!] === label);
      if (!item) {
        if (this.props.handleMissing === 'zero') return 0;
        if (this.props.handleMissing === 'gap') return NaN;
        return 0;
      }
      return item[yField];
    });
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
      link.download = 'line-chart.png';
      link.href = this.chart.toBase64Image();
      link.click();
    }
  }
} 