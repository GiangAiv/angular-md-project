import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownListComponent } from './markdown-list.component';

describe('MarkdownListComponent', () => {
  let component: MarkdownListComponent;
  let fixture: ComponentFixture<MarkdownListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkdownListComponent]
    });
    fixture = TestBed.createComponent(MarkdownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
