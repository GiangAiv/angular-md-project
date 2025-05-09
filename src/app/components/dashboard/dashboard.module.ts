import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { CardComponent } from './card/card.component';
import { ChartComponent } from './chart/chart.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { TableComponent } from './table/table.component';

import { MarkdownModule } from 'ngx-markdown';
import { MarkdownRenderModule } from '../markdown/markdown.module';
import { AccordionItemComponent } from './accordion/accordion-item/accordion-item.component';
import { AccordionComponent } from './accordion/accordion.component';
import { InfoComponent } from './accordion/info/info.component';
import { InlineErrorComponent } from './accordion/inline-error/inline-error.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ModalComponent } from './modal/modal.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [
    // charts

    ChartComponent,
    BarChartComponent,
    AreaChartComponent,
    LineChartComponent,
    BubbleChartComponent,

    // info
    InfoCardComponent,

    // cards
    CardComponent,

    // tables
    TableComponent,

    // tabs
    TabsComponent,
    InlineErrorComponent,
    InfoComponent,


    AccordionComponent,
    AccordionItemComponent,

    
    // core components
    ModalComponent,

  ],
  imports: [CommonModule, MarkdownRenderModule, MarkdownModule.forChild()],
  exports: [
    CardComponent,
    TableComponent,
    BarChartComponent,
    ChartComponent,
    TabsComponent,
    AccordionComponent,
    AccordionItemComponent,
  ],
})
export class DashboardModule {}
