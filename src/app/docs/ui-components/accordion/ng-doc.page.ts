import { NgDocPage } from '@ng-doc/core';
import { AccordionItemComponent } from 'src/app/code/accordion/accordion-item.component';
import UIComponentsCategory from '../ng-doc.category';
import { BasicAccordionDemoComponent } from './demos/basic-accordion-demo.component';

const Accordion: NgDocPage = {
  title: `Accordion`,
  mdFile: './index.md',
  category: UIComponentsCategory,
  demos: { BasicAccordionDemoComponent },
  playgrounds: {
    AccordionPlayground: {
      target: AccordionItemComponent,
      inputs: {
        title: 'My Accordion',
        compact: true
      },
      template: `<ng-doc-selector>Content</ng-doc-selector>`,
    }
  },
};

export default Accordion;
