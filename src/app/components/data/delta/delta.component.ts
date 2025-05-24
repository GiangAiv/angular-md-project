import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../base-component';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';

type Direction = 'up' | 'down' | 'auto';
type Format = 'percent' | 'number';

interface DeltaProps {
  value: number | string;
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
export class DeltaComponent extends BaseComponent<DeltaProps> {
  private readonly upArrowSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
      <path fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clip-rule="evenodd" />
    </svg>
  `;

  private readonly downArrowSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
      <path fill-rule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clip-rule="evenodd" />
    </svg>
  `;

  getNumericValue(): number {
    if (!this.props?.value) return 0;
    
    if (typeof this.props.value === 'string') {
      // Remove any non-numeric characters except decimal point and minus sign
      const cleanValue = this.props.value.replace(/[^-\d.]/g, '');
      const parsed = parseFloat(cleanValue);
      return isNaN(parsed) ? 0 : parsed;
    }
    return this.props.value;
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
    const value = this.getNumericValue();
    if (value === 0) return '';
    return value > 0 ? '+' : '';  // Minus sign is handled by the numeric value itself
  }
} 