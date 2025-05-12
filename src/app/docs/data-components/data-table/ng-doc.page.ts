import { NgDocPage } from '@ng-doc/core';
import DataComponentsCategory from '../ng-doc.category';
import { DataTableDemoComponent } from './demos/data-table-demo.component';

const DataTable: NgDocPage = {
  title: 'DataTable',
  mdFile: './index.md',
  category: DataComponentsCategory,
  demos: {DataTableDemoComponent}
};

export default DataTable;