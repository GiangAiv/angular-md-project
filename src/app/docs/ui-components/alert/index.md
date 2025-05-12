# Alert

The Alert component is used to display important messages to users, such as notifications, warnings, or errors.

## Basic Usage

```html
<app-alert
  status="info"
>
This is an informational alert message.
</app-alert>
```

## Examples

### Basic Alert

{{ NgDocActions.demo("AlertDemoComponent") }}

## Alert Types

The Alert component supports five different types:

1. **Base** (`status="base"`)
   - Used for general information
   - Gray color scheme
   - Default style

2. **Info** (`status="info"`)
   - Used for general information
   - Blue color scheme
   - Information icon

3. **Positive** (`status="positive"`)
   - Used for successful operations
   - Green color scheme
   - Checkmark icon

4. **Warning** (`status="warning"`)
   - Used for cautionary messages
   - Yellow color scheme
   - Warning icon

5. **Negative** (`status="negative"`)
   - Used for error messages
   - Red color scheme
   - Error icon

## Accessibility

The Alert component follows WAI-ARIA best practices:

- Uses appropriate ARIA roles and attributes
- Provides clear visual indicators
- Supports keyboard navigation
- Maintains proper color contrast ratios

## Styling

The component uses Tailwind CSS classes for styling. You can customize the appearance by:

1. Modifying the Tailwind configuration
2. Adding custom classes to the component
3. Using the provided CSS variables for theming

## Best Practices

1. Use appropriate alert types for different situations
2. Keep messages clear and concise
3. Make alerts dismissible when appropriate
4. Consider using alerts for temporary messages
5. Ensure proper color contrast for accessibility
6. Test with screen readers
7. Consider mobile responsiveness

## Playground

{{ NgDocActions.playground("AlertPlayground") }}

<div id="end"></div>