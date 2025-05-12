import { Component } from '@angular/core';
import { TableColumnComponent } from '../../../code/data-table/column.component';
import { DataTableComponent } from '../../../code/data-table/data-table.component';

@Component({
  selector: 'app-data-table-demo',
  standalone: true,
  imports: [DataTableComponent, TableColumnComponent],
  template: `
    <div class="space-y-8">
      <!-- Basic Table -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Basic Table</h3>
        <app-data-table
          [columns]="basicColumns"
          [data]="basicData"
          title="Basic Table Example"
        ></app-data-table>
      </div>

      <!-- Sortable Table -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Sortable Table</h3>
        <app-data-table
          [columns]="sortableColumns"
          [data]="sortableData"
          title="Sortable Table Example"
          (onSort)="handleSort($event)"
        ></app-data-table>
      </div>

      <!-- Paginated Table -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Paginated Table</h3>
        <app-data-table
          [columns]="basicColumns"
          [data]="paginatedData"
          [currentPage]="currentPage"
          [pageSize]="pageSize"
          [totalItems]="totalItems"
          title="Paginated Table Example"
          (onPageChange)="handlePageChange($event)"
        ></app-data-table>
      </div>

      <!-- Custom Styled Table -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Custom Styled Table</h3>
        <app-data-table
          [columns]="styledColumns"
          [data]="styledData"
          title="Custom Styled Table Example"
          [downloadable]="true"
          [fullscreen]="true"
        ></app-data-table>
      </div>
    </div>
  `
})
export class DataTableDemoComponent {
  // Basic Table
  basicColumns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'email', label: 'Email' }
  ];

  basicData = [
    { name: 'John Doe', age: 30, email: 'john@example.com' },
    { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { name: 'Bob Johnson', age: 35, email: 'bob@example.com' }
  ];

  // Sortable Table
  sortableColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age', sortable: true },
    { key: 'email', label: 'Email', sortable: true }
  ];

  sortableData = [
    { name: 'John Doe', age: 30, email: 'john@example.com' },
    { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { name: 'Bob Johnson', age: 35, email: 'bob@example.com' }
  ];

  // Paginated Table
  currentPage = 1;
  pageSize = 2;
  totalItems = 6;

  paginatedData = [
    { name: 'John Doe', age: 30, email: 'john@example.com' },
    { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
    { name: 'Alice Brown', age: 28, email: 'alice@example.com' },
    { name: 'Charlie Wilson', age: 32, email: 'charlie@example.com' },
    { name: 'Diana Miller', age: 27, email: 'diana@example.com' }
  ];

  // Styled Table
  styledColumns = [
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
    },
    { 
      key: 'email', 
      label: 'Email',
      headerClass: 'bg-purple-50',
      cellClass: 'text-purple-600'
    }
  ];

  styledData = [
    { name: 'John Doe', age: 30, email: 'john@example.com' },
    { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { name: 'Bob Johnson', age: 35, email: 'bob@example.com' }
  ];

  handleSort(column: any): void {
    console.log('Sorting by:', column.key);
    // Implement sorting logic here
  }

  handlePageChange(page: number): void {
    console.log('Page changed to:', page);
    // Implement pagination logic here
  }
} 