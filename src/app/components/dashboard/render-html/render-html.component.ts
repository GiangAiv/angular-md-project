import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BaseComponent } from '../../base-component';

interface RenderHtmlProps {
  content?: string;
  class?: string;
}

@Component({
  selector: 'app-render-html',
  templateUrl: './render-html.component.html',
  styleUrls: ['./render-html.component.css']
})
export class RenderHtmlComponent extends BaseComponent<RenderHtmlProps> implements OnChanges {
  safeContent: SafeHtml;

  get containerClass(): string {
    return `render-html ${this.props?.class || ''}`;
  }

  constructor(private sanitizer: DomSanitizer) {
    super();
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml('');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['props']) {
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.props?.content || '');
    }
  }
} 