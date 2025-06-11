import { Injectable } from '@angular/core';
import {
  ComponentReference,
  ParsedContent,
} from 'src/app/models/markdown/markdown-types';
import { parse } from '@babel/parser';
import { ComponentRegistryService } from './component-registry.service';

// Type definitions for JSX AST nodes
interface JSXNode {
  type: string;
  value?: string;
  openingElement?: {
    name: {
      type: string;
      name: string;
    };
    attributes: JSXAttribute[];
  };
  children?: JSXNode[];
  start?: number;
  end?: number;
}

interface JSXAttribute {
  type: string;
  name: {
    name: string;
  };
  value?: {
    type: string;
    value?: string;
    expression?: {
      start: number;
      end: number;
    };
  };
}

interface ParsedMarkdownResult {
  segments: (string | ComponentReference)[];
}

@Injectable({
  providedIn: 'root',
})
export class MarkdownParserService {
  constructor(private componentRegistry: ComponentRegistryService) {}

  /**
   * Parse markdown content and return ParsedContent
   */
  parseMarkdown(content: string): ParsedContent {
    if (!content) {
      return {
        content: '',
        frontmatter: {},
        components: [],
      };
    }

    try {
      // Extract frontmatter
      const frontmatter = this.extractFrontmatter(content);

      // Remove frontmatter from content
      const cleanContent = this.removeFrontmatter(content);

      // Extract components from markdown
      const components = this.extractComponents(cleanContent);

      return {
        content: cleanContent,
        frontmatter,
        components,
      };
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return {
        content: content,
        frontmatter: {},
        components: [],
      };
    }
  }

  /**
   * Parse markdown with components and return segments for rendering
   */
  parseMarkdownWithComponents(
    content: string,
    components: ComponentReference[]
  ): ParsedMarkdownResult {
    if (!content) {
      return { segments: [] };
    }

    try {
      const segments: (string | ComponentReference)[] = [];

      // If no components, return the content as a single segment
      if (!components || components.length === 0) {
        segments.push(content);
        return { segments };
      }

      // Sort components by position
      const sortedComponents = [...components].sort((a, b) => a.position - b.position);

      // Calculate component end positions by finding the actual component blocks in content
      const componentsWithEndPositions = sortedComponents.map(component => {
        const endPosition = this.findComponentEndPosition(content, component);
        return { ...component, endPosition };
      });

      let lastPosition = 0;

      for (const component of componentsWithEndPositions) {
        // Add content before this component
        if (component.position > lastPosition) {
          const beforeContent = content.slice(lastPosition, component.position).trim();
          if (beforeContent) {
            segments.push(beforeContent);
          }
        }

        // Add the component
        segments.push({
          type: component.type,
          props: component.props,
          position: component.position
        });

        // Move past the end of this component block
        lastPosition = component.endPosition || component.position;
      }

      // Add remaining content after the last component
      if (lastPosition < content.length) {
        const remainingContent = content.slice(lastPosition).trim();
        if (remainingContent) {
          segments.push(remainingContent);
        }
      }

      return { segments };
    } catch (error) {
      console.error('Error parsing markdown with components:', error);
      return { segments: [content] };
    }
  }

  /**
   * Find the end position of a component block in the content
   */
  private findComponentEndPosition(content: string, component: ComponentReference): number {
    // Look for JSX blocks starting at or near the component position
    const jsxRegex = /```jsx[\s\S]*?```/g;
    jsxRegex.lastIndex = Math.max(0, component.position - 10); // Start a bit before the position

    let match;
    while ((match = jsxRegex.exec(content))) {
      if (Math.abs(match.index - component.position) <= 10) {
        return match.index + match[0].length;
      }
    }

    // Look for component blocks starting at or near the component position
    const componentRegex = /```component[\s\S]*?```/g;
    componentRegex.lastIndex = Math.max(0, component.position - 10);

    while ((match = componentRegex.exec(content))) {
      if (Math.abs(match.index - component.position) <= 10) {
        return match.index + match[0].length;
      }
    }

    // Fallback: assume the component takes no space (shouldn't happen)
    return component.position;
  }

  /**
   * Extract JSX blocks from markdown content
   */
  extractJSXBlocks(input: string): string[] {
    const jsxBlocks: string[] = [];
    const regex = /```jsx([\s\S]*?)```/g;
    let match;
    while ((match = regex.exec(input))) {
      jsxBlocks.push(match[1].trim());
    }
    return jsxBlocks;
  }

  /**
   * Extract JSX blocks with their positions in the content
   */
  extractJSXBlocksWithPositions(input: string): Array<{ code: string; position: number; endPosition: number }> {
    const jsxBlocks: Array<{ code: string; position: number; endPosition: number }> = [];
    const regex = /```jsx([\s\S]*?)```/g;
    let match;
    while ((match = regex.exec(input))) {
      jsxBlocks.push({
        code: match[1].trim(),
        position: match.index,
        endPosition: match.index + match[0].length
      });
    }
    return jsxBlocks;
  }

