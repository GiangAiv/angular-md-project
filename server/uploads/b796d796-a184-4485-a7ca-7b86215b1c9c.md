# Bubble Chart Component

A flexible bubble chart component that displays data points as bubbles, where the position and size of each bubble can represent different data dimensions.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | any[] | required | Array of data objects |
| x | string | required | Field name for x-axis values |
| y | string | required | Field name for y-axis values |
| r | string | optional | Field name for bubble radius values |
| series | string | optional | Field name to group data into series |
| xType | string | 'linear' | Type of x-axis ('linear' or 'log') |
| yType | string | 'linear' | Type of y-axis ('linear' or 'log') |
| xLog | boolean | false | Whether to use logarithmic scale for x-axis |
| yLog | boolean | false | Whether to use logarithmic scale for y-axis |
| xLogBase | number | 10 | Base for logarithmic x-axis |
| yLogBase | number | 10 | Base for logarithmic y-axis |
| xFmt | string | undefined | Format string for x-axis values |
| yFmt | string | undefined | Format string for y-axis values |
| rFmt | string | undefined | Format string for radius values |
| title | string | undefined | Chart title |
| subtitle | string | undefined | Chart subtitle |
| legend | boolean | true | Whether to show the legend |
| xAxisTitle | string | undefined | Title for x-axis |
| yAxisTitle | string | undefined | Title for y-axis |
| xGridlines | boolean | true | Whether to show x-axis gridlines |
| yGridlines | boolean | true | Whether to show y-axis gridlines |
| xAxisLabels | boolean | true | Whether to show x-axis labels |
| yAxisLabels | boolean | true | Whether to show y-axis labels |
| xBaseline | boolean | false | Whether to show x-axis baseline |
| yBaseline | boolean | false | Whether to show y-axis baseline |
| xTickMarks | boolean | false | Whether to show x-axis tick marks |
| yTickMarks | boolean | false | Whether to show y-axis tick marks |
| xMin | number | undefined | Minimum value for x-axis |
| xMax | number | undefined | Maximum value for x-axis |
| yMin | number | undefined | Minimum value for y-axis |
| yMax | number | undefined | Maximum value for y-axis |
| rMin | number | undefined | Minimum value for bubble radius |
| rMax | number | undefined | Maximum value for bubble radius |
| swapXY | boolean | false | Whether to swap x and y axes |
| chartAreaHeight | number | undefined | Height of the chart area |
| downloadableImage | boolean | false | Whether to show download button |
| seriesColors | string[] | undefined | Array of colors for series |
| bubbleOpacity | number | 0.5 | Opacity of bubbles |
| bubbleBorderWidth | number | 1 | Width of bubble borders |
| bubbleBorderColor | string | undefined | Color of bubble borders |
| bubbleHoverRadius | number | 8 | Radius of bubbles on hover |
| bubbleHoverBorderWidth | number | 2 | Width of bubble borders on hover |
| bubbleHoverBackgroundColor | string | undefined | Background color of bubbles on hover |
| bubbleHoverBorderColor | string | undefined | Border color of bubbles on hover |

## Features

- **Multiple Data Dimensions**: Display up to three dimensions of data (x, y, and size)
- **Series Support**: Group data points into series with different colors
- **Axis Customization**: Configure axis types, scales, and formatting
- **Interactive**: Hover effects and tooltips showing data values
- **Responsive**: Automatically adjusts to container size
- **Downloadable**: Option to download chart as PNG image
- **Customizable Styling**: Control colors, opacity, and hover effects

## Usage Examples

Basic Bubble Chart:
```jsx
<BubbleChart
  data={[
    { x: 10, y: 20, r: 5 },
    { x: 15, y: 30, r: 8 },
    { x: 20, y: 25, r: 6 }
  ]}
  x="x"
  y="y"
  r="r"
  title="Basic Bubble Chart"
/>
```

Bubble Chart with Series:
```jsx
<BubbleChart
  data={[
    { x: 10, y: 20, r: 5, category: 'A' },
    { x: 15, y: 30, r: 8, category: 'B' },
    { x: 20, y: 25, r: 6, category: 'A' }
  ]}
  x="x"
  y="y"
  r="r"
  series="category"
  title="Bubble Chart with Series"
/>
```

Logarithmic Bubble Chart:
```jsx
<BubbleChart
  data={[
    { x: 10, y: 20, r: 5 },
    { x: 100, y: 200, r: 8 },
    { x: 1000, y: 2000, r: 6 }
  ]}
  x="x"
  y="y"
  r="r"
  xLog={true}
  yLog={true}
  title="Logarithmic Bubble Chart"
/>
```

## Notes

- The component requires Chart.js and its bubble chart plugin
- Data objects must contain the fields specified in x, y, and r props
- Bubble radius (r) is optional; if not provided, a default size is used
- Series colors are randomly generated if not provided
- Logarithmic scales require positive values
- The chart is responsive and will resize with its container 