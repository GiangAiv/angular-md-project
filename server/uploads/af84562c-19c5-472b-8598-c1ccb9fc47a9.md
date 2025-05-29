# BigValue Component


## Props

```tsx
interface BigValueProps {
  value: string | number;    // Required: The main value to display
  label?: string;           // Optional: Descriptive label below the value
  delta?: string;           // Optional: Change indicator (e.g., "+10%", "-5")
  alignment?: 'left' | 'center' | 'right'; // Optional: Content alignment (default: 'center');
  comparisonTitle?: string;
  comparisonDelta?: string;
  link?: string
}
```

## Usage Examples

### Default
<BigValue 
  value={1234567}
  label="Total Sales"
  alignment="left"
/>


### Comparisons
<BigValue 
  value="$50,000"
  label="Revenue"
  delta="+15%"
  comparisonTitle="MoM"
  alignment="left"
/>

<BigValue 
  value="85"
  label="Customer Satisfaction"
  delta="-2.5%"
  comparisonTitle="MoM"
  alignment="left"
/>

### Linking to other pages

<BigValue 
  value="1,234"
  label="Num Orders"
  alignment="left"
  comparisonTitle=" vs. Last Month"
  delta="-2.5%"
  link="https://google.com"
/>


### Non-Delta Comparisons
<BigValue 
  value="1,234"
  label="Num Orders"
  alignment="left"
  comparisonTitle="Last Month"
  comparisonDelta={300}
/>





