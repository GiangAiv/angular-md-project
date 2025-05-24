# Value Component

A versatile component for displaying single values or aggregated data from arrays of objects. The component provides a clean, styled display with hover effects and supports various aggregation functions.

## Features

- Display single values from data arrays
- Aggregate data using various functions (sum, average, min, max, median)
- Customizable placeholder for empty or error states
- Responsive styling with hover effects

## Props

```tsx
interface ValueProps {
  data: any[];        // Required: Array of objects containing the data
  column?: string;    // Optional: Column name to extract value from
  row?: number;       // Optional: Row index to display (defaults to 0)
  placeholder?: string; // Optional: Fallback text when value is unavailable
  agg?: 'sum' | 'avg' | 'min' | 'median' | 'max'; // Optional: Aggregation function
}
```

## Usage Examples

### Basic Usage - Display Single Value

```jsx
// Display the 'price' from the first row
const data = [
  { price: 99.99, name: 'Product 1' },
  { price: 149.99, name: 'Product 2' }
];

<Value 
  data={data} 
  column="price"
/>
```

### Display Specific Row

```jsx
// Display the 'price' from the second row (index 1)
<Value 
  data={data} 
  column="price" 
  row={1}
/>
```

### Using Aggregation

```jsx
// Calculate average price
<Value 
  data={data} 
  column="price" 
  agg="avg"
/>

// Find maximum price
<Value 
  data={data} 
  column="price" 
  agg="max"
/>

// Calculate median price
<Value 
  data={data} 
  column="price" 
  agg="median"
/>
```

### Custom Placeholder

```jsx
// Display custom text when value is not available
<Value 
  data={[]} 
  column="price" 
  placeholder="No price available"
/>
```

## Styling

The component comes with built-in styling:
- Gray background (`bg-gray-50`)
- Rounded corners (`rounded-md`)
- Hover effect (`hover:bg-gray-100`)
- Centered text
- Padding (`px-3 py-2`)
- Minimum width (`min-w-[40px]`)
- Gray text for placeholder values

## Error Handling

The component handles various error cases gracefully:
- Empty data array
- Invalid column name
- Non-numeric values for aggregation
- Missing data

In all error cases, it will display either the provided placeholder or 'N/A' as a fallback.

## Notes

- For aggregation functions, only numeric values are considered
- Non-numeric values are filtered out during aggregation
- The component extends BaseComponent for consistent behavior
- All aggregation calculations are type-safe and error-handled
