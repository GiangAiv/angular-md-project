import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../../base-component';

interface DimensionItem {
  label: string;
  value: string | number;
}

interface DimensionGridProps {
  items: DimensionItem[];
  selected?: string[];
  multiSelect?: boolean;
  columns?: number;
  highlightOnSelect?: boolean;
  disabledItems?: string[];
}

@Component({
  selector: 'app-dimension-grid',
  templateUrl: './dimension-grid.component.html',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class DimensionGridComponent extends BaseComponent<DimensionGridProps> {
  @Output() selectionChange = new EventEmitter<string[]>();

  getContainerClasses(): string {
    const columns = this.props?.columns || 3;
    const baseClasses = [
      'grid',
      'gap-3',
      'w-full'
    ];

    // Default responsive behavior if no columns specified
    if (!this.props?.columns) {
      return [...baseClasses, 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3'].join(' ');
    }

    // Custom columns with responsive fallback
    return [...baseClasses, 
      `grid-cols-1`,
      `sm:grid-cols-${Math.min(2, columns)}`,
      `md:grid-cols-${columns}`
    ].join(' ');
  }

  getItemClasses(value: string | number): string {
    const baseClasses = [
      'cursor-pointer',
      'rounded-lg',
      'border',
      'px-4',
      'py-3',
      'text-center',
      'text-sm',
      'font-medium',
      'transition-colors',
      'duration-150'
    ];

    const isSelected = this.isSelected(value);
    const isDisabled = this.isDisabled(value);
    const shouldHighlight = this.props?.highlightOnSelect !== false;

    if (isDisabled) {
      return [...baseClasses, 
        'opacity-50',
        'cursor-not-allowed',
        'bg-gray-50',
        'text-gray-500',
        'border-gray-200'
      ].join(' ');
    }

    if (isSelected && shouldHighlight) {
      return [...baseClasses,
        'bg-blue-600',
        'text-white',
        'border-blue-700',
        'hover:bg-blue-700'
      ].join(' ');
    }

    return [...baseClasses,
      'bg-white',
      'text-gray-700',
      'border-gray-300',
      'hover:bg-gray-50'
    ].join(' ');
  }

  isSelected(value: string | number): boolean {
    return this.props?.selected?.includes(String(value)) || false;
  }

  isDisabled(value: string | number): boolean {
    return this.props?.disabledItems?.includes(String(value)) || false;
  }

  handleItemClick(value: string | number): void {
    if (!this.props?.items || this.isDisabled(value)) return;

    const stringValue = String(value);
    const currentSelected = this.props.selected || [];
    let newSelected: string[];

    if (this.props.multiSelect) {
      // Toggle selection in multi-select mode
      newSelected = this.isSelected(value)
        ? currentSelected.filter((v: string) => v !== stringValue)
        : [...currentSelected, stringValue];
    } else {
      // Single select mode
      newSelected = this.isSelected(value) ? [] : [stringValue];
    }

    const updatedProps: DimensionGridProps = {
      ...this.props,
      items: [...this.props.items],
      selected: newSelected
    };

    this.props = updatedProps;
    this.propsChange.emit(updatedProps);
    this.selectionChange.emit(newSelected);
  }

  getAriaLabel(item: DimensionItem): string {
    const state = this.isSelected(item.value) ? 'selected' : 'unselected';
    return `${item.label} (${state})`;
  }
} 