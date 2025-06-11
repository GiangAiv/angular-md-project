# DateInput Component

A modern, accessible date input component powered by ngx-daterangepicker-material. Features a clean design, date restrictions, and full keyboard support. Perfect for forms and date selection interfaces.

## Features

- Clean, modern design
- Keyboard accessible date picker
- Mobile-friendly interface
- Date range restrictions
- Disabled state support
- Custom formatting
- Dropdown year/month selection
- Automatic value handling
- Responsive layout
- Proper focus management

## Dependencies

The component requires ngx-daterangepicker-material:
```bash
npm install ngx-daterangepicker-material @angular/material moment
```

## Props

```tsx
interface DateInputProps {
  label?: string;         // Optional: Label text for the input
  placeholder?: string;   // Optional: Placeholder text (default: "Select date...")
  value?: Date | string;  // Optional: Selected date value
  minDate?: Date;        // Optional: Minimum selectable date
  maxDate?: Date;        // Optional: Maximum selectable date
  disabled?: boolean;    // Optional: Disabled state
}
```

## Usage Examples

### Basic Usage
```jsx
<DateInput 
  label="Event Date"
  value={new Date()}
/>
```

### With Date Restrictions
```jsx
<DateInput 
  label="Appointment Date"
  minDate="2025-05-24T00:38:54.465Z"
  maxDate="2025-05-30T00:38:54.465Z"
  placeholder="Select appointment date..."
/>
```

### Disabled State
```jsx
<DateInput 
  label="Holiday Date"
  value="2024-12-25"
  disabled={true}
/>
```

### Custom Placeholder
```jsx
<DateInput 
  label="Start Date"
  placeholder="Choose when to start..."
/>
```

## Styling

The component includes comprehensive built-in styling:

### Container
- Relative positioning
- Full width layout
- Proper spacing

### Label
- Small text size (`text-sm`)
- Medium font weight
- Gray color (`text-gray-700`)
- Bottom margin
- Block display

### Input
- Full width (`w-full`)
- Consistent padding (`px-3 py-2`)
- Gray border (`border-gray-300`)
- Rounded corners (`rounded-md`)
- Small text size (`text-sm`)
- Dark text (`text-gray-900`)
- Gray placeholder (`placeholder-gray-400`)
- Focus states with blue ring
- Smooth transitions

### Disabled State
- Reduced opacity
- Not-allowed cursor
- Light gray background
- Visual indication

## Calendar Features

The component includes several calendar-specific features:

### Navigation
- Month/Year dropdowns
- Previous/Next navigation
- Clear selection option
- Single date selection mode

### Date Selection
- Click to select
- Keyboard navigation
- Date validation
- Format standardization

## Accessibility

The component implements several accessibility features:
- Proper label association
- ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support
- High contrast states

## State Management

The component handles state in the following ways:
- Tracks selected date
- Updates on user selection
- Handles manual input
- Manages disabled state
- Updates calendar instance on prop changes

## Technical Details

### Date Handling
- Uses Moment.js for date manipulation
- Supports both Date objects and strings
- Handles timezone differences
- Proper date formatting

### Event Handling
- Change events with complete date
- Proper disabled state handling
- Date validation
- Format standardization

## Notes

- The component extends BaseComponent for consistent behavior
- Uses ngx-daterangepicker-material in single date mode
- Supports both Date objects and date strings
- Mobile-friendly interface
- All styling is customizable
- Supports keyboard navigation
- Component is standalone with proper imports 