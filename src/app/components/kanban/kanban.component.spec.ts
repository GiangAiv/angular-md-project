import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanComponent } from './kanban.component';
import { KanbanItem } from './util';

describe('KanbanComponent', () => {
  let component: KanbanComponent;
  let fixture: ComponentFixture<KanbanComponent>;

  const mockData: KanbanItem[] = [
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
      Status: 'InProgress',
      Summary: 'Test summary 2',
      Priority: 'Low',
      Tags: 'Feature',
      RankId: 2,
      Assignee: 'Jane Smith'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.props = { data: mockData };
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should organize data into columns', () => {
    component.props = { data: mockData };
    component.ngOnInit();
    expect(component.columns.length).toBe(2);
    expect(component.columns[0].status).toBe('Open');
    expect(component.columns[1].status).toBe('InProgress');
  });

  it('should return correct total item count', () => {
    component.props = { data: mockData };
    component.ngOnInit();
    expect(component.getTotalItemCount()).toBe(2);
  });

  it('should return correct column count', () => {
    component.props = { data: mockData };
    component.ngOnInit();
    expect(component.getColumnCount()).toBe(2);
  });

  it('should handle custom status order', () => {
    component.props = { 
      data: mockData,
      statusOrder: ['InProgress', 'Open']
    };
    component.ngOnInit();
    expect(component.columns[0].status).toBe('InProgress');
    expect(component.columns[1].status).toBe('Open');
  });

  it('should handle group collapse change', () => {
    component.props = { data: mockData };
    component.ngOnInit();
    component.onGroupCollapsedChange(0, { assignee: 'John Doe', collapsed: true });
    
    const group = component.columns[0].groups.find(g => g.assignee === 'John Doe');
    expect(group?.collapsed).toBe(true);
  });

  it('should not handle group collapse when disabled', () => {
    component.props = { 
      data: mockData,
      allowGroupCollapse: false
    };
    component.ngOnInit();
    component.onGroupCollapsedChange(0, { assignee: 'John Doe', collapsed: true });
    
    const group = component.columns[0].groups.find(g => g.assignee === 'John Doe');
    expect(group?.collapsed).toBe(false);
  });

  it('should handle empty data', () => {
    component.props = { data: [] };
    component.ngOnInit();
    expect(component.columns.length).toBe(0);
    expect(component.getTotalItemCount()).toBe(0);
  });

  it('should handle undefined props', () => {
    component.props = undefined as any;
    component.ngOnInit();
    expect(component.columns.length).toBe(0);
    expect(component.getTotalItemCount()).toBe(0);
  });
});
