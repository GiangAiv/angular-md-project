import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../base-component';

interface InfoProps {
  title?: string;
  message: string;
  icon?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  standalone: true,
  imports: [

    CommonModule
  ]
})
export class InfoComponent extends BaseComponent<InfoProps> {
  @Output() dismissed = new EventEmitter<void>();

  visible = true;

  get title(): string {
    return this.props?.title || '';
  }

  get message(): string {
    return this.props?.message || '';
  }

  get variant(): 'info' | 'success' | 'warning' | 'error' {
    return this.props?.variant || 'info';
  }

  get dismissible(): boolean {
    return this.props?.dismissible ?? false;
  }

  get containerClasses(): string {
    const baseClasses = [
      'flex',
      'items-start',
      'p-4',
      'border',
      'rounded-lg',
      'text-sm',
      'shadow-sm',
      'w-full'
    ];

    // Add variant-specific classes
    switch (this.variant) {
      case 'success':
        baseClasses.push('bg-green-50', 'border-green-200', 'text-green-800');
        break;
      case 'warning':
        baseClasses.push('bg-yellow-50', 'border-yellow-200', 'text-yellow-800');
        break;
      case 'error':
        baseClasses.push('bg-red-50', 'border-red-200', 'text-red-800');
        break;
      default: // info
        baseClasses.push('bg-blue-50', 'border-blue-200', 'text-blue-800');
        break;
    }

    return baseClasses.join(' ');
  }

  get titleClasses(): string {
    return [
      'font-semibold',
      'mb-1'
    ].join(' ');
  }

  get dismissButtonClasses(): string {
    return [
      'text-gray-500',
      'hover:text-gray-700',
      'ml-auto',
      'p-1',
      '-mr-1',
      'rounded-full',
      'hover:bg-gray-100',
      'transition-colors',
      'duration-150'
    ].join(' ');
  }

  get iconClasses(): string {
    const baseClasses = [
      'w-5',
      'h-5',
      'mt-0.5',
      'mr-3',
      'flex-shrink-0'
    ];

    // Add variant-specific color classes
    switch (this.variant) {
      case 'success':
        baseClasses.push('text-green-500');
        break;
      case 'warning':
        baseClasses.push('text-yellow-500');
        break;
      case 'error':
        baseClasses.push('text-red-500');
        break;
      default: // info
        baseClasses.push('text-blue-500');
        break;
    }

    return baseClasses.join(' ');
  }

  get role(): string {
    return this.variant === 'warning' || this.variant === 'error' ? 'alert' : 'status';
  }

  get iconSvg(): string {
    // Return custom icon if provided
    if (this.props?.icon) {
      return this.props.icon;
    }

    // Default icons for each variant
    switch (this.variant) {
      case 'success':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
        </svg>`;
      case 'warning':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
        </svg>`;
      case 'error':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
        </svg>`;
      default: // info
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
        </svg>`;
    }
  }

  onDismiss(): void {
    this.visible = false;
    this.dismissed.emit();
  }
} 