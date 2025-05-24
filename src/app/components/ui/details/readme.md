# Details Component

A collapsible details component that displays content in an expandable section with print support.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | 'Details' | The title of the details section |
| open | boolean | false | Whether the details section is expanded |
| printShowAll | boolean | true | Whether to show all content when printing |
| class | string | undefined | Additional CSS classes to apply |

## Features

- Expandable/collapsible content
- Print mode support
- Smooth animations
- Customizable title
- Content projection support
- Responsive design

## Usage Examples

### Basic Usage
<Details title="More Information">
  <p>This is the content of the details section.</p>
</Details>

### Pre-expanded
<Details title="Important Details" [open]="true">
  <p>This content is visible by default.</p>
</Details>

### Print Mode
<Details title="Print Content" [printShowAll]="false">
  <p>This content will be hidden when printing.</p>
</Details>

### With Custom Class
<Details title="Custom Styled" class="my-custom-class">
  <p>This details section has custom styling.</p>
</Details>

## Important Notes

1. The component supports content projection for flexible content
2. Print mode can be controlled with the `printShowAll` prop
3. The component includes smooth animations for expanding/collapsing
4. The marker icon rotates when the section is expanded
5. The component is fully responsive and works well in print mode 