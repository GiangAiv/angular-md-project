# Embed Component

A component for embedding external content in an iframe with customizable dimensions and styling.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| url | string | '' | The URL to embed |
| title | string | '' | A description or title for the embed |
| width | string | '100%' | Width of the embed, defaults to full width |
| height | string | '400' | Height of the embed, defaults to 400px |
| align | 'left' \| 'center' \| 'right' | 'left' | Alignment of the embed |
| border | boolean | true | Toggle border visibility |
| class | string | undefined | Additional CSS classes to apply |

## Features

- Responsive iframe embedding
- Customizable dimensions
- Alignment options
- Border toggle
- Lazy loading
- Accessibility support
- Custom styling support

## Usage Examples

### Basic Usage
<Embed url="https://example.com/embed" />

### Custom Dimensions
<Embed 
  url="https://example.com/embed"
  width="800"
  height="600"
/>

### Centered with Border
<Embed 
  url="https://example.com/embed"
  align="center"
  border={true}
/>

### Custom Styling
<Embed 
  url="https://example.com/embed"
  class="my-custom-class"
/>

## Important Notes

1. The component uses lazy loading for better performance
2. Dimensions can be specified in pixels or percentages
3. The iframe is set to be responsive and fill its container
4. The component includes proper accessibility attributes
5. Border styling can be customized through the border prop
6. The component supports custom classes for additional styling 