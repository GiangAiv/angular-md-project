import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

export type AreaChartType = 'area' | 'stacked' | 'stacked100' | 'stepped';
export type StepPosition = 'start' | 'middle' | 'end';
export type HandleMissing = 'gap' | 'zero' | 'connect';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class AreaChartComponent implements OnChanges, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chart?: Chart;

  @Input() data: any[] = [];
  @Input() labels: string[] = [];
  @Input() datasets: {
    label: string;
    data: number[];
    fill?: boolean;
    borderColor?: string;
    backgroundColor?: string;
  }[] = [];
  @Input() options: any = {};
  @Input() chartType: AreaChartType = 'area';
  @Input() downloadableImage: boolean = false;
  @Input() x: string = '';
  @Input() y: string = '';
  @Input() series: string = '';
  @Input() fillColor?: string;
  @Input() lineColor?: string;
  @Input() fillOpacity?: number;
  @Input() line: boolean = true;
  @Input() markers: boolean = false;
  @Input() markerShape: string = 'circle';
  @Input() markerSize: number = 3;
  @Input() handleMissing: HandleMissing = 'gap';
  @Input() step: boolean = false;
  @Input() stepPosition: StepPosition = 'middle';
  @Input() showLabels: boolean = true;
  @Input() labelSize: number = 12;
  @Input() labelPosition: 'top' | 'bottom' | 'middle' = 'top';
  @Input() labelColor?: string;
  @Input() labelFmt?: string;
  @Input() showAllLabels: boolean = false;
  @Input() seriesOrder?: string[];
  @Input() seriesLabelFmt?: string;
  @Input() title: string = '';

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createChart();
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      if (changes['data'] || changes['x'] || changes['y'] || changes['series']) {
        this.setChartData(
          this.data,
          this.x,
          this.y,
          this.series || undefined
        );
      } else {
        this.updateChart();
      }
    }
  }

  private createChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    // If data is provided, transform it into datasets
    if (this.data.length > 0 && this.x && this.y) {
      this.setChartData(
        this.data,
        this.x,
        this.y,
        this.series || undefined
      );
    }

    const config: ChartConfiguration = {
      type: 'line' as ChartType,
      data: {
        labels: this.labels,
        datasets: this.datasets.map(dataset => ({
          ...dataset,
          fill: true,
          tension: this.step ? 0 : 0.4,
          borderWidth: this.line ? 1 : 0,
          stepped: this.step ? this.stepPosition : false,
          pointRadius: this.markers ? this.markerSize : 0,
          pointStyle: this.markerShape,
          backgroundColor: this.fillColor || dataset.backgroundColor,
          borderColor: this.lineColor || dataset.borderColor
        }))
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
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            order: 'seriesDesc'
          }
        },
        interaction: {
          intersect: false,
        },
        scales: {
          y: {
            stacked: this.chartType === 'stacked' || this.chartType === 'stacked100',
            beginAtZero: true,
            ...(this.chartType === 'stacked100' && {
              ticks: {
                callback: (value: number) => `${value}%`
              }
            })
          },
          x: {
            display: true
          }
        },
        ...this.options
      }
    };

    this.chart = new Chart(ctx, config);
  }

  private updateChart(): void {
    if (this.chart) {
      this.chart.data.labels = this.labels;
      this.chart.data.datasets = this.datasets.map(dataset => ({
        ...dataset,
        fill: true,
        tension: this.step ? 0 : 0.4,
        borderWidth: this.line ? 1 : 0,
        stepped: this.step ? this.stepPosition : false,
        pointRadius: this.markers ? this.markerSize : 0,
        pointStyle: this.markerShape,
        backgroundColor: this.fillColor || dataset.backgroundColor,
        borderColor: this.lineColor || dataset.borderColor
      }));
      this.chart.update();
    }
  }

  public downloadImage(): void {
    if (this.chart && this.downloadableImage) {
      const link = document.createElement('a');
      link.download = 'chart.png';
      link.href = this.chart.toBase64Image();
      link.click();
    }
  }

  public setChartData(data: any[], xField: string, yField: string, seriesField?: string): void {
    // Handle missing data
    if (this.handleMissing === 'zero') {
      data = data.map(item => ({
        ...item,
        [yField]: item[yField] ?? 0
      }));
    }

    this.labels = [...new Set(data.map(item => item[xField]))];

    if (seriesField) {
      const seriesGroups = data.reduce<Record<string, any[]>>((groups, item) => {
        const series = item[seriesField];
        if (!groups[series]) {
          groups[series] = [];
        }
        groups[series].push(item);
        return groups;
      }, {});

      // Apply series order if provided
      const orderedSeries = this.seriesOrder 
        ? this.seriesOrder.filter(s => seriesGroups[s])
        : Object.keys(seriesGroups);

      this.datasets = orderedSeries.map(series => {
        const items = seriesGroups[series];
        let seriesData = this.labels.map(label => {
          const item = items.find(i => i[xField] === label);
          return item ? item[yField] : 0;
        });

        // Convert to percentages for stacked100
        if (this.chartType === 'stacked100') {
          const total = seriesData.reduce((sum, val) => sum + val, 0);
          seriesData = seriesData.map(val => (val / total) * 100);
        }

        return {
          label: this.formatSeriesLabel(series),
          data: seriesData,
          backgroundColor: this.fillColor || this.getRandomColor(0.2),
          borderColor: this.lineColor || this.getRandomColor(1),
        };
      });
    } else {
      let seriesData = this.labels.map(label => {
        const item = data.find(i => i[xField] === label);
        return item ? item[yField] : 0;
      });

      // Convert to percentages for stacked100
      if (this.chartType === 'stacked100') {
        const total = seriesData.reduce((sum, val) => sum + val, 0);
        seriesData = seriesData.map(val => (val / total) * 100);
      }

      this.datasets = [{
        label: yField,
        data: seriesData,
        backgroundColor: this.fillColor || this.getRandomColor(0.2),
        borderColor: this.lineColor || this.getRandomColor(1),
      }];
    }

    if (this.chart) {
      this.updateChart();
    }
  }

  private formatSeriesLabel(label: string): string {
    if (this.seriesLabelFmt) {
      // Implement series label formatting based on seriesLabelFmt
      return label; // TODO: Implement formatting
    }
    return label;
  }

  private getRandomColor(alpha: number): string {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
} 