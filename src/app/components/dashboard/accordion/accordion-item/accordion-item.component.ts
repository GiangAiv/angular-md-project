import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { checkRequiredProps, toBoolean } from '../util';

export interface AccordionItemProps {
  title: string;
  content: string;
  disabled?: boolean;
  customClass?: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.css'],
})
export class AccordionItemComponent {
  @Input() set title(value: string) {
    if (!value) {
      throw new Error('Title is required for accordion item');
    }
    this._title = value;
  }
  get title(): string {
    return this._title;
  }
  private _title = '';

  @Input() set content(value: string) {
    if (!value) {
      throw new Error('Content is required for accordion item');
    }
    this._content = value;
  }
  get content(): string {
    return this._content;
  }
  private _content = '';

  @Input() set disabled(value: string | boolean) {
    this._disabled = toBoolean(value);
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  @Input() set customClass(value: string) {
    this._customClass = value;
  }
  get customClass(): string {
    return this._customClass;
  }
  private _customClass = '';

  @Input() set expanded(value: string | boolean) {
    this._expanded = toBoolean(value);
  }
  get expanded(): boolean {
    return this._expanded;
  }
  private _expanded = false;

  @Output() expandedChange = new EventEmitter<boolean>();

  @ContentChild('titleTemplate') titleTemplate?: TemplateRef<any>;
  @ContentChild('contentTemplate') contentTemplate?: TemplateRef<any>;

  errors: string[] = [];

  ngOnInit() {
    try {
      checkRequiredProps({ title: this.title, content: this.content });
    } catch (err: any) {
      this.errors.push(err.message);
    }
  }

  toggleExpanded(): void {
    if (!this.disabled) {
      this._expanded = !this._expanded;
      this.expandedChange.emit(this._expanded);
    }
  }
}
