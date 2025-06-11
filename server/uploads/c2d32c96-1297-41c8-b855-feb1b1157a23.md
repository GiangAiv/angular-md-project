

# DataTable Component

## Props

```tsx
interface ColumnFormat {
  type: 'percent' | 'currency' | 'date' | 'image' | 'link' | 'html' | 'bar';
  options?: {
    // for image
    width?: string | number;
    height?: string | number;
    rounded?: boolean;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    alt?: string; // Alt text for accessibility

    // for link
    linkLabel?: string; // Text to display for the link (if not provided, uses the URL)
    target?: '_blank' | '_self' | '_parent' | '_top'; // Link target attribute

    // for html
    sanitize?: boolean; // Whether to sanitize HTML content (default: true for security)


    // for bar
    barColor?: string;
    
    // For currency
    locale?: string;
    currency?: string;
    // For date
    format?: string; // moment format string
    // For percent
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    // delta
  };
  showArrow?: boolean;
  colorScale?: 'positive'|'negative'|'info'|'custom'|string; // Preset values or custom hex color
  customColor?: string; // hex color for 'custom' colorScale

  colorMid?: number; // value to consider as mid point for color scaling
  colorRange?: string[]; // hex colors for color scaling
  scaleColumn?: string; // other column to use for current column's color scaling
  redNegative?: boolean; // for positive/negative color scaling, whether to consider negative values as red or green
}



interface Column {
  label: string;
  key: string;
  format?: ColumnFormat;
}

interface DataTableProps {
  columns: Column[];                // Required: Array of column definitions
  rows: Record<string, any>[];      // Required: Array of data objects
  striped?: boolean;                // Optional: Enable striped rows (default: true)
  hover?: boolean;                  // Optional: Enable row hover effect (default: true)
  bordered?: boolean;               // Optional: Show borders (default: true)
  sortable?: boolean;               // Optional: Enable column sorting (default: false)
}
```

## Usage Examples


### Sparklines
```jsx
<DataTable
  columns={[
      { label: 'Product', key: 'product' },
      {
        label: 'Sales Trend (Line)',
        key: 'salesData',
        format: {
          type: 'spark',
          options: {
            sparkType: 'line',
            sparkColor: '#3b82f6',
            sparkX: 'month',
            sparkY: 'sales'
          }
        }
      },
      {
        label: 'Revenue Trend (Area)',
        key: 'revenueData',
        format: {
          type: 'spark',
          options: {
            sparkType: 'area',
            sparkColor: '#10b981',
            sparkX: 'month',
            sparkY: 'revenue'
          }
        }
      },
      {
        label: 'Units Sold (Bar)',
        key: 'unitsData',
        format: {
          type: 'spark',
          options: {
            sparkType: 'bar',
            sparkColor: '#f59e0b',
            sparkX: 'month',
            sparkY: 'units'
          }
        }
      }
    ]}
  rows={[
      {
        product: 'iPhone 15',
        salesData: [
          { month: 'Jan', sales: 1000 },
          { month: 'Feb', sales: 1200 },
          { month: 'Mar', sales: 1100 },
          { month: 'Apr', sales: 1400 },
          { month: 'May', sales: 1600 }
        ],
        revenueData: [
          { month: 'Jan', revenue: 50000 },
          { month: 'Feb', revenue: 60000 },
          { month: 'Mar', revenue: 55000 },
          { month: 'Apr', revenue: 70000 },
          { month: 'May', revenue: 80000 }
        ],
        unitsData: [
          { month: 'Jan', units: 100 },
          { month: 'Feb', units: 120 },
          { month: 'Mar', units: 110 },
          { month: 'Apr', units: 140 },
          { month: 'May', units: 160 }
        ]
      },
      {
        product: 'MacBook Pro',
        salesData: [
          { month: 'Jan', sales: 800 },
          { month: 'Feb', sales: 900 },
          { month: 'Mar', sales: 950 },
          { month: 'Apr', sales: 1100 },
          { month: 'May', sales: 1200 }
        ],
        revenueData: [
          { month: 'Jan', revenue: 40000 },
          { month: 'Feb', revenue: 45000 },
          { month: 'Mar', revenue: 47500 },
          { month: 'Apr', revenue: 55000 },
          { month: 'May', revenue: 60000 }
        ],
        unitsData: [
          { month: 'Jan', units: 80 },
          { month: 'Feb', units: 90 },
          { month: 'Mar', units: 95 },
          { month: 'Apr', units: 110 },
          { month: 'May', units: 120 }
        ]
      },
      {
        product: 'iPad Air',
        salesData: [
          { month: 'Jan', sales: 600 },
          { month: 'Feb', sales: 700 },
          { month: 'Mar', sales: 750 },
          { month: 'Apr', sales: 800 },
          { month: 'May', sales: 900 }
        ],
        revenueData: [
          { month: 'Jan', revenue: 30000 },
          { month: 'Feb', revenue: 35000 },
          { month: 'Mar', revenue: 37500 },
          { month: 'Apr', revenue: 40000 },
          { month: 'May', revenue: 45000 }
        ],
        unitsData: [
          { month: 'Jan', units: 60 },
          { month: 'Feb', units: 70 },
          { month: 'Mar', units: 75 },
          { month: 'Apr', units: 80 },
          { month: 'May', units: 90 }
        ]
      }
    ]}
/>
```


