# DataTable Component

A flexible and accessible data table component with sorting capabilities, customizable styling, and responsive design. Perfect for displaying structured data with a clean, modern interface.

## Features

- Sortable columns with tri-state sorting (ascending, descending, none)
- Striped rows for better readability
- Hover effects on rows
- Optional borders
- Responsive design with horizontal scrolling
- Accessibility support with ARIA attributes
- Empty state handling
- Modern styling with Tailwind CSS

## Props

```tsx
interface Column {
  label: string;     // Display label for the column
  key: string;       // Unique identifier and data key for the column
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

### Basic Table

```jsx
const columns = [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Role', key: 'role' }
];

const rows = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
];

<DataTable 
  columns={columns}
  rows={rows}
/>
```

### Sortable Table with Custom Styling

```jsx
const columns = [
  { label: 'Product', key: 'product' },
  { label: 'Price', key: 'price' },
  { label: 'Stock', key: 'stock' }
];

const rows = [
  { product: 'Laptop', price: 999.99, stock: 45 },
  { product: 'Mouse', price: 29.99, stock: 120 },
  { product: 'Keyboard', price: 59.99, stock: 84 }
];

<DataTable 
  columns={columns}
  rows={rows}
  sortable={true}
  striped={true}
  hover={true}
  bordered={true}
/>
```

### Minimal Style Table

```jsx
<DataTable 
  columns={columns}
  rows={rows}
  striped={false}
  hover={false}
  bordered={false}
/>
```

## Styling

The component includes comprehensive built-in styling:

### Container
- Full width with horizontal scroll (`w-full overflow-x-auto`)
- Automatic table layout (`table-auto`)
- Minimum full width (`min-w-full`)

### Header
- Light gray background (`bg-gray-100`)
- Left-aligned text
- Semi-bold font
- Gray text color (`text-gray-700`)
- Optional borders
- Sort indicators when sortable

### Rows
- Alternating background colors when striped
- Hover effect (configurable)
- Smooth transition effects
- Optional borders

### Cells
- Consistent padding (`px-4 py-2`)
- Optional borders
- Proper text alignment

## Sorting

The component supports tri-state sorting:
1. No sort (default state)
2. Ascending sort (↑)
3. Descending sort (↓)

Sorting features:
- Click column headers to sort
- Visual indicators show sort direction
- Proper ARIA labels for accessibility
- Handles null/undefined values
- Maintains sort state

## Accessibility

The component implements several accessibility features:
- Semantic table structure with proper roles
- ARIA sort attributes for sortable columns
- Proper scope attributes for headers
- Clear visual hierarchy
- Keyboard navigation support
- Descriptive ARIA labels for sort status

## Empty State

The table handles empty data gracefully:
- Shows "No data available" message
- Spans across all columns
- Properly styled placeholder
- Maintains table structure

## Notes

- The table is horizontally scrollable for responsive design
- Sort icons are visible only when sorting is enabled
- All styling is customizable through props
- The component extends BaseComponent for consistent behavior
- Sorting handles various data types appropriately
- The table maintains a clean look even with missing data
- All features can be enabled/disabled independently
