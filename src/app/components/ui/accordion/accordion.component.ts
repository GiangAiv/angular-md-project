// accordion.component.ts
import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { AccordionItemComponent, AccordionItemProps } from './accordion-item/accordion-item.component';
import { toBoolean } from './util';
// Assuming you have this utility



interface AccordionProps {
  single?: string | boolean;
  class?: string;
  items?: AccordionItemProps[];
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent extends BaseComponent<AccordionProps> {
  @Input() set single(value: string | boolean) {
    this._single = toBoolean(value);
  }
  get single(): boolean {
    return this._single;
  }
  private _single = false;

  @Input() class?: string;

  @ContentChildren(AccordionItemComponent)
  items?: QueryList<AccordionItemComponent>;

  hasItems(): boolean {
    return this.items !== undefined && this.items.length > 0;
  }

  isPanelOpen(index: number): boolean {
    if (!this.props?.items) return false;
    return this.props.items[index]?.expanded || false;
  }

  onPanelExpanded(index: number, expanded: boolean): void {
    if (!this.props?.items) return;

    if (this.single && expanded) {
      // Close all other panels
      this.props.items.forEach((item, i) => {
        if (i !== index) {
          item.expanded = false;
        }
      });
    }

    // Update the clicked panel's state
    this.props.items[index].expanded = expanded;
  }
}
