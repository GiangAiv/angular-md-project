import { TestBed } from '@angular/core/testing';
import { MarkdownParserService } from './markdown-parser.service';
import { ComponentRegistryService } from './component-registry.service';

describe('MarkdownParserService', () => {
  let service: MarkdownParserService;
  let componentRegistry: ComponentRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkdownParserService, ComponentRegistryService]
    });
    service = TestBed.inject(MarkdownParserService);
    componentRegistry = TestBed.inject(ComponentRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Variable Extraction', () => {
    it('should extract string variables', () => {
      const markdown = `
# Test

\`\`\`json
name='John Doe'
title="Software Engineer"
\`\`\`
      `;

      const result = service.parseMarkdown(markdown);

      expect(result.variables).toEqual({
        name: 'John Doe',
        title: 'Software Engineer'
      });
    });

    it('should extract number variables', () => {
      const markdown = `
# Test

\`\`\`json
count=42
price=19.99
negative=-5
\`\`\`
      `;

      const result = service.parseMarkdown(markdown);

      expect(result.variables).toEqual({
        count: 42,
        price: 19.99,
        negative: -5
      });
    });

    it('should extract boolean and null variables', () => {
      const markdown = `
# Test

\`\`\`json
isActive=true
isVisible=false
value=null
\`\`\`
      `;

      const result = service.parseMarkdown(markdown);

      expect(result.variables).toEqual({
        isActive: true,
        isVisible: false,
        value: null
      });
    });

    it('should extract array variables', () => {
      const markdown = `
# Test

\`\`\`json
numbers=[1, 2, 3]
\`\`\`
      `;

      const result = service.parseMarkdown(markdown);

      expect(result.variables).toEqual({
        numbers: [1, 2, 3]
      });
    });

    it('should extract object variables', () => {
      const markdown = `
# Test

\`\`\`json
config={theme: 'dark', showHeader: true}
\`\`\`
      `;

      const result = service.parseMarkdown(markdown);

      expect(result.variables).toEqual({
        config: {theme: 'dark', showHeader: true}
      });
    });

    it('should handle multiple JSON blocks', () => {
      const markdown = `
# Test

\`\`\`json
name='John'
age=30
\`\`\`

Some content here.

\`\`\`json
city='New York'
isActive=true
\`\`\`
      `;

      const result = service.parseMarkdown(markdown);

      expect(result.variables).toEqual({
        name: 'John',
        age: 30,
        city: 'New York',
        isActive: true
      });
    });

    it('should ignore invalid variable syntax', () => {
      const markdown = `
# Test

\`\`\`json
name='John'
invalid line without equals
123invalid=value
\`\`\`
      `;

      const result = service.parseMarkdown(markdown);

      expect(result.variables).toEqual({
        name: 'John'
      });
    });
  });
});
