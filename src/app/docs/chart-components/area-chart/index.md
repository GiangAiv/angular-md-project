# {{ NgDocPage.title }}

The Area Chart component is a versatile visualization tool that displays data as a filled area between the x-axis and the line connecting data points. It's perfect for showing trends and cumulative values over time.

## Importing

{% include "../shared/import-alert.md" %}

To use the `AreaChartComponent` in your project, you need to import it from our library:

```typescript fileName="app.module.ts"
import { AreaChartComponent } from 'my-lib';

@NgModule({
  imports: [AreaChartComponent]
})
export class AppModule {}
```

## Basic Usage

To create an area chart using our library, you can use the following code:

{{ NgDocActions.demo("AreaChartDemoComponent") }}

## Chart Types

The component supports different chart types:

- `area`: Standard area chart
- `stacked`: Stacked area chart
- `stacked100`: 100% stacked area chart
- `stepped`: Stepped area chart

```typescript
<app-area-chart
  [data]="data"
  x="month"
  y="sales"
  chartType="stacked"
></app-area-chart>
```

## Styling

You can customize the appearance using various properties:

```typescript
<app-area-chart
  [data]="data"
  x="month"
  y="sales"
  fillColor="rgba(59, 130, 246, 0.2)"
  lineColor="rgb(59, 130, 246)"
  [line]="true"
  [markers]="true"
  markerShape="circle"
  [markerSize]="4"
></app-area-chart>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| data | any[] | [] | Array of data points |
| x | string | '' | Field name for x-axis values |
| y | string | '' | Field name for y-axis values |
| series | string | '' | Field name for series grouping |
| chartType | 'area' \| 'stacked' \| 'stacked100' \| 'stepped' | 'area' | Type of area chart |
| title | string | '' | Chart title |
| fillColor | string | undefined | Color for area fill |
| lineColor | string | undefined | Color for line |
| line | boolean | true | Show line |
| markers | boolean | false | Show data point markers |
| markerShape | string | 'circle' | Shape of markers |
| markerSize | number | 3 | Size of markers |
| handleMissing | 'gap' \| 'zero' \| 'connect' | 'gap' | How to handle missing data |
| step | boolean | false | Use stepped lines |
| stepPosition | 'start' \| 'middle' \| 'end' | 'middle' | Position of steps |
| showLabels | boolean | true | Show data labels |
| labelSize | number | 12 | Size of labels |
| labelPosition | 'top' \| 'bottom' \| 'middle' | 'top' | Position of labels |
| downloadableImage | boolean | false | Enable image download |


<div id="end"></div> 