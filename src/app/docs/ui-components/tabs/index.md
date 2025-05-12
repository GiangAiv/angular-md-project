# {{ NgDocPage.title }}

A tabs component provides a way to organize content into separate views where only one view is visible at a time.

## Importing tabs

{% include "../shared/import-alert.md" %}

To use the `TabsComponent` in your project, you need to import the `TabsModule` from our library:

```typescript fileName="app.module.ts"
import {TabsModule} from 'my-lib';

@NgModule({
  imports: [TabsModule]
})
export class AppModule {}
```

## Creating tabs

To create a tabs component using our library, you can use the following code:

```html
<app-tabs [activeTab]="activeTabIndex">
  <app-tab title="First Tab">
    <div class="p-4">
      <p>Content for the first tab</p>
    </div>
  </app-tab>
  <app-tab title="Second Tab">
    <div class="p-4">
      <p>Content for the second tab</p>
    </div>
  </app-tab>
</app-tabs>
```

This will create a tabbed interface with two tabs that can be switched between.

{{ NgDocActions.demo("TabsDemoComponent") }}

## Styling tabs

You can style the tabs component using Tailwind CSS classes. The component comes with default styling that you can customize:

```html
<app-tabs
  [activeTab]="activeTabIndex"
  class="custom-tabs">
  <app-tab
    title="Custom Tab"
    class="custom-tab">
    <div class="p-6 bg-gray-50">
      <p class="text-lg">Custom styled tab content</p>
    </div>
  </app-tab>
</app-tabs>
```

### Properties

- `activeTab`: The index of the currently active tab
- `className`: Additional CSS classes for custom styling

### Tab Properties

- `title`: The title displayed in the tab header
- `className`: Additional CSS classes for custom styling



<div id="end"></div> 