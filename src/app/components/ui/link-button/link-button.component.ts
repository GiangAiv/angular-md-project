import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../base-component';

interface LinkButtonProps {
  href: string;
  text: string;
  external?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
}

@Component({
  selector: 'app-link-button',
  templateUrl: './link-button.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class LinkButtonComponent extends BaseComponent<LinkButtonProps> {
  get href(): string {
    return this.props?.href || '';
  }

  get text(): string {
    return this.props?.text || '';
  }

  get external(): boolean {
    return this.props?.external === true;
  }

  get variant(): 'primary' | 'secondary' | 'ghost' {
    return this.props?.variant || 'primary';
  }

  get size(): 'sm' | 'md' | 'lg' {
    return this.props?.size || 'md';
  }

  get showIcon(): boolean {
    return !!this.props?.icon || this.external;
  }

  get ariaLabel(): string {
    return this.text;
  }

  get linkClasses(): string {
    return [
      // Base classes
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'font-medium',
      'rounded-md',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'disabled:opacity-60',
      'disabled:cursor-not-allowed',
      
      // Size-specific classes
      ...this.sizeClasses,
      
      // Variant-specific classes
      ...this.variantClasses,
    ].join(' ');
  }

  get iconClasses(): string {
    return [
      'flex-shrink-0',
      // Size-specific icon classes
      this.size === 'sm' ? 'w-3.5 h-3.5' : '',
      this.size === 'md' ? 'w-4 h-4' : '',
      this.size === 'lg' ? 'w-5 h-5' : '',
    ].filter(Boolean).join(' ');
  }

  private get sizeClasses(): string[] {
    switch (this.size) {
      case 'sm':
        return ['px-2.5', 'py-1.5', 'text-xs'];
      case 'lg':
        return ['px-6', 'py-3', 'text-base'];
      default: // md
        return ['px-4', 'py-2', 'text-sm'];
    }
  }

  private get variantClasses(): string[] {
    switch (this.variant) {
      case 'secondary':
        return [
          'bg-white',
          'text-gray-700',
          'border',
          'border-gray-300',
          'shadow-sm',
          'hover:bg-gray-50',
          'hover:text-gray-900',
          'focus:ring-gray-500',
          'active:bg-gray-100',
          'active:text-gray-800'
        ];
      case 'ghost':
        return [
          'text-gray-600',
          'hover:text-gray-900',
          'hover:bg-gray-50',
          'focus:ring-gray-500',
          'active:bg-gray-100',
          'active:text-gray-800'
        ];
      default: // primary
        return [
          "text-white",
          'bg-blue-600',
          'text-white',
          'shadow-sm',
          'hover:bg-blue-700',
          'focus:ring-blue-500',
          'active:bg-blue-800'
        ];
    }
  }

  get icon(): string {
    if (this.props?.icon) {
      return this.props.icon;
    }
    return this.external ? this.externalLinkIcon : this.arrowIcon;
  }

  private get externalLinkIcon(): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd" />
      <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd" />
    </svg>`;
  }

  private get arrowIcon(): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
    </svg>`;
  }
} 