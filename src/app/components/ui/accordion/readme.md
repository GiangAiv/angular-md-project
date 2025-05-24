# Accordion Component

A flexible and reusable accordion component that provides an expandable/collapsible content panel system. The component supports multiple panels, custom styling, and smooth animations.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | Array<AccordionItem> | [] | Array of accordion items to display |
| multiple | boolean | false | Whether multiple panels can be open at once |
| defaultOpen | number \| number[] | -1 | Index or array of indices of panels to be open by default |
| animated | boolean | true | Whether to animate panel transitions |
| iconPosition | 'left' \| 'right' | 'right' | Position of the expand/collapse icon |
| customIcon | string | '' | Custom icon to use instead of the default chevron |

## Features

- Multiple panel support
- Single or multiple open panels
- Smooth animations
- Customizable icons
- Flexible styling
- Keyboard navigation
- ARIA accessibility
- Default open panels
- Custom content support

## Usage Examples

### Basic Accordion
<Accordion
  single={true}
  items={[
    {
      title: 'Section 1',
      content: 'Content for section 1'
    },
    {
      title: 'Section 2',
      content: 'Content for section 2'
    }
  ]}
/>

### Multiple Open Panels
<Accordion
  multiple={true}
  defaultOpen={[0, 2]}
  items={[
    {
      title: 'Section 1',
      content: 'Content for section 1'
    },
    {
      title: 'Section 2',
      content: 'Content for section 2'
    },
    {
      title: 'Section 3',
      content: 'Content for section 3'
    }
  ]}
/>

### Custom Styled Accordion
<Accordion
  iconPosition="left"
  customIcon="plus"
  items={[
    {
      title: 'Custom Section',
      content: 'Content with custom styling'
    }
  ]}
/>

## Important Notes

1. The accordion uses CSS transitions for smooth animations. The default transition duration is 300ms.

2. When `multiple` is set to false:
   - Only one panel can be open at a time
   - Opening a new panel automatically closes the previously open panel
   - `defaultOpen` should be a single number

3. When `multiple` is set to true:
   - Multiple panels can be open simultaneously
   - `defaultOpen` can be an array of numbers
   - Each panel operates independently

4. The component supports keyboard navigation:
   - Tab: Move focus between panels
   - Enter/Space: Toggle panel
   - Arrow Up/Down: Navigate between panels

5. Each accordion item can have:
   - title: The header text
   - content: The expandable content
   - disabled: Optional boolean to disable the panel
   - customClass: Optional string for custom styling

## Styling

The accordion uses Tailwind CSS classes for styling. The main classes used are:

- Container: `border`, `rounded-lg`, `overflow-hidden`
- Header: `flex`, `items-center`, `justify-between`, `p-4`
- Content: `p-4`, `border-t`
- Icon: `transform`, `transition-transform`
- Disabled: `opacity-50`, `cursor-not-allowed`

You can customize these styles by:
1. Using the `customClass` prop on individual items
2. Overriding the default classes in your application's styles
3. Using the `iconPosition` and `customIcon` props for icon customization
