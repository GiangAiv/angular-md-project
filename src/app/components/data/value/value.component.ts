// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { BaseComponent } from '../../base-component';

// type AggregateType = 'sum' | 'avg' | 'min' | 'median' | 'max';

// interface ValueProps {
//   data: any[]; // Required array of objects
//   column?: string; // Column name to pull value from
//   row?: number; // Row number to display data
//   placeholder?: string; // Display if get value error
//   agg?: AggregateType; // Aggregate function
// }

// @Component({
//   selector: 'app-value',
//   templateUrl: './value.component.html',
//   standalone: true,
//   imports: [CommonModule]
// })
// export class ValueComponent extends BaseComponent<ValueProps> {
//   getValue(): any {
//     try {
//       if (!this.props?.data || !Array.isArray(this.props.data) || this.props.data.length === 0) {
//         return this.props?.placeholder ?? 'N/A';
//       }

//       if (this.props.agg && this.props.column) {
//         const value = this.calculateAggregate();
//         if (this.props.column === 'price' && typeof value === 'number') {
//           return { value, isPrice: true };
//         }
//         return value;
//       }

//       if (this.props.column) {
//         const rowIndex = this.props.row ?? 0;
//         const value = this.props.data[rowIndex]?.[this.props.column] ?? this.props?.placeholder ?? 'N/A';
//         if (this.props.column === 'price' && typeof value === 'number') {
//           return { value, isPrice: true };
//         }
//         return value;
//       }

//       return this.props?.placeholder ?? 'N/A';
//     } catch (error) {
//       console.error('Error getting value:', error);
//       return this.props?.placeholder ?? 'N/A';
//     }
//   }

//   private calculateAggregate(): number | string {
//     try {
//       const values = this.props.data
//         .map(item => item[this.props.column!])
//         .filter(val => typeof val === 'number' && !isNaN(val));

//       if (values.length === 0) return this.props?.placeholder ?? 'N/A';

//       switch (this.props.agg) {
//         case 'sum':
//           return values.reduce((a, b) => a + b, 0);
//         case 'avg':
//           return values.reduce((a, b) => a + b, 0) / values.length;
//         case 'min':
//           return Math.min(...values);
//         case 'max':
//           return Math.max(...values);
//         case 'median': {
//           const sorted = [...values].sort((a, b) => a - b);
//           const mid = Math.floor(sorted.length / 2);
//           return sorted.length % 2 === 0
//             ? (sorted[mid - 1] + sorted[mid]) / 2
//             : sorted[mid];
//         }
//         default:
//           return this.props?.placeholder ?? 'N/A';
//       }
//     } catch (error) {
//       console.error('Error calculating aggregate:', error);
//       return this.props?.placeholder ?? 'N/A';
//     }
//   }
// } 

import { Component, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../base-component';

type AggregateType = 'sum' | 'avg' | 'min' | 'median' | 'max';

interface ValueProps {
  data: any[];
  column?: string;
  row?: number;
  placeholder?: string;
  agg?: AggregateType;
}

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class ValueComponent extends BaseComponent<ValueProps> implements OnInit, OnChanges {
  displayValue: any = '';
  isPrice: boolean = false;
  isPlaceholder: boolean = false;

  ngOnInit() {
    this.updateValue();
  }

  ngOnChanges(): void {
    this.updateValue();
  }

  private updateValue(): void {
    try {
      const val = this.extractValue();

      if (typeof val === 'object' && val?.isPrice) {
        this.displayValue = val.value;
        this.isPrice = true;
        this.isPlaceholder = false;
      } else {
        this.displayValue = val;
        this.isPrice = false;
        this.isPlaceholder = val === (this.props?.placeholder ?? 'N/A');
      }
    } catch (error) {
      console.error('Error updating value:', error);
      this.displayValue = this.props?.placeholder ?? 'N/A';
      this.isPrice = false;
      this.isPlaceholder = true;
    }
  }

  private extractValue(): any {
    if (!this.props?.data || !Array.isArray(this.props.data) || this.props.data.length === 0) {
      return this.props?.placeholder ?? 'N/A';
    }

    const column = this.props.column;
    const placeholder = this.props?.placeholder ?? 'N/A';

    if (this.props.agg && column) {
      const value = this.calculateAggregate();
      return column.toLowerCase().includes('price') && typeof value === 'number'
        ? { value, isPrice: true }
        : value;
    }

    if (column) {
      const rowIndex = this.props.row ?? 0;
      const value = this.props.data[rowIndex]?.[column] ?? placeholder;
      return column.toLowerCase().includes('price') && typeof value === 'number'
        ? { value, isPrice: true }
        : value;
    }

    return placeholder;
  }

  private calculateAggregate(): number | string {
    try {
      const values = this.props.data
        .map(item => item[this.props.column!])
        .filter(val => typeof val === 'number' && !isNaN(val));

      if (values.length === 0) return this.props?.placeholder ?? 'N/A';

      switch (this.props.agg) {
        case 'sum': return values.reduce((a, b) => a + b, 0);
        case 'avg': return values.reduce((a, b) => a + b, 0) / values.length;
        case 'min': return Math.min(...values);
        case 'max': return Math.max(...values);
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
