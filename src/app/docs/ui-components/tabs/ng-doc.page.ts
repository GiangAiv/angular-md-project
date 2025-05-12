import { NgDocPage } from '@ng-doc/core';
import UIComponentsCategory from '../ng-doc.category';
import { TabsDemoComponent } from './demos/tabs-demo.component';

const Tabs: NgDocPage = {
  title: 'Tabs',
  mdFile: './index.md',
  category: UIComponentsCategory,
  demos: { TabsDemoComponent }
};

export default Tabs; 