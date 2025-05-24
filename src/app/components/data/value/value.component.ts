import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../base-component';

type AggregateType = 'sum' | 'avg' | 'min' | 'median' | 'max';

interface ValueProps {
  data: any[]; // Required array of objects
  column?: string; // Column name to pull value from
  row?: number; // Row number to display data
  placeholder?: string; // Display if get value error
  agg?: AggregateType; // Aggregate function
}

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class ValueComponent extends BaseComponent<ValueProps> {
  getValue(): any {
    try {
      if (!this.props?.data || !Array.isArray(this.props.data) || this.props.data.length === 0) {
        return this.props?.placeholder ?? 'N/A';
      }

      if (this.props.agg && this.props.column) {
        return this.calculateAggregate();
      }

      if (this.props.column) {
        const rowIndex = this.props.row ?? 0;
        return this.props.data[rowIndex]?.[this.props.column] ?? this.props?.placeholder ?? 'N/A';
      }

      return this.props?.placeholder ?? 'N/A';
    } catch (error) {
      console.error('Error getting value:', error);
      return this.props?.placeholder ?? 'N/A';
    }
  }

  private calculateAggregate(): number | string {
    try {
      const values = this.props.data
        .map(item => item[this.props.column!])
        .filter(val => typeof val === 'number' && !isNaN(val));

      if (values.length === 0) return this.props?.placeholder ?? 'N/A';

      switch (this.props.agg) {
        case 'sum':
          return values.reduce((a, b) => a + b, 0);
        case 'avg':
          return values.reduce((a, b) => a + b, 0) / values.length;
        case 'min':
          return Math.min(...values);
        case 'max':
          return Math.max(...values);
        case 'median': {
          const sorted = [...values].sort((a, b) => a - b);
          const mid = Math.floor(sorted.length / 2);
          return sorted.length % 2 === 0
            ? (sorted[mid - 1] + sorted[mid]) / 2
            : sorted[mid];
        }
        default:
          return this.props?.placeholder ?? 'N/A';
      }
    } catch (error) {
      console.error('Error calculating aggregate:', error);
      return this.props?.placeholder ?? 'N/A';
    }
  }
} 