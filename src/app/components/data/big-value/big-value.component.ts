import { CommonModule } from '@angular/common';
import { Component, OnInit, OnChanges } from '@angular/core';
import { BaseComponent } from '../../base-component';

type AlignmentType = 'left' | 'center' | 'right';

interface BigValueProps {
  value: string | number; // Can be a direct value or variable reference
  label?: string;
  delta?: string; // Can be a direct value or variable reference
  alignment?: AlignmentType;
  comparisonTitle?: string;
  comparisonDelta?: string;
  link?: string;
}

@Component({
  selector: 'app-big-value',
  templateUrl: './big-value.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class BigValueComponent extends BaseComponent<BigValueProps> implements OnInit, OnChanges {

  override ngOnInit() {
    super.ngOnInit(); // Call parent ngOnInit to set up variable subscriptions
  }

  ngOnChanges(): void {
    // Component will automatically re-render when props change
  }

  protected override onVariablesChanged(_variables: Record<string, any>): void {
    // Component will automatically re-render when variables change
  }
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
    // Resolve the value (could be a variable reference)
    const resolvedValue = this.resolveValue(value);

    if (resolvedValue === undefined || resolvedValue === null) return '';
    if (typeof resolvedValue === 'number') {
      // Format numbers with commas for thousands
      return resolvedValue.toLocaleString();
    }
    return String(resolvedValue);
  }

  isDeltaPositive(): boolean {
    const resolvedDelta = this.resolveValue(this.props?.delta);
    if (!resolvedDelta) return false;
    return String(resolvedDelta).trim().startsWith('+');
  }

  isDeltaNegative(): boolean {
    const resolvedDelta = this.resolveValue(this.props?.delta);
    if (!resolvedDelta) return false;
    return String(resolvedDelta).trim().startsWith('-');
  }

  getDeltaClasses(): string {
    const baseClasses = 'text-xs font-medium flex items-center gap-1';
    if (this.isDeltaPositive()) {
      return `${baseClasses} text-green-600`;
    }
    if (this.isDeltaNegative()) {
      return `${baseClasses} text-red-600`;
    }
    return `${baseClasses} text-gray-500`;
  }

  getArrowClasses(): string {
    const baseClasses = 'w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent';
    if (this.isDeltaPositive()) {
      return `${baseClasses} border-t-green-600 rotate-180`;
    }
    if (this.isDeltaNegative()) {
      return `${baseClasses} border-t-red-600`;
    }
    return `${baseClasses} border-t-gray-500`;
  }
}