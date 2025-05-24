import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../base-component';

interface DownloadDataProps {
  data?: any[];
  queryID?: string;
  text?: string;
  display?: 'inline' | 'block';
  class?: string;
}

@Component({
  selector: 'app-download-data',
  templateUrl: './download-data.component.html',
  styleUrls: ['./download-data.component.css']
})
export class DownloadDataComponent extends BaseComponent<DownloadDataProps> {
  errors: string[] = [];

  @Input() set data(value: any[]) {
    this._data = value || [];
  }
  get data(): any[] {
    return this._data;
  }
  private _data: any[] = [];

  @Input() set queryID(value: string) {
    this._queryID = value || '';
  }
  get queryID(): string {
    return this._queryID;
  }
  private _queryID = '';

  @Input() set text(value: string) {
    this._text = value || 'Download Data';
  }
  get text(): string {
    return this._text;
  }
  private _text = 'Download Data';

  @Input() set display(value: 'inline' | 'block') {
    this._display = value || 'inline';
  }
  get display(): 'inline' | 'block' {
    return this._display;
  }
  private _display: 'inline' | 'block' = 'inline';

  get buttonClass(): string {
    const baseClass = 'download-button';
    const displayClass = this.display === 'block' ? 'block w-full' : 'inline-block';
    return `${baseClass} ${displayClass} ${this.props?.class || ''}`;
  }

  addError(message: string): void {
    this.errors = [...this.errors, message];
  }

  private convertToCSV(data: any[]): string {
    if (!data || data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','), // Header row
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Handle values that contain commas or quotes
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ];

    return csvRows.join('\n');
  }

  private downloadCSV(csv: string, filename: string): void {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  downloadData(): void {
    if (!this.data || this.data.length === 0) {
      this.addError('No data available to download');
      return;
    }

    try {
      const csv = this.convertToCSV(this.data);
      const filename = `${this.queryID || 'data'}_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.csv`;
      this.downloadCSV(csv, filename);
    } catch (error) {
      this.addError('Error generating CSV file');
      console.error('Download error:', error);
    }
  }
} 