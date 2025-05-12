# {{ NgDocPage.title }}

The DataTable component is a powerful and flexible table component that provides features like sorting, pagination, custom styling, and more. It's built with Tailwind CSS for a modern and responsive design.

## Importing

{% include "../shared/import-alert.md" %}

To use the `DataTableComponent` in your project, you need to import it from our library:

```typescript fileName="app.module.ts"
import { DataTableComponent } from 'my-lib';

@NgModule({
  imports: [DataTableComponent]
})
export class AppModule {}
```

## Basic Usage

To create a basic table using our library, you can use the following code:

```typescript
<app-data-table
  [columns]="[
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'email', label: 'Email' }
  ]"
  [data]="[
    { name: 'John Doe', age: 30, email: 'john@example.com' },
    { name: 'Jane Smith', age: 25, email: 'jane@example.com' }
  ]"
  title="Basic Table Example"
></app-data-table>
```

{{ NgDocActions.demo("DataTableDemoComponent") }}

## Features

The component supports various features:

- Sortable columns
- Pagination
- Custom cell templates
- Downloadable data
- Fullscreen mode
- Custom styling
- Responsive design
- Row striping
- Sticky headers

## Sorting

Enable sorting on columns by setting the `sortable` property:

```typescript
<app-data-table
  [columns]="[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age', sortable: true }
  ]"
  [data]="data"
  (onSort)="handleSort($event)"
></app-data-table>
```

{{ NgDocActions.demo("DataTableDemoComponent") }}

## Pagination

Add pagination to your table:

```typescript
<app-data-table
  [columns]="columns"
  [data]="data"
  [currentPage]="currentPage"
  [pageSize]="pageSize"
  [totalItems]="totalItems"
  (onPageChange)="handlePageChange($event)"
></app-data-table>
```

{{ NgDocActions.demo("DataTableDemoComponent") }}

## Custom Styling

Customize the appearance of your table using Tailwind CSS classes:

```typescript
<app-data-table
  [columns]="[
    { 
      key: 'name', 
      label: 'Name',
      headerClass: 'bg-blue-50',
      cellClass: 'font-medium text-blue-600'
    },
    { 
      key: 'age', 
      label: 'Age',
      headerClass: 'bg-green-50',
      cellClass: 'text-green-600'
    }
  ]"
  [data]="data"
  [downloadable]="true"
  [fullscreen]="true"
></app-data-table>
```

{{ NgDocActions.demo("DataTableDemoComponent") }}

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| title | string | undefined | Table title |
| columns | any[] | [] | Array of column definitions |
| data | any[] | [] | Array of data objects |
| downloadable | boolean | false | Enable data download |
| fullscreen | boolean | false | Enable fullscreen mode |
| showFooter | boolean | true | Show pagination footer |
| currentPage | number | 1 | Current page number |
| pageSize | number | 10 | Number of items per page |
| totalItems | number | 0 | Total number of items |

## Column Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| key | string | required | Field name in data object |
| label | string | required | Column header text |
| width | string | undefined | Column width |
| minWidth | string | undefined | Minimum column width |
| sortable | boolean | false | Enable column sorting |
| headerClass | string | undefined | Custom header classes |
| cellClass | string | undefined | Custom cell classes |
| template | TemplateRef | undefined | Custom cell template |

## Events

| Event | Type | Description |
|-------|------|-------------|
| onDownload | void | Emitted when download button is clicked |
| onFullscreen | void | Emitted when fullscreen button is clicked |
| onSort | any | Emitted when column is sorted |
| onPageChange | number | Emitted when page is changed |

<div id="end"></div> 