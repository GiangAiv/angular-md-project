import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ParsedContent,
  ComponentReference,
} from '../../../models/markdown/markdown-types';
import { MarkdownParserService } from '../../../services/markdown/markdown-parser.service';

@Component({
  selector: 'app-md-renderer',
  templateUrl: './md-renderer.component.html',
  styleUrls: ['./md-renderer.component.css'],
})
export class MdRendererComponent implements OnChanges {
  @Input() parsedContent: ParsedContent | null = null;

  title = '';
  segments: (string | ComponentReference)[] = [];

  constructor(private markdownParser: MarkdownParserService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parsedContent'] && this.parsedContent) {
      this.title = this.parsedContent.frontmatter['title'] || '';

      // Parse markdown to extract components and clean content
      const result = this.markdownParser.parseMarkdownWithComponents(
        this.parsedContent.content,
        this.parsedContent.components,
      );

      this.segments = result.segments;
    }
  }

  isComponent(
    segment: string | ComponentReference,
  ): segment is ComponentReference {
    return typeof segment === 'object' && 'type' in segment;
  }
}
