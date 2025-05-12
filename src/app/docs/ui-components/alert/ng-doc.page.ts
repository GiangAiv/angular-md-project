import { NgDocPage } from '@ng-doc/core';
import { AlertComponent } from 'src/app/code/alert/alert.component';
import UIComponentsCategory from '../ng-doc.category';
import { AlertDemoComponent } from './demos/alert-demo.component';

const Alert: NgDocPage = {
  title: `Alert`,
  mdFile: './index.md',
  category: UIComponentsCategory,
  demos: {AlertDemoComponent},
  playgrounds: {
    AlertPlayground: {
      target: AlertComponent,
      template: `<ng-doc-selector>My Alert</ng-doc-selector>`,
    }
  },
};

export default Alert;
