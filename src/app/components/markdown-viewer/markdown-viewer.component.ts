import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownFile } from '../../models/markdown-file';
import { MarkdownService } from '../../services/markdown.service';

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.css'],
})
export class MarkdownViewerComponent implements OnInit {
  file: MarkdownFile | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private markdownService: MarkdownService
  ) {}

  ngOnInit(): void {
    const fileId = this.route.snapshot.paramMap.get('id');
    if (fileId) {
      this.loadFile(fileId);
    } else {
      this.error = 'File ID not provided';
      this.isLoading = false;
    }
  }

  loadFile(id: string): void {
    this.isLoading = true;
    this.markdownService.getMarkdownFile(id).subscribe({
      next: (file) => {
        this.file = file;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
      },
    });
  }

  editFile(): void {
    if (this.file) {
      this.router.navigate(['/edit', this.file.id]);
    }
  }

  deleteFile(): void {
    if (this.file && confirm('Are you sure you want to delete this file?')) {
      this.markdownService.deleteMarkdownFile(this.file.id).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = err.message;
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }
}
