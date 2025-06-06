import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseComponent } from '../../../base-component';

interface DimensionGridProps {
  rows: Array<Record<string, any>>;
  metrics: string;
  dimensions: string[];
}

interface DimensionData {
  value: string;
  total: number;
  percentage: number;
  isFiltered?: boolean;
}

interface ColumnData {
  dimension: string;
  data: DimensionData[];
  maxValue: number;
}

interface ColumnFilter {
  dimension: string;
  selectedValues: string[];
}

@Component({
  selector: 'app-dimension-grid',
  templateUrl: './dimension-grid.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class DimensionGridComponent extends BaseComponent<DimensionGridProps> {

  // Filter state management - each column has its own filter
  private columnFilters: Map<string, ColumnFilter> = new Map();

  get columnsData(): ColumnData[] {
    if (!this.props?.rows || !this.props?.dimensions || !this.props?.metrics) {
      return [];
    }

    return this.props.dimensions.map(dimension => {
      // Get filtered rows based on other column filters (not this column's filter)
      const filteredRows = this.getFilteredRowsForColumn(dimension);

      // Group data by dimension value and calculate totals
      const groupedData = filteredRows.reduce((acc: Record<string, number>, row: Record<string, any>) => {
        const dimensionValue = String(row[dimension] || 'Unknown');
        const metricValue = Number(row[this.props!.metrics]) || 0;

        if (!acc[dimensionValue]) {
          acc[dimensionValue] = 0;
        }
        acc[dimensionValue] += metricValue;

        return acc;
      }, {} as Record<string, number>);

      // Convert to array and sort by total descending
      const sortedData = Object.entries(groupedData)
        .map(([value, total]) => ({ value, total: Number(total) }))
        .sort((a, b) => b.total - a.total);

      // Calculate max value for this dimension
      const maxValue = Math.max(...sortedData.map(item => item.total));

      // Add percentage calculation and filter status
      const currentFilter = this.columnFilters.get(dimension);
      const dataWithPercentage = sortedData.map(item => ({
        ...item,
        percentage: maxValue > 0 ? (item.total / maxValue) * 100 : 0,
        isFiltered: currentFilter?.selectedValues.includes(item.value) || false
      }));

      return {
        dimension,
        data: dataWithPercentage,
        maxValue
      };
    });
  }

  /**
   * Get filtered rows for a specific column, applying filters from all OTHER columns
   */
  private getFilteredRowsForColumn(currentDimension: string): Array<Record<string, any>> {
    if (!this.props?.rows) return [];

    return this.props.rows.filter(row => {
      // Apply filters from all columns except the current one
      for (const [dimension, filter] of this.columnFilters.entries()) {
        if (dimension !== currentDimension && filter.selectedValues.length > 0) {
          const rowValue = String(row[dimension] || 'Unknown');
          if (!filter.selectedValues.includes(rowValue)) {
            return false;
          }
        }
      }
      return true;
    });
  }

  /**
   * Handle cell click to toggle filter
   */
  onCellClick(dimension: string, value: string): void {
    const currentFilter = this.columnFilters.get(dimension);

    if (!currentFilter) {
      // No filter exists for this dimension - create one with this value
      this.columnFilters.set(dimension, { dimension, selectedValues: [value] });
    } else {
      const selectedValues = [...currentFilter.selectedValues];
      const valueIndex = selectedValues.indexOf(value);

      if (valueIndex > -1) {
        // Value is already selected - remove it
        selectedValues.splice(valueIndex, 1);
      } else {
        // Value is not selected - add it
        selectedValues.push(value);
      }

      this.columnFilters.set(dimension, { dimension, selectedValues });
    }
  }

  /**
   * Check if a cell is currently filtered
   */
  isCellFiltered(dimension: string, value: string): boolean {
    const filter = this.columnFilters.get(dimension);
    return filter?.selectedValues.includes(value) || false;
  }

  /**
   * Clear all filters
   */
  clearAllFilters(): void {
    this.columnFilters.clear();
  }

  /**
   * Check if there are any active filters
   */
  hasActiveFilters(): boolean {
    for (const filter of this.columnFilters.values()) {
      if (filter.selectedValues.length > 0) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get the total count of active filter selections across all columns
   */
  getActiveFilterCount(): number {
    let count = 0;
    for (const filter of this.columnFilters.values()) {
      count += filter.selectedValues.length;
    }
    return count;
  }

  /**
   * Get active filters for a specific column
   */
  getColumnFilterCount(dimension: string): number {
    const filter = this.columnFilters.get(dimension);
    return filter?.selectedValues.length || 0;
  }

  getContainerClasses(): string {
    return [
      'w-full',
      'overflow-x-auto',
      'bg-white',
      'shadow-sm',
    ].join(' ');
  }

  getGridClasses(): string {
    return [
      'grid',
      'gap-4',
      'min-w-max'
    ].join(' ');
  }

  getColumnClasses(): string {
    const numColumns = this.props?.dimensions?.length || 1;
    const maxWidth = Math.floor(100 / numColumns);

    return [
      'text-xs',
      'flex',
      'flex-col',
      'min-w-[200px]',
      `max-w-[${maxWidth}%]`
    ].join(' ');
  }

  getColumnHeaderClasses(): string {
    return [
      '!text-sm',
      'text-gray-900',
      'border-b',
      'border-gray-200'
    ].join(' ');
  }

  getRowClasses(isFiltered?: boolean): string {
    const baseClasses = [
      'relative',
      'p-1',
      'border',
      'border-none',
      'transition-colors',
      'duration-150',
      'cursor-pointer',
      'hover:bg-gray-50'
    ];

    if (isFiltered) {
      baseClasses.push(
        'bg-blue-100',
        'border-blue-200',
        'border',
        'shadow-sm'
      );
    }

    return baseClasses.join(' ');
  }

  getProgressBarClasses(): string {
    return [
      'absolute',
      'inset-0',
      'bg-blue-50',
      'transition-all',
      'duration-300'
    ].join(' ');
  }

  getRowContentClasses(): string {
    return [
      'relative',
      'z-10',
      'flex',
      'justify-between',
      'items-center'
    ].join(' ');
  }

  getValueLabelClasses(): string {
    return [
      'text-gray-900',
      'truncate'
    ].join(' ');
  }

  getTotalClasses(): string {
    return [
      'text-gray-700',
      'text-sm'
    ].join(' ');
  }

  formatValue(value: number): string {
    return value.toLocaleString();
  }
}