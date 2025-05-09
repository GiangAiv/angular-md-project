# Line Chart Component

A flexible line chart component that displays data points connected by lines, supporting multiple series, customization options, and interactive features.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | any[] | required | Array of data objects |
| x | string | required | Field name for x-axis values |
| y | string \| string[] | required | Field name(s) for y-axis values |
| series | string | optional | Field name to group data into series |
| chartType | 'basic' \| 'multi-series' \| 'multi-series-steps' \| 'multi-y' \| 'secondary-y' \| 'secondary-y-bar' \| 'value-labels' | 'basic' | Type of chart to display |
| xType | string | 'linear' | Type of x-axis ('linear' or 'log') |
| yType | string | 'linear' | Type of y-axis ('linear' or 'log') |
| xLog | boolean | false | Whether to use logarithmic scale for x-axis |
| yLog | boolean | false | Whether to use logarithmic scale for y-axis |
| xLogBase | number | 10 | Base for logarithmic x-axis |
| yLogBase | number | 10 | Base for logarithmic y-axis |
| xFmt | string | undefined | Format string for x-axis values |
| yFmt | string | undefined | Format string for y-axis values |
| title | string | undefined | Chart title |
| subtitle | string | undefined | Chart subtitle |
| legend | boolean | true | Whether to show the legend |
| xAxisTitle | string | undefined | Title for x-axis |
| yAxisTitle | string | undefined | Title for primary y-axis |
| y2AxisTitle | string | undefined | Title for secondary y-axis |
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
| yMin | number | undefined | Minimum value for primary y-axis |
| yMax | number | undefined | Maximum value for primary y-axis |
| y2Min | number | undefined | Minimum value for secondary y-axis |
| y2Max | number | undefined | Maximum value for secondary y-axis |
| swapXY | boolean | false | Whether to swap x and y axes |
| chartAreaHeight | number | undefined | Height of the chart area |
| downloadableImage | boolean | false | Whether to show download button |
| seriesColors | string[] | undefined | Array of colors for series |
| lineWidth | number | 2 | Width of the lines |
| lineTension | number | 0.4 | Tension of the lines (0-1) |
| showPoints | boolean | true | Whether to show data points |
| pointRadius | number | 3 | Radius of data points |
| pointHoverRadius | number | 5 | Radius of data points on hover |
| pointBackgroundColor | string | undefined | Background color of data points |
| pointBorderColor | string | undefined | Border color of data points |
| pointBorderWidth | number | 1 | Width of data point borders |
| pointHoverBackgroundColor | string | undefined | Background color of data points on hover |
| pointHoverBorderColor | string | undefined | Border color of data points on hover |
| pointHoverBorderWidth | number | 2 | Width of data point borders on hover |
| fill | boolean | false | Whether to fill area under the line |
| fillColor | string | undefined | Color for area fill |
| fillOpacity | number | 0.2 | Opacity of area fill |
| stepped | boolean | false | Whether to use stepped lines |
| stepPosition | string | 'before' | Position of steps ('before', 'after', 'middle') |
| handleMissing | string | 'zero' | How to handle missing data ('zero', 'connect', 'gap') |
| showValueLabels | boolean | false | Whether to show value labels on data points |
| valueLabelPosition | 'top' \| 'bottom' \| 'left' \| 'right' | 'top' | Position of value labels |
| barWidth | number | 20 | Width of bars in secondary y-axis bar chart |

## Features

- **Multiple Chart Types**:
  - Basic line chart
  - Multi-series line chart
  - Multi-series stepped line chart
  - Multiple y-columns chart
  - Secondary y-axis chart
  - Secondary y-axis with bar chart
  - Value labels chart
