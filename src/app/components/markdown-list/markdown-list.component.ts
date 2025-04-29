import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarkdownFile } from '../../models/markdown-file';
import { MarkdownService } from '../../services/markdown.service';

@Component({
  selector: 'app-markdown-list',
  templateUrl: './markdown-list.component.html',
  styleUrls: ['./markdown-list.component.css'],
})
export class MarkdownListComponent implements OnInit {
  files: MarkdownFile[] = [];
  isLoading = true;
  error: string | null = null;
  searchTerm = '';
  selectedTag: string | null = null;
  allTags: string[] = [];
  showUploadModal = false;

  constructor(
    private markdownService: MarkdownService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles(): void {
    this.isLoading = true;
    this.markdownService.getMarkdownFiles().subscribe({
      next: (files) => {
        console.log('Files loaded from backend:', files);
        this.files = files;
        this.extractAllTags();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
      },
    });
  }

  extractAllTags(): void {
    const tagsSet = new Set<string>();
    this.files.forEach((file) => {
      if (file.tags) {
        file.tags.forEach((tag) => tagsSet.add(tag));
      }
    });
    this.allTags = Array.from(tagsSet);
  }

  createNewFile(): void {
    this.router.navigate(['/create']);
  }

  openUploadModal(): void {
    this.showUploadModal = true;
  }

  closeUploadModal(): void {
    this.showUploadModal = false;
  }

  onFileUploaded(fileId: string): void {
    this.loadFiles(); // Refresh the file list
    // Optionally navigate to the file
    // this.router.navigate(['/view', fileId]);
  }

  viewFile(id: string): void {
    this.router.navigate(['/view', id]);
  }

  editFile(id: string): void {
    this.router.navigate(['/edit', id]);
  }

  deleteFile(id: string, event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this file?')) {
      this.markdownService.deleteMarkdownFile(id).subscribe({
        next: () => {
          this.files = this.files.filter((file) => file.id !== id);
          this.extractAllTags();
        },
        error: (err) => {
          this.error = err.message;
        },
      });
    }
  }

  filterByTag(tag: string | null): void {
    this.selectedTag = tag;
  }

  get filteredFiles(): MarkdownFile[] {
    return this.files.filter((file) => {
      const matchesSearch = this.searchTerm
        ? file.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesTag = this.selectedTag
        ? file.tags?.includes(this.selectedTag)
        : true;

      return matchesSearch && matchesTag;
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }
}
