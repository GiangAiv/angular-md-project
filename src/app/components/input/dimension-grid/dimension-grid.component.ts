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
}

interface ColumnData {
  dimension: string;
  data: DimensionData[];
  maxValue: number;
}

@Component({
  selector: 'app-dimension-grid',
  templateUrl: './dimension-grid.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class DimensionGridComponent extends BaseComponent<DimensionGridProps> {

  get columnsData(): ColumnData[] {
    if (!this.props?.rows || !this.props?.dimensions || !this.props?.metrics) {
      return [];
    }

    return this.props.dimensions.map(dimension => {
      // Group data by dimension value and calculate totals
      const groupedData = this.props!.rows.reduce((acc, row) => {
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
        .map(([value, total]) => ({ value, total }))
        .sort((a, b) => b.total - a.total);

      // Calculate max value for this dimension
      const maxValue = Math.max(...sortedData.map(item => item.total));

      // Add percentage calculation
      const dataWithPercentage = sortedData.map(item => ({
        ...item,
        percentage: maxValue > 0 ? (item.total / maxValue) * 100 : 0
      }));

      return {
        dimension,
        data: dataWithPercentage,
        maxValue
      };
    });
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

  getRowClasses(): string {
    return [
      'relative',
      'p-1',
      'border',
      'border-none',
      'transition-colors',
      'duration-150'
    ].join(' ');
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