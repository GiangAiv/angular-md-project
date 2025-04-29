import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadService } from '../../services/file-upload.service';
import { MarkdownService } from '../../services/markdown.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  fileContent: string = '';
  isLoading = false;
  error: string | null = null;

  constructor(
    private fileUploadService: FileUploadService,
    private markdownService: MarkdownService,
    private router: Router
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.md')) {
      this.selectedFile = file;
      this.isLoading = true;

      this.fileUploadService
        .readFile(file)
        .then((content) => {
          this.fileContent = content;
          this.isLoading = false;
        })
        .catch((error) => {
          this.error = error.message;
          this.isLoading = false;
        });
    } else {
      this.error = 'Please select a Markdown (.md) file';
    }
  }

  uploadFile(): void {
    if (!this.selectedFile || !this.fileContent) {
      return;
    }

    this.isLoading = true;
    const title = this.selectedFile.name.replace(/\.md$/, '');

    this.markdownService
      .createMarkdownFile({
        title: title,
        content: this.fileContent,
        tags: [],
      })
      .subscribe({
        next: (newFile) => {
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = err.message;
          this.isLoading = false;
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
