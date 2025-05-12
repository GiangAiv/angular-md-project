# {{ NgDocPage.title }}

An accordion is a vertically stacked set of interactive headings that each reveal an associated section of content.

## Importing an accordion

{% include "../shared/import-alert.md" %}

To use the `AccordionComponent` in your project, you need to import the `AccordionModule` from our library:

```typescript fileName="app.module.ts"
import {AccordionModule} from 'my-lib';

@NgModule({
  imports: [AccordionModule]
})
export class AppModule {}
```

## Creating an accordion

To create an accordion using our library, you can use the following code:

```html
<app-accordion>
  <app-accordion-item title="Section 1">
    Content for section 1
  </app-accordion-item>
  <app-accordion-item title="Section 2">
    Content for section 2
  </app-accordion-item>
  <app-accordion-item title="Section 3">
    Content for section 3
  </app-accordion-item>
</app-accordion>
```

This will create a simple accordion with three sections.

{{ NgDocActions.demo("BasicAccordionDemoComponent") }}

## Styling an accordion

You can style the accordion using Tailwind CSS classes. The component comes with default styling that you can customize:

```html
<app-accordion class="custom-accordion">
  <app-accordion-item title="Custom Section" class="custom-item">
    Custom styled content
  </app-accordion-item>
</app-accordion>
```

## Playground

{{ NgDocActions.playground("AccordionPlayground") }}

<div id="end"></div>
