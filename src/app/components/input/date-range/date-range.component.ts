import { Component } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

interface DateRangeProps {
  startDate?: Date | string;
  endDate?: Date | string;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
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
    MatNativeDateModule
  ]
})
export class DateRangeComponent extends BaseComponent<DateRangeProps> {
  private generatedId = `date-range-${Math.random().toString(36).substr(2, 9)}`;
  selected: { start?: Date; end?: Date } = {};

  ngOnInit() {
    if (this.props?.startDate || this.props?.endDate) {
      this.selected = {
        start: this.props.startDate ? new Date(this.props.startDate) : undefined,
        end: this.props.endDate ? new Date(this.props.endDate) : undefined
      };
    }
  }

  ngOnChanges() {
    if (this.props?.startDate || this.props?.endDate) {
      this.selected = {
        start: this.props.startDate ? new Date(this.props.startDate) : undefined,
        end: this.props.endDate ? new Date(this.props.endDate) : undefined
      };
    }
  }

  getId(): string {
    return this.generatedId;
  }

  getContainerClasses(): string {
    return 'flex flex-col gap-2 w-max';
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
  }
} 