### Displaying All Columns
```jsx
<DataTable
  columns={ [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Role', key: 'role' }
]}
  rows={ [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
]}
/>
```

### Selecting Specific Columns

```jsx
<DataTable
  columns={[
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' }
]}
  rows={[
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
]}
  sortable={true}
  striped={true}
  hover={true}
  bordered={true}
/>
```

### Formatting Column
```jsx
<DataTable
    columns={[
      { label: 'Product Name', key: 'name' },
      {
        label: 'Price',
        key: 'price',
        format: {
          type: 'currency',
          options: { locale: 'en-US', currency: 'USD' }
        }
      },
      {
        label: 'Success Rate',
        key: 'successRate',
        format: {
          type: 'percent',
          options: { minimumFractionDigits: 1, maximumFractionDigits: 1 }
        }
      },
      {
        label: 'Launch Date',
        key: 'launchDate',
        format: {
          type: 'date',
          options: { format: 'MMM D, YYYY' }
        }
      }
    ]}
    rows={[
      {
        name: 'Premium Widget',
        price: 299.99,
        successRate: 0.856,
        launchDate: '2024-01-15'
      },
      {
        name: 'Standard Widget',
        price: 149.50,
        successRate: 0.742,
        launchDate: '2024-02-20'
      },
      {
        name: 'Basic Widget',
        price: 49.99,
        successRate: 0.923,
        launchDate: '2024-03-10'
      }
    ]}
    sortable={true}
    striped={true}
    hover={true}
    bordered={true}
  
/>
```


### Paginate

```jsx
<DataTable
  columns={[
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' }
]}
  rows={[
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { name: 'John Doe 1', email: 'john@example.com1', role: 'Admin' },
  { name: 'Jane Smith1', email: 'jane@example.com1', role: 'User' }
]}
  sortable={true}
  striped={true}
  hover={true}
  bordered={true}
  paginated={true}
  pageSize={2}
/>
```





### Deltas

```jsx
<DataTable
  columns={[
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  {
    label: 'Launch Date',
    key: 'revenue',
    format: {
      type: 'percent',
      showArrow: true
    },
    align: 'right'
  }
]}
  rows={[
  { name: 'John Doe', email: 'john@example.com', revenue: -10 },
  { name: 'Jane Smith', email: 'jane@example.com', revenue: 200 }
]}
  sortable={true}
  striped={true}
  hover={true}
  bordered={true}
/>
```






### Search

```jsx
<DataTable
  columns={[
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  {
    label: 'Launch Date',
    key: 'revenue',
    format: {
      type: 'percent',
      showArrow: true
    },
    align: 'right'
  }
]}
  rows={[
  { name: 'John Doe', email: 'john@example.com', revenue: -10 },
  { name: 'Jane Smith', email: 'jane@example.com', revenue: 200 }
]}
  sortable={true}
  searchable={true}
/>
```




### Total Row

