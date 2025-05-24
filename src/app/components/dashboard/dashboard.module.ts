import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { CardComponent } from './card/card.component';
import { ChartComponent } from './chart/chart.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { TableComponent } from '../ui/table/table.component';

import { MarkdownModule } from 'ngx-markdown';
import { MarkdownRenderModule } from '../markdown/markdown.module';
import { AccordionItemComponent } from '../ui/accordion/accordion-item/accordion-item.component';
import { AccordionComponent } from '../ui/accordion/accordion.component';
import { InfoComponent } from '../ui/accordion/info/info.component';
import { InlineErrorComponent } from '../ui/accordion/inline-error/inline-error.component';
import { AlertComponent } from '../ui/alert/alert.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { DetailsComponent } from '../ui/details/details.component';
import { DownloadDataComponent } from '../ui/download-data/download-data.component';
import { EmbedComponent } from '../ui/embed/embed.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { RenderHtmlComponent } from './render-html/render-html.component';
import { TabsComponent } from '../ui/tabs/tabs.component';

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
    AlertComponent,
    DetailsComponent,
    DownloadDataComponent,
    EmbedComponent,
    RenderHtmlComponent

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
