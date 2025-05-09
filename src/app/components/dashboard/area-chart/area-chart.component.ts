import { AfterViewInit, Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseComponent } from '../../base-component';

export type AreaChartType = 'area' | 'stacked' | 'stacked100' | 'stepped';
export type StepPosition = 'start' | 'middle' | 'end';
export type HandleMissing = 'gap' | 'zero' | 'connect';

interface AreaChartProps {
  data: any[];
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill?: boolean;
    borderColor?: string;
    backgroundColor?: string;
  }[];
  options: any;
  chartType: AreaChartType;
  downloadableImage: boolean;
  x: string;
  y: string;
  series: string;
  fillColor?: string;
  lineColor?: string;
  fillOpacity?: number;
  line: boolean;
  markers: boolean;
  markerShape: string;
  markerSize: number;
  handleMissing: HandleMissing;
  step: boolean;
  stepPosition: StepPosition;
  showLabels: boolean;
  labelSize: number;
  labelPosition: 'top' | 'bottom' | 'middle';
  labelColor?: string;
  labelFmt?: string;
  showAllLabels: boolean;
  seriesOrder?: string[];
  seriesLabelFmt?: string;
  title: string;
}

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent extends BaseComponent<AreaChartProps> implements  OnChanges, AfterViewInit {
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
      if (changes['props'] && (changes['props'].currentValue.data || changes['props'].currentValue.x || changes['props'].currentValue.y || changes['props'].currentValue.series)) {
        this.setChartData(
          this.props.data,
          this.props.x,
          this.props.y,
          this.props.series || undefined
        );
      } else {
        this.updateChart();
      }
    }
  }

  private createChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    // If data is provided, transform it into datasets
    if (this.props.data.length > 0 && this.props.x && this.props.y) {
      this.setChartData(
        this.props.data,
        this.props.x,
        this.props.y,
        this.props.series || undefined
      );
    }

    const config: ChartConfiguration = {
      type: 'line' as ChartType,
      data: {
        labels: this.props.labels,
        datasets: this.props.datasets.map(dataset => ({
          ...dataset,
          fill: true,
          tension: this.props.step ? 0 : 0.4,
          borderWidth: this.props.line ? 1 : 0,
          stepped: this.props.step ? this.props.stepPosition : false,
          pointRadius: this.props.markers ? this.props.markerSize : 0,
          pointStyle: this.props.markerShape,
          backgroundColor: this.props.fillColor || dataset.backgroundColor,
          borderColor: this.props.lineColor || dataset.borderColor
        }))
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
            stacked: this.props.chartType === 'stacked' || this.props.chartType === 'stacked100',
            beginAtZero: true,
            ...(this.props.chartType === 'stacked100' && {
              ticks: {
                callback: (value: number) => `${value}%`
              }
            })
          },
          x: {
            display: true
          }
        },
        ...this.props.options
      }
    };

    this.chart = new Chart(ctx, config);
  }

  private updateChart(): void {
    if (this.chart) {
      this.chart.data.labels = this.props.labels;
      this.chart.data.datasets = this.props.datasets.map(dataset => ({
        ...dataset,
        fill: true,
        tension: this.props.step ? 0 : 0.4,
        borderWidth: this.props.line ? 1 : 0,
        stepped: this.props.step ? this.props.stepPosition : false,
        pointRadius: this.props.markers ? this.props.markerSize : 0,
        pointStyle: this.props.markerShape,
        backgroundColor: this.props.fillColor || dataset.backgroundColor,
        borderColor: this.props.lineColor || dataset.borderColor
      }));
      this.chart.update();
    }
  }

  public downloadImage(): void {
    if (this.chart && this.props.downloadableImage) {
      const link = document.createElement('a');
      link.download = 'chart.png';
      link.href = this.chart.toBase64Image();
      link.click();
    }
  }

  public setChartData(data: any[], xField: string, yField: string, seriesField?: string): void {
    // Handle missing data
    if (this.props.handleMissing === 'zero') {
      data = data.map(item => ({
        ...item,
        [yField]: item[yField] ?? 0
      }));
    }

    this.props.labels = [...new Set(data.map(item => item[xField]))];

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
      const orderedSeries = this.props.seriesOrder 
        ? this.props.seriesOrder.filter(s => seriesGroups[s])
        : Object.keys(seriesGroups);

      this.props.datasets = orderedSeries.map(series => {
        const items = seriesGroups[series];
        let seriesData = this.props.labels.map(label => {
          const item = items.find(i => i[xField] === label);
          return item ? item[yField] : 0;
        });

        // Convert to percentages for stacked100
        if (this.props.chartType === 'stacked100') {
          const total = seriesData.reduce((sum, val) => sum + val, 0);
          seriesData = seriesData.map(val => (val / total) * 100);
        }

        return {
          label: this.formatSeriesLabel(series),
          data: seriesData,
          backgroundColor: this.props.fillColor || this.getRandomColor(0.2),
          borderColor: this.props.lineColor || this.getRandomColor(1),
        };
      });
    } else {
      let seriesData = this.props.labels.map(label => {
        const item = data.find(i => i[xField] === label);
        return item ? item[yField] : 0;
      });

      // Convert to percentages for stacked100
      if (this.props.chartType === 'stacked100') {
        const total = seriesData.reduce((sum, val) => sum + val, 0);
        seriesData = seriesData.map(val => (val / total) * 100);
      }

      this.props.datasets = [{
        label: yField,
        data: seriesData,
        backgroundColor: this.props.fillColor || this.getRandomColor(0.2),
        borderColor: this.props.lineColor || this.getRandomColor(1),
      }];
    }

    if (this.chart) {
      this.updateChart();
    }
  }

  private formatSeriesLabel(label: string): string {
    if (this.props.seriesLabelFmt) {
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