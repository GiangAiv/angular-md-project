import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../base-component';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  name?: string;
  id?: string;
}

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class CheckboxComponent extends BaseComponent<CheckboxProps> implements AfterViewInit {
  @ViewChild('checkboxInput') checkboxInput!: ElementRef<HTMLInputElement>;

  private generatedId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  ngAfterViewInit() {
    this.updateIndeterminateState();
  }

  ngOnChanges() {
    this.updateIndeterminateState();
  }

  getId(): string {
    return this.props?.id || this.generatedId;
  }

  getContainerClasses(): string {
    return 'relative flex items-start';
  }

  getCheckboxWrapperClasses(): string {
    return 'flex items-center h-5';
  }

  getCheckboxClasses(): string {
    const baseClasses = [
      'h-4',
      'w-4',
      'text-blue-600',
      'border-gray-300',
      'rounded',
      'focus:ring-blue-500',
      'focus:ring-offset-0',
      'transition-colors',
      'duration-150'
    ];

    if (this.props?.disabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed', 'bg-gray-100');
    }

    return baseClasses.join(' ');
  }

  getLabelClasses(): string {
    const baseClasses = [
      'ml-2',
      'text-sm',
      'text-gray-700',
      'select-none'
    ];

    if (this.props?.disabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed');
    }

    return baseClasses.join(' ');
  }

  handleChange(event: Event): void {
    if (this.props?.disabled) return;

    const checkbox = event.target as HTMLInputElement;
    this.props = {
      ...this.props,
      checked: checkbox.checked,
      indeterminate: false // Clear indeterminate state on user interaction
    };
  }

  private updateIndeterminateState(): void {
    if (this.checkboxInput?.nativeElement) {
      this.checkboxInput.nativeElement.indeterminate = this.props?.indeterminate || false;
    }
  }
} 