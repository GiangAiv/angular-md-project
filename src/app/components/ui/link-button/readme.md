# LinkButton Component

A hybrid component that combines the functionality of a link with the appearance of a button, providing multiple variants, sizes, and icon support.

## Features

- 🎨 Multiple visual variants
- 📏 Three size options
- 🌐 External link support
- 🖼️ Custom icon support
- ♿ Accessibility-first
- 🎯 Focus management
- 💅 Tailwind CSS styling

## Usage
```jsx
<LinkButton
  href="/path/to/page"
  text="Click here"
  variant="primary"
  size="md"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | Required | URL or path to link to |
| `text` | `string` | Required | Button text content |
| `external` | `boolean` | `false` | Whether link opens in new tab |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `icon` | `string` | Built-in icons | Custom SVG icon markup |

## Variants

### Primary
- Solid blue background
- Colors:
  - Background: `bg-blue-600`
  - Text: `text-white`
  - Hover: `bg-blue-700`
  - Focus ring: `ring-blue-500`

### Secondary
- Light gray background
- Colors:
  - Background: `bg-gray-100`
  - Text: `text-gray-800`
  - Hover: `bg-gray-200`
  - Focus ring: `ring-gray-400`

### Ghost
- Transparent background
- Colors:
  - Background: `transparent`
  - Text: `text-blue-600`
  - Hover: `underline`
  - Focus ring: `ring-blue-400`

## Sizes

### Small (sm)
- Padding: `px-3 py-1.5`
- Font size: `text-sm`

### Medium (md)
- Padding: `px-4 py-2`
- Font size: `text-base`

### Large (lg)
- Padding: `px-5 py-3`
- Font size: `text-lg`

## Examples

### Basic Primary Button
```jsx
<LinkButton
  href="/dashboard"
  text="Go to Dashboard"
  variant="primary"
/>
```

### External Secondary Button
```jsx
<LinkButton
  href="https://example.com"
  text="Visit Website"
  variant="secondary"
  external
/>
```


### Large Primary Button
```jsx
<LinkButton
  href="/checkout"
  text="Proceed to Checkout"
  variant="primary"
  size="lg"
/>
```

## Icons

The component includes:
- Built-in arrow icon for internal links
- Built-in external link icon
- Support for custom SVG icons

Icon features:
- Automatic selection based on `external` prop
- Custom icon override via `icon` prop
- Consistent positioning and sizing
- Inherits current text color

## Styling

The component uses Tailwind CSS with carefully chosen defaults:

### Base Styling
- Flex layout with centered content
- Medium font weight
- Rounded corners
- Smooth transitions
- Focus ring with offset
- Consistent height per size

### Interactive States
- Hover effects per variant
- Focus ring outlines
- Color transitions
- Active state feedback

## Accessibility

The component implements several accessibility features:

- Role="button" for semantic meaning
- Proper ARIA labels
- Focus management
- External link indicators
- Proper security attributes
- High contrast ratios
- Keyboard navigation support

## Security

For external links, the component automatically adds:
- `target="_blank"`
- `rel="noopener noreferrer"`

This prevents:
- Tab nabbing attacks
- Referrer leakage
- Window manipulation

## Best Practices

1. Variant Selection:
   - Use primary for main actions
   - Use secondary for alternative actions
   - Use ghost for subtle actions

2. Size Selection:
   - Use md for most cases
   - Use sm for compact layouts
   - Use lg for prominent actions

3. Icon Usage:
   - Keep icons meaningful
   - Maintain consistent positioning
   - Use appropriate size per button size

4. Accessibility:
   - Provide clear text labels
   - Maintain sufficient contrast
   - Ensure focus visibility
   - Consider screen readers

## Technical Details

- Built for Angular applications
- Uses CommonModule
- Implements security best practices
- SVG icon support
- Responsive design
- Type-safe props interface
- Efficient DOM structure
- Smart icon management
