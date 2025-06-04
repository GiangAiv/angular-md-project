import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { BaseComponent } from '../../base-component';

interface ColumnFormat {
  type: 'percent' | 'currency' | 'date' | 'image' | 'link' | 'html' | 'bar';
  options?: {
    // for image
    width?: string | number;
    height?: string | number;
    rounded?: boolean;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    alt?: string; // Alt text for accessibility

    // for link
    linkLabel?: string; // Text to display for the link (if not provided, uses the URL)
    target?: '_blank' | '_self' | '_parent' | '_top'; // Link target attribute

    // for html
    sanitize?: boolean; // Whether to sanitize HTML content (default: true for security)


    // for bar
    barColor?: string;

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
  colorScale?: 'positive' | 'negative' | 'info' | 'custom' | string; // Preset values or custom hex color
  customColor?: string; // hex color for 'custom' colorScale

  colorMid?: number; // value to consider as mid point for color scaling
  colorRange?: string[]; // hex colors for color scaling
  scaleColumn?: string; // other column to use for current column's color scaling
  redNegative?: boolean; // for positive/negative color scaling, whether to consider negative values as red or green
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

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  // Search functionality
  searchTerm: string = '';
  private originalRows: Record<string, any>[] = [];

  // Pagination functionality
  currentPage: number = 1;
  private filteredRows: Record<string, any>[] = [];

  getTableClasses(): string {
    const baseClasses = 'min-w-full table-auto';
    const borderClasses = this.props?.bordered ? '' : '!border-none';

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

  getCellClasses(value: any, column: Column): string {
    const baseClasses = 'px-2 py-1 text-xs font-light relative';
    const borderClasses = this.props?.bordered ? '' : '!border-none';
    const backgroundClasses = this.getCellBackgroundClasses(value, column);
    return `${baseClasses} ${borderClasses} ${backgroundClasses}`.trim();
  }

  getCellBackgroundClasses(_value: any, _column: Column): string {
    // Return empty string since we'll use inline styles instead
    return '';
  }

  getCellBackgroundStyle(value: any, column: Column): { [key: string]: string } {
    if (!column.format?.colorScale) return {};

    const numValue = this.parseNumericValue(value);
    if (isNaN(Number(numValue))) return {};

    const colorResult = this.calculateCellColor(numValue as number, column);
    if (!colorResult) return {};

    return {
      'background-color': colorResult
    };
  }

  redNegativeClasses(cellValue: any, column: Column): string {
    if(Number.isNaN(cellValue)) return ''
    return column.format?.redNegative&& cellValue < 0 ? 'text-red-600' : '';
  }

  private calculateCellColor(value: number, column: Column): string | null {
    const format = column.format!;

    // Handle colorRange (gradient colors)
    if (format.colorRange && format.colorRange.length > 0) {
      return this.calculateGradientColor(value, column);
    }

    // Calculate intensity for single color scaling
    const intensity = this.calculateColorIntensity(value, column);
    const colorScale = format.colorScale!;

    // Handle custom color via customColor property
    if (colorScale === 'custom' && format.customColor) {
      const rgbColor = this.hexToRgb(format.customColor);
      if (rgbColor) {
        return `rgba(${rgbColor}, ${intensity})`;
      }
    }

    // Base colors for preset scale types with redNegative support
    const baseColors = this.getBaseColors(format.redNegative);


    // Check if colorScale is a preset value
    let rgbColor: string | null = baseColors[colorScale];

    // If not a preset value, try to parse as hex color
    if (!rgbColor) {
      rgbColor = this.hexToRgb(colorScale);
    }

    if (!rgbColor) return null;

    return `rgba(${rgbColor}, ${intensity})`;
  }

  private getBaseColors(redNegative?: boolean): { [key: string]: string } {
    // Default behavior: positive = green, negative = red
    // If redNegative is false: positive = green, negative = green (inverted intensity)
    // If redNegative is true: positive = red, negative = red (default behavior)

    if (redNegative === false) {
      return {
        'positive': '34, 197, 94', // green-500 RGB values
        'negative': '34, 197, 94', // green-500 RGB values (same as positive)
        'info': '59, 130, 246'     // blue-500 RGB values
      };
    }

    return {
      'positive': '34, 197, 94', // green-500 RGB values
      'negative': '239, 68, 68', // red-500 RGB values
      'info': '59, 130, 246'     // blue-500 RGB values
    };
  }

  private calculateGradientColor(value: number, column: Column): string | null {
    const format = column.format!;
    const colorRange = format.colorRange!;

    if (colorRange.length < 2) return null;

    // Get the scaling values (from scaleColumn if specified, otherwise current column)
    const scalingValues = this.getScalingValues(column);
    if (scalingValues.length === 0) return null;

    const minValue = Math.min(...scalingValues);
    const maxValue = Math.max(...scalingValues);

    // Handle colorMid if specified
    let normalizedValue: number;
    if (format.colorMid !== undefined) {
      normalizedValue = this.calculateMidpointNormalization(value, minValue, maxValue, format.colorMid);
    } else {
      // Standard normalization (0-1)
      if (minValue === maxValue) {
        normalizedValue = 0.5;
      } else {
        normalizedValue = (value - minValue) / (maxValue - minValue);
      }
    }

    // Clamp to [0, 1]
    normalizedValue = Math.max(0, Math.min(1, normalizedValue));

    return this.interpolateColors(colorRange, normalizedValue);
  }

  private hexToRgb(hex: string): string | null {
    const [r, g, b] = this.hexToRgbV2(hex) || [0, 0, 0];
    return `${r}, ${g}, ${b}`;
  }

  private hexToRgbV2(hex: string): [number, number, number] | null {
    // Remove # if present
    hex = hex.replace('#', '');

    // Handle 3-digit hex codes
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }

    // Validate hex format
    if (hex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(hex)) {
      return null;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
  }

  private calculateColorIntensity(value: number, column: Column): number {
    if (!this.originalRows.length) return 0.3;

    // Get the scaling values (from scaleColumn if specified, otherwise current column)
    const scalingValues = this.getScalingValues(column);
    if (scalingValues.length === 0) return 0.3;

    const minValue = Math.min(...scalingValues);
    const maxValue = Math.max(...scalingValues);

    // If all values are the same, return medium intensity
    if (minValue === maxValue) return 0.3;

    const format = column.format;
    let normalizedValue: number;

    // Handle colorMid if specified
    if (format?.colorMid !== undefined) {
      normalizedValue = this.calculateMidpointNormalization(value, minValue, maxValue, format.colorMid);
    } else {
      // Standard normalization (0-1)
      normalizedValue = (value - minValue) / (maxValue - minValue);
    }

    // Clamp to [0, 1]
    normalizedValue = Math.max(0, Math.min(1, normalizedValue));

    // Map to opacity values (0.1 to 0.8 for light to dark)
    const minOpacity = 0.1;
    const maxOpacity = 0.8;
    return minOpacity + (normalizedValue * (maxOpacity - minOpacity));
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

    if (Number(value) > 0 || String(value).startsWith('+')) {
      return `${baseClasses} text-green-600`;
    }
    if (value < 0 || String(value).startsWith('-')) {
      return `${baseClasses} text-red-600`;
    }
    return `${baseClasses} text-gray-500`;
  }

  getArrowClasses(value: number | string): string {
    const baseClasses = 'w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent';
    if (Number(value) > 0 || String(value).startsWith('+')) {
      return `${baseClasses} border-t-green-600 rotate-180`;
    }
    if (Number(value) < 0 || String(value).startsWith('-')) {
      return `${baseClasses} border-t-red-600`;
    }
    return `${baseClasses} border-t-gray-500`;
  }


  getTotalCellContentClasses(value: number | string, column: Column): string {
    const alignClasses = {
      'left': '',
      'right': 'justify-end',
      'center': 'justify-center'
    };
    const alignClass = alignClasses[column.align || 'left'];
    const baseClasses = `${alignClass} flex items-center gap-1`;

    if (!column.format?.showArrow) return baseClasses;

    if (Number(value) > 0 || String(value).startsWith('+')) {
      return `${baseClasses} text-green-600`;
    }
    if (Number(value) < 0 || String(value).startsWith('-')) {
      return `${baseClasses} text-red-600`;
    }
    return `${baseClasses} text-gray-500`;
  }

  getTotalArrowClasses(value: number): string {
    const baseClasses = 'w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent';
    if (Number(value) > 0 || String(value).startsWith('+')) {
      return `${baseClasses} border-t-green-600 rotate-180`;
    }
    if (value < 0 || String(value).startsWith('-')) {
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
      case 'image':
        return decodeURIComponent(String(value)); // For images, we return the URL as-is
      case 'link':
        return decodeURIComponent(String(value)); // For links, we return the URL as-is
      case 'html':
        return String(value); // For HTML, we return the HTML content as-is
      case 'bar':
        return String(value); // For bars, we return the value as-is for display
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

    return formatter.format(numValue / 100);
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

  // Image formatting methods
  isImageColumn(column: Column): boolean {
    return column.format?.type === 'image';
  }

  getImageStyles(column: Column): { [key: string]: string } {
    if (!this.isImageColumn(column)) return {};

    const options = column.format?.options;
    const styles: { [key: string]: string } = {};

    if (options?.width) {
      styles['width'] = typeof options.width === 'number' ? `${options.width}px` : options.width;
    } else {
      styles['width'] = '50px'; // Default width
    }

    if (options?.height) {
      styles['height'] = typeof options.height === 'number' ? `${options.height}px` : options.height;
    } else {
      styles['height'] = 'auto'; // Default height
    }

    if (options?.objectFit) {
      styles['object-fit'] = options.objectFit;
    } else {
      styles['object-fit'] = 'cover'; // Default object-fit
    }

    if (options?.rounded) {
      styles['border-radius'] = '50%';
    }

    return styles;
  }

  getImageAltText(_value: any, column: Column): string {
    const options = column.format?.options;
    if (options?.alt) {
      return options.alt;
    }
    return `Image for ${column.label}`;
  }

  // Link formatting methods
  isLinkColumn(column: Column): boolean {
    return column.format?.type === 'link';
  }

  getLinkText(value: any, column: Column, row: any): string {
    const options = column.format?.options;
    if (options?.linkLabel) {
      return row[options.linkLabel] || options.linkLabel;
    }
    return String(value); // Use the URL as the link text if no label provided
  }

  getLinkTarget(column: Column): string {
    const options = column.format?.options;
    return options?.target || '_self'; // Default to _self if no target specified
  }

  getLinkUrl(value: any): string {
    return String(value);
  }

  // HTML formatting methods
  isHtmlColumn(column: Column): boolean {
    return column.format?.type === 'html';
  }

  getHtmlContent(value: any, column: Column): any {
    const options = column.format?.options;
    const htmlContent = String(value);

    // Check if sanitization is disabled (default is true for security)
    const shouldSanitize = options?.sanitize !== false;

    if (shouldSanitize) {
      // Sanitize the HTML content for security
      return this.sanitizer.sanitize(1, htmlContent) || '';
    } else {
      // Return trusted HTML (use with caution!)
      return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
    }
  }

  // Bar formatting methods
  isBarColumn(column: Column): boolean {
    return column.format?.type === 'bar';
  }

  getBarPercentage(value: any, column: Column): number {
    const numValue = this.parseNumericValue(value);
    if (isNaN(Number(numValue))) return 0;

    // Get all values in this column to find the maximum
    const columnValues = this.originalRows
      .map(row => this.parseNumericValue(row[column.key]))
      .filter(val => !isNaN(Number(val)))
      .map(val => Number(val));

    if (columnValues.length === 0) return 0;

    const maxValue = Math.max(...columnValues);
    if (maxValue === 0) return 0;

    // Calculate percentage relative to max value (max = 100%)
    const percentage = (Number(numValue) / maxValue) * 100;
    return Math.max(0, Math.min(100, percentage)); // Clamp between 0 and 100
  }

  getBarStyles(value: any, column: Column): { [key: string]: string } {
    if (!this.isBarColumn(column)) return {};

    const percentage = this.getBarPercentage(value, column);
    const barColor = column.format?.options?.barColor || '#3b82f6'; // Default to blue-500

    return {
      'background': `linear-gradient(to right, ${barColor} ${percentage}%, transparent ${percentage}%)`,
      'position': 'relative'
    };
  }

  // Initialize data
  ngOnInit(): void {
    if (this.props?.rows) {
      this.originalRows = [...this.props.rows];

      // Auto-sort by colorScale columns in descending order
      this.autoSortByColorScale();

      this.applyFiltersAndPagination();
    }
  }

  private autoSortByColorScale(): void {
    if (!this.props?.columns || !this.props?.rows) return;

    // Find the first column with colorScale or colorRange
    const colorColumn = this.props.columns.find(col =>
      col.format?.colorScale || col.format?.colorRange
    );

    if (colorColumn) {
      this.currentSortColumn = colorColumn.key;
      this.currentSortDirection = 'desc'; // Sort descending by default for color columns
      this.sortData();
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
    if (column.format?.type === 'currency' || column.format?.type === 'percent' || column.format?.type === 'bar') {
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

  // Helper methods for new color scaling options

  private getScalingValues(column: Column): number[] {
    if (!this.originalRows.length) return [];

    // Use scaleColumn if specified, otherwise use the current column
    const sourceColumnKey = column.format?.scaleColumn || column.key;

    return this.originalRows
      .map(row => this.parseNumericValue(row[sourceColumnKey]))
      .filter(val => !isNaN(Number(val)))
      .map(val => Number(val));
  }

  private calculateMidpointNormalization(value: number, minValue: number, maxValue: number, colorMid: number): number {
    // Normalize around the midpoint
    // Values below colorMid map to [0, 0.5], values above map to [0.5, 1]
    if (value <= colorMid) {
      // Map from [minValue, colorMid] to [0, 0.5]
      if (colorMid === minValue) return 0.5;
      return 0.5 * (value - minValue) / (colorMid - minValue);
    } else {
      // Map from [colorMid, maxValue] to [0.5, 1]
      if (maxValue === colorMid) return 0.5;
      return 0.5 + 0.5 * (value - colorMid) / (maxValue - colorMid);
    }
  }

  interpolateColors(colorRange: string[], normalizedValue: number): string {
    const n = colorRange.length;

    if (n === 0) return '#000000';

    if (n === 1) {
      const rgb = this.hexToRgbV2(colorRange[0]);
      return rgb ? `rgb(${rgb.join(', ')})` : colorRange[0];
    }


    // // Clamp normalizedValue between 0 and 1
    const clampedValue = Math.min(Math.max(normalizedValue, 0), 1);
    const segmentSize = 1 / (n - 1);
    const segmentIndex = Math.floor(clampedValue / segmentSize);


    if (segmentIndex >= n - 1) {
      const rgb = this.hexToRgbV2(colorRange[n-1]);
      return rgb ? `rgb(${rgb.join(', ')})` : colorRange[n-1];
    }



    const localT = (clampedValue - segmentIndex * segmentSize) / segmentSize;
    const fromColor = this.hexToRgbV2(colorRange[segmentIndex]);
    const toColor = this.hexToRgbV2(colorRange[segmentIndex + 1]);


    if (!fromColor || !toColor) return colorRange[0];

    const interpolatedRgb = fromColor.map((from, i) => {
      const to = toColor[i];
      return Math.round(from + (to - from) * localT);
    });


    return `rgb(${interpolatedRgb.join(', ')})`;
  }
}