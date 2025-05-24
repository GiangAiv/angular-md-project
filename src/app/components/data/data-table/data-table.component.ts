import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../base-component';

interface Column {
  label: string;
  key: string;
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, any>[];
  striped?: boolean;
  hover?: boolean;
  bordered?: boolean;
  sortable?: boolean;
}

type SortDirection = 'asc' | 'desc' | null;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class DataTableComponent extends BaseComponent<DataTableProps> {
  private currentSortColumn: string | null = null;
  private currentSortDirection: SortDirection = null;

  getTableClasses(): string {
    const baseClasses = 'min-w-full table-auto';
    const borderClasses = this.props?.bordered !== false ? 'border border-gray-300' : '';
    
    return `${baseClasses} ${borderClasses}`.trim();
  }

  getHeaderClasses(): string {
    const baseClasses = 'bg-gray-100 text-left font-semibold text-gray-700';
    const borderClasses = this.props?.bordered !== false ? 'border-b border-gray-300' : '';
    const cursorClasses = this.props?.sortable ? 'cursor-pointer' : '';
    
    return `${baseClasses} ${borderClasses} ${cursorClasses}`.trim();
  }

  getHeaderCellClasses(): string {
    const baseClasses = 'px-4 py-2';
    const borderClasses = this.props?.bordered !== false ? 'border-r last:border-r-0 border-gray-300' : '';
    
    return `${baseClasses} ${borderClasses}`.trim();
  }

  getRowClasses(index: number): string {
    const baseClasses = 'transition-colors duration-150';
    const stripedClasses = this.props?.striped !== false 
      ? index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
      : 'bg-white';
    const hoverClasses = this.props?.hover !== false ? 'hover:bg-gray-100' : '';
    const borderClasses = this.props?.bordered !== false ? 'border-b border-gray-300' : '';
    
    return `${baseClasses} ${stripedClasses} ${hoverClasses} ${borderClasses}`.trim();
  }

  getCellClasses(): string {
    const baseClasses = 'px-4 py-2';
    const borderClasses = this.props?.bordered !== false ? 'border-r last:border-r-0 border-gray-300' : '';
    
    return `${baseClasses} ${borderClasses}`.trim();
  }

  getSortDirection(columnKey: string): SortDirection {
    return this.currentSortColumn === columnKey ? this.currentSortDirection : null;
  }

  getSortAriaLabel(columnKey: string): string {
    const direction = this.getSortDirection(columnKey);
    if (!direction) return 'Not sorted';
    return `Sorted ${direction === 'asc' ? 'ascending' : 'descending'}`;
  }

  handleSort(columnKey: string): void {
    if (!this.props?.sortable) return;

    if (this.currentSortColumn === columnKey) {
      // Toggle direction
      this.currentSortDirection = this.currentSortDirection === 'asc' 
        ? 'desc' 
        : this.currentSortDirection === 'desc' 
          ? null 
          : 'asc';
      
      if (this.currentSortDirection === null) {
        this.currentSortColumn = null;
      }
    } else {
      this.currentSortColumn = columnKey;
      this.currentSortDirection = 'asc';
    }

    this.sortData();
  }

  private sortData(): void {
    if (!this.currentSortColumn || !this.currentSortDirection || !this.props?.rows) return;

    const sortedRows = [...this.props.rows].sort((a, b) => {
      const aVal = a[this.currentSortColumn!];
      const bVal = b[this.currentSortColumn!];

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      const comparison = aVal < bVal ? -1 : 1;
      return this.currentSortDirection === 'asc' ? comparison : -comparison;
    });

    this.props.rows = sortedRows;
  }

  getSortIcon(columnKey: string): string {
    const direction = this.getSortDirection(columnKey);
    if (!direction) return '↕';
    return direction === 'asc' ? '↑' : '↓';
  }
} 