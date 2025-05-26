# LineBreak Component

A simple, responsive horizontal rule component for Angular applications with print-friendly styling.

## Features

- 📏 Consistent spacing
- 🖨️ Print-optimized styling
- 🎨 Clean, minimal design
- 🔄 Standalone component
- 📱 Responsive layout

## Usage

```jsx
import { LineBreak } from '@components/ui/LineBreak';

// In your template:
<LineBreak />
```

## Styling

The component uses Tailwind CSS with carefully chosen defaults:

### Screen Display
- Border color: `border-gray-200`
- Vertical margin: `my-4` (1rem top and bottom)
- Border style: Single line (`border-t`)

### Print Display
- Border color: `print:border-black`
- Vertical margin: `print:my-4` (maintained in print)
- High contrast for better print visibility

## Examples

### Basic Usage
```jsx
<div>
  <p>Content above the line</p>
  <LineBreak />
  <p>Content below the line</p>
</div>
```

### Section Divider
```jsx
<section>
  <h2>Section 1</h2>
  <p>Section content...</p>
  <LineBreak />
  <h2>Section 2</h2>
  <p>Section content...</p>
</section>
```

### Print Layout
```jsx
<div className="print:block">
  <div>Print header content</div>
  <LineBreak />
  <div>Print body content</div>
</div>
```

## Best Practices

1. Spacing Considerations:
   - Component includes built-in vertical margins
   - No need for additional margin classes
   - Consistent spacing across usage

2. Print Usage:
   - Automatically adjusts for print layouts
   - Maintains visibility in printed documents
   - Higher contrast in print mode

3. Semantic Usage:
   - Use for thematic breaks in content
   - Appropriate for section divisions
   - Maintain consistent visual hierarchy

## Technical Details

- Built for Angular applications
- Standalone component architecture
- Zero dependencies
- Minimal DOM footprint
- Tailwind CSS integration
- Print-media optimized
- No runtime overhead
