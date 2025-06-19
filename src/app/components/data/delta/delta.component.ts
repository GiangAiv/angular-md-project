import { Component, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../base-component';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';

type Direction = 'up' | 'down' | 'auto';
type Format = 'percent' | 'number';

interface DeltaProps {
  value: number | string; // Can be a direct value or variable reference
  direction?: Direction;
  showArrow?: boolean;
  format?: Format;
  bold?: boolean;
}

@Component({
  selector: 'app-delta',
  templateUrl: './delta.component.html',
  standalone: true,
  imports: [SafeHtmlPipe, CommonModule]
})
export class DeltaComponent extends BaseComponent<DeltaProps> implements OnInit, OnChanges {
  private readonly upArrowSvg = `
    ▲
  `;

  private readonly downArrowSvg = `
    ▼
  `;

  override ngOnInit() {
    super.ngOnInit(); // Call parent ngOnInit to set up variable subscriptions
  }

  ngOnChanges(): void {
    // Component will automatically re-render when props change
  }

  protected override onVariablesChanged(_variables: Record<string, any>): void {
    // Component will automatically re-render when variables change
  }

  getNumericValue(): number {
    // Resolve the value (could be a variable reference)
    const resolvedValue = this.resolveValue(this.props?.value);

    if (!resolvedValue) return 0;

    if (typeof resolvedValue === 'string') {
      // Remove any non-numeric characters except decimal point and minus sign
      const cleanValue = resolvedValue.replace(/[^-\d.]/g, '');
      const parsed = parseFloat(cleanValue);
      return isNaN(parsed) ? 0 : parsed;
    }
    return typeof resolvedValue === 'number' ? resolvedValue : 0;
  }

  getDirection(): 'up' | 'down' | null {
    if (!this.props?.direction || this.props.direction === 'auto') {
      const value = this.getNumericValue();
      if (value === 0) return null;
      return value > 0 ? 'up' : 'down';
    }
    return this.props.direction;
  }

  getFormattedValue(): string {
    const value = this.getNumericValue();
    const absValue = Math.abs(value);
    
    if (this.props?.format === 'number') {
      return absValue.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
    }
    
    // Default to percent format
    return `${absValue.toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    })}%`;
  }

  getArrowIcon(): string {
    const direction = this.getDirection();
    if (!direction || this.props?.showArrow === false) return '';
    return direction === 'up' ? this.upArrowSvg : this.downArrowSvg;
  }

  getContainerClasses(): string {
    const baseClasses = 'inline-flex items-center gap-1 text-sm transition-colors duration-150';
    const fontClasses = this.props?.bold ? 'font-semibold' : 'font-normal';
    const colorClasses = this.getColorClasses();
    
    return `${baseClasses} ${fontClasses} ${colorClasses}`.trim();
  }

  private getColorClasses(): string {
    const direction = this.getDirection();
    switch (direction) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }

  getAriaLabel(): string {
    const direction = this.getDirection();
    const value = this.getFormattedValue();
    const format = this.props?.format === 'number' ? '' : ' percent';
    
    if (!direction) return `No change (${value}${format})`;
    return `${direction === 'up' ? 'Up' : 'Down'} ${value}${format}`;
  }

  getPrefix(): string {
    const direction = this.getDirection();
    if (direction === 'down') return '-';
    if (direction === 'up') return '+';
    const value = this.getNumericValue();
    if (value === 0) return '';
    return value > 0 ? '+' : '-';
  }
} 