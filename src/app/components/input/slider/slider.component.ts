import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../../base-component';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value?: number;
  disabled: boolean;
  showValue: boolean;
}

const DEFAULT_PROPS: SliderProps = {
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showValue: true
};

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  standalone: true,
  imports: [
    CommonModule
  ],
  styleUrls: ['./slider.component.css']
})
export class SliderComponent extends BaseComponent<SliderProps> implements OnInit {
  @Output() valueChange = new EventEmitter<number>();

  private _internalValue: number = 0;

  get currentValue(): number {
    return this._internalValue;
  }

  set currentValue(val: number) {
    if (!this.props || val === this._internalValue) return;
    
    // Ensure value is within bounds and follows step
    const normalized = Math.min(Math.max(val, this.props.min), this.props.max);
    const stepped = Math.round(normalized / this.props.step) * this.props.step;
    
    if (stepped === this._internalValue) return;

    this._internalValue = stepped;
    
    const updatedProps: SliderProps = {
      ...this.props,
      value: stepped
    };
    
    this.props = updatedProps;
    this.propsChange.emit(updatedProps);
    this.valueChange.emit(stepped);
  }

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
    
    // Initialize internal value
    this._internalValue = this.props.value ?? this.props.min;
  }

  ngOnChanges() {
    if (this.props?.value !== undefined) {
      this._internalValue = this.props.value;
    }
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.currentValue = parseFloat(input.value);
  }

  getContainerClasses(): string {
    if (!this.props) return '';
    
    return [
      'flex',
      'items-center',
      'gap-4',
      'w-full',
      this.props.disabled ? 'opacity-50 cursor-not-allowed' : ''
    ].join(' ');
  }

  getSliderClasses(): string {
    if (!this.props) return '';
    
    return [
      'flex-1',
      'h-2',
      'rounded',
      'bg-gray-200',
      'appearance-none',
      'cursor-pointer',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-blue-500',
      'focus:ring-offset-2',
      this.props.disabled ? 'cursor-not-allowed' : ''
    ].join(' ');
  }

  getValueClasses(): string {
    if (!this.props) return '';
    
    return [
      'min-w-[3rem]',
      'text-sm',
      'font-medium',
      'text-gray-700',
      this.props.disabled ? 'text-gray-400' : ''
    ].join(' ');
  }

  formatValue(value: number): string {
    if (!this.props) return '0';
    
    // Handle decimal places based on step
    const decimalPlaces = this.props.step.toString().split('.')[1]?.length || 0;
    return value.toFixed(decimalPlaces);
  }
} 