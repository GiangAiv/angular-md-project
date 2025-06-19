import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../base-component';

interface LastRefreshedProps {
  lastUpdated: Date | string;
  label?: string;
  icon?: boolean;
  format?: 'relative' | 'absolute';
}

@Component({
  selector: 'app-last-refreshed',
  templateUrl: './last-refreshed.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class LastRefreshedComponent extends BaseComponent<LastRefreshedProps> implements OnInit, OnDestroy {
  private updateInterval?: number;
  private readonly defaultLabel = 'Last updated';

  override ngOnInit(): void {
    super.ngOnInit(); // Call parent ngOnInit to set up variable subscriptions
    if (this.isRelativeFormat) {
      this.updateInterval = window.setInterval(() => {
        this.props = { ...this.props! };
      }, 60000); // Update every minute
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy(); // Clean up variable subscriptions
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  get label(): string {
    return this.props?.label || this.defaultLabel;
  }

  get lastUpdated(): Date {
    const input = this.props?.lastUpdated;
  
    const result = input instanceof Date ? input : new Date(input || '');
    console.log('result', input, result);
    return result;
  }

  get isRelativeFormat(): boolean {
    return this.props?.format !== 'absolute';
  }

  get showIcon(): boolean {
    return this.props?.icon !== false;
  }

  get containerClasses(): string {
    return [
      'flex',
      'items-center',
      'gap-2',
      'text-sm',
      'text-gray-500'
    ].join(' ');
  }

  get iconClasses(): string {
    return [
      'w-4',
      'h-4',
      'text-gray-400'
    ].join(' ');
  }

  get timeClasses(): string {
    return [
      this.isRelativeFormat ? 'text-gray-500' : 'text-gray-700',
      'font-medium'
    ].join(' ');
  }

  get formattedTime(): string {
    return this.isRelativeFormat ? this.relativeTimeString : this.absoluteTimeString;
  }

  get ariaLabel(): string {
    return `${this.label}: ${this.absoluteTimeString}`;
  }

  get clockIcon(): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" />
    </svg>`;
  }

  private get relativeTimeString(): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - this.lastUpdated.getTime()) / 1000);

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

    return this.absoluteTimeString;
  }

  private get absoluteTimeString(): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(this.lastUpdated);
  }
} 