# Delta Component

A versatile component for displaying change indicators with directional arrows and formatted values. Perfect for showing metrics changes, percentages, and numerical differences with visual indicators.

## Dependencies

The component requires the following dependencies:
- `SafeHtmlPipe` - For safely rendering SVG icons
```tsx
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
```

## Features

# Delta Component

A versatile component for displaying change indicators with directional arrows and formatted values. Perfect for showing metrics changes, percentages, and numerical differences with visual indicators.

## Features

- Automatic or manual direction control (up/down)
- Optional directional arrows with SVG icons
- Number and percentage formatting
- Automatic sign prefixing (+ for positive values)
- Color-coded indicators (green for up, red for down)
- Accessibility support with ARIA labels
- Configurable text weight
- Smooth transitions

## Props

```tsx
interface DeltaProps {
  value: number | string;      // Required: The delta value to display
  direction?: 'up' | 'down' | 'auto'; // Optional: Force direction or auto-detect (default: 'auto')
  showArrow?: boolean;         // Optional: Show directional arrow (default: true)
  format?: 'percent' | 'number'; // Optional: Value format (default: 'percent')
  bold?: boolean;              // Optional: Use bold text (default: false)
}
```

## Usage Examples

### Basic Percentage Delta


Positive percentage change
```jsx
<Delta value={15.7} /> 
```

Negative percentage change
```jsx
<Delta value={-2.3} />  
```

### Numeric Delta


Positive numeric change
```jsx
<Delta 
  value={1234}
  format="number"
  bold={true}
/>
```


Negative numeric change
```jsx
<Delta 
  value="-500"
  format="number"
/>  
```


### Custom Direction


Force upward direction
```jsx
<Delta 
  value={42}
  direction="up"
/>  
```

Force downward direction
```jsx
<Delta 
  value={42}
  direction="down"
/>
```

### Without Arrow
```jsx
<Delta 
  value={15}
  showArrow={false}
/>
```

### String Values

```jsx
<Delta value="+15.7%" /> 
```
```jsx 
<Delta value="$1,234" format="number" /> 
```
## Value Formatting

### Percentage Format (Default)
- Displays with % symbol
- One decimal place
- Locale-aware formatting
- Automatic + prefix for positive values

### Number Format
- No % symbol
- Up to 2 decimal places
- Thousands separators
- Locale-aware formatting
- Automatic + prefix for positive values

## Styling

The component includes built-in styling:

### Container
- Inline flex layout
- Gap between elements
- Small text size (`text-sm`)
- Smooth color transitions
- Optional bold text

### Colors
- Up direction: Green (`text-green-600`)
- Down direction: Red (`text-red-600`)
- Neutral: Gray (`text-gray-600`)

### Icons
- SVG arrows
- Consistent sizing (`w-4 h-4`)
- Inherits text color
- Flex shrink prevention

## Direction Logic

The component determines direction in three ways:
1. Explicit direction prop (`up` or `down`)
2. Auto-detection based on value (when direction is `'auto'` or undefined)
3. Neutral state when value is 0

## Value Parsing

The component handles various value formats:
- Pure numbers
- Strings with numbers
- Strings with symbols (%, $, etc.)
- Negative values
- Decimal values

## Accessibility

The component implements several accessibility features:
- Semantic role attributes
- Descriptive ARIA labels
- Clear color contrast
- Screen reader friendly text

## Notes

- The component automatically strips non-numeric characters when parsing string values
- Zero values don't show a direction indicator
- All numeric formatting is locale-aware
- The component extends BaseComponent for consistent behavior
- Arrow icons are implemented as inline SVGs
- Text remains readable with any color scheme
- All text is non-wrapping to prevent layout shifts 