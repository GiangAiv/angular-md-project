import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  template: `
    <span class="info-icon" [title]="description">
      <i class="fas fa-info-circle"></i>
    </span>
  `,
  styles: [
    `
      .info-icon {
        display: inline-flex;
        margin-left: 4px;
        cursor: help;
        color: #6b7280;
      }
    `,
  ],
})
export class InfoComponent {
  @Input() description?: string;
}
