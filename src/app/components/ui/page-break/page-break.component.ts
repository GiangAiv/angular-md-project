import { Component } from '@angular/core';
import { BaseComponent } from '../../base-component';

interface PageBreakProps {}

@Component({
  selector: 'app-page-break',
  template: `<div class="hidden print:block print:break-before-page"></div>`,
  standalone: true
})
export class PageBreakComponent extends BaseComponent<PageBreakProps> {} 