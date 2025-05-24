# Render HTML Component

A component for safely rendering HTML strings with proper styling and sanitization.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| content | string | '' | The HTML string to render |
| class | string | undefined | Additional CSS classes to apply |

## Features

- Safe HTML rendering with sanitization
- Responsive design
- Proper styling for common HTML elements
- Support for custom classes
- Accessibility support

## Usage Examples

### Basic Usage
<app-render-html content="<p>This is a paragraph</p>" />

### With Custom Class
<app-render-html 
  content="<h1>Title</h1><p>Content</p>"
  class="my-custom-class"
/>

### Complex HTML
<app-render-html 
  content="
    <h1>Main Title</h1>
    <p>Some text with <a href='#'>a link</a></p>
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
    </ul>
  "
/>

## Important Notes

1. The component uses Angular's DomSanitizer for safe HTML rendering
2. All HTML is sanitized to prevent XSS attacks
3. The component supports all standard HTML elements
4. Styles are scoped to the component using :global() selector
5. The component is responsive and adapts to container width
6. Custom classes can be applied for additional styling 