```jsx
<DataTable
  columns={[
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  {
    label: 'Launch Date',
    key: 'revenue',
    format: {
      type: 'currency',
      showArrow: true
    },
    align: 'right'
  }
]}
  rows={[
  { name: 'John Doe', email: 'john@example.com', revenue: 10 },
  { name: 'Jane Smith', email: 'jane@example.com', revenue: 200 }
]}
  sortable={true}
  totalRow={true}
/>
```





** info **
```jsx
<DataTable
  columns={[
  { label: 'Region', key: 'region' },
  { label: 'Category', key: 'category' },
  {
    label: 'Sales',
    key: 'sales',
    format: {
      type: 'currency',
      colorScale: 'info'
    },
    align: 'right'
  }
]}
  rows={
﻿
[
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
/>
```







** positive **
```jsx
<DataTable
  columns={[
  { label: 'Region', key: 'region' },
  { label: 'Category', key: 'category' },
  {
    label: 'Sales',
    key: 'sales',
    format: {
      type: 'currency',
      colorScale: 'positive'
    },
    align: 'right'
  }
]}
  rows={
﻿
[
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
/>
```






** negative **
```jsx
<DataTable
  columns={[
  { label: 'Region', key: 'region' },
  { label: 'Category', key: 'category' },
  {
    label: 'Sales',
    key: 'sales',
    format: {
      type: 'currency',
      colorScale: 'negative'
    },
    align: 'right'
  }
]}
  rows={
﻿
[
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
/>
```





** custom color **
```jsx
<DataTable
  columns={[
  { label: 'Region', key: 'region' },
  { label: 'Category', key: 'category' },
  {
    label: 'Sales',
    key: 'sales',
    format: {
      type: 'currency',
      colorScale: 'custom',
      customColor: '#c12bd0'
    },
    align: 'right'
  }
]}
  rows={
﻿
[
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
/>
```





### Custom Color Palettes

** Diverging Scale **
```jsx
<DataTable
  columns={[
  { label: 'Region', key: 'region' },
  { label: 'Category', key: 'category' },
  {
    label: 'Sales',
    key: 'sales',
    format: {
      type: 'currency',
      colorScale: 'custom',
      colorRange: ['#6db678','#ffffff','#ce5050']
    },
    align: 'right'
  }
]}
  rows={
﻿
[
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
/>
```


** Heatmap **
```jsx
<DataTable
  columns={[
  { label: 'Region', key: 'region' },
  { label: 'Category', key: 'category' },
  {
    label: 'Sales',
    key: 'sales',
    format: {
      type: 'currency',
      colorScale: 'custom',
      colorRange: ['#6db678','#ebbb38','#ce5050']
    },
    align: 'right'
  }
]}
  rows={
﻿
[
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
/>
```




** Red Negatives **
```jsx
<DataTable
  columns={[
  { label: 'Name', key: 'name' },
  {
    label: 'Number',
    key: 'number',
    format: {
      redNegative: true
    }
  }
]}
  rows={[{"name":"Alice Johnson","number":1200},{"name":"Bob Smith","number":-350},{"name":"Charlie Lee","number":0},{"name":"Dana White","number":875},{"name":"Evan Chen","number":-120}]}
/>
```




** Color Breakpoints **
```jsx
<DataTable
  columns={[
  { label: 'Region', key: 'region' },
  { label: 'Category', key: 'category' },
  {
    label: 'Sales',
    key: 'sales',
    format: {
      type: 'currency',
      colorScale: 'custom',
      colorRange: ['#6db678','#ebbb38','#ce5050'],
      colorMid: 5
    },
    align: 'right'
  }
]}
  rows={
﻿
[
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
/>
```

** Including Images **
```jsx
<DataTable

 columns={[
  { label: 'Name', key: 'name' },
  { label: 'Image', key: 'image',
 format: {
     type: 'image'
    } },
  {
    label: 'Number',
    key: 'number',
    format: {
      redNegative: true
    }
  }
]}
rows={[
    {
        "name": "Alice Johnson",
        "number": 1200,
        "image": "https%3A%2F%2Fplacehold.co%2F640x360.png%3Ftext%3DAlice"
    },
   
  
    {
        "name": "Evan Chen",
        "number": -120,
        "image": "https%3A%2F%2Fplacehold.co%2F640x360.png%3Ftext%3DEvan"
    }
]}

/>
```


