// src/app/services/markdown/dashboard-component-registry.service.ts
import { Injectable } from '@angular/core';
import { AccordionItemComponent } from 'src/app/components/dashboard/accordion/accordion-item/accordion-item.component';
import { AccordionComponent } from 'src/app/components/dashboard/accordion/accordion.component';
import { AreaChartComponent } from 'src/app/components/dashboard/area-chart/area-chart.component';
import { BubbleChartComponent } from 'src/app/components/dashboard/bubble-chart/bubble-chart.component';
import { LineChartComponent } from 'src/app/components/dashboard/line-chart/line-chart.component';
import { ModalComponent } from 'src/app/components/dashboard/modal/modal.component';
import {
  TabItem,
  TabsComponent,
} from 'src/app/components/dashboard/tabs/tabs.component';
import { BarChartComponent } from '../../components/dashboard/bar-chart/bar-chart.component';
import { CardComponent } from '../../components/dashboard/card/card.component';
import { ChartComponent } from '../../components/dashboard/chart/chart.component';
import { TableComponent } from '../../components/dashboard/table/table.component';
import { ComponentRegistryService } from './component-registry.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardComponentRegistryService {
  private componentsRegistered = false;

  constructor(private componentRegistry: ComponentRegistryService) {}

  /**
   * Register all dashboard components with the component registry
   */
  registerComponents(): void {
    // Avoid registering components multiple times
    if (this.componentsRegistered) {
      return;
    }

    // Register Card component
    this.componentRegistry.register({
      type: 'Card',
      name: 'Card',
      description: 'A card component for displaying metric information',
      render: (props) => {
        return {
          component: CardComponent,
          props,
        };
      },
    });

    // Register Chart component
    this.componentRegistry.register({
      type: 'Chart',
      name: 'Chart',
      description: 'A chart component for data visualization',
      render: (props) => {
        return {
          component: ChartComponent,
          props,
        };
      },
    });

    // Register Table component
    this.componentRegistry.register({
      type: 'Table',
      name: 'Table',
      description: 'A table component for displaying tabular data',
      render: (props) => {
        return {
          component: TableComponent,
          props,
        };
      },
    });

    // Register AreaChart component
    this.componentRegistry.register({
      type: 'AreaChart',
      name: 'Area Chart',
      description: 'A specialized area chart component',
      render: (props) => {
        console.log('AreaChart props:', props);
        return {
          component: AreaChartComponent,
          props,
        };
      },
    });

    // Register BoxPlot component
    // this.componentRegistry.register({
    //   type: 'BoxPlot',
    //   name: 'Box Plot',
    //   description: 'A specialized box plot component',
    //   render: (props) => {
    //     console.log('BoxPlot props:', props);
    //     return {
    //       component: BoxPlotComponent,
    //       props,
    //     };
    //   },
    // });


    // Register BubbleChart component
    this.componentRegistry.register({
      type: 'BubbleChart',
      name: 'Bubble Chart',
      description: 'A specialized bubble chart component',
      render: (props) => {
        return {
          component: BubbleChartComponent,
          props,
        };
      },
    });


    // Register LineChart component
    this.componentRegistry.register({
      type: 'LineChart',
      name: 'Line Chart',
      description: 'A specialized line chart component',
      render: (props) => {  
        return {
          component: LineChartComponent,
          props,
        };
      },
    });

    // Register BarChart component
    this.componentRegistry.register({
      type: 'BarChart',
      name: 'Bar Chart',
      description: 'A specialized bar chart component',
      render: (props) => {
        return {
          component: BarChartComponent,
          props,
        };
      },
    });
    this.componentRegistry.register({
      type: 'Accordion',
      name: 'Accordion',
      description: 'A specialized accordion component',
      render: (props) => {
        console.log('Accordion props:', props);
        return {
          component: AccordionComponent,
          props,
        };
      },
    });
    this.componentRegistry.register({
      type: 'AccordionItem',
      name: 'Accordion Item',
      description: 'A specialized accordion item component',
      render: (props) => {
        return {
          component: AccordionItemComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: 'Modal',
      name: 'Modal',
      description: 'A modal component for displaying modal content',
      render: (props) => {
        console.log('Modal props:', props);
        return {
          component: ModalComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: 'Tabs',
      name: 'Tabs',
      description: 'A tabbed container for dashboard components',
      render: (props) => {
        // Extract the tabs from the children content
        const tabs = this.extractTabsContent(props.children || '');

        return {
          component: TabsComponent,
          props: {
            tabs: tabs,
            defaultTabId: props.defaultTabId,
          },
        };
      },
    });

    // this.componentRegistry.register({
    //   type: 'Tab',
    //   name: 'Tab',
    //   description: 'Tab content container - only used inside Tabs component',
    //   render: (props) => {
    //     // This is a placeholder render function since Tab components
    //     // are processed by the Tabs component and never rendered directly
    //     console.warn(
    //       'Tab component should not be rendered directly, only within Tabs.',
    //     );
    //     return {
    //       // Return an empty div or message if somehow rendered directly
    //       component: 'div', // Or a placeholder component
    //       props: {
    //         children:
    //           'Tab components should only be used within Tabs component',
    //       },
    //     };
    //   },
    // });

    this.componentsRegistered = true;
  }
  private extractTabsContent(children: string): TabItem[] {
    console.log('Children content to extract tabs from:', children); // Debug log

    if (!children || children.trim() === '') {
      console.warn('No children content provided to extract tabs from');
      return [];
    }

    const tabs: TabItem[] = [];

    // Improved regex for Tab components that handles more variations in format
    // This regex is more robust in handling whitespace and newlines
    const tabRegex =
      /<Tab\s+id=["']([^"']*)["']\s+title=["']([^"']*)["']\s*(?:>)([\s\S]*?)(?:<\/Tab>)/g;

    let match;
    let matchCount = 0;

    // Loop through all matches
    while ((match = tabRegex.exec(children)) !== null) {
      matchCount++;
      console.log(`Found Tab match #${matchCount}:`, match[1], match[2]); // Debug log

      const id = match[1];
      const title = match[2];
      const content = match[3].trim();

      console.log(`Tab content length: ${content.length} characters`); // Debug log

      tabs.push({
        id,
        title,
        content,
      });
    }

    if (tabs.length === 0) {
      console.warn(
        'No tabs extracted from children content. Check your Tab component format.',
      );

      // Log a sample of the children content to help diagnose the issue
      console.log('Children content sample:', children.substring(0, 200));

      // Try an alternative regex approach if the first one fails
      const simpleTabRegex = /<Tab[^>]*>([\s\S]*?)<\/Tab>/g;
      let simpleMatch;

      while ((simpleMatch = simpleTabRegex.exec(children)) !== null) {
        console.log(
          'Found Tab with simple regex. Content length:',
          simpleMatch[1].length,
        );
      }
    }

    console.log('tabs:', tabs);
    return tabs;
  }
}
