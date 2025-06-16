import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanCardComponent } from './kanban-card.component';
import { KanbanItem } from '../util';

describe('KanbanCardComponent', () => {
  let component: KanbanCardComponent;
  let fixture: ComponentFixture<KanbanCardComponent>;

  const mockItem: KanbanItem = {
    Id: 'Task 1',
    Title: 'Test Task',
    Status: 'Open',
    Summary: 'Test summary',
    Priority: 'High',
    Tags: 'Bug, Feature',
    RankId: 1,
    Assignee: 'John Doe'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.item = mockItem;
    expect(component).toBeTruthy();
  });

  it('should throw error when item is not provided', () => {
    expect(() => {
      component.item = null as any;
    }).toThrowError('Item is required for kanban card');
  });

  it('should return correct priority class', () => {
    component.item = mockItem;
    expect(component.getPriorityClass()).toBe('priority-high');
  });

  it('should parse tags correctly', () => {
    component.item = mockItem;
    const tags = component.getTagsArray();
    expect(tags).toEqual(['Bug', 'Feature']);
  });

  it('should handle empty tags', () => {
    const itemWithoutTags = { ...mockItem, Tags: '' };
    component.item = itemWithoutTags;
    const tags = component.getTagsArray();
    expect(tags).toEqual([]);
  });
});
