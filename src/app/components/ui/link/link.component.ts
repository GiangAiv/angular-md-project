import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LinkProps {
  href: string;
  text: string;
  external?: boolean;
  underline?: boolean;
  icon?: boolean;
  variant?: 'default' | 'muted' | 'accent';
}

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  imports: [
    CommonModule
  ]
})
export class LinkComponent {
  @Input() props?: LinkProps;

  getLinkClasses(): string {
    const baseClasses = [
      'inline-flex',
      'items-center',
      'gap-1',
      'font-medium',
      'transition-colors',
      'duration-150',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-1',
      'rounded',
      'min-h-[24px]',
      'px-0.5',
      this.props?.underline !== false ? 'underline' : 'no-underline'
    ];

    // Add variant-specific classes
    switch (this.props?.variant || 'default') {
      case 'muted':
        baseClasses.push(
          'text-gray-500',
          'hover:text-gray-700',
          'focus:ring-gray-400'
        );
        break;
      case 'accent':
        baseClasses.push(
          'text-indigo-600',
          'hover:text-indigo-800',
          'focus:ring-indigo-400'
        );
        break;
      default: // default variant
        baseClasses.push(
          'text-blue-600',
          'hover:text-blue-800',
          'focus:ring-blue-400'
        );
        break;
    }

    return baseClasses.join(' ');
  }

  getIconClasses(): string {
    return [
      'w-4',
      'h-4',
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
    return this.props?.icon !== false;
  }

  isExternal(): boolean {
    return this.props?.external === true;
  }

  getAriaLabel(): string | undefined {
    return this.props?.text || undefined;
  }

  getIcon(): string {
    return this.isExternal() ? this.getExternalLinkIcon() : this.getArrowIcon();
  }
} 