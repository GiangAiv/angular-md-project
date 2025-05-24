import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [
    CommonModule
  ]
})
export class ImageComponent {
  @Input() props?: ImageProps;

  onError(event: ErrorEvent): void {
    console.error('Image failed to load:', this.props?.src);
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
    // You could set a fallback image here if desired
  }

  getContainerClasses(): string {
    return [
      'flex',
      'flex-col',
      'items-center',
      'gap-2',
      'w-full'
    ].join(' ');
  }

  getImageClasses(): string {
    const baseClasses = [
      'max-w-full',
      'h-auto',
      this.props?.rounded ? 'rounded-lg' : ''
    ];

    // Add object-fit class if specified
    if (this.props?.objectFit) {
      baseClasses.push(`object-${this.props.objectFit}`);
    } else {
      baseClasses.push('object-cover');
    }

    return baseClasses.filter(Boolean).join(' ');
  }

  getImageStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    if (this.props?.width) {
      styles['width'] = typeof this.props.width === 'number' 
        ? `${this.props.width}px` 
        : this.props.width;
    }

    if (this.props?.height) {
      styles['height'] = typeof this.props.height === 'number'
        ? `${this.props.height}px`
        : this.props.height;
    }

    return styles;
  }

  getCaptionClasses(): string {
    return [
      'text-sm',
      'text-gray-500',
      'mt-1',
      'text-center'
    ].join(' ');
  }

  getAriaLabel(): string | undefined {
    return this.props?.alt || this.props?.caption;
  }

  shouldShowCaption(): boolean {
    return !!this.props?.caption;
  }
} 