import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent extends BaseComponent implements OnInit {
  override ngOnInit(): void {
    console.log('Chart initialized with props:', this.props);
  }

  // Helper method to normalize bar heights
  getBarHeight(value: number): number {
    if (!this.props?.data || this.props.data.length === 0) return 0;

    const max = Math.max(...this.props.data);
    return (value / max) * 100;
  }
}