** Link Columns **
```jsx
<DataTable
 columns={[
  { label: 'Image Link', key: 'image',
 format: {
     type: 'link',
options: {
linkLabel: 'name',
target: '_blank'
}
    } },
  {
    label: 'Number',
    key: 'number',
    format: {
      redNegative: true
    }
  }
]}
rows={[
    {
        "name": "Alice Johnson",
        "number": 1200,
        "image": "https%3A%2F%2Fplacehold.co%2F640x360.png%3Ftext%3DAlice"
    },
   
  
    {
        "name": "Evan Chen",
        "number": -120,
        "image": "https%3A%2F%2Fplacehold.co%2F640x360.png%3Ftext%3DEvan"
    }
]}

/>
```

```jsx
<DataTable
 columns={[
  { label: 'Name', key: 'name' },
  { label: 'Image Link', key: 'image',
 format: {
     type: 'link',
options: {
linkLabel: 'open image',
target: '_blank'
}
    } },
  {
    label: 'Number',
    key: 'number',
    format: {
      redNegative: true
    }
  }
]}
rows={[
    {
        "name": "Alice Johnson",
        "number": 1200,
        "image": "https%3A%2F%2Fplacehold.co%2F640x360.png%3Ftext%3DAlice"
    },
   
  
    {
        "name": "Evan Chen",
        "number": -120,
        "image": "https%3A%2F%2Fplacehold.co%2F640x360.png%3Ftext%3DEvan"
    }
]}

/>
```



#### Group

** without subtotal **
```jsx
<DataTable
     columns={[
    { label: 'Product Name', key: 'name' },
    { label: 'Category', key: 'category' },
    { 
      label: 'Price', 
      key: 'price',
      format: {
        type: 'currency',
        options: { locale: 'en-US', currency: 'USD' }
      }
    },
    { 
      label: 'Stock', 
      key: 'stock',
      format: { type: 'number' }
    }
  ]}
  rows={[
    { name: 'iPhone 15', category: 'Electronics', price: 999, stock: 50 },
    { name: 'MacBook Pro', category: 'Electronics', price: 2499, stock: 25 },
    { name: 'Office Chair', category: 'Furniture', price: 299, stock: 100 },
    { name: 'Standing Desk', category: 'Furniture', price: 599, stock: 30 },
    { name: 'iPad Air', category: 'Electronics', price: 599, stock: 75 },
    { name: 'Coffee Table', category: 'Furniture', price: 199, stock: 40 },
    { name: 'Running Shoes', category: 'Sports', price: 129, stock: 200 },
    { name: 'Tennis Racket', category: 'Sports', price: 89, stock: 60 },
    { name: 'Yoga Mat', category: 'Sports', price: 29, stock: 150 }
  ]}
  groupBy="category"
  sortable={true}
  searchable={true}
  striped={true}
  hover={true}
/>
```




** with subtotal **
```jsx
<DataTable
subtotals={['stock']}
     columns={[
    { label: 'Product Name', key: 'name' },
    { label: 'Category', key: 'category' },
    { 
      label: 'Price', 
      key: 'price',
      format: {
        type: 'currency',
        options: { locale: 'en-US', currency: 'USD' }
      }
    },
    { 
      label: 'Stock', 
      key: 'stock',
      format: { type: 'number' }
    }
  ]}
  rows={[
    { name: 'iPhone 15', category: 'Electronics', price: 999, stock: 50 },
    { name: 'MacBook Pro', category: 'Electronics', price: 2499, stock: 25 },
    { name: 'Office Chair', category: 'Furniture', price: 299, stock: 100 },
    { name: 'Standing Desk', category: 'Furniture', price: 599, stock: 30 },
    { name: 'iPad Air', category: 'Electronics', price: 599, stock: 75 },
    { name: 'Coffee Table', category: 'Furniture', price: 199, stock: 40 },
    { name: 'Running Shoes', category: 'Sports', price: 129, stock: 200 },
    { name: 'Tennis Racket', category: 'Sports', price: 89, stock: 60 },
    { name: 'Yoga Mat', category: 'Sports', price: 29, stock: 150 }
  ]}
  groupBy="category"
  sortable={true}
  searchable={true}
  striped={true}
  hover={true}
/>
```








