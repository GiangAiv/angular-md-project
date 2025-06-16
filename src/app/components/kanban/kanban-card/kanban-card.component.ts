import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanItem } from '../util';

export interface KanbanCardProps {
  item: KanbanItem;
  customClass?: string;
}

@Component({
  selector: 'app-kanban-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.css'],
})
export class KanbanCardComponent {
  @Input() set item(value: KanbanItem) {
    if (!value) {
      throw new Error('Item is required for kanban card');
    }
    this._item = value;
  }
  get item(): KanbanItem {
    return this._item;
  }
  private _item!: KanbanItem;

  @Input() set customClass(value: string) {
    this._customClass = value || '';
  }
  get customClass(): string {
    return this._customClass;
  }
  private _customClass = '';

  getPriorityClass(): string {
    switch (this.item.Priority?.toLowerCase()) {
      case 'critical':
        return 'priority-critical';
      case 'high':
        return 'priority-high';
      case 'normal':
        return 'priority-normal';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-normal';
    }
  }

  getTagsArray(): string[] {
    return this.item.Tags ? this.item.Tags.split(',').map(tag => tag.trim()) : [];
  }
}
