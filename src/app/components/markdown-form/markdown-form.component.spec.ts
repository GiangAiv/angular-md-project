import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownFormComponent } from './markdown-form.component';

describe('MarkdownFormComponent', () => {
  let component: MarkdownFormComponent;
  let fixture: ComponentFixture<MarkdownFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkdownFormComponent]
    });
    fixture = TestBed.createComponent(MarkdownFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
