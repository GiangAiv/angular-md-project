import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NoteProps {
  title?: string;
  text: string;
  variant?: 'default' | 'muted' | 'highlight';
}

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  imports: [
    CommonModule
  ]
})
export class NoteComponent {
  @Input() props?: NoteProps;

  getContainerClasses(): string {
    const baseClasses = [
      'rounded-lg',
      'border',
      'p-4',
      'text-sm',
      'w-full',
      'leading-relaxed'
    ];

    // Add variant-specific classes
    switch (this.props?.variant || 'default') {
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

  getTitleClasses(): string {
    return [
      'font-semibold',
      'mb-1',
      'block'
    ].join(' ');
  }

  getTextClasses(): string {
    return [
      'leading-relaxed',
      this.props?.title ? '' : 'block' // Only add block if no title (for spacing)
    ].filter(Boolean).join(' ');
  }

  getAriaLabel(): string {
    if (this.props?.title) {
      return `${this.props.title}: ${this.props.text}`;
    }
    return this.props?.text || '';
  }
} 