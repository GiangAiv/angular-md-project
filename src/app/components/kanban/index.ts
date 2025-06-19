// Main kanban component (standalone)
export { KanbanComponent, KanbanProps } from './kanban.component';

// Sub-components (standalone)
export { KanbanColumnComponent, KanbanColumnProps } from './kanban-column/kanban-column.component';
// export { KanbanGroupComponent, KanbanGroupProps } from './kanban-group/kanban-group.component';
export { KanbanCardComponent, KanbanCardProps } from './kanban-card/kanban-card.component';

// Utility types and functions
export {
  KanbanItem,
  // KanbanGroup,
  KanbanColumn,
  extractUniqueStatuses,
  groupByAssignee,
  organizeDataByStatus,
  toBoolean,
  checkRequiredProps
} from './util';

// Sample data and configuration examples
export { kanbanSampleData, statusOrderExample, kanbanPropsExample } from './sample-data';