** Closed by Default **
```jsx
<DataTable
groupOpen={false}
subtotals={['stock']}
     columns={[
    { label: 'Product Name', key: 'name' },
    { label: 'Category', key: 'category' },
    { 
      label: 'Price', 
      key: 'price',
      format: {
        type: 'currency',
        options: { locale: 'en-US', currency: 'USD' }
      }
    },
    { 
      label: 'Stock', 
      key: 'stock',
      format: { type: 'number' }
    }
  ]}
  rows={[
    { name: 'iPhone 15', category: 'Electronics', price: 999, stock: 50 },
    { name: 'MacBook Pro', category: 'Electronics', price: 2499, stock: 25 },
    { name: 'Office Chair', category: 'Furniture', price: 299, stock: 100 },
    { name: 'Standing Desk', category: 'Furniture', price: 599, stock: 30 },
    { name: 'iPad Air', category: 'Electronics', price: 599, stock: 75 },
    { name: 'Coffee Table', category: 'Furniture', price: 199, stock: 40 },
    { name: 'Running Shoes', category: 'Sports', price: 129, stock: 200 },
    { name: 'Tennis Racket', category: 'Sports', price: 89, stock: 60 },
    { name: 'Yoga Mat', category: 'Sports', price: 29, stock: 150 }
  ]}
  groupBy="category"
  sortable={true}
  searchable={true}
  striped={true}
  hover={true}
/>
```




** With Configured Columns **
```jsx
<DataTable

subtotals={['stock']}
     columns={[
    { label: 'Product Name', key: 'name' },
    { label: 'Category', key: 'category' },
    { 
      label: 'Price', 
      key: 'price',
      format: {
        type: 'currency',
        options: { locale: 'en-US', currency: 'USD' }
      }
    },
    { 
      label: 'Stock', 
      key: 'stock',
      format: { type: 'number', colorScale: 'negative' }
    },
{ 
      label: 'Growth', 
      key: 'growth',
      format: { type: 'percent', showArrow: true }
    }
  ]}
  rows={[
    { name: 'iPhone 15', category: 'Electronics', price: 999, stock: 50, growth: 10 },
    { name: 'MacBook Pro', category: 'Electronics', price: 2499, stock: 25, growth: -10 },
    { name: 'Office Chair', category: 'Furniture', price: 299, stock: 100, growth: 20 },
    { name: 'Standing Desk', category: 'Furniture', price: 599, stock: 30, growth: 50 },
    { name: 'iPad Air', category: 'Electronics', price: 599, stock: 75, growth: -40 }
  ]}
  groupBy="category"
  sortable={true}
/>
```







### Group section

** with subtotal **
```jsx
<DataTable
subtotals={['stock']}
  groupType="section"
     columns={[
    { label: 'Category', key: 'category' },
    { label: 'Product Name', key: 'name' },
    { 
      label: 'Price', 
      key: 'price',
      format: {
        type: 'currency',
        options: { locale: 'en-US', currency: 'USD' }
      }
    },
    { 
      label: 'Stock', 
      key: 'stock',
      format: { type: 'number', colorScale: 'negative' }
    },
{ 
      label: 'Growth', 
      key: 'growth',
      format: { type: 'percent', showArrow: true }
    }
  ]}
  rows={[
    { name: 'iPhone 15', category: 'Electronics', price: 999, stock: 50, growth: 10 },
    { name: 'MacBook Pro', category: 'Electronics', price: 2499, stock: 25, growth: -10 },
    { name: 'Office Chair', category: 'Furniture', price: 299, stock: 100, growth: 20 },
    { name: 'Standing Desk', category: 'Furniture', price: 599, stock: 30, growth: 50 },
    { name: 'iPad Air', category: 'Electronics', price: 599, stock: 75, growth: -40 }
  ]}
  groupBy="category"
  sortable={true}
/>
```


