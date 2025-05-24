# BigValue Component

A component for displaying large, prominent values with optional labels and delta indicators. Perfect for dashboards, KPIs, and metrics displays with a modern, clean design.

## Features

- Large, bold value display
- Optional descriptive label
- Optional delta indicator with automatic color coding
- Flexible alignment options
- Responsive text sizing
- Automatic number formatting
- Accessibility support with ARIA labels

## Props

```tsx
interface BigValueProps {
  value: string | number;    // Required: The main value to display
  label?: string;           // Optional: Descriptive label below the value
  delta?: string;           // Optional: Change indicator (e.g., "+10%", "-5")
  alignment?: 'left' | 'center' | 'right'; // Optional: Content alignment (default: 'center')
}
```

## Usage Examples

### Basic Usage

#### Simple numeric value with label
<BigValue 
  value={1234567}
  label="Total Sales"
/>


### With Delta Indicator


#### Value with positive delta
<BigValue 
  value="$50,000"
  label="Revenue"
  delta="+15%"
/>

#### Value with negative delta
<BigValue 
  value="85"
  label="Customer Satisfaction"
  delta="-2.5%"
/>


### Different Alignments

#### Left-aligned content
<BigValue 
  value="1,234"
  label="New Users"
  alignment="left"
/>

#### Right-aligned content
<BigValue 
  value="$99.99"
  label="Average Order Value"
  alignment="right"
/>


### Mixed Content Types

#### String value
<BigValue 
  value="Premium"
  label="Account Status"
/>

#### Numeric value (automatically formatted)
<BigValue 
  value={1000000}
  label="Total Views"
/>


## Styling

The component includes built-in styling:

### Container
- Padding (`p-4`)
- Flex column layout with gap
- Full width
- Configurable alignment

### Value Display
- Large text size (`text-5xl` on mobile, `text-6xl` on desktop)
- Bold font weight
- Tight tracking
- Automatic number formatting with thousands separators

### Label
- Small text size (`text-sm`)
- Medium font weight
- Gray color (`text-gray-600`)

### Delta Indicator
- Extra small text size (`text-xs`)
- Medium font weight
- Automatic color coding:
  - Positive values: Green (`text-green-600`)
  - Negative values: Red (`text-red-600`)
  - Neutral values: Gray (`text-gray-500`)

## Accessibility

The component includes several accessibility features:
- ARIA labels for value, label, and delta
- Semantic HTML structure
- Role attributes for screen readers
- Clear text contrast ratios

## Number Formatting

Numbers are automatically formatted using `toLocaleString()` which adds:
- Thousands separators
- Proper decimal handling
- Locale-aware formatting

## Notes

- Delta values should include their sign (+ or -) for proper color coding
- The component is fully responsive with different text sizes for mobile and desktop
- All props are type-safe and properly handled for undefined cases
- The component extends BaseComponent for consistent behavior
- Empty or undefined optional props are safely omitted from rendering
