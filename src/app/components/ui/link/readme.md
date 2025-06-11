# Link Component

A versatile and accessible link component for Angular applications with built-in support for external links, visual variants, and icons.

## Features

- 🔗 Multiple link variants
- 🌐 External link handling
- 🎨 Customizable styling
- 🖼️ Optional icons
- ♿ Accessibility support
- 🎯 Focus management
- 💅 Tailwind CSS integration

## Usage
```jsx
<Link
  href="/path/to/page"
  text="Click here"
  variant="default"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | Required | URL or path to link to |
| `text` | `string` | Required | Link text content |
| `external` | `boolean` | `false` | Whether link opens in new tab |
| `underline` | `boolean` | `true` | Show/hide underline |
| `icon` | `boolean` | `true` | Show/hide icon |
| `variant` | `'default' \| 'muted' \| 'accent'` | `'default'` | Link style variant |

## Variants

### Default
- Blue color scheme
- Color: `text-blue-600`
- Hover: `text-blue-800`
- Focus ring: `ring-blue-400`

### Muted
- Gray color scheme
- Color: `text-gray-500`
- Hover: `text-gray-700`
- Focus ring: `ring-gray-400`

### Accent
- Indigo color scheme
- Color: `text-indigo-600`
- Hover: `text-indigo-800`
- Focus ring: `ring-indigo-400`

## Examples

### Basic Internal Link
```jsx
<Link
  href="/dashboard"
  text="Go to Dashboard"
/>
```

### External Link
```jsx
<Link
  href="https://example.com"
  text="Visit Website"
  external
/>
```

### Muted Link without Underline
```jsx
<Link
  href="/settings"
  text="Settings"
  variant="muted"
  underline={false}
/>
```

### Accent Link without Icon
```jsx
<Link
  href="/upgrade"
  text="Upgrade Now"
  variant="accent"
  icon={false}
/>
```

## Icons

The component includes two built-in icons:
- **Arrow Icon**: For internal links (→)
- **External Link Icon**: For external links (↗)

Icons can be:
- Enabled/disabled via the `icon` prop
- Automatically selected based on `external` prop
- Styled to match the link color
- Positioned after the text

## Styling

The component uses Tailwind CSS with carefully chosen defaults:

### Base Styling
- Inline flex layout
- Medium font weight
- Smooth transitions
- Focus ring styling
- Rounded corners
- Consistent height
- Gap between text and icon

### Interactive States
- Hover color changes
- Focus ring outline
- Focus ring offset
- Smooth transitions

## Accessibility

The component implements several accessibility features:

- Semantic `<a>` element
- Proper ARIA labels
- Focus management
- External link indicators
- Proper security attributes
- High contrast colors
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

1. Link Usage:
   - Use descriptive text
   - Indicate external links
   - Maintain consistent styling
   - Consider context for variants

2. Icon Usage:
   - Keep icons for visual hierarchy
   - Use external icons for external links
   - Maintain consistent positioning

3. Accessibility:
   - Provide meaningful text
   - Maintain color contrast
   - Keep focus indicators visible
   - Consider screen readers

## Technical Details

- Built for Angular applications
- Uses CommonModule
- Implements security best practices
- SVG icon support
- Responsive design
- Type-safe props interface
- Efficient DOM structure
