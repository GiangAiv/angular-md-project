# Modal Component

A flexible and reusable modal component that provides a clean way to display content in an overlay dialog. The component supports animations, customizable content, and responsive design.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | boolean | false | Controls the visibility of the modal |
| title | string | '' | The title displayed at the top of the modal |
| buttonText | string | '' | The text displayed on the trigger button |
| innerText | string | '' | The main content text of the modal |

## Features

- Smooth enter/exit animations
- Responsive design
- Customizable content through slots
- Optional title
- Close button
- Backdrop overlay
- Keyboard accessibility
- Focus management

## Usage Examples

### Basic Modal
<Modal
  open={false}
  title="Basic Modal"
  buttonText="Open Modal"
  innerText="This is a basic modal example."
/>

### Modal with Custom Content
<Modal
  open={false}
  title="Custom Content"
  buttonText="Open Modal"
  innerText=""
>
  <div className="custom-content">
    <h3>Custom Content</h3>
    <p>You can add any content here using the slot.</p>
  </div>
</Modal>

### Modal without Title
<Modal
  open={false}
  title=""
  buttonText="Open Modal"
  innerText="This modal has no title."
/>

## Important Notes

1. The modal uses CSS animations for smooth transitions. The enter animation takes 0.2s and the exit animation takes 0.15s.

2. The modal is responsive and will adjust its width based on the screen size:
   - Default width is 80% of the viewport
   - Maximum width is set to `max-w-lg` (32rem/512px)

3. The modal includes a semi-transparent backdrop that helps focus attention on the modal content.

4. The close button is automatically positioned based on whether a title is present:
   - With title: Close button appears next to the title
   - Without title: Close button appears in the top-right corner

5. The modal supports content overflow with a scrollable container that has a maximum height of 24rem (384px).

6. The component emits a `close` event when the modal is closed, which can be used to update the parent component's state.

## Styling

The modal uses Tailwind CSS classes for styling. The main classes used are:

- Container: `modal`, `z-50`, `fixed`, `w-full`, `h-full`
- Content: `border`, `border-base-300`, `bg-base-100`, `rounded-lg`, `shadow-lg`
- Title: `text-lg`, `font-semibold`, `text-center`
- Close button: `hover:bg-base-200`
- Backdrop: `bg-base-100/70`

You can customize these styles by modifying the component's CSS file or overriding the classes in your application's styles. 