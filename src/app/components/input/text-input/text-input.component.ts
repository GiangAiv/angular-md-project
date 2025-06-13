import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../../base-component';

interface TextInputProps {
  value?: string;
  label?: string;
  placeholder?: string;
  disabled: boolean;
  readonly: boolean;
  type: string;
  name?: string;
  autocomplete?: string;
}

const DEFAULT_PROPS: TextInputProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readonly: false,
  type: 'text'
};

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class TextInputComponent extends BaseComponent<TextInputProps> implements OnInit {
  @Output() valueChange = new EventEmitter<string>();

  // Generate unique ID for input-label association
  private readonly inputId = `text-input-${Math.random().toString(36).substr(2, 9)}`;

  ngOnInit() {
    // Initialize with default props if not set
    if (!this.props) {
      this.props = DEFAULT_PROPS;
    } else {
      // Ensure all required properties have defaults
      this.props = {
        ...DEFAULT_PROPS,
        ...this.props
      };
    }
  }

  getContainerClasses(): string {
    return [
      'flex',
      'flex-col',
      'gap-1',
      'w-full'
    ].join(' ');
  }

  getLabelClasses(): string {
    if (!this.props) return '';
    
    return [
      'text-sm',
      'font-medium',
      'text-gray-700',
      this.props.disabled ? 'opacity-50' : ''
    ].join(' ');
  }

  getInputClasses(): string {
    if (!this.props) return '';
    
    return [
      'px-3',
      'py-2',
      'border',
      'border-gray-300',
      'rounded-md',
      'shadow-sm',
      'text-sm',
      'text-gray-900',
      'placeholder-gray-400',
      'w-full',
      'transition-colors',
      'duration-150',
      // Focus state
      'focus:outline-none',
      'focus:ring-1',
      'focus:ring-gray-400',
      'focus:border-gray-400',
      // Disabled state
      this.props.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : '',
      // Readonly state
      this.props.readonly ? 'bg-gray-100 text-gray-600' : ''
    ].join(' ');
  }

  onInput(event: Event): void {
    if (!this.props) return;
    
    const input = event.target as HTMLInputElement;
    const updatedProps: TextInputProps = {
      ...this.props,
      value: input.value
    };
    
    this.props = updatedProps;
    this.propsChange.emit(updatedProps);
    this.valueChange.emit(input.value);
  }

  getId(): string {
    if (!this.props?.name) return this.inputId;
    return `${this.inputId}-${this.props.name}`;
  }

  getAriaLabel(): string | undefined {
    if (!this.props) return undefined;
    return this.props.label || this.props.placeholder || undefined;
  }
} 