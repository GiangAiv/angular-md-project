import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inline-error',
  template: `
    <div class="inline-error" [style.height]="height" [style.width]="width">
      <div class="error-message" *ngFor="let err of error">
        {{ err }}
      </div>
    </div>
  `,
  styles: [
    `
      .inline-error {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #fee2e2;
        border: 1px solid #ef4444;
        border-radius: 0.25rem;
        padding: 0.5rem;
      }

      .error-message {
        color: #b91c1c;
        font-size: 0.875rem;
        text-align: center;
      }
    `,
  ],
})
export class InlineErrorComponent {
  @Input() inputType?: string;
  @Input() height?: string;
  @Input() width?: string;
  @Input() error: string[] = [];
}
