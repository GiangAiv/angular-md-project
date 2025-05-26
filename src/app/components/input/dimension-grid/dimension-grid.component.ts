import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../../base-component';

interface GridColumn {
  field: string;
  header: string;
  width?: string;
}

interface GridItem {
  [key: string]: string | number;
}

interface DimensionGridProps {
  columns: GridColumn[];
  items: GridItem[];
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  selectedItems?: string[];
  highlightOnSelect?: boolean;
}

@Component({
  selector: 'app-dimension-grid',
  templateUrl: './dimension-grid.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class DimensionGridComponent extends BaseComponent<DimensionGridProps> {
  @Output() sortChange = new EventEmitter<{ field: string; direction: 'asc' | 'desc' }>();
  @Output() selectionChange = new EventEmitter<string[]>();

  getContainerClasses(): string {
    return [
      'w-full',
      'overflow-x-auto',
      'shadow-sm',
      'rounded-lg',
      'border',
      'border-gray-200'
    ].join(' ');
  }

  getTableClasses(): string {
    return [
      'min-w-full',
      'divide-y',
      'divide-gray-200',
      'bg-white'
    ].join(' ');
  }

  getHeaderClasses(): string {
    return [
      'bg-gray-50',
      'text-left',
      'text-xs',
      'font-medium',
      'text-gray-500',
      'uppercase',
      'tracking-wider'
    ].join(' ');
  }

  getHeaderCellClasses(column: GridColumn): string {
    return [
      'px-4',
      'py-3',
      'select-none',
      'cursor-pointer',
      'hover:bg-gray-100',
      column.width || ''
    ].filter(Boolean).join(' ');
  }

  getRowClasses(item: GridItem, index: number): string {
    const isSelected = this.isItemSelected(item);
    const baseClasses = [
      'hover:bg-gray-50',
      'transition-colors',
      'duration-150'
    ];

    if (isSelected && this.props?.highlightOnSelect) {
      baseClasses.push('bg-blue-50');
    }

    return baseClasses.join(' ');
  }

  getCellClasses(): string {
    return [
      'px-4',
      'py-3',
      'whitespace-nowrap',
      'text-sm',
      'text-gray-900'
    ].join(' ');
  }

  getValueClasses(): string {
    return [
      'font-medium'
    ].join(' ');
  }

  getSortIcon(field: string): string {
    if (this.props?.sortField !== field) return '↕️';
    return this.props?.sortDirection === 'asc' ? '↑' : '↓';
  }

  handleSort(field: string): void {
    const direction: 'asc' | 'desc' = 
      this.props?.sortField === field && this.props?.sortDirection === 'asc' 
        ? 'desc' 
        : 'asc';

    const updatedProps: DimensionGridProps = {
      ...this.props!,
      sortField: field,
      sortDirection: direction
    };

    this.props = updatedProps;
    this.propsChange.emit(updatedProps);
    this.sortChange.emit({ field, direction });
  }

  handleRowClick(item: GridItem): void {
    if (!this.props?.selectedItems) return;

    const itemId = String(item['id'] || item['key'] || '');
    if (!itemId) return;

    const newSelection = this.isItemSelected(item)
      ? this.props.selectedItems.filter(id => id !== itemId)
      : [...this.props.selectedItems, itemId];

    const updatedProps = {
      ...this.props,
      selectedItems: newSelection
    };

    this.props = updatedProps;
    this.propsChange.emit(updatedProps);
    this.selectionChange.emit(newSelection);
  }

  isItemSelected(item: GridItem): boolean {
    const itemId = String(item['id'] || item['key'] || '');
    return this.props?.selectedItems?.includes(itemId) || false;
  }

  formatValue(value: string | number): string {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  }
} 