** without subtotal **
```jsx
<DataTable

  groupType="section"
     columns={[
    { label: 'Category', key: 'category' },
    { label: 'Product Name', key: 'name' },
    { 
      label: 'Price', 
      key: 'price',
      format: {
        type: 'currency',
        options: { locale: 'en-US', currency: 'USD' }
      }
    },
    { 
      label: 'Stock', 
      key: 'stock',
      format: { type: 'number', colorScale: 'negative' }
    },
{ 
      label: 'Growth', 
      key: 'growth',
      format: { type: 'percent', showArrow: true }
    }
  ]}
  rows={[
    { name: 'iPhone 15', category: 'Electronics', price: 999, stock: 50, growth: 10 },
    { name: 'MacBook Pro', category: 'Electronics', price: 2499, stock: 25, growth: -10 },
    { name: 'Office Chair', category: 'Furniture', price: 299, stock: 100, growth: 20 },
    { name: 'Standing Desk', category: 'Furniture', price: 599, stock: 30, growth: 50 },
    { name: 'iPad Air', category: 'Electronics', price: 599, stock: 75, growth: -40 }
  ]}
  groupBy="category"
  sortable={true}
/>
```



** group column **
```jsx
<DataTable
  groupType="section"
     columns={[
    { label: 'Category', key: 'category' },
    { label: 'Product Name', key: 'name' },
    { 
      label: 'Price', 
      key: 'price',
      format: {
        type: 'currency',
        options: { locale: 'en-US', currency: 'USD' }
      },
groupTo: 'test'
    },
    { 
      label: 'Stock', 
      key: 'stock',
      format: { type: 'number', colorScale: 'negative' },
groupTo: 'test'
    },
{ 
      label: 'Growth', 
      key: 'growth',
      format: { type: 'percent', showArrow: true }
    }
  ]}
  rows={[
    { name: 'iPhone 15', category: 'Electronics', price: 999, stock: 50, growth: 10 },
    { name: 'MacBook Pro', category: 'Electronics', price: 2499, stock: 25, growth: -10 },
    { name: 'Office Chair', category: 'Furniture', price: 299, stock: 100, growth: 20 },
    { name: 'Standing Desk', category: 'Furniture', price: 599, stock: 30, growth: 50 },
    { name: 'iPad Air', category: 'Electronics', price: 599, stock: 75, growth: -40 }
  ]}
  groupBy="category"
  sortable={true}
/>
```



### Bar chart column
```jsx
<DataTable
  groupType="section"
     columns={[
    { label: 'Category', key: 'category' },
    { label: 'Product Name', key: 'name' },
    { 
      label: 'Price', 
      key: 'price',
      format: {
        type: 'currency',
        options: { locale: 'en-US', currency: 'USD' }
      }

    },
    { 
      label: 'Stock', 
      key: 'stock',
      format: { type: 'bar', options:{barColor: '#c29fe6'} }

    },
{ 
      label: 'Growth', 
      key: 'growth',
      format: { type: 'percent', showArrow: true }
    }
  ]}
  rows={[
    { name: 'iPhone 15', category: 'Electronics', price: 999, stock: 50, growth: 10 },
    { name: 'MacBook Pro', category: 'Electronics', price: 2499, stock: 25, growth: -10 },
    { name: 'Office Chair', category: 'Furniture', price: 299, stock: 100, growth: 20 },
    { name: 'Standing Desk', category: 'Furniture', price: 599, stock: 30, growth: 50 },
    { name: 'iPad Air', category: 'Electronics', price: 599, stock: 75, growth: -40 }
  ]}
  groupBy="category"
  sortable={true}
/>
```





### HTML Content Column

This example demonstrates a single column containing various HTML content types including bold text, italic text, links, and images.
```jsx
<DataTable
  columns={[
    { label: 'ID', key: 'id' },
    {
      label: 'HTML Content',
      key: 'htmlContent',
      format: {
        type: 'html',
        options: {
          sanitize: true
        }
      }
    }
  ]}
  rows={[
    {
      id: 1,
      htmlContent: '<strong>This is bold text</strong>'
    },
    {
      id: 2,
      htmlContent: '<em>This is italic text</em>'
    },
    {
      id: 3,
      htmlContent: '<a href="https://example.com" target="_blank">Visit Example.com</a>'
    },
    {
      id: 4,
      htmlContent: '<img src="https://placehold.co/640x360.png" alt="Placeholder Image" style="max-width: 200px; height: auto;" />'
    }
  ]}
  striped={true}
  bordered={true}
  hover={true}
/>
```