  /**
   * Parse a JSX node from the AST
   */
  private parseJSXNode(node: JSXNode, code: string): any {
    if (node.type === 'JSXText') {
      const text = node.value?.trim();
      return text ? text : null;
    }

    if (node.type === 'JSXElement') {
      const component =
        node.openingElement?.name.type === 'JSXIdentifier'
          ? node.openingElement.name.name
          : 'Unknown';

      const props: Record<string, any> = {};

      if (node.openingElement?.attributes) {
        for (const attr of node.openingElement.attributes) {
          if (attr.type === 'JSXAttribute') {
            const key = attr.name.name;
            let value: any = true;

            if (attr.value) {
              if (attr.value.type === 'StringLiteral') {
                value = attr.value.value;
              } else if (attr.value.type === 'JSXExpressionContainer' && attr.value.expression) {
                const raw = code.slice(attr.value.expression.start, attr.value.expression.end);
                try {
                  value = new Function(`return (${raw})`)();
                } catch {
                  value = raw;
                }
              }
            }
            props[key] = value;
          }
        }
      }

      const children = (node.children || [])
        .map(child => this.parseJSXNode(child, code))
        .filter(Boolean);

      return { component, props, children };
    }

    return null;
  }

  /**
   * Parse JSX component from code string
   */
  parseJSXComponent(code: string): any {
    try {
      const ast = parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
      });

      const jsxNode = ast.program.body.find(
        (node: any) =>
          node.type === 'ExpressionStatement' &&
          node.expression &&
          node.expression.type === 'JSXElement'
      ) as any;

      if (!jsxNode || !jsxNode.expression) {
        return null;
      }

      return this.parseJSXNode(jsxNode.expression, code);
    } catch (error) {
      console.error('Error parsing JSX component:', error);
      return null;
    }
  }

  /**
   * Extract frontmatter from markdown content
   */
  private extractFrontmatter(content: string): Record<string, any> {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = content.match(frontmatterRegex);

    if (!match) {
      return {};
    }

    try {
      // Simple YAML-like parsing for basic frontmatter
      const frontmatterText = match[1];
      const frontmatter: Record<string, any> = {};

      const lines = frontmatterText.split('\n');
      for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const key = line.slice(0, colonIndex).trim();
          const value = line.slice(colonIndex + 1).trim();

          // Remove quotes if present
          const cleanValue = value.replace(/^["']|["']$/g, '');
          frontmatter[key] = cleanValue;
        }
      }

      return frontmatter;
    } catch (error) {
      console.error('Error parsing frontmatter:', error);
      return {};
    }
  }

  /**
   * Remove frontmatter from markdown content
   */
  private removeFrontmatter(content: string): string {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    return content.replace(frontmatterRegex, '');
  }

  /**
   * Extract components from markdown content
   */
  private extractComponents(content: string): ComponentReference[] {
    const components: ComponentReference[] = [];

    // Extract JSX components with their actual positions in content
    const jsxRegex = /```jsx([\s\S]*?)```/g;
    let jsxMatch;

    while ((jsxMatch = jsxRegex.exec(content))) {
      try {
        const jsxCode = jsxMatch[1].trim();
        const parsed = this.parseJSXComponent(jsxCode);
        if (parsed && parsed.component) {
          // Validate that the component is registered
          if (this.componentRegistry.hasComponent(parsed.component)) {
            components.push({
              type: parsed.component,
              props: {...parsed.props,
                children: parsed.children
              },
              position: jsxMatch.index, // Use the actual position in content
            });
          } else {
            console.warn(`Component type '${parsed.component}' is not registered`);
          }
        }
      } catch (error) {
        console.error('Error extracting JSX component:', error);
      }
    }

    // Extract JSON components (```component blocks)
    const componentRegex = /```component\s*\n([\s\S]*?)\n```/g;
    let componentMatch;

    while ((componentMatch = componentRegex.exec(content))) {
      try {
        const componentData = JSON.parse(componentMatch[1]);
        if (componentData.type) {
          // Validate that the component is registered
          if (this.componentRegistry.hasComponent(componentData.type)) {
            components.push({
              type: componentData.type,
              props: componentData.props || {},
              position: componentMatch.index, // Use the actual position in content
            });
          } else {
            console.warn(`Component type '${componentData.type}' is not registered`);
          }
        }
      } catch (error) {
        console.error('Error parsing component JSON:', error);
      }
    }

    console.table(components);

    return components;
  }

  /**
   * Validate component props using the component registry
   */
  validateComponentProps(componentType: string, props: Record<string, any>): boolean {
    const component = this.componentRegistry.getComponent(componentType);
    if (!component) {
      return false;
    }

    if (component.validateProps) {
      const validation = component.validateProps(props);
      return validation === true;
    }

    return true; // If no validation function, assume props are valid
  }
}