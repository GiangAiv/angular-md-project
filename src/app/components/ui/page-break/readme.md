# PageBreak Component

A simple utility component that forces a page break when printing in Angular applications.

## Features

- 🖨️ Print-specific page breaks
- 🎯 Zero impact on screen display
- 🔄 Standalone component
- 📱 Zero runtime overhead
- 💅 Tailwind CSS integration

## Usage

```jsx
import { PageBreak } from '@components/ui/PageBreak';

// In your template:
<PageBreak />
```

## Examples

### Basic Usage
```jsx
<div>
  <h2>Section 1</h2>
  <p>Content for first page...</p>
  
  <PageBreak />
  
  <h2>Section 2</h2>
  <p>Content for second page...</p>
</div>
```

### Multiple Page Breaks
```jsx
<div className="print:block">
  <section>
    <h2>Page 1</h2>
    <p>First page content...</p>
  </section>
  
  <PageBreak />
  
  <section>
    <h2>Page 2</h2>
    <p>Second page content...</p>
  </section>
  
  <PageBreak />
  
  <section>
    <h2>Page 3</h2>
    <p>Third page content...</p>
  </section>
</div>
```

## Styling

The component uses Tailwind CSS with print-specific utilities:

- `hidden`: Invisible in screen view
- `print:block`: Visible in print view
- `print:break-before-page`: Forces page break in print

## Best Practices

1. Print Layout:
   - Place between logical content breaks
   - Consider content flow
   - Test print preview

2. Usage Guidelines:
   - Use sparingly
   - Place at section boundaries
   - Consider page content length

3. Performance:
   - Zero impact on screen rendering
   - No effect on normal page flow
   - Minimal DOM footprint

## Technical Details

- Built for Angular applications
- Standalone component architecture
- Zero dependencies
- No runtime overhead
- Print-media optimized
- Minimal DOM impact
- Clean self-contained implementation
