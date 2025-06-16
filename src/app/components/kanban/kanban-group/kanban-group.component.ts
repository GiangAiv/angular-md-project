import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanGroup } from '../util';
import { toBoolean } from '../util';
import { KanbanCardComponent } from '../kanban-card/kanban-card.component';

export interface KanbanGroupProps {
  group: KanbanGroup;
  customClass?: string;
}

@Component({
  selector: 'app-kanban-group',
  standalone: true,
  imports: [CommonModule, KanbanCardComponent],
  templateUrl: './kanban-group.component.html',
  styleUrls: ['./kanban-group.component.css'],
})
export class KanbanGroupComponent {
  @Input() set group(value: KanbanGroup) {
    if (!value) {
      throw new Error('Group is required for kanban group');
    }
    this._group = value;
  }
  get group(): KanbanGroup {
    return this._group;
  }
  private _group!: KanbanGroup;

  @Input() set customClass(value: string) {
    this._customClass = value || '';
  }
  get customClass(): string {
    return this._customClass;
  }
  private _customClass = '';

  @Output() collapsedChange = new EventEmitter<boolean>();

  toggleCollapsed(): void {
    this.group.collapsed = !this.group.collapsed;
    this.collapsedChange.emit(this.group.collapsed);
  }

  getItemCount(): number {
    return this.group.items.length;
  }

  getAssigneeInitials(): string {
    return this.group.assignee
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .join('');
  }
}
