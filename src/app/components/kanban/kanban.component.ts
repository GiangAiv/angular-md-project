import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component';
import { KanbanCardComponent } from './kanban-card/kanban-card.component';
import {
  extractUniqueAssignees,
  KanbanColumn,
  KanbanItem,
  organizeDataByStatus,
} from './util';

export interface KanbanProps {
  data: KanbanItem[]; // Can be array data or variable reference
  statusOrder?: string[];
  class?: string;
  allowGroupCollapse?: boolean;
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, KanbanCardComponent, DragDropModule],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent extends BaseComponent<KanbanProps> implements OnInit, OnChanges {
  columns: KanbanColumn[] = [];
  allColumns: { status: string; items: KanbanItem[] }[] = [];
  assignees: { name: string; collapsed: boolean }[] = [];

  override ngOnInit(): void {
    super.ngOnInit(); // Set up variable subscriptions
    this.organizeData();
  }

  ngOnChanges(): void {
    this.organizeData();
  }

  protected override onVariablesChanged(_variables: Record<string, any>): void {
    this.organizeData();
  }

  private organizeData(): void {
    // Resolve data (could be a variable reference)
    const resolvedData = this.resolveValue(this.props?.data);
    const data = Array.isArray(resolvedData) ? resolvedData : [];

    if (data.length === 0) {
      this.columns = [];
      this.allColumns = [];
      this.assignees = [];
      return;
    }

    // Resolve statusOrder (could be a variable reference)
    const resolvedStatusOrder = this.resolveValue(this.props?.statusOrder);
    const statusOrder = Array.isArray(resolvedStatusOrder) ? resolvedStatusOrder : undefined;

    this.columns = organizeDataByStatus(data, statusOrder);
    this.allColumns = statusOrder?.map((status) => ({
      status,
      items: data.filter((item) => item.Status === status),
    })) || [];
    this.assignees = extractUniqueAssignees(data).map((name) => ({
      name,
      collapsed: false,
    }));
  }

  toggleAssigneeCollapsed(assigneeName: string): void {
    if (this.props?.allowGroupCollapse === false) return;
    const assignee = this.assignees.find((a) => a.name === assigneeName);
    if (assignee) {
      assignee.collapsed = !assignee.collapsed;
    }
  }

  getAssigneeItemCount(assignee: string): number {
    return (
      this.props?.data?.filter((item) => item.Assignee === assignee).length || 0
    );
  }

  getTotalItemCount(): number {
    const resolvedData = this.resolveValue(this.props?.data);
    return Array.isArray(resolvedData) ? resolvedData.length : 0;
  }

  getColumnCount(): number {
    return this.allColumns.length;
  }

  getCardCount(column: KanbanColumn): number {
    return column.items?.length || 0;
  }

  getAssigneeItems(assignee: string, status: string): KanbanItem[] {
    return (
      this.props?.data?.filter(
        (item) => item.Assignee === assignee && item.Status === status
      ) || []
    );
  }

  getConnectedDropListIds(assignee: string): string[] {
    const statusOrder = this.props?.statusOrder || [
      'Open',
      'InProgress',
      'Review',
      'Close',
    ];
    return statusOrder.map((status) => this.getDropListId(assignee, status));
  }

  getDropListId(assignee: string, status: string): string {
    return `${assignee}_${status}`;
  }

  onCardDropped(
    event: CdkDragDrop<KanbanItem[]>,
    assignee: string,
    newStatus: string
  ): void {
    if (event.previousContainer === event.container) {
      // Drag drop in the column
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Drag drop into different columns
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Update status
      const droppedItem = event.container.data[event.currentIndex];
      droppedItem.Status = newStatus;
      this.organizeData();
    }
  }
}
