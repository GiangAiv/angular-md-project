# Checkbox Component

A flexible and accessible checkbox component with support for labels, indeterminate state, and disabled state. Built with modern design principles and full accessibility support.

## Features

- Optional label support
- Indeterminate state
- Disabled state
- Automatic ID generation
- Custom name support
- Accessible design
- Modern styling with Tailwind CSS
- Smooth transitions
- Focus ring support
- Proper ARIA attributes

## Props

```tsx
interface CheckboxProps {
  label?: string;         // Optional: Label text for the checkbox
  checked?: boolean;      // Optional: Checked state
  disabled?: boolean;     // Optional: Disabled state
  indeterminate?: boolean; // Optional: Indeterminate state
  name?: string;          // Optional: Input name attribute
  id?: string;           // Optional: Custom ID (auto-generated if not provided)
}
```

## Usage Examples

### Basic Checkbox
```jsx
<Checkbox 
  label="Remember me"
  checked={true}
/>
```

### Disabled State

```jsx
<Checkbox 
  label="Unavailable option"
  disabled={true}
/>
```

### Indeterminate State

Useful for nested checkboxes or partial selections
```jsx
<Checkbox 
  label="Select all items"
  indeterminate={true}
/>
```

### Custom ID and Name
```jsx
<Checkbox 
  label="Subscribe to newsletter"
  id="newsletter-signup"
  name="newsletter"
/>
```

### Without Label
```jsx
<Checkbox 
  checked={true}
  name="toggle"
/>
```

## Styling

The component includes comprehensive built-in styling:

### Container
- Flex layout with proper alignment
- Relative positioning
- Proper spacing between checkbox and label

### Checkbox Input
- Consistent sizing (`h-4 w-4`)
- Blue accent color (`text-blue-600`)
- Gray border (`border-gray-300`)
- Rounded corners
- Focus ring styling
- Smooth color transitions
- Disabled state styling

### Label
- Left margin for spacing (`ml-2`)
- Small text size (`text-sm`)
- Gray text color (`text-gray-700`)
- Non-selectable text
- Proper cursor states
- Disabled state styling

## States

### Default
- White background
- Gray border
- Blue accent color
- Hoverable

### Checked
- Blue background
- White checkmark
- Accessible contrast

### Indeterminate
- Blue background
- White dash
- Special ARIA state

### Disabled
- Reduced opacity
- Not-allowed cursor
- Gray background
- Non-interactive

### Focus
- Blue ring
- No offset
- High contrast

## Accessibility

The component implements several accessibility features:
- Proper label association using `for` attribute
- Unique IDs (auto-generated or custom)
- ARIA checked states (`true`, `false`, `mixed`)
- ARIA disabled attribute
- Keyboard focus management
- High contrast states
- Screen reader support

## State Management

The component handles state in the following ways:
- Tracks checked state internally
- Manages indeterminate state
- Clears indeterminate on user interaction
- Prevents changes when disabled
- Updates ARIA states automatically

## Technical Details

### ID Generation
- Unique IDs are automatically generated if not provided
- Format: `checkbox-{random}`
- Consistent across re-renders
- Can be overridden with custom ID

### Event Handling
- Change events are blocked when disabled
- Indeterminate state is cleared on user interaction
- State updates trigger proper re-renders

## Notes

- The component extends BaseComponent for consistent behavior
- Indeterminate state is managed via ViewChild reference
- All states are properly reflected in ARIA attributes
- Focus ring is visible only on keyboard navigation
- Label is optional but recommended for accessibility
- The component handles all standard HTML checkbox attributes
- State changes maintain proper accessibility updates
- All styling is customizable through props 