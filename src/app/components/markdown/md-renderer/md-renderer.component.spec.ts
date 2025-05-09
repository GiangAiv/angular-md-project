import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdRendererComponent } from './md-renderer.component';

describe('MdRendererComponent', () => {
  let component: MdRendererComponent;
  let fixture: ComponentFixture<MdRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MdRendererComponent]
    });
    fixture = TestBed.createComponent(MdRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
