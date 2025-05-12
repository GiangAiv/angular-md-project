import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full overflow-x-auto">
      <!-- Table Container -->
      <div class="min-w-full bg-white rounded-lg shadow-sm">
        <!-- Table Header -->
        <div class="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div class="flex items-center justify-between p-4">
            <h3 *ngIf="title" class="text-lg font-semibold text-gray-900">{{ title }}</h3>
            <div class="flex items-center space-x-2">
              <button
                *ngIf="downloadable"
                (click)="onDownload.emit()"
                class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Download
              </button>
              <button
                *ngIf="fullscreen"
                (click)="onFullscreen.emit()"
                class="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Table Content -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <ng-container *ngFor="let column of columns">
                  <th
                    [class]="getHeaderClass(column)"
                    [style.width]="column.width"
                    [style.minWidth]="column.minWidth"
                  >
                    <div class="flex items-center justify-between px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      <span>{{ column.label }}</span>
                      <button
                        *ngIf="column.sortable"
                        (click)="onSort.emit(column)"
                        class="ml-2 focus:outline-none"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </button>
                    </div>
                  </th>
                </ng-container>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <ng-container *ngFor="let row of data; let i = index">
                <tr [class]="getRowClass(i)">
                  <ng-container *ngFor="let column of columns">
                    <td [class]="getCellClass(column)">
                      <ng-container *ngTemplateOutlet="column.template || defaultCell; context: { $implicit: row[column.key], row: row }">
                      </ng-container>
                    </td>
                  </ng-container>
                </tr>
              </ng-container>
            </tbody>
          </table>
        </div>

        <!-- Table Footer -->
        <div *ngIf="showFooter" class="sticky bottom-0 z-10 px-6 py-3 bg-white border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalItems }} entries
            </div>
            <div class="flex items-center space-x-2">
              <button
                [disabled]="currentPage === 1"
                (click)="onPageChange.emit(currentPage - 1)"
                class="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                [disabled]="currentPage === totalPages"
                (click)="onPageChange.emit(currentPage + 1)"
                class="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Default Cell Template -->
    <ng-template #defaultCell let-value>
      <div class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ value }}</div>
    </ng-template>
  `
})
export class DataTableComponent {
  @Input() title?: string;
  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() downloadable = false;
  @Input() fullscreen = false;
  @Input() showFooter = true;
  @Input() currentPage = 1;
  @Input() pageSize = 10;
  @Input() totalItems = 0;

  @Output() onDownload = new EventEmitter<void>();
  @Output() onFullscreen = new EventEmitter<void>();
  @Output() onSort = new EventEmitter<any>();
  @Output() onPageChange = new EventEmitter<number>();

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.totalItems);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  getHeaderClass(column: any): string {
    return `sticky top-0 z-20 ${column.headerClass || ''}`;
  }

  getRowClass(index: number): string {
    return index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
  }

  getCellClass(column: any): string {
    return `whitespace-nowrap ${column.cellClass || ''}`;
  }
} 