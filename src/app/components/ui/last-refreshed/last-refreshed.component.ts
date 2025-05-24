import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LastRefreshedProps {
  lastUpdated: Date | string;
  label?: string;
  icon?: boolean;
  format?: 'relative' | 'absolute';
}

@Component({
  selector: 'app-last-refreshed',
  templateUrl: './last-refreshed.component.html',
  imports: [
    CommonModule
  ]
})
export class LastRefreshedComponent implements OnInit, OnDestroy {
  @Input() props?: LastRefreshedProps;

  private updateInterval?: number;
  private readonly defaultLabel = 'Last updated';

  ngOnInit(): void {
    // Start interval to update relative time display
    if (this.isRelativeFormat()) {
      this.updateInterval = window.setInterval(() => {
        // Force view update
        this.props = { ...this.props! };
      }, 60000); // Update every minute
    }
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  getContainerClasses(): string {
    return [
      'flex',
      'items-center',
      'gap-2',
      'text-sm',
      'text-gray-500'
    ].join(' ');
  }

  getIconClasses(): string {
    return [
      'w-4',
      'h-4',
      'text-gray-400'
    ].join(' ');
  }

  getTimeClasses(): string {
    return [
      this.isRelativeFormat() ? 'text-gray-500' : 'text-gray-700',
      'font-medium'
    ].join(' ');
  }

  getFormattedTime(): string {
    const date = this.getDateObject();
    
    if (this.isRelativeFormat()) {
      return this.getRelativeTimeString(date);
    }
    
    return this.getAbsoluteTimeString(date);
  }

  getAriaLabel(): string {
    const label = this.props?.label || this.defaultLabel;
    return `${label}: ${this.getAbsoluteTimeString(this.getDateObject())}`;
  }

  private isRelativeFormat(): boolean {
    return this.props?.format !== 'absolute';
  }

  private getDateObject(): Date {
    const input = this.props?.lastUpdated;
    return input instanceof Date ? input : new Date(input || '');
  }

  private getRelativeTimeString(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }

    return this.getAbsoluteTimeString(date);
  }

  private getAbsoluteTimeString(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  }

  getClockIcon(): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" />
    </svg>`;
  }

  shouldShowIcon(): boolean {
    return this.props?.icon !== false;
  }
} 