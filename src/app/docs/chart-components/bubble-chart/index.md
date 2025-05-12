# {{ NgDocPage.title }}

The Bubble Chart component is a powerful visualization tool that displays three dimensions of data using x and y coordinates and bubble size. It's perfect for showing relationships between three variables and identifying patterns or clusters in your data.

## Importing

{% include "../shared/import-alert.md" %}

To use the `BubbleChartComponent` in your project, you need to import it from our library:

```typescript fileName="app.module.ts"
import { BubbleChartComponent } from 'my-lib';

@NgModule({
  imports: [BubbleChartComponent]
})
export class AppModule {}
```

## Basic Usage

To create a bubble chart using our library, you can use the following code:

```typescript
<app-bubble-chart
  [data]="[
    { x: 10, y: 20, r: 5 },
    { x: 15, y: 30, r: 8 },
    { x: 20, y: 25, r: 6 }
  ]"
  x="x"
  y="y"
  r="r"
  title="Sample Bubble Chart"
></app-bubble-chart>
```

{{ NgDocActions.demo("BubbleChartDemoComponent") }}

## Features

The component supports various features:

- Multiple series with different colors
- Logarithmic or linear scales
- Custom bubble styling
- Axis customization
- Interactive tooltips
- Image download

```typescript
<app-bubble-chart
  [data]="data"
  x="x"
  y="y"
  r="r"
  series="category"
  [xLog]="true"
  [yLog]="true"
  [bubbleOpacity]="0.6"
  [showLegend]="true"
></app-bubble-chart>
```

## Styling

You can customize the appearance using various properties:

```typescript
<app-bubble-chart
  [data]="data"
  x="x"
  y="y"
  r="r"
  [bubbleOpacity]="0.6"
  [bubbleBorderWidth]="1"
  bubbleBorderColor="rgba(0, 0, 0, 0.1)"
  [bubbleHoverRadius]="8"
  [bubbleHoverBorderWidth]="2"
></app-bubble-chart>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| data | any[] | [] | Array of data points |
| x | string | undefined | Field name for x-axis values |
| y | string | undefined | Field name for y-axis values |
| r | string | undefined | Field name for bubble radius |
| series | string | undefined | Field name for series grouping |
| xType | string | undefined | Type of x-axis data |
| yType | string | undefined | Type of y-axis data |
| xLog | boolean | false | Use logarithmic scale for x-axis |
| yLog | boolean | false | Use logarithmic scale for y-axis |
| title | string | undefined | Chart title |
| subtitle | string | undefined | Chart subtitle |
| legend | boolean | true | Show legend |
| xAxisTitle | string | undefined | Title for x-axis |
| yAxisTitle | string | undefined | Title for y-axis |
| xGridlines | boolean | true | Show x-axis gridlines |
| yGridlines | boolean | true | Show y-axis gridlines |
| bubbleOpacity | number | 0.5 | Opacity of bubbles |
| bubbleBorderWidth | number | 1 | Width of bubble borders |
| bubbleBorderColor | string | undefined | Color of bubble borders |
| bubbleHoverRadius | number | 8 | Radius of bubbles on hover |
| bubbleHoverBorderWidth | number | 2 | Width of bubble borders on hover |
| chartAreaHeight | number | 400 | Height of chart area in pixels |
| downloadableImage | boolean | false | Enable image download |

## Playground

{{ NgDocActions.playground("BubbleChartPlayground") }}

<div id="end"></div> 