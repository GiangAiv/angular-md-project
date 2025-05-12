 import { Component } from '@angular/core';
import { AccordionItemComponent } from 'src/app/code/accordion/accordion-item.component';
import { AccordionComponent } from 'src/app/code/accordion/accordion.component';

@Component({
  selector: 'app-basic-accordion-demo',
  template: `
    <app-accordion>
      <app-accordion-item title="Getting Started">
        Learn how to get started with our platform and set up your first project.
      </app-accordion-item>
      <app-accordion-item title="Features">
        Explore the powerful features and capabilities of our platform.
      </app-accordion-item>
      <app-accordion-item title="API Reference">
        Detailed documentation of our API endpoints and methods.
      </app-accordion-item>
    </app-accordion>
  `,
  standalone: true,
  imports: [AccordionComponent, AccordionItemComponent]
})
export class BasicAccordionDemoComponent {}