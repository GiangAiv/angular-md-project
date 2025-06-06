
## Usage

```typescript
import { DimensionGridComponent } from './dimension-grid.component';

// Basic usage
<app-dimension-grid
  [props]="{
    rows: [
      { region: 'North', category: 'Electronics', sales: 15000 },
      { region: 'South', category: 'Electronics', sales: 12000 },
      { region: 'North', category: 'Clothing', sales: 8000 },
      { region: 'South', category: 'Clothing', sales: 9500 }
    ],
    metrics: 'sales',
    dimensions: ['region', 'category']
  }">
</app-dimension-grid>

// With multiple dimensions
<app-dimension-grid
  [props]="{
    rows: salesData,
    metrics: 'revenue',
    dimensions: ['region', 'product', 'quarter']
  }">
</app-dimension-grid>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | `Array<Record<string, any>>` | Required | Array of data rows |
| `metrics` | `string` | Required | Column name used to calculate totals |
| `dimensions` | `string[]` | Required | Column names used as dimensions for grouping |

### Interfaces

```typescript
interface DimensionGridProps {
  rows: Array<Record<string, any>>;
  metrics: string;
  dimensions: string[];
}

interface DimensionData {
  value: string;
  total: number;
  percentage: number;
  isFiltered?: boolean;
}

interface ColumnData {
  dimension: string;
  data: DimensionData[];
  maxValue: number;
}
```

## Features

### Interactive Filtering
- **Click to Filter**: Click on any cell value to filter other columns based on that selection
- **Toggle Filters**: Click the same cell again to remove the filter
- **Multiple Filters**: Each column has its own independent filter
- **Visual Feedback**: Filtered cells are highlighted with a blue background and indicator dot
- **Clear All**: Use the "Clear All Filters" button to remove all active filters

### Data Visualization
- **Progress Bars**: Visual representation of values relative to the maximum in each column
- **Percentage Calculation**: Automatic percentage calculation based on column maximum
- **Responsive Grid**: Adapts to different screen sizes and number of dimensions

## Features

### Interactive Multi-Select Filtering
- **Click to Filter**: Click on any cell value to add it to the filter for that column
- **Multiple Selections**: Select multiple values within the same column for OR-based filtering
- **Toggle Filters**: Click a selected cell again to remove it from the filter
- **Independent Columns**: Each column has its own independent filter with multiple selections
- **Visual Feedback**:
  - Filtered cells are highlighted with blue background and indicator dot
  - Column headers show filter count badges
  - Filter status bar shows total active filter count
- **Clear All**: Use the "Clear All Filters" button to remove all active filters

### Data Visualization
- **Progress Bars**: Visual representation of values relative to the maximum in each column
- **Percentage Calculation**: Automatic percentage calculation based on column maximum
- **Responsive Grid**: Adapts to different screen sizes and number of dimensions

## Events

| Event | Type | Description |
|-------|------|-------------|
| `propsChange` | `EventEmitter<DimensionGridProps>` | Emitted when props change (inherited from BaseComponent) |

## Examples

### Sales Data by Region and Category
```typescript
const salesData = [
  { region: 'North', category: 'Electronics', sales: 15000 },
  { region: 'South', category: 'Electronics', sales: 12000 },
  { region: 'East', category: 'Electronics', sales: 18000 },
  { region: 'North', category: 'Clothing', sales: 8000 },
  { region: 'South', category: 'Clothing', sales: 9500 },
  { region: 'East', category: 'Clothing', sales: 7200 }
];

<app-dimension-grid
  [props]="{
    rows: salesData,
    metrics: 'sales',
    dimensions: ['region', 'category']
  }">
</app-dimension-grid>
```

### Revenue Analysis by Multiple Dimensions
```typescript
const revenueData = [
  { quarter: 'Q1', product: 'Laptop', region: 'US', revenue: 50000 },
  { quarter: 'Q1', product: 'Phone', region: 'US', revenue: 30000 },
  { quarter: 'Q2', product: 'Laptop', region: 'US', revenue: 55000 },
  { quarter: 'Q2', product: 'Phone', region: 'US', revenue: 35000 }
];

<app-dimension-grid
  [props]="{
    rows: revenueData,
    metrics: 'revenue',
    dimensions: ['quarter', 'product', 'region']
  }">
</app-dimension-grid>
```

### Single Dimension Analysis
```typescript
<app-dimension-grid
  [props]="{
    rows: customerData,
    metrics: 'orders',
    dimensions: ['country']
  }">
</app-dimension-grid>
```

## Filtering Behavior

### Multi-Select Filtering Example
When you have data like:
```typescript
const salesData = [
  { region: 'North', category: 'Electronics', sales: 15000 },
  { region: 'South', category: 'Electronics', sales: 12000 },
  { region: 'East', category: 'Electronics', sales: 18000 },
  { region: 'North', category: 'Clothing', sales: 8000 },
  { region: 'South', category: 'Clothing', sales: 9500 },
  { region: 'East', category: 'Clothing', sales: 7200 }
];
```

**Filtering Actions:**
1. Click "North" in the region column → Shows only North region data in other columns
2. Click "South" in the region column → Shows North OR South region data in other columns
3. Click "Electronics" in the category column → Shows (North OR South) AND Electronics data
4. Click "North" again → Removes North from filter, shows only South AND Electronics data

**Filter Logic:**
- Within a column: OR logic (North OR South)
- Between columns: AND logic (Region filter AND Category filter)
- Each column maintains its own independent filter state
