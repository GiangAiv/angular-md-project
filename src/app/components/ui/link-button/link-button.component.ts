import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [
    CommonModule
  ]
})
export class LinkButtonComponent {
  @Input() props?: LinkButtonProps;

  getLinkClasses(): string {
    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'rounded-md',
      'transition-colors',
      'duration-150',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2'
    ];

    // Add size-specific classes
    switch (this.props?.size || 'md') {
      case 'sm':
        baseClasses.push('px-3', 'py-1.5', 'text-sm');
        break;
      case 'lg':
        baseClasses.push('px-5', 'py-3', 'text-lg');
        break;
      default: // md
        baseClasses.push('px-4', 'py-2', 'text-base');
        break;
    }

    // Add variant-specific classes
    switch (this.props?.variant || 'primary') {
      case 'secondary':
        baseClasses.push(
          'bg-gray-100',
          'text-gray-800',
          'hover:bg-gray-200',
          'focus:ring-gray-400'
        );
        break;
      case 'ghost':
        baseClasses.push(
          'bg-transparent',
          'text-blue-600',
          'hover:underline',
          'focus:ring-blue-400'
        );
        break;
      default: // primary
        baseClasses.push(
          'bg-blue-600',
          'text-white',
          'hover:bg-blue-700',
          'focus:ring-blue-500'
        );
        break;
    }

    return baseClasses.join(' ');
  }

  getIconClasses(): string {
    return [
      'w-4',
      'h-4',
      'ml-2',
      'flex-shrink-0'
    ].join(' ');
  }

  getExternalLinkIcon(): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd" />
      <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd" />
    </svg>`;
  }

  getArrowIcon(): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
    </svg>`;
  }

  shouldShowIcon(): boolean {
    return !!this.props?.icon || this.isExternal();
  }

  isExternal(): boolean {
    return this.props?.external === true;
  }

  getAriaLabel(): string | undefined {
    return this.props?.text || undefined;
  }

  getIcon(): string {
    if (this.props?.icon) {
      return this.props.icon;
    }
    return this.isExternal() ? this.getExternalLinkIcon() : this.getArrowIcon();
  }
} 