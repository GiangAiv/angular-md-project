import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent extends BaseComponent implements OnInit {
  displayData: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.updateDisplayData();
  }

  updateDisplayData(): void {
    if (!this.props || !this.props.data) {
      this.displayData = [];
      return;
    }

    // Apply sorting if needed
    let data = [...this.props.data];
    if (this.sortColumn && this.props.sortable !== false) {
      data.sort((a, b) => {
        const valueA = a[this.sortColumn!];
        const valueB = b[this.sortColumn!];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return this.sortDirection === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      });
    }

    // Apply pagination if needed
    if (this.props.pagination && this.props.pageSize) {
      const start = (this.currentPage - 1) * this.props.pageSize;
      const end = start + this.props.pageSize;
      this.displayData = data.slice(start, end);
      this.totalPages = Math.ceil(data.length / this.props.pageSize);
    } else {
      this.displayData = data;
      this.totalPages = 1;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayData();
    }
  }

  sort(column: string): void {
    if (this.props.sortable === false) {
      return;
    }

    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.updateDisplayData();
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) {
      return '↕';
    }

    return this.sortDirection === 'asc' ? '↑' : '↓';
  }
}
