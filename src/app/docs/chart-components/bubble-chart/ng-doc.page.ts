import { NgDocPage } from '@ng-doc/core';
import ChartComponentsCategory from '../ng-doc.category';
import { BubbleChartDemoComponent } from './demos/bubble-chart-demo.component';

const BubbleChart: NgDocPage = {
  title: `Bubble Chart`,
  mdFile: './index.md',
  category: ChartComponentsCategory,
  demos: {BubbleChartDemoComponent}
};

export default BubbleChart;
