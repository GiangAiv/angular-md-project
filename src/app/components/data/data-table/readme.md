

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
  align?: 'left' | 'right' | 'center'; // Optional: Text alignment (default: 'left')
  groupTo?: string;                     // Optional: Group name for column header grouping
}

interface DataTableProps {
  columns: Column[];                // Required: Array of column definitions
  rows: Record<string, any>[];      // Required: Array of data objects
  striped?: boolean;                // Optional: Enable striped rows (default: true)
  hover?: boolean;                  // Optional: Enable row hover effect (default: true)
  bordered?: boolean;               // Optional: Show borders (default: true)
  sortable?: boolean;               // Optional: Enable column sorting (default: false)
  searchable?: boolean;             // Optional: Enable search functionality (default: false)
  paginated?: boolean;              // Optional: Enable pagination (default: false)
  pageSize?: number;                // Optional: Number of rows per page (default: 10)
  searchPlaceholder?: string;       // Optional: Placeholder text for search input
  totalRow?: boolean;               // Optional: Show total row at bottom (default: false)
  groupBy?: string;                 // Optional: Column key to group data by
  groupType?: 'accordion' | 'section'; // Optional: How to display groups (default: 'accordion')
  subtotals?: string[];             // Optional: Array of column keys to calculate subtotals for
  groupOpen?: boolean;              // Optional: Whether groups are open by default (default: true)
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


### Group By

The `groupBy` feature allows you to group table rows by a specific column value. When enabled:

- Data is grouped by the specified column
- Group headers show the group value and item count
- Groups can be expanded/collapsed by clicking the header (accordion type only)
- Sorting works within each group
- Search filters data and regroups results
- Pagination is disabled (all groups are shown)
- Use `groupOpen` to control whether groups are expanded by default (default: true)

### Group Types

The `groupType` option controls how grouped data is displayed:

#### Accordion Type (Default)
- `groupType: 'accordion'` or omitted
- Groups are displayed with collapsible headers
- Click headers to expand/collapse groups
- Subtotals appear in the group headers when enabled

#### Section Type
- `groupType: 'section'`
- Groups are displayed as merged sections
- The group column cells are vertically merged for each group
- Groups are always visible (no expand/collapse)
- Subtotals appear as separate rows below each group when enabled

### Subtotals with GroupBy

When using `subtotals` with `groupBy`, you can display calculated subtotals for numeric columns in the group headers:

- Specify column keys in the `subtotals` array to calculate subtotals
- Subtotals are displayed in the group header row, aligned with their respective columns
- Only numeric columns (currency, percent, number) show subtotals
- Subtotals respect the column's formatting (currency, number formatting, etc.)

### Group Open/Closed State

The `groupOpen` option controls the default expanded state of groups:

- `groupOpen: true` (default): All groups are expanded by default
- `groupOpen: false`: All groups are collapsed by default
- Users can still manually expand/collapse individual groups by clicking the group headers
- The expanded/collapsed state is maintained when searching or sorting

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
  { name: 'iPad Air', category: 'Electronics', price: 599, stock: 75 }
]}
  groupBy="category"
  subtotals={["price", "stock"]}
  groupOpen={false}
  sortable={true}
  searchable={true}
/>

### Section Grouping Example

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
  { name: 'iPad Air', category: 'Electronics', price: 599, stock: 75 }
]}
  groupBy="category"
  groupType="section"
  subtotals={["price", "stock"]}
  sortable={true}
  searchable={true}
/>

### Column Header Grouping (groupTo)

The `groupTo` feature allows you to group column headers under common group names. When columns have the same `groupTo` value, they are grouped together with a spanning header row above the regular column headers.

Features:
- Columns with the same `groupTo` value are grouped together
- A group header row is added above the regular column headers
- Group headers span across all columns in the group
- Columns without `groupTo` are displayed individually
- Works with all other table features (sorting, grouping, pagination, etc.)

<DataTable
  columns={[
    { label: 'Product Name', key: 'name' },
    {
      label: 'Q1 Sales',
      key: 'q1Sales',
      groupTo: 'Sales Data',
      format: { type: 'currency', options: { locale: 'en-US', currency: 'USD' } }
    },
    {
      label: 'Q2 Sales',
      key: 'q2Sales',
      groupTo: 'Sales Data',
      format: { type: 'currency', options: { locale: 'en-US', currency: 'USD' } }
    },
    {
      label: 'Q1 Growth',
      key: 'q1Growth',
      groupTo: 'Growth Metrics',
      format: { type: 'percent' }
    },
    {
      label: 'Q2 Growth',
      key: 'q2Growth',
      groupTo: 'Growth Metrics',
      format: { type: 'percent' }
    }
  ]}
  rows={[
    {
      name: 'iPhone 15',
      q1Sales: 50000,
      q2Sales: 65000,
      q1Growth: 0.15,
      q2Growth: 0.30
    },
    {
      name: 'MacBook Pro',
      q1Sales: 30000,
      q2Sales: 35000,
      q1Growth: 0.10,
      q2Growth: 0.17
    },
    {
      name: 'iPad Air',
      q1Sales: 25000,
      q2Sales: 28000,
      q1Growth: 0.08,
      q2Growth: 0.12
    }
  ]}
  sortable={true}
  striped={true}
  bordered={true}
/>






** info **
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








** positive **
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







** negative **
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






** custom color **
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






### Custom Color Palettes

** Diverging Scale **
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



** Heatmap **
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





** Red Negatives **
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





** Color Breakpoints **
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
