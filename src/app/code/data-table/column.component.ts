import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table-column',
  standalone: true,
  template: ''
})
export class TableColumnComponent {
  @Input() key!: string;
  @Input() label!: string;
  @Input() width?: string;
  @Input() minWidth?: string;
  @Input() sortable = false;
  @Input() headerClass?: string;
  @Input() cellClass?: string;
  @Input() template?: TemplateRef<any>;
} 