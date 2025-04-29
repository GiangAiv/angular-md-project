// evidence.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvidenceService {
  private evidenceUrl = 'http://localhost:3002'; // Your Evidence project URL

  constructor(private http: HttpClient) {}

  // Send a markdown file to Evidence
  sendToEvidence(file: any): Observable<any> {
    return this.http.post(`${this.evidenceUrl}/api/files`, file);
  }

  // Get a visualization from Evidence
  getVisualization(fileId: string): Observable<any> {
    return this.http.get(`${this.evidenceUrl}/api/visualizations/${fileId}`);
  }

  // Check if Evidence is available
  checkEvidenceStatus(): Observable<any> {
    return this.http.get(`${this.evidenceUrl}/api/status`);
  }
}
