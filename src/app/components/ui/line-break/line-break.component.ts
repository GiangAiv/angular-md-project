import { Component } from '@angular/core';
import { BaseComponent } from '../../base-component';

interface LineBreakProps {}

@Component({
  selector: 'app-line-break',
  template: `<hr class="border-t border-gray-200 my-4 print:my-4 print:border-black" />`,
  standalone: true
})
export class LineBreakComponent extends BaseComponent<LineBreakProps> {} 