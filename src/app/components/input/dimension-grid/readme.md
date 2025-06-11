### Props

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


### 1. Basic usage
```jsx
<DimensionGrid
  rows={[
    {
        "region": "Asia",
        "category": "Electronics",
        "channel": "Online",
        "year": "2023",
        "sales": 200
    },
    {
        "region": "Asia",
        "category": "Electronics",
        "channel": "Online",
        "year": "2023",
        "sales": 100
    },
    {
        "region": "Europe",
        "category": "Electronics",
        "channel": "Retail",
        "year": "2022",
        "sales": 300
    },
    {
        "region": "Europe",
        "category": "Furniture",
        "channel": "Retail",
        "year": "2022",
        "sales": 250
    },
    {
        "region": "North America",
        "category": "Toys",
        "channel": "Online",
        "year": "2021",
        "sales": 180
    },
    {
        "region": "North America",
        "category": "Toys",
        "channel": "Online",
        "year": "2021",
        "sales": 220
    },
    {
        "region": "South America",
        "category": "Furniture",
        "channel": "Wholesale",
        "year": "2024",
        "sales": 90
    },
    {
        "region": "South America",
        "category": "Furniture",
        "channel": "Wholesale",
        "year": "2024",
        "sales": 110
    },
    {
        "region": "Asia",
        "category": "Books",
        "channel": "Online",
        "year": "2022",
        "sales": 120
    },
    {
        "region": "Asia",
        "category": "Clothing",
        "channel": "Retail",
        "year": "2023",
        "sales": 300
    },
    {
        "region": "Europe",
        "category": "Clothing",
        "channel": "Retail",
        "year": "2021",
        "sales": 280
    },
    {
        "region": "North America",
        "category": "Books",
        "channel": "Wholesale",
        "year": "2022",
        "sales": 140
    },
    {
        "region": "North America",
        "category": "Electronics",
        "channel": "Wholesale",
        "year": "2022",
        "sales": 150
    },
    {
        "region": "Europe",
        "category": "Electronics",
        "channel": "Online",
        "year": "2024",
        "sales": 210
    },
    {
        "region": "South America",
        "category": "Clothing",
        "channel": "Online",
        "year": "2024",
        "sales": 160
    },
    {
        "region": "Asia",
        "category": "Furniture",
        "channel": "Retail",
        "year": "2021",
        "sales": 200
    },
    {
        "region": "Europe",
        "category": "Toys",
        "channel": "Wholesale",
        "year": "2021",
        "sales": 190
    },
    {
        "region": "Asia",
        "category": "Toys",
        "channel": "Wholesale",
        "year": "2022",
        "sales": 130
    },
    {
        "region": "North America",
        "category": "Furniture",
        "channel": "Retail",
        "year": "2024",
        "sales": 260
    },
    {
        "region": "South America",
        "category": "Books",
        "channel": "Retail",
        "year": "2023",
        "sales": 170
    }
]}
  metrics='sales'
dimensions={['region', 'category', 'channel', 'year']}
/>
```


### 2. Revenue Analysis by Multiple Dimensions
```jsx
<DimensionGrid
  rows={[
  { quarter: 'Q1', product: 'Laptop', region: 'US', revenue: 50000 },
  { quarter: 'Q1', product: 'Phone', region: 'US', revenue: 30000 },
  { quarter: 'Q2', product: 'Laptop', region: 'US', revenue: 55000 },
  { quarter: 'Q2', product: 'Phone', region: 'US', revenue: 35000 }
]}
    metrics='revenue'
    dimensions={['quarter', 'product', 'region']}
/>
```
<br/>

### 3. Single Dimension Analysis
```jsx
<DimensionGrid
  rows={[
  { quarter: 'Q1', product: 'Laptop', region: 'US', revenue: 50000 },
  { quarter: 'Q1', product: 'Phone', region: 'US', revenue: 30000 },
  { quarter: 'Q2', product: 'Laptop', region: 'US', revenue: 55000 },
  { quarter: 'Q2', product: 'Phone', region: 'US', revenue: 35000 }
]}
    metrics='revenue'
    dimensions={['region']}
/>
```