import { Component, OnInit, OnChanges } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

interface DateInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: Date | string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
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
export class DateInputComponent extends BaseComponent<DateInputProps> {
  private generatedId = `date-input-${Math.random().toString(36).substr(2, 9)}`;
  selected: Date | null = null;

  override ngOnInit() {
    this.updateSelectedDate();
  }

  ngOnChanges() {
    this.updateSelectedDate();
  }

  private updateSelectedDate() {
    if (this.props?.value) {
      this.selected = typeof this.props.value === 'string'
        ? new Date(this.props.value)
        : this.props.value;
    } else {
      this.selected = null;
    }
  }

  getId(): string {
    return this.props?.id || this.generatedId;
  }

  getMinDate(): Date | null {
    return this.props?.minDate || null;
  }

  getMaxDate(): Date | null {
    return this.props?.maxDate || null;
  }

  getContainerClasses(): string {
    return 'relative w-max';
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

  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    
    const minDate = this.props?.minDate ? new Date(this.props.minDate) : null;
    const maxDate = this.props?.maxDate ? new Date(this.props.maxDate) : null;
    
    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;
    
    return true;
  };

  handleDateChange(date: Date | null): void {
    this.selected = date;
    if (date) {
      this.props = {
        ...this.props,
        value: date
      };
    }
  }
} 