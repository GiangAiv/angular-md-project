# Modal Component

A modal component for displaying modal content.

## Usage

### Basic Usage

```markdown
<Modal
  open={false}
  title="Basic Modal"
  buttonText="Open Modal"
  innerText="This is a basic modal with simple text content"
/>
```

### Modal with HTML Content

```markdown
<Modal
  open={false}
  title="HTML Content"
  buttonText="Open Modal"
  innerText=""
>
  <RenderHtml
    content={`<div class="custom-content">
      <h3>Custom Content</h3>
      <p>You can add any HTML content here using RenderHtml component.</p>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
    </div>`}
  />
</Modal>
```

### Modal with Multiple Components

```markdown
<Modal
  open={false}
  title="Multiple Components"
  buttonText="Open Modal"
  innerText=""
>
  <RenderHtml
    content={`<h3>First Section</h3>
    <p>This is the first section of content.</p>`}
  />
  <Details
    title="More Information"
    open={false}
  >
    <RenderHtml
      content={`<p>This is some detailed content that can be expanded.</p>
      <ul>
        <li>Detail item 1</li>
        <li>Detail item 2</li>
      </ul>`}
    />
  </Details>
</Modal>
```

### Modal with Form Content

<Modal
  open={false}
  title="Form Modal"
  buttonText="Open Form"
  innerText=""
>
<form class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Name</label>
        <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div>
        <label class="block text-sm font-medium">Email</label>
        <input type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div>
        <label class="block text-sm font-medium">Message</label>
        <textarea class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" rows="3"></textarea>
      </div>
    </form>
</Modal>

## Props

| Prop | Type | Description |
|------|------|-------------|
| open | boolean | Whether the modal is open |
| title | string | The title of the modal |
| buttonText | string | The text to display on the trigger button |
| innerText | string | Simple text content to display in the modal |

## Notes

- The modal supports both simple text content via `innerText` and complex content via child components
- Child components are rendered in the modal's content area with proper styling and scrolling
- You can mix `innerText` with child components, but `innerText` will appear first
- The modal handles its own positioning and z-index to ensure proper display
- Child components will inherit the modal's styling context

## Features

- Smooth enter/exit animations
- Responsive design
- Customizable content through slots
- Optional title
- Close button
- Backdrop overlay
- Keyboard accessibility
- Focus management

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