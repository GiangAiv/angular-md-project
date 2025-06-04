import { Injectable } from '@angular/core';

import {
  ComponentReference,
  ParsedContent,
} from 'src/app/models/markdown/markdown-types';
import { parse as parseYaml } from 'yaml';
import { ComponentRegistryService } from './component-registry.service';

@Injectable({
  providedIn: 'root',
})
export class MarkdownParserService {
  constructor(private componentRegistry: ComponentRegistryService) {}

  /**
   * Parse a markdown string to extract content, frontmatter, and component references
   * @param markdown The markdown string to parse
   * @returns ParsedContent object containing the parsed markdown
   */
  parseMarkdown(markdown: string): ParsedContent {
    // Parse frontmatter and content
    const { content, frontmatter } = this.extractFrontmatter(markdown);

    // Extract component references from the content
    const components = this.extractComponentReferences(content);
    console.log('components : ', components);

    return {
      content,
      frontmatter,
      components,
    };
  }

  /**
   * Extract frontmatter from markdown content
   * @param markdown The markdown content
   * @returns Object with content and frontmatter
   */
  private extractFrontmatter(markdown: string): {
    content: string;
    frontmatter: Record<string, any>;
  } {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);

    if (match) {
      // Parse YAML frontmatter
      try {
        const frontmatter = parseYaml(match[1]);
        return {
          content: match[2].trim(),
          frontmatter: frontmatter || {},
        };
      } catch (error) {
        console.error('Error parsing frontmatter:', error);
        return {
          content: markdown,
          frontmatter: {},
        };
      }
    }

