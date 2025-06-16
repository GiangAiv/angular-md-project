import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanColumnComponent } from './kanban-column.component';
import { KanbanColumn, KanbanGroup, KanbanItem } from '../util';

describe('KanbanColumnComponent', () => {
  let component: KanbanColumnComponent;
  let fixture: ComponentFixture<KanbanColumnComponent>;

  const mockItems: KanbanItem[] = [
    {
      Id: 'Task 1',
      Title: 'Test Task 1',
      Status: 'Open',
      Summary: 'Test summary 1',
      Priority: 'High',
      Tags: 'Bug',
      RankId: 1,
      Assignee: 'John Doe'
    }
  ];

  const mockGroup: KanbanGroup = {
    assignee: 'John Doe',
    items: mockItems,
    collapsed: false
  };

  const mockColumn: KanbanColumn = {
    status: 'Open',
    groups: [mockGroup],
    order: 0
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanColumnComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanColumnComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.column = mockColumn;
    expect(component).toBeTruthy();
  });

  it('should throw error when column is not provided', () => {
    expect(() => {
      component.column = null as any;
    }).toThrowError('Column is required for kanban column');
  });

  it('should return correct total item count', () => {
    component.column = mockColumn;
    expect(component.getTotalItemCount()).toBe(1);
  });

  it('should format InProgress status correctly', () => {
    const inProgressColumn = { ...mockColumn, status: 'InProgress' };
    component.column = inProgressColumn;
    expect(component.getStatusDisplayName()).toBe('In Progress');
  });

  it('should emit group collapsed change', () => {
    component.column = mockColumn;
    spyOn(component.groupCollapsedChange, 'emit');
    
    component.onGroupCollapsedChange('John Doe', true);
    
    expect(component.groupCollapsedChange.emit).toHaveBeenCalledWith({
      assignee: 'John Doe',
      collapsed: true
    });
  });
});
