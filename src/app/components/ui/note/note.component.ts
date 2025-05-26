import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../base-component';

interface NoteProps {
  title?: string;
  text: string;
  variant?: 'default' | 'muted' | 'highlight';
}

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class NoteComponent extends BaseComponent<NoteProps> {
  get title(): string {
    return this.props?.title || '';
  }

  get text(): string {
    return this.props?.text || '';
  }

  get variant(): 'default' | 'muted' | 'highlight' {
    return this.props?.variant || 'default';
  }

  get containerClasses(): string {
    const baseClasses = [
      'rounded-lg',
      'border',
      'p-4',
      'text-sm',
      'w-full',
      'leading-relaxed'
    ];

    // Add variant-specific classes
    switch (this.variant) {
      case 'muted':
        baseClasses.push(
          'bg-white',
          'border-gray-100',
          'text-gray-500'
        );
        break;
      case 'highlight':
        baseClasses.push(
          'bg-yellow-50',
          'border-yellow-200',
          'text-yellow-800'
        );
        break;
      default: // default variant
        baseClasses.push(
          'bg-gray-50',
          'border-gray-200',
          'text-gray-800'
        );
        break;
    }

    return baseClasses.join(' ');
  }

  get titleClasses(): string {
    return [
      'font-semibold',
      'mb-1',
      'block'
    ].join(' ');
  }

  get textClasses(): string {
    return [
      'leading-relaxed',
      this.title ? '' : 'block' // Only add block if no title (for spacing)
    ].filter(Boolean).join(' ');
  }

  get ariaLabel(): string {
    if (this.title) {
      return `${this.title}: ${this.text}`;
    }
    return this.text;
  }
} 