import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { BaseComponent } from '../../../base-component';

interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  selected?: string;
  placeholder: string;
  disabled: boolean;
  width: 'auto' | 'full' | 'fixed';
}

const DEFAULT_PROPS: DropdownProps = {
  options: [],
  placeholder: 'Select an option',
  disabled: false,
  width: 'auto'
};

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class DropdownComponent extends BaseComponent<DropdownProps> implements OnInit {
  @Output() selectionChange = new EventEmitter<string>();

  isOpen = false;
  highlightedIndex = -1;

  constructor(private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    // Ensure all required properties have defaults
    this.props = {
      ...DEFAULT_PROPS,
      ...this.props,
      // Ensure options is always an array
      options: this.props?.options || []
    };
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.props) return;
    if (this.props?.disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        if (!this.isOpen) {
          this.openDropdown();
        } else if (this.highlightedIndex >= 0 && this.props.options[this.highlightedIndex]) {
          this.selectOption(this.props.options[this.highlightedIndex]);
        }
        event.preventDefault();
        break;
      case 'Escape':
        this.closeDropdown();
        event.preventDefault();
        break;
      case 'ArrowDown':
        if (!this.isOpen) {
          this.openDropdown();
        } else {
          this.highlightedIndex = Math.min(this.highlightedIndex + 1, this.props.options.length - 1);
          this.scrollToHighlighted();
        }
        event.preventDefault();
        break;
      case 'ArrowUp':
        if (!this.isOpen) {
          this.openDropdown();
        } else {
          this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
          this.scrollToHighlighted();
        }
        event.preventDefault();
        break;
    }
  }

  toggleDropdown() {
    if (!this.props) return;
    if (this.props.disabled) return;
    this.isOpen ? this.closeDropdown() : this.openDropdown();
  }

  openDropdown() {
    if (!this.props) return;
    if (this.props.disabled) return;
    this.isOpen = true;

    // Safely find the index of the selected option
    if (this.props.selected !== undefined) {
      this.highlightedIndex = this.props.options.findIndex(opt => opt.value === this.props?.selected);
    } else {
      this.highlightedIndex = -1;
    }
  }

  closeDropdown() {
    this.isOpen = false;
    this.highlightedIndex = -1;
  }

  selectOption(option: DropdownOption) {


    if (!this.props) return;
    if (this.props.disabled) return;
    if (this.props.selected === option.value) return;


    const updatedProps: DropdownProps = {
      ...this.props,
      options: [...this.props.options],
      selected: option.value
    };

    this.props = updatedProps;
    this.propsChange.emit(updatedProps);
    this.selectionChange.emit(option.value);
    this.closeDropdown();
  }

  getSelectedLabel(): string {
    if (!this.props) return '';
    if (this.props.selected === undefined) {
      return this.props.placeholder;
    }

    // Find the selected option
    const selectedOption = this.props.options.find(opt => opt.value === this.props?.selected);
    return selectedOption?.label ?? this.props.placeholder;
  }

  getContainerClasses(): string {
    if (!this.props) return '';
    const baseClasses = ['relative', 'text-xs'];

    switch (this.props.width) {
      case 'full':
        baseClasses.push('w-full');
        break;
      case 'fixed':
        baseClasses.push('w-64');
        break;
      default:
        baseClasses.push('inline-block');
        break;
    }

    return baseClasses.join(' ');
  }

  getButtonClasses(): string {
    if (!this.props) return '';
    return [
      'flex',
      "items-center",
      "gap-2",
      'w-full',
      'bg-white',
      'border',
      'border-gray-300',
      'rounded-md',
      'px-4',
      'py-2',
      'text-left',
      'shadow-sm',
      'focus:outlin2',
      'focus:ring-gray-100',
      this.props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      this.isOpen ? 'ring-2 ring-gray-100' : ''
    ].join(' ');
  }

  getOptionClasses(option: DropdownOption, index: number): string {
    if (!this.props) return '';
    return [
      'text-xs',
      'cursor-pointer',
      'px-4',
      'py-2',
      'text-sm',
      'hover:bg-gray-100',
      option.value === this.props.selected ? 'font-semibold text-dark' : 'text-gray-700',
      index === this.highlightedIndex ? 'bg-gray-100' : ''
    ].join(' ');
  }

  private scrollToHighlighted() {
    if (this.highlightedIndex < 0) return;

    requestAnimationFrame(() => {
      const optionElements = this.elementRef.nativeElement.querySelectorAll('[role="option"]');
      const highlightedElement = optionElements[this.highlightedIndex];
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: 'nearest' });
      }
    });
  }
}