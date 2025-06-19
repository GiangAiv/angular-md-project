// src/app/services/markdown/dashboard-component-registry.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccordionItemComponent } from 'src/app/components/ui/accordion/accordion-item/accordion-item.component';
import { AccordionComponent } from 'src/app/components/ui/accordion/accordion.component';
import { AreaChartComponent } from 'src/app/components/dashboard/area-chart/area-chart.component';
import { BubbleChartComponent } from 'src/app/components/dashboard/bubble-chart/bubble-chart.component';
import { LineChartComponent } from 'src/app/components/dashboard/line-chart/line-chart.component';
import { ModalComponent } from 'src/app/components/ui/modal/modal.component';
import {
  TabItem,
  TabsComponent,
} from 'src/app/components/ui/tabs/tabs.component';
import { BarChartComponent } from '../../components/dashboard/bar-chart/bar-chart.component';
import { CardComponent } from '../../components/dashboard/card/card.component';
import { ChartComponent } from '../../components/dashboard/chart/chart.component';
import { TableComponent } from '../../components/ui/table/table.component';
import { ComponentRegistryService } from './component-registry.service';
import { ValueComponent } from '../../components/data/value/value.component';
import { DeltaComponent } from '../../components/data/delta/delta.component';
import { BigValueComponent } from '../../components/data/big-value/big-value.component';
import { DataTableComponent } from '../../components/data/data-table/data-table.component';
import { ButtonGroupComponent } from '../../components/input/button-group/button-group.component';
import { CheckboxComponent } from '../../components/input/checkbox/checkbox.component';
import { DateInputComponent } from '../../components/input/date-input/date-input.component';
import { DateRangeComponent } from '../../components/input/date-range/date-range.component';
import { DimensionGridComponent } from 'src/app/components/input/dimension-grid/dimension-grid.component';
import { DropdownComponent } from 'src/app/components/input/dropdown/dropdown.component';
import { SliderComponent } from 'src/app/components/input/slider/slider.component';
import { TextInputComponent } from 'src/app/components/input/text-input/text-input.component';
import { AlertComponent } from 'src/app/components/ui/alert/alert.component';
import { DetailsComponent } from 'src/app/components/ui/details/details.component';
import { DownloadDataComponent } from 'src/app/components/ui/download-data/download-data.component';
import { EmbedComponent } from 'src/app/components/ui/embed/embed.component';
import { ImageComponent } from 'src/app/components/ui/image/image.component';
import { InfoComponent } from 'src/app/components/ui/info/info.component';
import { LastRefreshedComponent } from 'src/app/components/ui/last-refreshed/last-refreshed.component';
import { LineBreakComponent } from 'src/app/components/ui/line-break/line-break.component';
import { LinkComponent } from 'src/app/components/ui/link/link.component';
import { LinkButtonComponent } from 'src/app/components/ui/link-button/link-button.component';
import { NoteComponent } from 'src/app/components/ui/note/note.component';
import { PageBreakComponent } from 'src/app/components/ui/page-break/page-break.component';
import { RenderHtmlComponent } from 'src/app/components/dashboard/render-html/render-html.component';
import { KanbanComponent } from 'src/app/components/kanban';



@Injectable({
  providedIn: 'root',
})
export class DashboardComponentRegistryService {
  private componentsRegistered = false;

  // Immutable state management for variables
  private variablesSubject = new BehaviorSubject<Record<string, any>>({});
  public variables$ = this.variablesSubject.asObservable();

  constructor(private componentRegistry: ComponentRegistryService) {}

  /**
   * Get current variables state
   */
  getVariables(): Record<string, any> {
    return { ...this.variablesSubject.value };
  }

  /**
   * Get a specific variable value
   */
  getVariable(key: string): any {
    return this.variablesSubject.value[key];
  }

  /**
   * Set variables (immutable update)
   */
  setVariables(variables: Record<string, any>): void {
    const currentVariables = this.variablesSubject.value;
    const newVariables = { ...currentVariables, ...variables };
    this.variablesSubject.next(newVariables);
  }

  /**
   * Set a single variable (immutable update)
   */
  setVariable(key: string, value: any): void {
    const currentVariables = this.variablesSubject.value;
    const newVariables = { ...currentVariables, [key]: value };
    this.variablesSubject.next(newVariables);
  }

  /**
   * Update a variable with a function (immutable update)
   */
  updateVariable(key: string, updateFn: (currentValue: any) => any): void {
    const currentVariables = this.variablesSubject.value;
    const currentValue = currentVariables[key];
    const newValue = updateFn(currentValue);
    const newVariables = { ...currentVariables, [key]: newValue };
    this.variablesSubject.next(newVariables);
  }

  /**
   * Clear all variables
   */
  clearVariables(): void {
    this.variablesSubject.next({});
  }

  /**
   * Subscribe to variable changes
   */
  subscribeToVariables(): Observable<Record<string, any>> {
    return this.variables$;
  }

