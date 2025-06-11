# Info Component

A versatile information alert component for Angular applications with support for multiple variants, icons, and dismissible functionality.

## Features

- 🎨 Four variants: info, success, warning, error
- 🔔 Built-in icons for each variant
- ✨ Custom icon support
- 🚫 Dismissible option
- ♿ Accessibility-first design
- 🎯 Semantic roles and ARIA attributes
- 💅 Tailwind CSS styling

## Usage


```jsx
<Info
  title="Optional Title"
  message="Your message here"
  variant="info"
  dismissible
  onDismiss={handleDismiss}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | Required | The main message to display |
| `title` | `string` | `undefined` | Optional title above the message |
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert variant style |
| `icon` | `string` | Built-in icons | Custom SVG icon markup |
| `dismissible` | `boolean` | `false` | Whether the alert can be dismissed |
| `onDismiss` | `() => void` | `undefined` | Callback when alert is dismissed |

## Examples

### Basic Info Alert
```jsx
<Info message="This is a basic info message" />
```

### Success Alert with Title
```jsx
<Info
  title="Operation Successful"
  message="Your changes have been saved"
  variant="success"
/>
```

### Dismissible Warning
```jsx
<Info
  title="Please Note"
  message="Your session will expire in 5 minutes"
  variant="warning"
  dismissible
  onDismiss={handleDismiss}
/>
```

### Error with Custom Icon
```jsx
<Info
  title="Error Occurred"
  message="Unable to process your request"
  variant="error"
  icon={customIconSvg}
/>
```

## Styling

The component uses Tailwind CSS with contextual colors based on variants:

### Variant Color Schemes
- **Info**: Blue theme
  - Background: `bg-blue-50`
  - Border: `border-blue-200`
  - Text: `text-blue-800`
  - Icon: `text-blue-500`

- **Success**: Green theme
  - Background: `bg-green-50`
  - Border: `border-green-200`
  - Text: `text-green-800`
  - Icon: `text-green-500`

- **Warning**: Yellow theme
  - Background: `bg-yellow-50`
  - Border: `border-yellow-200`
  - Text: `text-yellow-800`
  - Icon: `text-yellow-500`

- **Error**: Red theme
  - Background: `bg-red-50`
  - Border: `border-red-200`
  - Text: `text-red-800`
  - Icon: `text-red-500`

## Accessibility

The component implements several accessibility features:

- Dynamic `role` attribute (`alert` for warning/error, `status` for info/success)
- `aria-live="polite"` for screen reader announcements
- Semantic HTML structure
- Accessible dismiss button with aria-label
- Color combinations meeting WCAG contrast requirements

## Built-in Icons

Each variant comes with a default icon if no custom icon is provided:
- **Info**: Circled "i" icon
- **Success**: Checkmark in circle
- **Warning**: Triangle exclamation
- **Error**: X in circle

## Best Practices

1. Use appropriate variants for different message types:
   - `info` for general information
   - `success` for successful operations
   - `warning` for potential issues
   - `error` for error states

2. Include clear and concise messages
3. Use titles for additional context when needed
4. Make alerts dismissible when they're not critical
5. Ensure custom icons maintain accessibility

## Technical Details

- Built for Angular applications
- Uses CommonModule for core directives
- Implements responsive design
- Supports TypeScript strict mode
- Event-driven dismissal handling
- SVG icon support with sanitization