- **Axis Customization**: Configure axis types, scales, and formatting
- **Interactive**: Hover effects and tooltips showing data values
- **Responsive**: Automatically adjusts to container size
- **Downloadable**: Option to download chart as PNG image
- **Customizable Styling**: Control line and point appearance
- **Missing Data Handling**: Options for handling missing data points
- **Area Fill**: Option to fill area under the line
- **Stepped Lines**: Support for stepped line charts
- **Value Labels**: Display values directly on data points

## Usage Examples

Basic Line Chart:
<LineChart
  data={[
    { x: 'Jan', y: 10 },
    { x: 'Feb', y: 20 },
    { x: 'Mar', y: 15 }
  ]}
  x="x"
  y="y"
  title="Basic Line Chart"
/>

Multi-Series Line Chart:
<LineChart
  data={[
    { x: 'Jan', y: 10, category: 'A' },
    { x: 'Feb', y: 20, category: 'A' },
    { x: 'Mar', y: 15, category: 'A' },
    { x: 'Jan', y: 15, category: 'B' },
    { x: 'Feb', y: 25, category: 'B' },
    { x: 'Mar', y: 20, category: 'B' }
  ]}
  x="x"
  y="y"
  series="category"
  chartType="multi-series"
  title="Multi-Series Line Chart"
/>

Multi-Series Stepped Line Chart:
<LineChart
  data={[
    { x: 'Jan', y: 10, category: 'A' },
    { x: 'Feb', y: 20, category: 'A' },
    { x: 'Mar', y: 15, category: 'A' },
    { x: 'Jan', y: 15, category: 'B' },
    { x: 'Feb', y: 25, category: 'B' },
    { x: 'Mar', y: 20, category: 'B' }
  ]}
  x="x"
  y="y"
  series="category"
  chartType="multi-series-steps"
  title="Multi-Series Stepped Line Chart"
/>

Multiple Y Columns Chart:
<LineChart
  data={[
    { x: 'Jan', y1: 10, y2: 20, y3: 15 },
    { x: 'Feb', y1: 20, y2: 25, y3: 18 },
    { x: 'Mar', y1: 15, y2: 30, y3: 22 }
  ]}
  x="x"
  y={['y1', 'y2', 'y3']}
  chartType="multi-y"
  title="Multiple Y Columns Chart"
/>

Secondary Y-Axis Chart:
<LineChart
  data={[
    { x: 'Jan', y1: 10, y2: 100 },
    { x: 'Feb', y1: 20, y2: 200 },
    { x: 'Mar', y1: 15, y2: 150 }
  ]}
  x="x"
  y={['y1', 'y2']}
  chartType="secondary-y"
  yAxisTitle="Primary Axis"
  y2AxisTitle="Secondary Axis"
  title="Secondary Y-Axis Chart"
/>

Secondary Y-Axis with Bar Chart:
<LineChart
  data={[
    { x: 'Jan', y1: 10, y2: 100 },
    { x: 'Feb', y1: 20, y2: 200 },
    { x: 'Mar', y1: 15, y2: 150 }
  ]}
  x="x"
  y={['y1', 'y2']}
  chartType="secondary-y-bar"
  yAxisTitle="Line Axis"
  y2AxisTitle="Bar Axis"
  barWidth={20}
  title="Secondary Y-Axis with Bar Chart"
/>

Value Labels Chart:
<LineChart
  data={[
    { x: 'Jan', y: 10 },
    { x: 'Feb', y: 20 },
    { x: 'Mar', y: 15 }
  ]}
  x="x"
  y="y"
  chartType="value-labels"
  showValueLabels={true}
  valueLabelPosition="top"
  title="Value Labels Chart"
/>

## Notes

- The component requires Chart.js
- Data objects must contain the fields specified in x and y props
- Series colors are randomly generated if not provided
- Logarithmic scales require positive values
- The chart is responsive and will resize with its container
- Missing data points can be handled in three ways: zero, connect, or gap
- For secondary y-axis charts, the first y value uses the primary axis and the second uses the secondary axis
- Value labels require the chartjs-plugin-datalabels plugin to be installed and registered 