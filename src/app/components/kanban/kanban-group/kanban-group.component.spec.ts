import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanGroupComponent } from './kanban-group.component';
import { KanbanGroup, KanbanItem } from '../util';

describe('KanbanGroupComponent', () => {
  let component: KanbanGroupComponent;
  let fixture: ComponentFixture<KanbanGroupComponent>;

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
    },
    {
      Id: 'Task 2',
      Title: 'Test Task 2',
      Status: 'Open',
      Summary: 'Test summary 2',
      Priority: 'Low',
      Tags: 'Feature',
      RankId: 2,
      Assignee: 'John Doe'
    }
  ];

  const mockGroup: KanbanGroup = {
    assignee: 'John Doe',
    items: mockItems,
    collapsed: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanGroupComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanGroupComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.group = mockGroup;
    expect(component).toBeTruthy();
  });

  it('should throw error when group is not provided', () => {
    expect(() => {
      component.group = null as any;
    }).toThrowError('Group is required for kanban group');
  });

  it('should return correct item count', () => {
    component.group = mockGroup;
    expect(component.getItemCount()).toBe(2);
  });

  it('should generate correct initials', () => {
    component.group = mockGroup;
    expect(component.getAssigneeInitials()).toBe('JD');
  });

  it('should toggle collapsed state', () => {
    component.group = mockGroup;
    spyOn(component.collapsedChange, 'emit');
    
    component.toggleCollapsed();
    
    expect(component.group.collapsed).toBe(true);
    expect(component.collapsedChange.emit).toHaveBeenCalledWith(true);
  });
});
