
# DataTable Component

A flexible and feature-rich data table component with sorting, styling options, and custom column formatting.

## Features

- ✅ Sortable columns
- 🎨 Customizable styling (striped, hover, bordered)
- 📊 Custom column formatting (percent, currency, date)
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
      type: 'delta'
    },
    align: 'right'
  }
]}
  rows={[
  { name: 'John Doe', email: 'john@example.com', revenue: '-10%' },
  { name: 'Jane Smith', email: 'jane@example.com', revenue: '+200%' }
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
      type: 'delta'
    },
    align: 'right'
  }
]}
  rows={[
  { name: 'John Doe', email: 'john@example.com', revenue: '-10%' },
  { name: 'Jane Smith', email: 'jane@example.com', revenue: '+200%' }
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
      type: 'delta'
    },
    align: 'right'
  }
]}
  rows={[
  { name: 'John Doe', email: 'john@example.com', revenue: '-10%' },
  { name: 'Jane Smith', email: 'jane@example.com', revenue: '+200%' }
]}
  sortable={true}
  totalRow={true}
/>
