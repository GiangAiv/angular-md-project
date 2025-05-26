# DimensionGrid Component

A flexible table-grid component for displaying data in a sortable, selectable format with support for dynamic columns and responsive layout.

## Features

- 📊 Table-based grid layout
- 🔄 Sortable columns
- ✨ Row selection
- 📱 Responsive design
- 🎨 Customizable column widths
- 💡 Selection highlighting
- ♿ Accessibility support
- 💅 Tailwind CSS styling
- 🎯 Number formatting

## Usage

```typescript
import { DimensionGridComponent } from './dimension-grid.component';

// Basic usage
<DimensionGrid
  columns={[
    { field: 'state', header: 'State' },
    { field: 'value', header: 'Value' }
  ]}
  items={[
    { state: 'California', value: 41000 },
    { state: 'Texas', value: 37500 },
    { state: 'Florida', value: 28800 }
  ]}
  onSortChange={handleSort}
  onSelectionChange={handleSelection}
/>

// With all options
<DimensionGrid
  columns={[
    { field: 'state', header: 'State', width: 'w-48' },
    { field: 'value', header: 'Value', width: 'w-32' }
  ]}
  items={items}
  sortField="value"
  sortDirection="desc"
  selectedItems={['CA-01']}
  highlightOnSelect={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `GridColumn[]` | Required | Array of column definitions |
| `items` | `GridItem[]` | Required | Array of data items |
| `sortField` | `string` | - | Current sort field |
| `sortDirection` | `'asc' \| 'desc'` | - | Current sort direction |
| `selectedItems` | `string[]` | `[]` | Array of selected item IDs |
| `highlightOnSelect` | `boolean` | `false` | Whether to highlight selected rows |

### Interfaces

```typescript
interface GridColumn {
  field: string;    // Field name in data
  header: string;   // Column header text
  width?: string;   // Optional Tailwind width class
}

interface GridItem {
  [key: string]: string | number;  // Dynamic key-value pairs
}
```

## Events

| Event | Type | Description |
|-------|------|-------------|
| `onSortChange` | `(data: { field: string; direction: 'asc' \| 'desc' }) => void` | Called when sort changes |
| `onSelectionChange` | `(selectedIds: string[]) => void` | Called when selection changes |
| `onChange` | `(props: DimensionGridProps) => void` | Called when any prop changes |

## Examples

### Basic Table Grid
```typescript
<DimensionGrid
  columns={[
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'price', header: 'Price' }
  ]}
  items={products}
/>
```

### Sortable Grid with Selection
```typescript
<DimensionGrid
  columns={columns}
  items={items}
  sortField="price"
  sortDirection="desc"
  selectedItems={selectedIds}
  highlightOnSelect={true}
  onSortChange={onSort}
  onSelectionChange={onSelection}
/>
```

### Custom Column Widths
```typescript
<DimensionGrid
  columns={[
    { field: 'id', header: '#', width: 'w-16' },
    { field: 'name', header: 'Name', width: 'w-64' },
    { field: 'status', header: 'Status', width: 'w-32' }
  ]}
  items={data}
/>
```

## Styling

The component uses Tailwind CSS with carefully chosen defaults:

### Container
- Full width with horizontal scroll
- Rounded corners
- Light border
- Shadow effect

### Table Header
- Light gray background
- Uppercase text
- Hover effects on sortable columns
- Sort direction indicators

### Table Body
- Clean row separation
- Hover state for rows
- Selection highlighting
- Proper cell padding
- Responsive text sizing

### States
- **Default**
  - White background
  - Gray borders
  - Dark text

- **Selected**
  - Light blue background
  - Maintained text contrast
  - Clear visual indication

- **Hover**
  - Light gray background
  - Smooth transition
  - Cursor pointer for interactive elements

## Accessibility

The component implements several accessibility features:

- Semantic table structure
- ARIA attributes for sorting
- Proper table headers
- Interactive elements with proper roles
- Screen reader friendly sort indicators
- Keyboard navigation support

## Best Practices

1. Column Configuration:
   - Use meaningful field names
   - Provide clear headers
   - Set appropriate column widths
   - Consider data types

2. Data Presentation:
   - Format numbers appropriately
   - Handle empty states
   - Consider text overflow
   - Maintain data consistency

3. Interaction Design:
   - Implement clear sort indicators
   - Provide selection feedback
   - Handle large datasets
   - Consider mobile views

## Technical Details

- Built for Angular applications
- Extends BaseComponent
- Uses CommonModule
- Type-safe interfaces
- Responsive design
- Sort management
- Selection handling
- Event emission 