import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';
import { BaseComponent } from '../../base-component';

interface ColumnFormat {
  type: 'percent' | 'currency' | 'date';
  options?: {
    // For currency
    locale?: string;
    currency?: string;
    // For date
    format?: string; // moment format string
    // For percent
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    // delta
  };
  showArrow?: boolean;

}

interface Column {
  label: string;
  key: string;
  format?: ColumnFormat;
  align?: 'left' | 'right' | 'center';
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, any>[];
  striped?: boolean;
  hover?: boolean;
  bordered?: boolean;
  sortable?: boolean;
  searchable?: boolean;
  paginated?: boolean;
  pageSize?: number;
  searchPlaceholder?: string;
  totalRow?: boolean;
}

type SortDirection = 'asc' | 'desc' | null;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DataTableComponent extends BaseComponent<DataTableProps> implements OnInit {
  private currentSortColumn: string | null = null;
  private currentSortDirection: SortDirection = null;

  // Search functionality
  searchTerm: string = '';
  private originalRows: Record<string, any>[] = [];

  // Pagination functionality
  currentPage: number = 1;
  private filteredRows: Record<string, any>[] = [];

  getTableClasses(): string {
    const baseClasses = 'min-w-full table-auto';
    const borderClasses = this.props?.bordered  ? '' : '!border-none';

    return `${baseClasses} ${borderClasses}`.trim();
  }

  getHeaderClasses(): string {
    const baseClasses = 'bg-gray-100 text-left font-semibold text-gray-700';
    const borderClasses = this.props?.bordered !== false ? 'border-b border-gray-300' : '';
    const cursorClasses = this.props?.sortable ? 'cursor-pointer' : '';

    return `${baseClasses} ${borderClasses} ${cursorClasses}`.trim();
  }

  getHeaderCellClasses(): string {
    const baseClasses = 'px-2 py-1';
    const borderClasses = this.props?.bordered ? '' : '!border-none';

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
    const baseClasses = 'px-2 py-1 text-xs font-light';
    const borderClasses = this.props?.bordered ? '' : '!border-none';
    return `${baseClasses} ${borderClasses} `.trim();
  }
  getCellContentClasses(value: number, column: Column): string {
    const alignClasses = {
      'left': '',
      'right': 'justify-end',
      'center': 'justify-center'
    };
    const alignClass = alignClasses[column.align || 'left'];
    const baseClasses = `${alignClass} flex items-center gap-1`;

    if (!column.format?.showArrow) return baseClasses;

    if (Number(value)>0 || String(value).startsWith('+')) {
      return `${baseClasses} text-green-600`;
    }
    if (value<0 || String(value).startsWith('-')) {
      return `${baseClasses} text-red-600`;
    }
    return `${baseClasses} text-gray-500`;
  }

  getArrowClasses(value: number| string): string {
    const baseClasses = 'w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent';
    if (Number(value)>0 || String(value).startsWith('+')) {
      return `${baseClasses} border-t-green-600 rotate-180`;
    }
    if (Number(value)<0 || String(value).startsWith('-')) {
      return `${baseClasses} border-t-red-600`;
    }
    return `${baseClasses} border-t-gray-500`;
  }


  getTotalCellContentClasses(value: number| string, column: Column): string {
    const alignClasses = {
      'left': '',
      'right': 'justify-end',
      'center': 'justify-center'
    };
    const alignClass = alignClasses[column.align || 'left'];
    const baseClasses = `${alignClass} flex items-center gap-1`;

    if (!column.format?.showArrow) return baseClasses;

    if (Number(value)>0 || String(value).startsWith('+')) {
      return `${baseClasses} text-green-600`;
    }
    if (Number(value)<0 || String(value).startsWith('-')) {
      return `${baseClasses} text-red-600`;
    }
    return `${baseClasses} text-gray-500`;
  }

  getTotalArrowClasses(value: number): string {
    const baseClasses = 'w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent';
    if (Number(value)>0 || String(value).startsWith('+')) {
      return `${baseClasses} border-t-green-600 rotate-180`;
    }
    if (value<0 || String(value).startsWith('-')) {
      return `${baseClasses} border-t-red-600`;
    }
    return `${baseClasses} border-t-gray-500`;
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

  formatCellValue(value: any, column: Column): string {
    if (value === null || value === undefined) {
      return '';
    }

    if (!column.format) {
      return String(value);
    }

    switch (column.format.type) {
      case 'percent':
        return this.formatPercent(value, column.format.options);
      case 'currency':
        return this.formatCurrency(value, column.format.options);
      case 'date':
        return this.formatDate(value, column.format.options);
      default:
        return String(value);
    }
  }

  private formatPercent(value: any, options?: ColumnFormat['options']): string {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return String(value);
    }

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: options?.minimumFractionDigits ?? 2,
      maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    });

    return formatter.format(numValue/100);
  }

  private formatCurrency(value: any, options?: ColumnFormat['options']): string {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return String(value);
    }

    const locale = options?.locale ?? 'en-US';
    const currency = options?.currency ?? 'USD';

    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    });

    return formatter.format(numValue);
  }

  private formatDate(value: any, options?: ColumnFormat['options']): string {
    if (!value) {
      return '';
    }

    const momentDate = moment(value);
    if (!momentDate.isValid()) {
      return String(value);
    }

    const format = options?.format ?? 'MMM D, YYYY';
    return momentDate.format(format);
  }

  // Initialize data
  ngOnInit(): void {
    if (this.props?.rows) {
      this.originalRows = [...this.props.rows];
      this.applyFiltersAndPagination();
    }
  }

  // Search functionality
  onSearchChange(): void {
    this.currentPage = 1; // Reset to first page when searching
    this.applyFiltersAndPagination();
  }

  private applyFiltersAndPagination(): void {
    if (!this.props?.rows) return;

    // Apply search filter
    this.filteredRows = this.searchTerm.trim() === ''
      ? [...this.originalRows]
      : this.originalRows.filter(row =>
          this.props!.columns.some(column => {
            const value = row[column.key];
            if (value === null || value === undefined) return false;
            return String(value).toLowerCase().includes(this.searchTerm.toLowerCase());
          })
        );

    // Update props.rows for display (will be further filtered by pagination)
    this.updateDisplayedRows();
  }

  private updateDisplayedRows(): void {
    if (!this.props?.paginated) {
      this.props!.rows = [...this.filteredRows];
      return;
    }

    const pageSize = this.props?.pageSize ?? 10;
    const startIndex = (this.currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    this.props!.rows = this.filteredRows.slice(startIndex, endIndex);
  }

  // Pagination functionality
  get totalPages(): number {
    if (!this.props?.paginated) return 1;
    const pageSize = this.props?.pageSize ?? 10;
    return Math.ceil(this.filteredRows.length / pageSize);
  }

  get totalItems(): number {
    return this.filteredRows.length;
  }

  get pageSize(): number {
    return this.props?.pageSize ?? 10;
  }

  get startItem(): number {
    if (this.filteredRows.length === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    const end = this.currentPage * this.pageSize;
    return Math.min(end, this.filteredRows.length);
  }

  get canGoPrevious(): boolean {
    return this.currentPage > 1;
  }

  get canGoNext(): boolean {
    return this.currentPage < this.totalPages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedRows();
    }
  }

  goToPrevious(): void {
    if (this.canGoPrevious) {
      this.goToPage(this.currentPage - 1);
    }
  }

  goToNext(): void {
    if (this.canGoNext) {
      this.goToPage(this.currentPage + 1);
    }
  }
  goToFirst(): void {
    this.goToPage(1);
  }

  goToLast(): void {
    this.goToPage(this.totalPages);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    const totalPages = this.totalPages;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let start = Math.max(1, this.currentPage - half);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  // Total row functionality
  get shouldShowTotalRow(): boolean {
    return this.props?.totalRow === true && this.originalRows.length > 0;
  }

  getTotalRowClasses(): string {
    const baseClasses = 'bg-gray-50 font-semibold text-gray-800 border-t-2 border-gray-300';
    const borderClasses = this.props?.bordered !== false ? 'border-b border-gray-300' : '';

    return `${baseClasses} ${borderClasses}`.trim();
  }

  calculateColumnTotal(column: Column): number | string {
    if (!this.originalRows.length) return '';

    // Only calculate totals for numeric columns (currency, percent, or plain numbers)
    const isNumericColumn = this.isNumericColumn(column);
    if (!isNumericColumn) {
      // For non-numeric columns, show "Total" in the first column, empty for others
      return this.props?.columns[0]?.key === column.key ? 'Total' : '';
    }

    const total = this.originalRows.reduce((sum, row) => {
      const value = row[column.key];
      const numValue = this.parseNumericValue(value) as number;
      return sum + (isNaN(Number(numValue)) ? 0 : numValue);
    }, 0);
    return total
  }

  private isNumericColumn(column: Column): boolean {
    if (column.format?.type === 'currency' || column.format?.type === 'percent') {
      return true;
    }

    // Check if the column contains numeric values
    const sampleValues = this.originalRows.slice(0, 5).map(row => row[column.key]);
    return sampleValues.every(value => {
      const numValue = this.parseNumericValue(value);
      return !isNaN(Number(numValue));
    });
  }

  private parseNumericValue(value: any): number | string {
    if (value === null || value === undefined) return 0;

    // If it's already a number
    if (typeof value === 'number') return value;

    // If it's a string, try to parse it
    if (typeof value === 'string') {
      // Remove common formatting characters
      const cleanValue = value.replace(/[$,\s%]/g, '');
      const parsed = parseFloat(cleanValue);
      return isNaN(parsed) ? 'NaN' : parsed;
    }

    return 0;
  }
}