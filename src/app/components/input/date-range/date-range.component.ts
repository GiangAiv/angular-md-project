import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseComponent } from '../../base-component';
import { DropdownComponent, DropdownProps } from '../dropdown/dropdown.component';

interface DateRangePresetOption {
  label: string;
  value: string;
}

interface DateRangeProps {
  startDate?: Date | string;
  endDate?: Date | string;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  showPresets?: boolean;
  presetLabel?: string;
  defaultPreset?: string;
  presetRanges?: DateRangePresetOption[];
}

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    DropdownComponent
  ]
})
export class DateRangeComponent extends BaseComponent<DateRangeProps> {
  private generatedId = `date-range-${Math.random().toString(36).substring(2, 11)}`;
  selected: { start?: Date; end?: Date } = {};
  selectedPreset?: string;

  override ngOnInit() {
    // Handle default preset if provided and no dates are set
    if (this.props?.defaultPreset && !this.props?.startDate && !this.props?.endDate) {
      this.handlePresetChange(this.props.defaultPreset);
    } else if (this.props?.startDate || this.props?.endDate) {
      this.selected = {
        start: this.props.startDate ? new Date(this.props.startDate) : undefined,
        end: this.props.endDate ? new Date(this.props.endDate) : undefined
      };
    }
  }

  ngOnChanges() {
    // Handle default preset if provided and no dates are set
    if (this.props?.defaultPreset && !this.props?.startDate && !this.props?.endDate) {
      this.handlePresetChange(this.props.defaultPreset);
    } else if (this.props?.startDate || this.props?.endDate) {
      this.selected = {
        start: this.props.startDate ? new Date(this.props.startDate) : undefined,
        end: this.props.endDate ? new Date(this.props.endDate) : undefined
      };
      // Clear preset selection when dates are set externally
      this.selectedPreset = undefined;
    }
  }


  getDropDownProps(): DropdownProps {
    return {
      options: this.getPresetOptions(),
      selected: this.selectedPreset,
      placeholder: this.props?.presetLabel || 'Select a Range',
      disabled: !!this.props?.disabled,
      width: 'auto',
    };
  }

  getId(): string {
    return this.generatedId;
  }

  getContainerClasses(): string {
    return '';
  }

  getLabelClasses(): string {
    return 'block text-sm font-medium text-gray-700 mb-1';
  }

  getInputWrapperClasses(): string {
    return 'relative';
  }

  getInputClasses(): string {
    const baseClasses = [
      'w-full',
      'px-3',
      'py-2',
      'border',
      'border-gray-300',
      'rounded-md',
      'text-sm',
      'text-gray-900',
      'placeholder-gray-400',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-blue-500',
      'focus:border-transparent',
      'transition-colors',
      'duration-150'
    ];

    if (this.props?.disabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed', 'bg-gray-50');
    }

    return baseClasses.join(' ');
  }

  getDisplayValue(): string {
    if (!this.props?.startDate && !this.props?.endDate) {
      return '';
    }

    const formatDate = (date: Date | string | undefined) => {
      if (!date) return '';
      const d = typeof date === 'string' ? new Date(date) : date;
      return d.toLocaleDateString();
    };

    const start = formatDate(this.props.startDate);
    const end = formatDate(this.props.endDate);

    return start && end ? `${start} to ${end}` : start || end;
  }

  handleDateRangeChange(start: Date | null | undefined, end: Date | null | undefined): void {
    this.props = {
      ...this.props,
      startDate: start || undefined,
      endDate: end || undefined
    };
    // Clear preset selection when manually changing dates
    this.selectedPreset = undefined;
  }

  getPresetOptions() {
    // Use custom preset ranges if provided, otherwise use default ones
    if (this.props?.presetRanges && this.props.presetRanges.length > 0) {
      return this.props.presetRanges;
    }

    // Default preset options
    return [
      {
        label: 'Last 7 days',
        value: 'last-7-days'
      },
      {
        label: 'Last 30 days',
        value: 'last-30-days'
      },
      {
        label: 'Last 90 days',
        value: 'last-90-days'
      },
      {
        label: 'Last 365 days',
        value: 'last-365-days'
      },
      {
        label: 'Last 3 months',
        value: 'last-3-months'
      },
      {
        label: 'Last 6 months',
        value: 'last-6-months'
      },
      {
        label: 'Last 9 months',
        value: 'last-9-months'
      },
      {
        label: 'Last month',
        value: 'last-month'
      },
      {
        label: 'Last year',
        value: 'last-year'
      },
      {
        label: 'Month to date',
        value: 'month-to-date'
      },
      {
        label: 'Month to today',
        value: 'month-to-today'
      },
      {
        label: 'Year to date',
        value: 'year-to-date'
      },
      {
        label: 'Year to today',
        value: 'year-to-today'
      },
      {
        label: 'All time',
        value: 'all-time'
      }
    ];
  }

  calculatePresetDates(presetValue: string): { start: Date; end: Date } {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (presetValue) {
      case 'last-7-days':
        return {
          start: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000),
          end: today
        };

      case 'last-30-days':
        return {
          start: new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000),
          end: today
        };

      case 'last-90-days':
        return {
          start: new Date(today.getTime() - 89 * 24 * 60 * 60 * 1000),
          end: today
        };

      case 'last-365-days':
        return {
          start: new Date(today.getTime() - 364 * 24 * 60 * 60 * 1000),
          end: today
        };

      case 'last-3-months':
        return {
          start: new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()),
          end: today
        };

      case 'last-6-months':
        return {
          start: new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()),
          end: today
        };

      case 'last-9-months':
        return {
          start: new Date(now.getFullYear(), now.getMonth() - 9, now.getDate()),
          end: today
        };

      case 'last-month':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        return {
          start: lastMonth,
          end: lastMonthEnd
        };

      case 'last-year':
        return {
          start: new Date(now.getFullYear() - 1, 0, 1),
          end: new Date(now.getFullYear() - 1, 11, 31)
        };

      case 'month-to-date':
      case 'month-to-today':
        return {
          start: new Date(now.getFullYear(), now.getMonth(), 1),
          end: today
        };

      case 'year-to-date':
      case 'year-to-today':
        return {
          start: new Date(now.getFullYear(), 0, 1),
          end: today
        };

      case 'all-time':
        return {
          start: new Date(1970, 0, 1),
          end: today
        };

      default:
        return {
          start: today,
          end: today
        };
    }
  }

  handlePresetChange(presetValue: string): void {

    if (!presetValue) return;

    const { start, end } = this.calculatePresetDates(presetValue);

    this.selectedPreset = presetValue;

    // Update the selected object that's bound to the date picker inputs
    this.selected = {
      start: start,
      end: end
    };

    // Update props to reflect the change
    this.props = {
      ...this.props,
      startDate: start,
      endDate: end
    };
  }
}