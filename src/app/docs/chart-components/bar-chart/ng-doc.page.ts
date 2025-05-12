import { NgDocPage } from '@ng-doc/core';
import ChartComponentsCategory from '../ng-doc.category';
import { BarChartDemoComponent } from './demos/bar-chart-demo.component';

const BarChart: NgDocPage = {
  title: `Bar Chart`,
  mdFile: './index.md',
  category: ChartComponentsCategory,
  demos: {BarChartDemoComponent}
};

export default BarChart;
