# AreaChart Component


## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | `[]` | Raw data array to be transformed into chart data |
| `labels` | `string[]` | `[]` | Labels for the x-axis |
| `datasets` | `Dataset[]` | `[]` | Array of datasets for the chart |
| `options` | `any` | `{}` | Additional Chart.js configuration options |
| `chartType` | `'area' \| 'stacked' \| 'stacked100' \| 'stepped'` | `'area'` | Type of area chart to display |
| `downloadableImage` | `boolean` | `false` | Enable chart image download |
| `title` | `string` | `''` | Chart title |
| `xAxisTitle` | `string` | `''` | X-axis title |
| `yAxisTitle` | `string` | `''` | Y-axis title |
| `chartAreaHeight` | `number` | `400` | Height of the chart area in pixels |
| `fillColor` | `string` | `undefined` | Custom fill color for the area |
| `lineColor` | `string` | `undefined` | Custom line color |
| `fillOpacity` | `number` | `undefined` | Opacity of the filled area |
| `line` | `boolean` | `true` | Show/hide the line |
| `markers` | `boolean` | `false` | Show/hide data point markers |
| `markerShape` | `string` | `'circle'` | Shape of the markers |
| `markerSize` | `number` | `8` | Size of the markers |
| `handleMissing` | `'gap' \| 'zero' \| 'connect'` | `'gap'` | How to handle missing data points |
| `step` | `boolean` | `false` | Enable step mode |
| `stepPosition` | `'start' \| 'middle' \| 'end'` | `'end'` | Position of steps in step mode |
| `showLabels` | `boolean` | `false` | Show/hide data labels |
| `labelSize` | `number` | `11` | Size of data labels |
| `labelPosition` | `'top' \| 'bottom' \| 'middle'` | `'top'` | Position of data labels |
| `labelColor` | `string` | `undefined` | Color of data labels |
| `labelFmt` | `string` | `undefined` | Format string for data labels |
| `showAllLabels` | `boolean` | `false` | Show all labels even if overlapping |
| `seriesOrder` | `string[]` | `undefined` | Custom order of series |
| `seriesLabelFmt` | `string` | `undefined` | Format string for series labels |

### Dataset Type

```typescript
interface Dataset {
  label: string;
  data: number[];
  fill?: boolean;
  borderColor?: string;
  backgroundColor?: string;
}
```

## Usage Examples

### Basic Area Chart
<AreaChart
  data={[
    { month: 'Jan', sales: 100 },
    { month: 'Feb', sales: 150 },
    { month: 'Mar', sales: 200 }
  ]}
  x="month"
  y="sales"
  title="Monthly Sales"
  downloadableImage={true}
/>

### Stacked Area Chart with Custom Styling
<AreaChart
  data={[
    { month: 'Jan', sales: 100, category: 'Electronics' },
    { month: 'Feb', sales: 150, category: 'Electronics' },
    { month: 'Mar', sales: 200, category: 'Electronics' },
    { month: 'Jan', sales: 80, category: 'Clothing' },
    { month: 'Feb', sales: 120, category: 'Clothing' },
    { month: 'Mar', sales: 160, category: 'Clothing' }
  ]}
  x="month"
  y="sales"
  series="category"
  chartType="stacked"
  title="Sales by Category"
  fillColor="rgba(75, 192, 192, 0.2)"
  lineColor="rgba(75, 192, 192, 1)"
  markers={true}
  markerSize={6}
  showLabels={true}
  labelPosition="top"
/>

### 100% Stacked Area Chart with Missing Data Handling
<AreaChart
  data={[
    { month: 'Jan', sales: 100, category: 'Electronics' },
    { month: 'Feb', sales: null, category: 'Electronics' },
    { month: 'Mar', sales: 200, category: 'Electronics' },
    { month: 'Jan', sales: 80, category: 'Clothing' },
    { month: 'Feb', sales: 120, category: 'Clothing' },
    { month: 'Mar', sales: null, category: 'Clothing' }
  ]}
  x="month"
  y="sales"
  series="category"
  chartType="stacked100"
  handleMissing="zero"
  title="Sales Distribution by Category"
  xAxisTitle="Month"
  yAxisTitle="Percentage"
/>

### Stepped Line Chart with Custom Series Order
<AreaChart
  data={[
    { month: 'Jan', sales: 100, category: 'Electronics' },
    { month: 'Feb', sales: 150, category: 'Electronics' },
    { month: 'Mar', sales: 200, category: 'Electronics' },
    { month: 'Jan', sales: 80, category: 'Clothing' },
    { month: 'Feb', sales: 120, category: 'Clothing' },
    { month: 'Mar', sales: 160, category: 'Clothing' }
  ]}
  x="month"
  y="sales"
  series="category"
  chartType="stepped"
  stepPosition="middle"
  seriesOrder={['Clothing', 'Electronics']}
  title="Monthly Sales Trend"
  downloadableImage={true}
/>

## Features

- Multiple chart types:
  - Area chart
  - Stacked area chart
  - 100% stacked area chart
  - Stepped line chart
- Visual customization:
  - Custom colors and opacity
  - Line and marker styling
  - Data label formatting
- Data handling:
  - Missing data handling (gap, zero, connect)
  - Custom series ordering
  - Series label formatting
- Interactive features:
  - Tooltips with series ordering
  - Legend support
  - Image download capability
- Responsive design
- Automatic data transformation

## Chart Configuration

The component uses the following default Chart.js configuration:

```typescript
{
  type: 'line',
  data: {
    labels: [],
    datasets: []
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: ''
      },
      legend: {
        position: 'top'
      }
    },
    interaction: {
      intersect: false
    },
    scales: {
      y: {
        stacked: true,
        beginAtZero: true
      },
      x: {
        display: true
      }
    }
  }
}
```

You can override any of these options by passing them in the `options` prop.

## Helper Methods

### setChartData

```typescript
setChartData(data: any[], xField: string, yField: string, seriesField?: string): void
```

Transforms raw data into Chart.js format:
- `data`: Array of data objects
- `xField`: Name of the field to use for x-axis labels
- `yField`: Name of the field to use for y-axis values
- `seriesField`: (Optional) Name of the field to use for grouping data into series

## Styling

The component includes basic CSS for sizing:

```css
.area-chart-container {
  width: 100%;
  height: 400px;
}

.chart {
  width: 100%;
  height: 100%;
}
```

You can override these styles in your own CSS file.