  /**
   * Subscribe to a specific variable changes
   */
  subscribeToVariable(key: string): Observable<any> {
    return this.variables$.pipe(
      map(variables => variables[key])
    );
  }

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

    // Data
    this.componentRegistry.register({
      type: 'Value',
      name: 'Value',
      description: 'A value component for displaying a value',
      render: (props) => {
        return {
          component: ValueComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: 'Delta',
      name: 'Delta',
      description: 'A delta component for displaying a delta',
      render: (props) => {
        return {
          component: DeltaComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: 'BigValue',
      name: 'Big Value',
      description: 'A big value component for displaying a big value',
      render: (props) => {
        return {
          component: BigValueComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: 'DataTable',
      name: 'Data Table',
      description: 'A data table component for displaying a data table',
      render: (props) => {
        return {
          component: DataTableComponent,
          props,
        };
      },
    });
    

    // INPUT
    this.componentRegistry.register({
      type: 'ButtonGroup',
      name: 'Button Group',
      description: 'A button group component for displaying a button group',
      render: (props) => {
        return {
          component: ButtonGroupComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: 'Checkbox',
      name: 'Checkbox',
      description: 'A checkbox component for displaying a checkbox',
      render: (props) => {
        return {
          component: CheckboxComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: 'DateInput',
      name: 'Date Input',
      description: 'A date input component for displaying a date input',
      render: (props) => {
        return {
          component: DateInputComponent,
          props,
        };
      },
    });
    this.componentRegistry.register({
      type: "DateRange",
      name: "Date Range",
      description: "A date range input component for displaying a date range input",
      render: (props) => {
        return {
          component: DateRangeComponent,
          props,
        };
      },
    });
    this.componentRegistry.register({
      type: "DimensionGrid",
      name: "Dimension Grid",
      description: "A dimension grid component for displaying a dimension grid",
      render: (props) => {
        return {
          component: DimensionGridComponent,
          props,
        };
      },
    });
    this.componentRegistry.register({
      type: "Dropdown",
      name: "Dropdown",
      description: "A dropdown component for displaying a dropdown",
      render: (props) => {
        return {
          component: DropdownComponent,
          props,
        };
      },
    });
    this.componentRegistry.register({
      type: "Slider",
      name: "Slider",
      description: "A slider component for displaying a slider",
      render: (props) => {
        return {
          component: SliderComponent,
          props,
        };
      },
    });
    this.componentRegistry.register({
      type: "TextInput",
      name: "Text Input",
      description: "A text input component for displaying a text input",
      render: (props) => {
        return {
          component: TextInputComponent,
          props,
        };
      },
    });



    // UI
    this.componentRegistry.register({
      type: "Alert",
      name: "Alert",
      description: "An alert component for displaying an alert",
      render: (props) => {
        return {
          component: AlertComponent,
          props,
        };
      },
    });
    this.componentRegistry.register({
      type: "Details",
      name: "Details",
      description: "A details component for displaying details",
      render: (props) => {
        return {
          component: DetailsComponent,
          props,
        };
      },
    });
    this.componentRegistry.register({
      type: "DownloadData",
      name: "Download Data",
      description: "A download data component for displaying a download data",
      render: (props) => {
        return {
          component: DownloadDataComponent,
          props,
        };
      },
    });
    this.componentRegistry.register({
      type:"Embed",
      name:"Embed",
      description:"An embed component for displaying an embed",
      render: (props) => {
        return {
          component: EmbedComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: "Image",
      name: "Image",
      description: "An image component for displaying an image",
      render: (props) => {
        return {
          component: ImageComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: "Info",
      name: "Info",
      description: "An info component for displaying an info",
      render: (props) => {
        return {
          component: InfoComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: "LastRefreshed",
      name: "Last Refreshed",
      description: "A last refreshed component for displaying a last refreshed",
      render: (props) => {
        return {
          component: LastRefreshedComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: "LineBreak",
      name: "Line Break",
      description: "A line break component for displaying a line break",
      render: (props) => {
        return {
          component: LineBreakComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: "Link",
      name: "Link",
      description: "A link component for displaying a link",
      render: (props) => {
        return {
          component: LinkComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: "LinkButton",
      name: "Link Button",
      description: "A link button component for displaying a link button",
      render: (props) => {
        return {
          component: LinkButtonComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: "Note",
      name: "Note",
      description: "A note component for displaying a note",
      render: (props) => {
        return {
          component: NoteComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: "PageBreak",
      name: "Page Break",
      description: "A page break component for displaying a page break",
      render: (props) => {
        return {
          component: PageBreakComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: "RenderHtml",
      name: "Render Html",
      description: "A render html component for displaying a render html",
      render: (props) => {
        return {
          component: RenderHtmlComponent,
          props,
        };
      },
    });

    this.componentRegistry.register({
      type: "Kanban",
      name: "Kanban",
      description: "A kanban component for displaying a kanban",
      render: (props) => {
        return {
          component: KanbanComponent,
          props,
        };
      },
    });

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
