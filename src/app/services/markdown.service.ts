import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MarkdownFile } from '../models/markdown-file';

@Injectable({
  providedIn: 'root',
})
export class MarkdownService {
  private apiUrl = 'http://localhost:3100/api/markdown';

  constructor(private http: HttpClient) {}

  // Get all markdown files
  getMarkdownFiles(): Observable<MarkdownFile[]> {
    return this.http.get<MarkdownFile[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching markdown files:', error);
        return throwError(() => new Error('Failed to retrieve markdown files'));
      })
    );
  }

  // Get a single markdown file by ID
  getMarkdownFile(id: string): Observable<MarkdownFile> {
    return this.http.get<MarkdownFile>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching markdown file:', error);
        return throwError(() => new Error('Failed to retrieve markdown file'));
      })
    );
  }

  // Create a new markdown file
  createMarkdownFile(
    file: Omit<MarkdownFile, 'id' | 'createdAt' | 'updatedAt'>
  ): Observable<MarkdownFile> {
    return this.http.post<MarkdownFile>(this.apiUrl, file).pipe(
      catchError((error) => {
        console.error('Error creating markdown file:', error);
        return throwError(() => new Error('Failed to create markdown file'));
      })
    );
  }

  // Update an existing markdown file
  updateMarkdownFile(
    id: string,
    updates: Partial<MarkdownFile>
  ): Observable<MarkdownFile> {
    return this.http.put<MarkdownFile>(`${this.apiUrl}/${id}`, updates).pipe(
      catchError((error) => {
        console.error('Error updating markdown file:', error);
        return throwError(() => new Error('Failed to update markdown file'));
      })
    );
  }

  // Delete a markdown file
  deleteMarkdownFile(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting markdown file:', error);
        return throwError(() => new Error('Failed to delete markdown file'));
      })
    );
  }

  // Upload a markdown file
  uploadMarkdownFile(
    filename: string,
    content: string
  ): Observable<MarkdownFile> {
    return this.http
      .post<MarkdownFile>(`${this.apiUrl}/upload`, { filename, content })
      .pipe(
        catchError((error) => {
          console.error('Error uploading markdown file:', error);
          return throwError(() => new Error('Failed to upload markdown file'));
        })
      );
  }
}
