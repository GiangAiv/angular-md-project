import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BaseComponent } from '../../base-component';

interface NodeProps {
  class?: string;
  style?: string;
  [key: string]: any; // Allow additional HTML attributes
}

interface RenderNode {
  component: string;
  props?: NodeProps;
  children?: (RenderNode | string)[];
}

interface RenderHtmlProps {
  nodes: RenderNode[];
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
      const htmlContent = this.renderNodes(this.props?.nodes || []);
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
    }
  }

  private renderNodes(nodes: RenderNode[]): string {
    return nodes.map(node => this.renderNode(node)).join('');
  }

  private renderNode(node: RenderNode): string {
    const { component, props = {}, children = [] } = node;

    // Build attributes string from props
    const attributes = this.buildAttributes(props);

    // Render children
    const childrenHtml = children.map(child => {
      if (typeof child === 'string') {
        return this.escapeHtml(child);
      }
      return this.renderNode(child);
    }).join('');

    // Handle self-closing tags
    const selfClosingTags = ['img', 'br', 'hr', 'input', 'meta', 'link'];
    if (selfClosingTags.includes(component.toLowerCase())) {
      return `<${component}${attributes} />`;
    }

    return `<${component}${attributes}>${childrenHtml}</${component}>`;
  }

  private buildAttributes(props: NodeProps): string {
    const attributes: string[] = [];

    for (const [key, value] of Object.entries(props)) {
      if (value !== undefined && value !== null && value !== '') {
        // Handle boolean attributes
        if (typeof value === 'boolean') {
          if (value) {
            attributes.push(key);
          }
        } else {
          // Escape attribute values
          const escapedValue = this.escapeHtml(String(value));
          attributes.push(`${key}="${escapedValue}"`);
        }
      }
    }

    return attributes.length > 0 ? ' ' + attributes.join(' ') : '';
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}