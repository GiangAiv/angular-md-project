import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../base-component';

interface ButtonOption {
  label: string;
  value: string;
}

interface ButtonGroupProps {
  options: (string | ButtonOption)[];
  selected?: string;
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  fullWidth?: boolean;
}

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class ButtonGroupComponent extends BaseComponent<ButtonGroupProps> {
  @Output() selectionChange = new EventEmitter<string>();

  getContainerClasses(): string {
    const baseClasses = [
      'relative',
      this.props?.fullWidth ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1' : 'inline-flex space-x-1'
    ];

    return baseClasses.join(' ');
  }

  getButtonClasses(value: string): string {
    const isSelected = this.isSelected(value);
    const baseClasses = [
      'relative',
      'font-medium',
      'transition-colors',
      'duration-150',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-blue-500',
      'focus:ring-offset-2',
      this.props?.fullWidth ? 'w-full' : '',
      this.props?.rounded ? 'rounded-md' : '',
    ];

    // Size-specific classes
    switch (this.props?.size) {
      case 'sm':
        baseClasses.push('px-2', 'py-1', 'text-xs');
        break;
      case 'lg':
        baseClasses.push('px-4', 'py-2', 'text-base');
        break;
      default: // md
        baseClasses.push('px-3', 'py-1.5', 'text-sm');
        break;
    }

    // Selection-specific classes
    if (isSelected) {
      baseClasses.push(
        'bg-blue-600',
        'text-white',
        'hover:bg-blue-700',
        'border',
        'border-blue-700'
      );
    } else {
      baseClasses.push(
        'bg-white',
        'text-gray-700',
        'border',
        'border-gray-300',
        'hover:bg-gray-100'
      );
    }

    return baseClasses.join(' ');
  }

  isSelected(value: string): boolean {
    return this.props?.selected === value;
  }

  onButtonClick(value: string): void {
    if (this.props?.selected !== value) {
      this.props = {
        ...this.props,
        selected: value
      };
      this.selectionChange.emit(value);
    }
  }

  getOptionValue(option: string | ButtonOption): string {
    return typeof option === 'string' ? option : option.value;
  }

  getOptionLabel(option: string | ButtonOption): string {
    return typeof option === 'string' ? option : option.label;
  }
} 