import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadModalComponent } from './upload-modal.component';

describe('UploadModalComponent', () => {
  let component: UploadModalComponent;
  let fixture: ComponentFixture<UploadModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadModalComponent]
    });
    fixture = TestBed.createComponent(UploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
