import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarkdownFile } from '../../models/markdown-file';

@Component({
  selector: 'app-markdown-form',
  templateUrl: './markdown-form.component.html',
  styleUrls: ['./markdown-form.component.css'],
})
export class MarkdownFormComponent implements OnInit {
  @Input() file: MarkdownFile | null = null;
  @Input() isSubmitting = false;
  @Output() formSubmit = new EventEmitter<Partial<MarkdownFile>>();
  @Output() formCancel = new EventEmitter<void>();

  markdownForm: FormGroup;
  previewMode = false;
  tagInput = '';

  constructor(private fb: FormBuilder) {
    this.markdownForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required]],
      tags: [[]],
    });
  }

  ngOnInit(): void {
    if (this.file) {
      this.markdownForm.patchValue({
        title: this.file.title,
        content: this.file.content,
        tags: this.file.tags || [],
      });
    }
  }

  togglePreview(): void {
    this.previewMode = !this.previewMode;
  }

  addTag(): void {
    if (this.tagInput.trim()) {
      const currentTags = this.markdownForm.get('tags')?.value || [];
      if (!currentTags.includes(this.tagInput.trim())) {
        this.markdownForm.patchValue({
          tags: [...currentTags, this.tagInput.trim()],
        });
      }
      this.tagInput = '';
    }
  }

  removeTag(tag: string): void {
    const currentTags = this.markdownForm.get('tags')?.value || [];
    this.markdownForm.patchValue({
      tags: currentTags.filter((t: string) => t !== tag),
    });
  }

  onSubmit(): void {
    if (this.markdownForm.invalid) {
      return;
    }

    this.formSubmit.emit(this.markdownForm.value);
  }

  onCancel(): void {
    this.formCancel.emit();
  }
}
