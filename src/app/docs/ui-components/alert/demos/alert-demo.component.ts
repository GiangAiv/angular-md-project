import { Component } from '@angular/core';
import { AlertComponent } from 'src/app/code/alert/alert.component';

@Component({
  selector: 'app-alert-demo',
  template: `
    <div class="space-y-4">
      <app-alert status="info">
        This is an informational alert message.
      </app-alert>

      <app-alert status="positive">
        Operation completed successfully!
      </app-alert>

      <app-alert status="warning">
        Please review your changes before proceeding.
      </app-alert>

      <app-alert status="negative">
        An error occurred while processing your request.
      </app-alert>
    </div>
  `,
  standalone: true,
  imports: [AlertComponent]
})
export class AlertDemoComponent {} 