
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
}

interface ColumnData {
  dimension: string;
  data: DimensionData[];
  maxValue: number;
}
```

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
