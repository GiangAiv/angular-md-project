import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../base-component';

interface ImageProps {
  src: string;
  alt?: string;
  caption?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class ImageComponent extends BaseComponent<ImageProps> {
  onError(event: ErrorEvent): void {
    console.error('Image failed to load:', this.props?.src);
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
    // You could set a fallback image here if desired
  }

  get src(): string {
    return this.props?.src || '';
  }

  get alt(): string {
    return this.props?.alt || '';
  }

  get caption(): string {
    return this.props?.caption || '';
  }

  get width(): string {
    return this.processDimension(this.props?.width);
  }

  get height(): string {
    return this.processDimension(this.props?.height);
  }

  get rounded(): boolean {
    return this.props?.rounded ?? false;
  }

  get objectFit(): string {
    return this.props?.objectFit || 'cover';
  }

  get loading(): 'lazy' | 'eager' {
    return this.props?.loading || 'lazy';
  }

  get containerClasses(): string {
    return [
      'flex',
      'flex-col',
      'items-center',
      'gap-2',
      'w-full'
    ].join(' ');
  }

  get imageClasses(): string {
    const baseClasses = [
      'max-w-full',
      'h-auto',
      this.rounded ? 'rounded-lg' : '',
      `object-${this.objectFit}`
    ];

    return baseClasses.filter(Boolean).join(' ');
  }

  get imageStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    if (this.width) {
      styles['width'] = this.width;
    }

    if (this.height) {
      styles['height'] = this.height;
    }

    return styles;
  }

  get captionClasses(): string {
    return [
      'text-sm',
      'text-gray-500',
      'mt-1',
      'text-center'
    ].join(' ');
  }

  get ariaLabel(): string {
    return this.alt || this.caption || '';
  }

  get hasCaption(): boolean {
    return !!this.caption;
  }

  private processDimension(dimension?: string | number): string {
    if (!dimension) return '';
    
    if (typeof dimension === 'number') {
      return `${dimension}px`;
    }

    if (dimension.endsWith('%') || dimension.endsWith('px')) {
      return dimension;
    }

    return `${dimension}px`;
  }
} 