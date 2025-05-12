import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { AccordionItemComponent } from './accordion-item.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  standalone: true,
  imports: [AccordionItemComponent]
})
export class AccordionComponent implements AfterContentInit {
  @Input() single: boolean = false;
  @ContentChildren(AccordionItemComponent) items!: QueryList<AccordionItemComponent>;

  ngAfterContentInit() {
    if (this.single) {
      this.items.forEach(item => {
        item.expandedChange.subscribe((expanded: boolean) => {
          if (expanded) {
            this.items.forEach(otherItem => {
              if (otherItem !== item) {
                otherItem.expanded = false;
              }
            });
          }
        });
      });
    }
  }
} 