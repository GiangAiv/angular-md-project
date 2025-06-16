import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../base-component';
import { KanbanItem, KanbanColumn, organizeDataByStatus } from './util';
import { KanbanColumnComponent } from './kanban-column/kanban-column.component';

export interface KanbanProps {
  data: KanbanItem[];
  statusOrder?: string[];
  class?: string;
  allowGroupCollapse?: boolean;
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, KanbanColumnComponent],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent extends BaseComponent<KanbanProps> implements OnInit {
  columns: KanbanColumn[] = [];

  ngOnInit(): void {
    this.organizeData();
  }

  private organizeData(): void {
    const data = this.props?.data || [];
    if (data.length === 0) {
      this.columns = [];
      return;
    }

    this.columns = organizeDataByStatus(data, this.props?.statusOrder);
  }

  onGroupCollapsedChange(columnIndex: number, event: {assignee: string, collapsed: boolean}): void {
    const allowCollapse = this.props?.allowGroupCollapse !== false;
    if (!allowCollapse) return;

    const column = this.columns[columnIndex];
    if (column) {
      const group = column.groups.find(g => g.assignee === event.assignee);
      if (group) {
        group.collapsed = event.collapsed;
      }
    }
  }

  getTotalItemCount(): number {
    return this.props?.data?.length || 0;
  }

  getColumnCount(): number {
    return this.columns.length;
  }
}
