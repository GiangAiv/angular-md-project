import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../base-component';

type AlignmentType = 'left' | 'center' | 'right';

interface BigValueProps {
  value: string | number;
  label?: string;
  delta?: string;
  alignment?: AlignmentType;
}

@Component({
  selector: 'app-big-value',
  templateUrl: './big-value.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class BigValueComponent extends BaseComponent<BigValueProps> {
  getContainerClasses(): string {
    const baseClasses = 'p-4 flex flex-col gap-1 w-full';
    const alignmentClasses = {
      'left': 'items-start text-left',
      'center': 'items-center text-center',
      'right': 'items-end text-right'
    };
    
    return `${baseClasses} ${alignmentClasses[this.props?.alignment || 'center']}`;
  }

  formatValue(value: string | number | undefined): string {
    console.log('formatValue', this.props);
    if (value === undefined) return '';
    if (typeof value === 'number') {
      // Format numbers with commas for thousands
      return value.toLocaleString();
    }
    return value;
  }

  isDeltaPositive(): boolean {
    if (!this.props?.delta) return false;
    return this.props.delta.trim().startsWith('+');
  }

  isDeltaNegative(): boolean {
    if (!this.props?.delta) return false;
    return this.props.delta.trim().startsWith('-');
  }

  getDeltaClasses(): string {
    const baseClasses = 'text-xs font-medium';
    if (this.isDeltaPositive()) {
      return `${baseClasses} text-green-600`;
    }
    if (this.isDeltaNegative()) {
      return `${baseClasses} text-red-600`;
    }
    return `${baseClasses} text-gray-500`;
  }
} 