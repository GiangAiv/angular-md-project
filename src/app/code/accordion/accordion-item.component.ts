import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AccordionItemComponent {
  @Input() title: string = '';
  @Input() description?: string;
  @Input() compact: boolean = false;
  @Input() expanded: boolean = false;
  @Output() expandedChange = new EventEmitter<boolean>();

  @ContentChild('titleTemplate') titleTemplate?: TemplateRef<any>;

  toggle() {
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }
} 