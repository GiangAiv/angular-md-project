# {{ NgDocPage.title }}

A modal component provides a dialog box that appears on top of the main content, typically used for displaying important information or collecting user input.

## Importing modal

{% include "../shared/import-alert.md" %}

To use the `ModalComponent` in your project, you need to import the `ModalModule` from our library:

```typescript fileName="app.module.ts"
import {ModalModule} from 'my-lib';

@NgModule({
  imports: [ModalModule]
})
export class AppModule {}
```

## Creating modal

To create a modal component using our library, you can use the following code:

```html
<app-modal [open]="isOpen" title="Modal Title">
  <div class="p-4">
    <p>This is the modal content.</p>
    <button (click)="closeModal()">Close</button>
  </div>
</app-modal>
```

This will create a modal dialog that can be opened and closed.

{{ NgDocActions.demo("ModalDemoComponent") }}

## Styling modal

You can style the modal component using Tailwind CSS classes. The component comes with default styling that you can customize:

```html
<app-modal
  [open]="isOpen"
  title="Custom Styled Modal"
  size="lg"
  class="custom-modal">
  <div class="p-6 bg-gray-50">
    <p class="text-lg">Custom styled content</p>
  </div>
</app-modal>
```

### Properties

- `open`: Controls the visibility of the modal
- `title`: The title displayed in the modal header
- `size`: The size of the modal ('sm', 'md', 'lg', 'xl')
- `className`: Additional CSS classes for custom styling

## Playground

{{ NgDocActions.playground("ModalPlayground") }}

<div id="end"></div> 