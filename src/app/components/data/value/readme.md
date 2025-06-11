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
  { id: 1, name: "Wireless Mouse", price: 25.99 },
  { id: 2, name: "Gaming Keyboard", price: 89.49 },
  { id: 3, name: "HD Monitor", price: 199.99 },
  { id: 4, name: "USB-C Cable", price: 9.95 },
  { id: 5, name: "Laptop Stand", price: 39.99 },
  { id: 6, name: "External SSD 1TB", price: 129.95 },
  { id: 7, name: "Bluetooth Speaker", price: 45.50 },
  { id: 8, name: "Smartphone Tripod", price: 19.99 },
  { id: 9, name: "Noise Cancelling Headphones", price: 149.00 },
  { id: 10, name: "Portable Charger", price: 29.90 }
];
```

```jsx
<Value 
  data={[
  { id: 1, name: "Wireless Mouse", price: 25.99 },
  { id: 2, name: "Gaming Keyboard", price: 89.49 },
  { id: 3, name: "HD Monitor", price: 199.99 },
  { id: 4, name: "USB-C Cable", price: 9.95 },
  { id: 5, name: "Laptop Stand", price: 39.99 },
  { id: 6, name: "External SSD 1TB", price: 129.95 },
  { id: 7, name: "Bluetooth Speaker", price: 45.50 },
  { id: 8, name: "Smartphone Tripod", price: 19.99 },
  { id: 9, name: "Noise Cancelling Headphones", price: 149.00 },
  { id: 10, name: "Portable Charger", price: 29.90 }
]} 
  column="price"
/>
```


### Display Specific Row

```jsx
<Value 
  data={[
  { id: 1, name: "Wireless Mouse", price: 25.99 },
  { id: 2, name: "Gaming Keyboard", price: 89.49 },
  { id: 3, name: "HD Monitor", price: 199.99 },
  { id: 4, name: "USB-C Cable", price: 9.95 },
  { id: 5, name: "Laptop Stand", price: 39.99 },
  { id: 6, name: "External SSD 1TB", price: 129.95 },
  { id: 7, name: "Bluetooth Speaker", price: 45.50 },
  { id: 8, name: "Smartphone Tripod", price: 19.99 },
  { id: 9, name: "Noise Cancelling Headphones", price: 149.00 },
  { id: 10, name: "Portable Charger", price: 29.90 }
]} 
  column="price" 
  row={1}
/>
```


## Using Aggregation


### Calculate average price
```jsx
<Value 
  data={[
  { id: 1, name: "Wireless Mouse", price: 25.99 },
  { id: 2, name: "Gaming Keyboard", price: 89.49 },
  { id: 3, name: "HD Monitor", price: 199.99 },
  { id: 4, name: "USB-C Cable", price: 9.95 },
  { id: 5, name: "Laptop Stand", price: 39.99 },
  { id: 6, name: "External SSD 1TB", price: 129.95 },
  { id: 7, name: "Bluetooth Speaker", price: 45.50 },
  { id: 8, name: "Smartphone Tripod", price: 19.99 },
  { id: 9, name: "Noise Cancelling Headphones", price: 149.00 },
  { id: 10, name: "Portable Charger", price: 29.90 }
]} 
  column="price" 
  agg="avg"
/>
```

### Find maximum price
```jsx
<Value 
  data={[
  { id: 1, name: "Wireless Mouse", price: 25.99 },
  { id: 2, name: "Gaming Keyboard", price: 89.49 },
  { id: 3, name: "HD Monitor", price: 199.99 },
  { id: 4, name: "USB-C Cable", price: 9.95 },
  { id: 5, name: "Laptop Stand", price: 39.99 },
  { id: 6, name: "External SSD 1TB", price: 129.95 },
  { id: 7, name: "Bluetooth Speaker", price: 45.50 },
  { id: 8, name: "Smartphone Tripod", price: 19.99 },
  { id: 9, name: "Noise Cancelling Headphones", price: 149.00 },
  { id: 10, name: "Portable Charger", price: 29.90 }
]} 
  column="price" 
  agg="max"
/>
```

### Calculate median price
```jsx
<Value 
  data={[
  { id: 1, name: "Wireless Mouse", price: 25.99 },
  { id: 2, name: "Gaming Keyboard", price: 89.49 },
  { id: 3, name: "HD Monitor", price: 199.99 },
  { id: 4, name: "USB-C Cable", price: 9.95 },
  { id: 5, name: "Laptop Stand", price: 39.99 },
  { id: 6, name: "External SSD 1TB", price: 129.95 },
  { id: 7, name: "Bluetooth Speaker", price: 45.50 },
  { id: 8, name: "Smartphone Tripod", price: 19.99 },
  { id: 9, name: "Noise Cancelling Headphones", price: 149.00 },
  { id: 10, name: "Portable Charger", price: 29.90 }
]} 
  column="price" 
  agg="median"
/>
```

### Custom Placeholder
```jsx
<Value 
  data={[
  { id: 1, name: "Wireless Mouse", price: 25.99 },
  { id: 2, name: "Gaming Keyboard", price: 89.49 },
  { id: 3, name: "HD Monitor", price: 199.99 },
  { id: 4, name: "USB-C Cable", price: 9.95 },
  { id: 5, name: "Laptop Stand", price: 39.99 },
  { id: 6, name: "External SSD 1TB", price: 129.95 },
  { id: 7, name: "Bluetooth Speaker", price: 45.50 },
  { id: 8, name: "Smartphone Tripod", price: 19.99 },
  { id: 9, name: "Noise Cancelling Headphones", price: 149.00 },
  { id: 10, name: "Portable Charger", price: 29.90 }
]} 
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
