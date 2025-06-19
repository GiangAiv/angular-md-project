import { Component, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../base-component';

type AggregateType = 'sum' | 'avg' | 'min' | 'median' | 'max';

interface ValueProps {
  data?: any[] | string; // Can be array data or variable reference
  column?: string;
  row?: number;
  placeholder?: string;
  agg?: AggregateType;
  value?: any; // Direct value or variable reference
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

  override ngOnInit() {
    super.ngOnInit(); // Call parent ngOnInit to set up variable subscriptions
    this.updateValue();
  }

  ngOnChanges(): void {
    this.updateValue();
  }

  protected override onVariablesChanged(_variables: Record<string, any>): void {
    // React to variable changes by updating the display value
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
    const placeholder = this.props?.placeholder ?? 'N/A';

    // If there's a direct value prop, use it (can be a variable reference)
    if (this.props?.value !== undefined) {
      const resolvedValue = this.resolveValue(this.props.value);
      return this.formatValue(resolvedValue, placeholder);
    }

    // Resolve data (can be a variable reference)
    const resolvedData = this.resolveValue(this.props?.data);

    if (!resolvedData || !Array.isArray(resolvedData) || resolvedData.length === 0) {
      return placeholder;
    }

    const column = this.props.column;

    if (this.props.agg && column) {
      const value = this.calculateAggregate(resolvedData);
      return this.formatValue(value, placeholder, column);
    }

    if (column) {
      const rowIndex = this.props.row ?? 0;
      const value = resolvedData[rowIndex]?.[column] ?? placeholder;
      return this.formatValue(value, placeholder, column);
    }

    return placeholder;
  }

  private formatValue(value: any, placeholder: string, column?: string): any {
    if (value === null || value === undefined) {
      return placeholder;
    }

    // Check if this should be formatted as a price
    const isPrice = column?.toLowerCase().includes('price');

    return isPrice && typeof value === 'number'
      ? { value, isPrice: true }
      : value;
  }

  private calculateAggregate(data: any[]): number | string {
    try {
      const values = data
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
