# Image Component

A flexible and accessible image component for Angular applications with built-in support for captions, responsive sizing, and various display options.

## Features

- 🖼️ Responsive image handling
- 📝 Optional image captions
- ♿ Accessibility support
- 🔄 Lazy loading
- 🎨 Customizable styling
- ⚡ Error handling
- 📱 Flexible sizing options

## Usage

```typescript
import { ImageComponent } from './path-to/image.component';

// In your template:
<Image [props]="{
  src: 'path/to/image.jpg',
  alt: 'Description of image',
  caption: 'Optional caption text'
}"></Image>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | Required | The source URL of the image |
| `alt` | `string` | `undefined` | Alternative text for accessibility |
| `caption` | `string` | `undefined` | Optional caption displayed below the image |
| `width` | `string \| number` | `undefined` | Image width (px if number, unit if string) |
| `height` | `string \| number` | `undefined` | Image height (px if number, unit if string) |
| `rounded` | `boolean` | `false` | Applies rounded corners to the image |
| `objectFit` | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` | Image object-fit property |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Image loading strategy |

## Examples

### Basic Usage
<Image
  src="https://placehold.co/600x400.png"
  alt="A beautiful landscape"
/>


### With Caption
<Image
  src="https://placehold.co/800x400"
  alt="Sales chart"
  caption="Monthly sales performance - 2024"
/>


### Custom Sizing
<Image
  src="https://placehold.co/300x300"
  width={300}
  height={300}
  objectFit="cover"
  rounded
/>

### Responsive Image
<Image
  src="https://placehold.co/1200x400"
  width="100%"
  height="auto"
  loading="eager"
/>

## Styling

The component uses Tailwind CSS classes for styling and provides several customization options:

- Container: Flex column layout with centered items
- Image: Responsive sizing with customizable object-fit
- Caption: Centered text with gray color and appropriate spacing
- Rounded option: Applies rounded corners (rounded-lg)

## Accessibility

The component follows accessibility best practices:

- Required `alt` text for screen readers
- Proper ARIA labels when needed
- Semantic HTML structure
- Optional captions for additional context

## Error Handling

The component includes built-in error handling:
- Logs errors to console when images fail to load
- Hides failed images to prevent broken image placeholders
- Can be extended to show fallback images

## Best Practices

1. Always provide meaningful `alt` text for images
2. Use appropriate image dimensions to prevent layout shifts
3. Leverage lazy loading for better performance
4. Add captions when additional context is needed
5. Choose appropriate `objectFit` values for your use case

## Technical Details

- Built for Angular applications
- Uses CommonModule for core directives
- Implements responsive design patterns
- Supports TypeScript strict mode
- Follows Angular best practices
