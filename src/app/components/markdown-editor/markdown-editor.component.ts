import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ParsedContent } from '../../models/markdown/markdown-types';
import { MarkdownService } from '../../services/markdown.service';
import { DashboardComponentRegistryService } from '../../services/markdown/dashboard-component-registry.service';
import { MarkdownParserService } from '../../services/markdown/markdown-parser.service';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
})
export class MarkdownEditorComponent implements OnInit, OnDestroy {
  editorForm: FormGroup;
  isLoading = false;
  isSubmitting = false;
  isEditMode = false;
  fileId: string | null = null;
  error: string | null = null;
  previewMode = false;
  tagInput = '';
  parsedContent: ParsedContent | null = null;
  private contentSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private markdownService: MarkdownService,
    private markdownParserService: MarkdownParserService,
    private dashboardComponentRegistry: DashboardComponentRegistryService,
  ) {
    this.editorForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required]],
      tags: [[]],
    });
  }

  ngOnInit(): void {
    // Register dashboard components
    this.dashboardComponentRegistry.registerComponents();

    this.fileId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.fileId;

    if (this.isEditMode && this.fileId) {
      this.loadFile(this.fileId);
    }

    // Subscribe to content changes for live preview
    const contentControl = this.editorForm.get('content');
    if (contentControl) {
      this.contentSubscription = contentControl.valueChanges
        .pipe(
          debounceTime(500), // Wait for 500ms pause in typing
          distinctUntilChanged(), // Only process if content has changed
        )
        .subscribe((content) => {
          if (content) {
            this.updateParsedContent(content);
          } else {
            this.parsedContent = null;
          }
        });
    }
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.contentSubscription) {
      this.contentSubscription.unsubscribe();
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

        // Parse content for initial preview
        if (file.content) {
          this.updateParsedContent(file.content);
        }

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

  /**
   * Check if markdown content contains component references
   */
  hasComponents(content: string): boolean {
    if (!content) {
      return false;
    }

    // Look for either JSON components or JSX components
    return (
      content.includes('```component') ||
      content.includes('```json') ||
      /<[A-Z][A-Za-z]*\s/.test(content)
    );
  }

  /**
   * Parse markdown content and update parsedContent for preview
   */
  updateParsedContent(content: string): void {
    if (!content) {
      this.parsedContent = null;
      return;
    }

    try {
      this.parsedContent = this.markdownParserService.parseMarkdown(content);
    } catch (error) {
      console.error('Error parsing markdown:', error);
      // Still set parsedContent with what we have to show partial preview
      this.parsedContent = {
        content: content,
        frontmatter: {},
        components: [],
      };
    }
  }
}
