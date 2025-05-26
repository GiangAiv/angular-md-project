import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BaseComponent } from '../../base-component';
import { toBoolean } from '../accordion/util';

interface EmbedProps {
  url?: string;
  title?: string;
  width?: string;
  height?: string;
  align?: 'left' | 'center' | 'right';
  border?: boolean | string;
  class?: string;
}

@Component({
  selector: 'app-embed',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.css']
})
export class EmbedComponent extends BaseComponent<EmbedProps> {
  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  get url(): string {
    return this.props?.url || '';
  }

  get safeUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  get title(): string {
    return this.props?.title || '';
  }

  get width(): string {
    return this.processDimension(this.props?.width || '100%');
  }

  get height(): string {
    return this.processDimension(this.props?.height || '400');
  }

  get align(): 'left' | 'center' | 'right' {
    return this.props?.align || 'left';
  }

  get border(): boolean {
    return toBoolean(this.props?.border ?? true);
  }

  get wrapperClass(): string {
    const baseClass = 'embed-wrapper relative overflow-hidden rounded-md';
    const borderClass = this.border ? 'border border-gray-300 shadow-sm' : '';
    const alignClass = this.align === 'center' ? 'mx-auto' : 
                      this.align === 'left' ? 'ml-0' : 'mr-0 ml-auto';
    
    return `${baseClass} ${borderClass} ${alignClass} ${this.props?.class || ''}`;
  }

  get wrapperStyle(): string {
    return `width: ${this.width}; height: ${this.height};`;
  }

  private processDimension(dimension: string): string {
    if (dimension.endsWith('%') || dimension.endsWith('px')) {
      return dimension;
    }
    return `${dimension}px`;
  }
} 