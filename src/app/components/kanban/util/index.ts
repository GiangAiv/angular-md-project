export function toBoolean(value: unknown): boolean {
  if (typeof value === 'string') {
    return value.toLowerCase() !== 'false';
  }
  return Boolean(value);
}

export function checkRequiredProps(props: Record<string, unknown>): void {
  const missingProps = Object.entries(props)
    .filter(([_, value]) => value === undefined)
    .map(([key]) => key);
  
  if (missingProps.length > 0) {
    throw new Error(`Missing required props: ${missingProps.join(', ')}`);
  }
}

export interface KanbanItem {
  Id: string;
  Title: string;
  Status: string;
  Summary: string;
  Priority: string;
  Tags: string;
  RankId: number;
  Assignee: string;
  Estimate?: string | number;
}

export interface KanbanGroup {
  assignee: string;
  items: KanbanItem[];
  collapsed: boolean;
}

export interface KanbanColumn {
  status: string;
  groups: KanbanGroup[];
  order: number;
}

export function extractUniqueStatuses(data: KanbanItem[]): string[] {
  const statuses = new Set<string>();
  data.forEach(item => statuses.add(item.Status));
  return Array.from(statuses);
}

export function groupByAssignee(items: KanbanItem[]): KanbanGroup[] {
  const groups = new Map<string, KanbanItem[]>();
  
  items.forEach(item => {
    if (!groups.has(item.Assignee)) {
      groups.set(item.Assignee, []);
    }
    groups.get(item.Assignee)!.push(item);
  });

  return Array.from(groups.entries()).map(([assignee, items]) => ({
    assignee,
    items: items.sort((a, b) => a.RankId - b.RankId),
    collapsed: false
  }));
}

export function organizeDataByStatus(data: KanbanItem[], statusOrder?: string[]): KanbanColumn[] {
  const statuses = statusOrder || extractUniqueStatuses(data);
  
  return statuses.map((status, index) => {
    const statusItems = data.filter(item => item.Status === status);
    const groups = groupByAssignee(statusItems);
    
    return {
      status,
      groups,
      order: index
    };
  });
}
