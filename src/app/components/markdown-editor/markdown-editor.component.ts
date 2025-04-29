import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownFile } from '../../models/markdown-file';
import { MarkdownService } from '../../services/markdown.service';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
})
export class MarkdownEditorComponent implements OnInit {
  editorForm: FormGroup;
  isLoading = false;
  isSubmitting = false;
  isEditMode = false;
  fileId: string | null = null;
  error: string | null = null;
  previewMode = false;
  tagInput = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private markdownService: MarkdownService
  ) {
    this.editorForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required]],
      tags: [[]],
    });
  }

  ngOnInit(): void {
    this.fileId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.fileId;

    if (this.isEditMode && this.fileId) {
      this.loadFile(this.fileId);
    }
  }

  loadFile(id: string): void {
    this.isLoading = true;
    this.markdownService.getMarkdownFile(id).subscribe({
      next: (file) => {
        this.editorForm.patchValue({
          title: file.title,
          content: file.content,
          tags: file.tags || [],
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
      },
    });
  }

  togglePreview(): void {
    this.previewMode = !this.previewMode;
  }

  addTag(): void {
    if (this.tagInput.trim()) {
      const currentTags = this.editorForm.get('tags')?.value || [];
      if (!currentTags.includes(this.tagInput.trim())) {
        this.editorForm.patchValue({
          tags: [...currentTags, this.tagInput.trim()],
        });
      }
      this.tagInput = '';
    }
  }

  removeTag(tag: string): void {
    const currentTags = this.editorForm.get('tags')?.value || [];
    this.editorForm.patchValue({
      tags: currentTags.filter((t: string) => t !== tag),
    });
  }

  onSubmit(): void {
    if (this.editorForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    const formData = this.editorForm.value;

    if (this.isEditMode && this.fileId) {
      this.markdownService.updateMarkdownFile(this.fileId, formData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/view', this.fileId]);
        },
        error: (err) => {
          this.error = err.message;
          this.isSubmitting = false;
        },
      });
    } else {
      this.markdownService.createMarkdownFile(formData).subscribe({
        next: (newFile) => {
          this.isSubmitting = false;
          this.router.navigate(['/view', newFile.id]);
        },
        error: (err) => {
          this.error = err.message;
          this.isSubmitting = false;
        },
      });
    }
  }

  cancel(): void {
    if (this.isEditMode && this.fileId) {
      this.router.navigate(['/view', this.fileId]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
