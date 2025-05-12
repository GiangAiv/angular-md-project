import { NgDocPage } from '@ng-doc/core';
import { ModalComponent } from 'src/app/code/modal/modal.component';
import UIComponentsCategory from '../ng-doc.category';
import { ModalDemoComponent } from './demos/modal-demo.component';

const Modal: NgDocPage = {
  title: 'Modal',
  mdFile: './index.md',
  category: UIComponentsCategory,
  demos: { ModalDemoComponent },
  playgrounds: {
    ModalPlayground: {
      target: ModalComponent,
      inputs: {
        open: false,
        title: 'Modal Title',
        size: 'md',
        buttonText: 'Open Modal',
        innerText: 'Modal Content'
      },
      template: `<ng-doc-selector>Modal Content</ng-doc-selector>`
    }
  }
};

export default Modal; 