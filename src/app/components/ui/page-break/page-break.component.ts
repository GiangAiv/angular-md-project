import { Component } from '@angular/core';

@Component({
  selector: 'app-page-break',
  template: `<div class="hidden print:block print:break-before-page"></div>`,
  standalone: true
})
export class PageBreakComponent {} 