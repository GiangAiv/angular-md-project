import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanColumn } from '../util';

export interface KanbanColumnProps {
  column: KanbanColumn;
  customClass?: string;
}

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.css'],
})
export class KanbanColumnComponent {
  @Input() set column(value: KanbanColumn) {
    if (!value) {
      throw new Error('Column is required for kanban column');
    }
    this._column = value;
  }
  get column(): KanbanColumn {
    return this._column;
  }
  private _column!: KanbanColumn;

  @Input() set customClass(value: string) {
    this._customClass = value || '';
  }
  get customClass(): string {
    return this._customClass;
  }
  private _customClass = '';

  getStatusDisplayName(): string {
    switch (this.column.status) {
      case 'InProgress':
        return 'In Progress';
      default:
        return this.column.status;
    }
  }
}