    // No frontmatter found
    return {
      content: markdown,
      frontmatter: {},
    };
  }

  /**
   * Extract component references from markdown content
   */
  extractComponentReferences(content: string): ComponentReference[] {
    const components: ComponentReference[] = [];

    // Extract JSON-style components
    this.extractJsonComponents(content, components);

    // Extract JSX-style components
    this.extractJsxComponents(content, components);

    return components;
  }

  /**
   * Extract JSON-style component references from markdown content
   */
  private extractJsonComponents(
    content: string,
    components: ComponentReference[],
  ): void {
    // Regular expression to match component code blocks
    const componentBlockRegex = /```component\s*\n([\s\S]*?)\n```/g;

    let blockMatch;
    // For each component block found in the content
    while ((blockMatch = componentBlockRegex.exec(content)) !== null) {
      const blockContent = blockMatch[1];
      const blockPosition = blockMatch.index;

      // Use a regex that can match complete JSON objects
      // This pattern matches balanced braces, handling nested objects
      const jsonRegex = /{(?:[^{}]|(?:{[^{}]*})|(?:{(?:[^{}]|{[^{}]*})*}))*}/g;

      let jsonMatch;
      // For each JSON object found in the block
      while ((jsonMatch = jsonRegex.exec(blockContent)) !== null) {
        const jsonString = jsonMatch[0];

        try {
          // Parse the JSON string to an object
          const componentData = JSON.parse(jsonString);

          // Validate that the component exists and has the required properties
          if (
            typeof componentData === 'object' &&
            componentData !== null &&
            typeof componentData.type === 'string' &&
            typeof componentData.props === 'object'
          ) {
            // Check if the component type is registered
            if (this.componentRegistry.hasComponent(componentData.type)) {
              components.push({
                type: componentData.type,
                props: componentData.props,
                position: blockPosition, // Using block position
              });
            } else {
              console.warn(
                `Component type not registered: ${componentData.type}`,
              );
            }
          } else {
            console.warn(`Invalid component data structure: ${jsonString}`);
          }
        } catch (error: any) {
          console.error(`Error parsing component JSON: ${error.message}`);
          console.error(`Problematic JSON: ${jsonString}`);
        }
      }
    }
  }

  /**
   * Extract JSX-style component references from markdown content
   */
  private extractJsxComponents(
    content: string,
    components: ComponentReference[],
  ): void {
    // Regex for JSX component syntax:
    // <Component prop1="value1" prop2="value2" /> (self-closing)
    // <Component prop1="value1">content</Component> (with children)
    const jsxRegex = /<([A-Z][a-zA-Z]*)\s+([^>]*)(?:\/>|>([\s\S]*?)<\/\1>)/g;

    let match;
    while ((match = jsxRegex.exec(content)) !== null) {
      const [fullMatch, componentType, propsString, children] = match;
      const position = match.index;

      // Only process components that are registered
      if (this.componentRegistry.hasComponent(componentType)) {
        // Parse the props from the string
        const props = this.parseJsxProps(propsString, children);
        components.push({
          type: componentType,
          props,
          position,
        });
      } else {
        console.warn(`Component type not registered: ${componentType}`);
      }
    }
  }

  /**
   * Safely evaluate JavaScript expressions in JSX props
   */
  private safeEval(expression: string): any {
    try {
      // For arrays with objects using JS syntax
      if (expression.startsWith('[') && expression.endsWith(']')) {
        // Replace JS property names with JSON format
        const jsonLike = expression
          .replace(/(\s*)([a-zA-Z0-9_]+)(\s*):(\s*)/g, '$1"$2"$3:$4')
          // Replace single quotes with double quotes
          .replace(/'([^']*)'/g, '"$1"');

        try {
          return JSON.parse(jsonLike);
        } catch (e) {
          console.warn('Failed to parse array expression:', expression);
          return expression;
        }
      }

      // For simple expressions like numbers, booleans, etc.
      if (expression === 'true') return true;
      if (expression === 'false') return false;
      if (!isNaN(Number(expression))) return Number(expression);

      // If all else fails, return the original expression
      return expression;
    } catch (error) {
      console.error('Error evaluating expression:', error);
      return expression;
    }
  }

  /**
   * Parse JSX-style props string into an object
   */
  private parseJsxProps(
    propsString: string,
    children?: string,
  ): Record<string, any> {
    const props: Record<string, any> = {};

    // If there are children, add them to props
    if (children) {
      props['children'] = children.trim();
    }

    // Process the props string to handle nested brackets correctly
    let current = 0;
    let propName = '';
    let inPropName = true;
    let propValue = '';
    let inString = false;
    let stringChar = '';
    let inBraces = false;
    let braceCount = 0;

    while (current < propsString.length) {
      const char = propsString[current];
      const nextChar =
        current + 1 < propsString.length ? propsString[current + 1] : '';

      // Handling string literals
      if ((char === '"' || char === "'") && !inBraces) {
        if (inString) {
          if (char === stringChar) {
            // End of string
            inString = false;
            if (!inPropName) {
              props[propName.trim()] = propValue;
              propName = '';
              propValue = '';
              inPropName = true;
            }
          } else {
            propValue += char;
          }
        } else {
          inString = true;
          stringChar = char;
          if (inPropName) {
            console.warn('Unexpected string in prop name:', propName);
          }
        }
      }
      // Handle equals sign (transition from prop name to value)
      else if (char === '=' && !inString && !inBraces && inPropName) {
        inPropName = false;

        // Check if next char is a brace
        if (nextChar === '{') {
          inBraces = true;
          braceCount = 0;
          current++; // Skip the opening brace
        }
      }
      // Handle opening brace
      else if (char === '{' && !inString && !inPropName) {
        if (inBraces) {
          braceCount++;
          propValue += char;
        } else {
          inBraces = true;
        }
      }
      // Handle closing brace
      else if (char === '}' && !inString && !inPropName && inBraces) {
        if (braceCount > 0) {
          braceCount--;
          propValue += char;
        } else {
          // End of JSX expression
          inBraces = false;
          props[propName.trim()] = this.safeEval(propValue.trim());
          propName = '';
          propValue = '';
          inPropName = true;
        }
      }
      // Handle whitespace
      else if (/\s/.test(char) && !inString && !inBraces) {
        if (inPropName && propName.length > 0) {
          // Boolean prop (no value)
          props[propName.trim()] = true;
          propName = '';
          inPropName = true;
        } else if (!inPropName && propValue.length > 0) {
          // End of unquoted value
          props[propName.trim()] = propValue.trim();
          propName = '';
          propValue = '';
          inPropName = true;
        }
      }
      // All other characters
      else {
        if (inPropName) {
          propName += char;
        } else {
          propValue += char;
        }
      }

      current++;
    }

    // Handle last prop if it exists
    if (propName.trim().length > 0) {
      if (inPropName) {
        // Boolean prop at the end
        props[propName.trim()] = true;
      } else if (propValue.trim().length > 0) {
        // Value prop at the end
        if (inBraces) {
          props[propName.trim()] = this.safeEval(propValue.trim());
        } else {
          props[propName.trim()] = propValue.trim();
        }
      }
    }

    return props;
  }

  /**
   * Parse markdown content with components and return segments
   */
  parseMarkdownWithComponents(
    content: string,
    components: ComponentReference[] = [],
  ): {
    segments: (string | ComponentReference)[];
    components: ComponentReference[];
  } {
    // Make a copy of the components array to avoid modifying the original
    const allComponents = [...components];

    // Extract any additional components not already in the array
    const extractedComponents = this.extractComponentReferences(content);

    // Add only components that don't already exist in the array
    for (const comp of extractedComponents) {
      if (!allComponents.some((c) => c.position === comp.position)) {
        allComponents.push(comp);
      }
    }

    // Sort components by position in ascending order
    const sortedComponents = [...allComponents].sort(
      (a, b) => a.position - b.position,
    );

    // Split content into segments
    const segments: (string | ComponentReference)[] = [];
    let lastPosition = 0;

    sortedComponents.forEach((component) => {
      // Add the text segment before the component
      if (component.position > lastPosition) {
        segments.push(content.slice(lastPosition, component.position));
      }

      // Add the component
      segments.push(component);

      // Update the last position - need to handle both JSX and JSON formats
      if (component.type && component.props) {
        // Try to find the matching component in the content
        const jsonPattern = new RegExp(
          `(\w+)=\{([\s\S]*?)}|(\w+)=(".*?"|true|false)|(\w+)`,
          'g',
        );
        const jsxPattern = new RegExp(
          `<${component.type}\\s+[^>]*(?:/>|>[\\s\\S]*?</${component.type}>)`,
          'g',
        );

        // Reset regex lastIndex to starting position
        jsonPattern.lastIndex = component.position;
        jsxPattern.lastIndex = component.position;

        const jsonMatch = jsonPattern.exec(content);
        const jsxMatch = jsxPattern.exec(content);

        // Determine which match is closer to the component position
        if (jsonMatch && jsxMatch) {
          if (jsonMatch.index < jsxMatch.index) {
            lastPosition = jsonMatch.index + jsonMatch[0].length;
          } else {
            lastPosition = jsxMatch.index + jsxMatch[0].length;
          }
        } else if (jsonMatch) {
          lastPosition = jsonMatch.index + jsonMatch[0].length;
        } else if (jsxMatch) {
          lastPosition = jsxMatch.index + jsxMatch[0].length;
        } else {
          // If no match found, just move past the current position
          lastPosition = component.position + 1;
        }
      } else {
        lastPosition = component.position + 1;
      }
    });

    // Add the remaining text after the last component
    if (lastPosition < content.length) {
      segments.push(content.slice(lastPosition));
    }

    return { segments, components: sortedComponents };
  }

  /**
   * Clean the markdown content by removing component references
   */
  cleanMarkdown(content: string): string {
    // Remove JSON-style component blocks
    let cleaned = content.replace(/```component\s*\n[\s\S]*?\n```/g, '');

    // Remove JSX-style component tags
    cleaned = cleaned.replace(
      /<([A-Z][a-zA-Z]*)\s+([^>]*)(?:\/>|>([\s\S]*?)<\/\1>)/g,
      '',
    );

    return cleaned;
  }
}
