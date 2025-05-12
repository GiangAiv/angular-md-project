import { NgDocPage } from '@ng-doc/core';
import ChartComponentsCategory from '../ng-doc.category';
import { AreaChartDemoComponent } from './demos/area-chart-demo.component';

const AreaChart: NgDocPage = {
  title: `Area Chart`,
  mdFile: './index.md',
  category: ChartComponentsCategory,
  demos: {AreaChartDemoComponent}
};

export default AreaChart;
