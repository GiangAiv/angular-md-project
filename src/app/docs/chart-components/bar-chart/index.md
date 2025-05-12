# {{ NgDocPage.title }}

The Bar Chart component is a versatile visualization tool that displays data using rectangular bars with lengths proportional to the values they represent. It's ideal for comparing quantities across different categories and showing trends over time.

## Importing

{% include "../shared/import-alert.md" %}

To use the `BarChartComponent` in your project, you need to import it from our library:

```typescript fileName="app.module.ts"
import { BarChartComponent } from 'my-lib';

@NgModule({
  imports: [BarChartComponent]
})
export class AppModule {}
```

## Basic Usage

To create a bar chart using our library, you can use the following code:

```typescript
<app-bar-chart
  [data]="[
    { month: 'Jan', sales: 100 },
    { month: 'Feb', sales: 200 },
    { month: 'Mar', sales: 150 }
  ]"
  x="month"
  y="sales"
  title="Monthly Sales"
></app-bar-chart>
```

{{ NgDocActions.demo("BarChartDemoComponent") }}

## Chart Types

The component supports different chart types:

- `bar`: Standard vertical bar chart
- `horizontalBar`: Horizontal bar chart
- `stackedBar`: Stacked bar chart
- `stackedHorizontalBar`: Stacked horizontal bar chart

```typescript
<app-bar-chart
  [data]="data"
  x="month"
  y="sales"
  type="horizontalBar"
  title="Product Sales"
></app-bar-chart>
```

{{ NgDocActions.demo("BarChartDemoComponent") }}

## Styling

You can customize the appearance using various properties:

```typescript
<app-bar-chart
  [data]="data"
  x="month"
  y="sales"
  barColor="rgb(59, 130, 246)"
  borderColor="rgb(37, 99, 235)"
  [showLegend]="true"
  title="Monthly Sales"
  yAxisTitle="Sales"
  xAxisTitle="Month"
></app-bar-chart>
```

{{ NgDocActions.demo("BarChartDemoComponent") }}

## Features

The component supports various features:

- Multiple chart types (vertical, horizontal, stacked)
- Custom bar colors and borders
- Axis customization
- Interactive tooltips
- Image download
- Currency formatting
- Grid lines and labels
- Legend display

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| data | any[] | [] | Array of data points |
| x | string | 'region' | Field name for x-axis values |
| y | string | 'revenue' | Field name for y-axis values |
| type | string | 'bar' | Type of bar chart |
| title | string | '' | Chart title |
| barColor | string | '#0070f3' | Color for bars |
| borderColor | string | '#0070f3' | Color for bar borders |
| showLegend | boolean | true | Show chart legend |
| yFmt | string | '' | Format string for y-axis values |
| yAxisTitle | string | '' | Title for y-axis |
| xAxisTitle | string | '' | Title for x-axis |
| chartAreaHeight | number | 300 | Height of chart area in pixels |
| labels | boolean | true | Show data labels |
| xGridlines | boolean | true | Show x-axis gridlines |
| yGridlines | boolean | true | Show y-axis gridlines |
| downloadableImage | boolean | false | Enable image download |

<div id="end"></div> 