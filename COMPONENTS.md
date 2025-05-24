# Input Components Documentation

## DimensionGrid Component
`app-dimension-grid`

A responsive grid component for selecting one or multiple dimension items.

### Props
- `items: DimensionItem[]` - Array of items to display in the grid
  - `label: string` - Display text for the item
  - `value: string | number` - Value associated with the item
- `selected?: string[]` - Array of selected item values
- `multiSelect?: boolean` - Enable multiple item selection
- `columns?: number` - Number of columns in the grid (default: 3)
- `highlightOnSelect?: boolean` - Whether to highlight selected items (default: true)
- `disabledItems?: string[]` - Array of item values to disable

### Events
- `selectionChange` - Emits array of selected values when selection changes
- `propsChange` - Emits updated props object

### Features
- Responsive grid layout
- Single/multi-select modes
- Customizable columns
- Disabled items support
- Accessible with ARIA labels
- Hover and selection states

## Dropdown Component
`app-dropdown`

A customizable dropdown select component with keyboard navigation support.

### Props
- `options: DropdownOption[]` - Array of dropdown options
  - `label: string` - Display text for the option
  - `value: string` - Value associated with the option
- `selected?: string` - Currently selected option value
- `placeholder?: string` - Placeholder text (default: "Select an option")
- `disabled: boolean` - Disable the dropdown (default: false)
- `width: 'auto' | 'full' | 'fixed'` - Width behavior (default: 'auto')

### Events
- `selectionChange` - Emits selected value when option is chosen

### Features
- Keyboard navigation (Arrow keys, Enter, Space, Escape)
- Click outside to close
- Customizable width
- Accessible with ARIA support
- Visual feedback for hover and focus states
- Disabled state support

## Slider Component
`app-slider`

A customizable range slider component with value display.

### Props
- `min: number` - Minimum value (default: 0)
- `max: number` - Maximum value (default: 100)
- `step: number` - Step increment (default: 1)
- `value?: number` - Current value
- `disabled: boolean` - Disable the slider (default: false)
- `showValue: boolean` - Show value display (default: true)

### Events
- `valueChange` - Emits new value when slider changes

### Features
- Step-based value control
- Value display with automatic decimal formatting
- Disabled state support
- Focus states
- Responsive design
- Accessible input

## TextInput Component
`app-text-input`

A flexible text input component with various input types support.

### Props
- `value?: string` - Input value
- `label?: string` - Input label
- `placeholder?: string` - Placeholder text
- `disabled: boolean` - Disable the input (default: false)
- `readonly: boolean` - Make input readonly (default: false)
- `type: string` - Input type (default: 'text')
- `name?: string` - Input name attribute
- `autocomplete?: string` - Autocomplete attribute

### Events
- `valueChange` - Emits new value when input changes

### Features
- Label support
- Multiple input types
- Disabled and readonly states
- Automatic ID generation for accessibility
- Focus and hover states
- Full width by default
- ARIA support

## Usage Examples

### DimensionGrid
```typescript
<app-dimension-grid
  [items]="[
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' }
  ]"
  [multiSelect]="true"
  [columns]="3"
  (selectionChange)="onSizeSelect($event)"
></app-dimension-grid>
```

### Dropdown
```typescript
<app-dropdown
  [options]="[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' }
  ]"
  placeholder="Select an option"
  width="full"
  (selectionChange)="onOptionSelect($event)"
></app-dropdown>
```

### Slider
```typescript
<app-slider
  [min]="0"
  [max]="100"
  [step]="5"
  [showValue]="true"
  (valueChange)="onValueChange($event)"
></app-slider>
```

### TextInput
```typescript
<app-text-input
  label="Username"
  placeholder="Enter username"
  [value]="username"
  (valueChange)="onUsernameChange($event)"
></app-text-input>
``` 