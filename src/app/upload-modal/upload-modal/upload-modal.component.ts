// src/app/components/upload-modal/upload-modal.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { MarkdownService } from '../../services/markdown.service';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.css'],
})
export class UploadModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() fileUploaded = new EventEmitter<string>(); // Emits the ID of the uploaded file

  selectedFile: File | null = null;
  fileContent: string | null = null;
  isLoading = false;
  error: string | null = null;
  isPreview = false;

  constructor(
    private fileUploadService: FileUploadService,
    private markdownService: MarkdownService
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  private processFile(file: File): void {
    // Check if file is a markdown file
    if (!file.name.toLowerCase().endsWith('.md')) {
      this.error = 'Please select a Markdown (.md) file';
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
    this.error = null;
    this.isLoading = true;

    // Read the file content
    this.fileUploadService
      .readFile(file)
      .then((content) => {
        this.fileContent = content;
        this.isLoading = false;
      })
      .catch((err) => {
        this.error = err.message;
        this.selectedFile = null;
        this.isLoading = false;
      });
  }

  togglePreview(): void {
    this.isPreview = !this.isPreview;
  }

  uploadFile(): void {
    if (!this.selectedFile || !this.fileContent) {
      return;
    }

    this.isLoading = true;

    // Upload the file to the server
    this.markdownService
      .uploadMarkdownFile(this.selectedFile.name, this.fileContent)
      .subscribe({
        next: (newFile) => {
          this.isLoading = false;
          this.fileUploaded.emit(newFile.id);
          this.closeModal();
        },
        error: (err) => {
          this.error = err.message;
          this.isLoading = false;
        },
      });
  }

  closeModal(): void {
    this.selectedFile = null;
    this.fileContent = null;
    this.error = null;
    this.close.emit();
  }
}
