# Render HTML Component

A component for safely rendering HTML from a node-based structure with proper styling and sanitization.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| nodes | RenderNode[] | [] | Array of node objects to render |
| class | string | undefined | Additional CSS classes to apply |

## Node Structure

Each node in the `nodes` array should follow this structure:

```typescript
interface RenderNode {
  component: string;           // HTML tag name (e.g., 'div', 'p', 'h1')
  props?: {                   // HTML attributes
    class?: string;
    style?: string;
    [key: string]: any;       // Any other HTML attributes
  };
  children?: (RenderNode | string)[]; // Child nodes or text content
}
```

## Features

- Safe HTML rendering with sanitization
- Node-based structure for programmatic HTML generation
- Responsive design
- Proper styling for common HTML elements
- Support for custom classes and attributes
- Accessibility support
- Automatic escaping of text content and attributes

## Usage Examples

### Basic Usage
```typescript
const nodes = [
  {
    component: 'p',
    props: {},
    children: ['This is a paragraph']
  }
];
```
```html
<app-render-html [props]="{nodes: nodes}" />
```

### With Custom Classes and Styles
```typescript
const nodes = [
  {
    component: 'div',
    props: {
      class: 'custom-container',
      style: 'background-color: #f0f0f0; padding: 1rem;'
    },
    children: [
      {
        component: 'h1',
        props: { class: 'title' },
        children: ['Main Title']
      },
      {
        component: 'p',
        props: {},
        children: ['Some content here']
      }
    ]
  }
];
```

### Complex Nested Structure
```typescript
const nodes = [
  {
    component: 'div',
    props: { class: 'content-wrapper' },
    children: [
      {
        component: 'h3',
        props: {},
        children: ['Custom Content']
      },
      {
        component: 'p',
        props: { class: 'description' },
        children: ['You can add any HTML content here using RenderHtml component.']
      },
      {
        component: 'ul',
        props: {},
        children: [
          {
            component: 'li',
            props: {},
            children: ['List item 1']
          },
          {
            component: 'li',
            props: {},
            children: ['List item 2']
          },
          {
            component: 'li',
            props: {},
            children: ['List item 3']
          }
        ]
      }
    ]
  }
];
```

### With Links and Mixed Content
```typescript
const nodes = [
  {
    component: 'div',
    props: {},
    children: [
      {
        component: 'p',
        props: {},
        children: [
          'Visit our ',
          {
            component: 'a',
            props: {
              href: 'https://example.com',
              target: '_blank',
              class: 'text-blue-600 hover:underline'
            },
            children: ['website']
          },
          ' for more information.'
        ]
      }
    ]
  }
];
```

### Self-Closing Elements
```typescript
const nodes = [
  {
    component: 'div',
    props: {},
    children: [
      {
        component: 'img',
        props: {
          src: 'https://example.com/image.jpg',
          alt: 'Example image',
          class: 'w-full h-auto'
        }
      },
      {
        component: 'hr',
        props: { class: 'my-4' }
      }
    ]
  }
];
```

## Important Notes

1. The component uses Angular's DomSanitizer for safe HTML rendering
2. All HTML content and attributes are automatically escaped to prevent XSS attacks
3. The component supports all standard HTML elements including self-closing tags
4. Styles are scoped to the component using :global() selector
5. The component is responsive and adapts to container width
6. Custom classes and attributes can be applied through the props object
7. Text content is automatically escaped for security
8. Boolean attributes are handled correctly (e.g., `disabled`, `checked`)

## Migration from String-based Content

If you were previously using the `content` prop with HTML strings, you can convert them to the node structure:

**Before:**
```html
<app-render-html content="<h1>Title</h1><p>Content</p>" />
```

**After:**
```typescript
const nodes = [
  {
    component: 'h1',
    props: {},
    children: ['Title']
  },
  {
    component: 'p',
    props: {},
    children: ['Content']
  }
];
```
```html
<app-render-html [props]="{nodes: nodes}" />
```