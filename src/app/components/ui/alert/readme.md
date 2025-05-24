# Alert Component

A flexible alert component that displays messages with different status types and styling.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| status | 'base' \| 'info' \| 'positive' \| 'warning' \| 'negative' | 'base' | The status/type of the alert |
| class | string | undefined | Additional CSS classes to apply |

## Features

- Multiple status types (base, info, positive, warning, negative)
- Deprecated status mapping (default → base, danger → negative, success → positive)
- Content projection support
- Markdown content support
- Responsive design
- Accessible (ARIA role="alert")

## Usage Examples

### Basic Alert
<Alert status="info">
  This is an informational alert.
</Alert>

### Warning Alert
<Alert status="warning">
  <strong>Warning!</strong> This action cannot be undone.
</Alert>

### Success Alert
<Alert status="positive">
  Your changes have been saved successfully.
</Alert>

### Error Alert
<Alert status="negative">
  An error occurred while processing your request.
</Alert>

### With Custom Class
<Alert status="info" class="my-custom-class">
  Custom styled alert.
</Alert>

## Important Notes

1. The component requires content to be provided through content projection
2. If no content is provided, an inline error will be displayed
3. The component supports markdown content with proper margin handling
4. Deprecated status values will trigger console warnings
5. The component is fully accessible with proper ARIA attributes 