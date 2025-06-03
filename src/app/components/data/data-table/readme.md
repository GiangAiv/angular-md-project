
# DataTable Component

A flexible and feature-rich data table component with sorting, styling options, and custom column formatting.

## Features

- ✅ Sortable columns
- 🎨 Customizable styling (striped, hover, bordered)
- 📊 Custom column formatting (percent, currency, date)
- 🌈 Color-coded cells with background colors (positive/negative/info scales)
- 🔍 Search functionality
- 📄 Pagination support
- 📈 Total row calculations
- 🌍 Internationalization support for currency and dates
- ♿ Accessibility support
- 📱 Responsive design

## Props

```tsx
interface ColumnFormat {
  type: 'percent' | 'currency' | 'date';
  options?: {
    // For currency
    locale?: string;
    currency?: string;
    // For date
    format?: string; // moment format string
    // For percent
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  };
  showArrow?: boolean;                    // Show delta arrows for positive/negative values
  colorScale?: 'positive' | 'negative' | 'info' | 'custom' | string;  // Color-code cells with background colors
  customColor?: string;                   // Hex color for 'custom' colorScale (e.g., '#ff6b35')
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

### Displaying All Columns
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


### Selecting Specific Columns


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


### Formatting Column

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



### Paginate


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






### Deltas


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







### Search


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





### Total Row


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


### Color Scale

Color-code cells with background colors based on values. Automatically sorts by value in descending order.

**Color Options:**
- **Preset colors**: `'positive'` (green), `'negative'` (red), `'info'` (blue)
- **Custom colors**: Use `colorScale: 'custom'` with `customColor: '#hexcode'`
- **Direct hex**: Use `colorScale: '#hexcode'` directly

#### Preset Colors

<DataTable
  columns={[
    { label: 'Product', key: 'product' },
    { label: 'Region', key: 'region' },
    {
      label: 'Performance Score',
      key: 'score',
      format: {
        type: 'percent',
        colorScale: 'positive'  // Green background, higher values = darker
      },
      align: 'right'
    },
    {
      label: 'Risk Level',
      key: 'risk',
      format: {
        colorScale: 'negative'  // Red background, higher values = darker
      },
      align: 'center'
    },
    {
      label: 'Info Rating',
      key: 'info',
      format: {
        colorScale: 'info'      // Blue background, higher values = darker
      },
      align: 'center'
    }
  ]}
  rows={[
    { product: 'Widget A', region: 'North', score: 0.85, risk: 2.1, info: 7.5 },
    { product: 'Widget B', region: 'South', score: 0.92, risk: 1.3, info: 8.2 },
    { product: 'Widget C', region: 'East', score: 0.78, risk: 3.7, info: 6.1 },
    { product: 'Widget D', region: 'West', score: 0.96, risk: 0.8, info: 9.3 }
  ]}
  sortable={true}
  striped={true}
  hover={true}
  bordered={true}
/>

#### Custom Colors

<DataTable
  columns={[
    { label: 'Product', key: 'product' },
    {
      label: 'Temperature',
      key: 'temperature',
      format: {
        colorScale: 'custom',
        customColor: '#ff6b35'  // Orange background
      },
      align: 'center'
    },
    {
      label: 'Humidity',
      key: 'humidity',
      format: {
        colorScale: '#9333ea'   // Purple background (direct hex)
      },
      align: 'center'
    },
    {
      label: 'Pressure',
      key: 'pressure',
      format: {
        colorScale: 'custom',
        customColor: '#06b6d4'  // Cyan background
      },
      align: 'center'
    }
  ]}
  rows={[
    { product: 'Sensor A', temperature: 72, humidity: 45, pressure: 1013 },
    { product: 'Sensor B', temperature: 68, humidity: 52, pressure: 1015 },
    { product: 'Sensor C', temperature: 75, humidity: 38, pressure: 1011 },
    { product: 'Sensor D', temperature: 70, humidity: 48, pressure: 1014 }
  ]}
  sortable={true}
  striped={true}
  hover={true}
  bordered={true}
/>
