import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { toBoolean } from '../accordion/util';

interface EmbedProps {
  url?: string;
  title?: string;
  width?: string;
  height?: string;
  align?: 'left' | 'center' | 'right';
  border?: boolean;
  class?: string;
}

@Component({
  selector: 'app-embed',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.css']
})
export class EmbedComponent extends BaseComponent<EmbedProps> {
  @Input() set url(value: string) {
    this._url = value || '';
  }
  get url(): string {
    return this._url;
  }
  private _url = '';

  @Input() set title(value: string) {
    this._title = value || '';
  }
  get title(): string {
    return this._title;
  }
  private _title = '';

  @Input() set width(value: string) {
    this._width = this.processDimension(value || '100%');
  }
  get width(): string {
    return this._width;
  }
  private _width = '100%';

  @Input() set height(value: string) {
    this._height = this.processDimension(value || '400');
  }
  get height(): string {
    return this._height;
  }
  private _height = '400';

  @Input() set align(value: 'left' | 'center' | 'right') {
    this._align = value || 'left';
  }
  get align(): 'left' | 'center' | 'right' {
    return this._align;
  }
  private _align: 'left' | 'center' | 'right' = 'left';

  @Input() set border(value: string | boolean) {
    this._border = toBoolean(value);
  }
  get border(): boolean {
    return this._border;
  }
  private _border = true;

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