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

interface FetchConfig {
  api: string;
  path?: string;
  valueAs: string;
  loadingAs?: string;
  defaultValue?: any;
}

@Injectable({
  providedIn: 'root',
})
export class MarkdownParserService {
  constructor(private componentRegistry: ComponentRegistryService) {}

  /**
   * Parse markdown content and return ParsedContent
   */
  async parseMarkdown(content: string): Promise<ParsedContent> {
    if (!content) {
      return {
        content: '',
        frontmatter: {},
        components: [],
        variables: {},
      };
    }

    try {
      // Extract frontmatter
      const frontmatter = this.extractFrontmatter(content);

      // Remove frontmatter from content
      let cleanContent = this.removeFrontmatter(content);

      // Extract variables from JS blocks
      const variables = this.extractVariables(cleanContent);

      // Extract and process fetch blocks
      await this.processFetchBlocks(cleanContent, variables);

      // Remove JS blocks and fetch blocks from content (they should not be rendered)
      cleanContent = this.removeJSBlocks(cleanContent);
      cleanContent = this.removeFetchBlocks(cleanContent);

      // Extract components from markdown (pass variables for JSX parsing)
      const components = this.extractComponents(cleanContent, variables);

      return {
        content: cleanContent,
        frontmatter,
        components,
        variables,
      };
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return {
        content: content,
        frontmatter: {},
        components: [],
        variables: {},
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
  private parseJSXNode(node: JSXNode, code: string, variables?: Record<string, any>): any {
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
                  // Try to resolve variable references first
                  if (variables && variables.hasOwnProperty(raw)) {
                    value = variables[raw];
                  } else {
                    // Fallback to evaluation with variables in scope
                    const variableNames = variables ? Object.keys(variables) : [];
                    const variableValues = variables ? Object.values(variables) : [];
                    value = new Function(...variableNames, `return (${raw})`)(...variableValues);
                  }
                } catch {
                  // If evaluation fails, store as variable reference string for later resolution
                  value = raw;
                }
              }
            }
            props[key] = value;
          }
        }
      }

      const children = (node.children || [])
        .map(child => this.parseJSXNode(child, code, variables))
        .filter(Boolean);

      return { component, props, children };
    }

    return null;
  }

  /**
   * Parse JSX component from code string
   */
  parseJSXComponent(code: string, variables?: Record<string, any>): any {
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

      return this.parseJSXNode(jsxNode.expression, code, variables);
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
   * Remove JS blocks from markdown content (they should not be rendered)
   */
  private removeJSBlocks(content: string): string {
    const jsBlockRegex = /```js\s*\n([\s\S]*?)\n```/g;
    return content.replace(jsBlockRegex, '');
  }

  /**
   * Remove fetch blocks from markdown content (they should not be rendered)
   */
  private removeFetchBlocks(content: string): string {
    const fetchBlockRegex = /```fetch\s*\n([\s\S]*?)\n```/g;
    return content.replace(fetchBlockRegex, '');
  }

  /**
   * Process fetch blocks to retrieve data from APIs and bind to variables
   */
  private async processFetchBlocks(content: string, variables: Record<string, any>): Promise<void> {
    const fetchBlockRegex = /```fetch\s*\n([\s\S]*?)\n```/g;
    let match;

    const fetchPromises: Promise<void>[] = [];

    while ((match = fetchBlockRegex.exec(content))) {
      const fetchContent = match[1].trim();
      const fetchConfig = this.parseFetchConfig(fetchContent);

      if (fetchConfig) {
        const fetchPromise = this.executeFetch(fetchConfig, variables);
        fetchPromises.push(fetchPromise);
      }
    }

    // Wait for all fetch operations to complete
    await Promise.all(fetchPromises);
  }

  /**
   * Parse fetch block configuration
   */
  private parseFetchConfig(fetchContent: string): FetchConfig | null {
    const config: Partial<FetchConfig> = {};
    const lines = fetchContent.split('\n');

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) continue;

      // Parse -key: value format
      const match = trimmedLine.match(/^-([a-zA-Z]+):\s*(.+)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();

        switch (key) {
          case 'api':
            config.api = value;
            break;
          case 'path':
            config.path = value;
            break;
          case 'valueAs':
            config.valueAs = value;
            break;
          case 'loadingAs':
            config.loadingAs = value;
            break;
          case 'defaultValue':
            try {
              config.defaultValue = this.parseVariableValue(value);
            } catch {
              config.defaultValue = value;
            }
            break;
        }
      }
    }

    // Validate required fields
    if (!config.api || !config.valueAs) {
      console.warn('Fetch block missing required fields (api, valueAs):', config);
      return null;
    }

    return config as FetchConfig;
  }

  /**
   * Execute fetch operation and bind results to variables
   */
  private async executeFetch(config: FetchConfig, variables: Record<string, any>): Promise<void> {
    // Set loading state if specified
    if (config.loadingAs) {
      variables[config.loadingAs] = true;
    }

    // Set default value initially
    if (config.defaultValue !== undefined) {
      variables[config.valueAs] = config.defaultValue;
    }

    try {
      console.log(`Fetching data from: ${config.api}`);
      const response = await fetch(config.api);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();

      // Apply path if specified (using lodash-style path)
      if (config.path) {
        data = this.getValueByPath(data, config.path);
      }

      // Bind the result to the specified variable
      variables[config.valueAs] = data;
      console.log(`Successfully fetched and bound data to variable '${config.valueAs}':`, data);

    } catch (error) {
      console.error(`Error fetching data from ${config.api}:`, error);

      // Keep default value on error, or set to null if no default
      if (config.defaultValue === undefined) {
        variables[config.valueAs] = null;
      }
    } finally {
      // Clear loading state
      if (config.loadingAs) {
        variables[config.loadingAs] = false;
      }
    }
  }

  /**
   * Get value from object using lodash-style path (e.g., 'data.items[0].name')
   */
  private getValueByPath(obj: any, path: string): any {
    if (!obj || !path) return obj;

    // Handle array notation like 'data[0]' or 'items[1].name'
    const normalizedPath = path
      .replace(/\[(\d+)\]/g, '.$1') // Convert [0] to .0
      .replace(/^\./, ''); // Remove leading dot

    const keys = normalizedPath.split('.');
    let result = obj;

    for (const key of keys) {
      if (result === null || result === undefined) {
        return undefined;
      }

      // Handle numeric keys (array indices)
      if (/^\d+$/.test(key)) {
        const index = parseInt(key, 10);
        if (Array.isArray(result) && index < result.length) {
          result = result[index];
        } else {
          return undefined;
        }
      } else {
        // Handle object properties
        if (typeof result === 'object' && key in result) {
          result = result[key];
        } else {
          return undefined;
        }
      }
    }

    return result;
  }

  /**
   * Extract variables from JS blocks in markdown content
   * Supports JavaScript variable declarations inside ```js blocks
   */
  private extractVariables(content: string): Record<string, any> {
    const variables: Record<string, any> = {};

    // Find all ```js blocks
    const jsBlockRegex = /```js\s*\n([\s\S]*?)\n```/g;
    let match;

    while ((match = jsBlockRegex.exec(content))) {
      const jsContent = match[1].trim();

      try {
        // Parse the entire JS block as JavaScript code
        const ast = parse(jsContent, {
          sourceType: 'module',
          plugins: ['jsx', 'typescript'],
        });

        // Extract variable declarations from the AST
        for (const statement of ast.program.body) {
          if (statement.type === 'VariableDeclaration') {
            for (const declaration of statement.declarations) {
              if (declaration.type === 'VariableDeclarator' &&
                  declaration.id.type === 'Identifier' &&
                  declaration.init) {

                const variableName = declaration.id.name;
                try {
                  const parsedValue = this.evaluateExpression(declaration.init, jsContent);
                  variables[variableName] = parsedValue;
                  console.log(`Successfully parsed variable '${variableName}':`, parsedValue);
                } catch (error) {
                  console.warn(`Error evaluating variable '${variableName}':`, error);
                  // Store as string if evaluation fails
                  const start = declaration.init.start ?? 0;
                  const end = declaration.init.end ?? jsContent.length;
                  variables[variableName] = jsContent.slice(start, end);
                }
              }
            }
          }
        }
      } catch (error) {
        console.warn(`Error parsing JS block:`, error);
        // Fallback to line-by-line parsing for simple assignments
        this.parseJSBlockFallback(jsContent, variables);
      }
    }

    return variables;
  }

  /**
   * Fallback parser for JS blocks when babel parsing fails
   */
  private parseJSBlockFallback(jsContent: string, variables: Record<string, any>): void {
    const lines = jsContent.split('\n');

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('//')) continue;

      // Match const/let/var variable declarations
      const variableMatch = trimmedLine.match(/^(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(.+?)(?:;|$)/);

      if (variableMatch) {
        const variableName = variableMatch[1].trim();
        const variableValue = variableMatch[2].trim();

        try {
          const parsedValue = this.parseVariableValue(variableValue);
          variables[variableName] = parsedValue;
          console.log(`Successfully parsed variable '${variableName}' (fallback):`, parsedValue);
        } catch (error) {
          console.warn(`Error parsing variable '${variableName}' with value '${variableValue}':`, error);
          variables[variableName] = variableValue;
        }
      }
    }
  }

  /**
   * Parse variable value using babel/parser for robust JavaScript expression parsing
   */
  private parseVariableValue(value: string): any {
    const trimmedValue = value.trim();

    try {
      // Use babel/parser to parse the value as a JavaScript expression
      const ast = parse(`const temp = ${trimmedValue}`, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
      });

      // Extract the expression from the variable declaration
      const declaration = ast.program.body[0] as any;
      if (declaration.type === 'VariableDeclaration' &&
          declaration.declarations[0] &&
          declaration.declarations[0].init) {

        const expression = declaration.declarations[0].init;
        return this.evaluateExpression(expression, trimmedValue);
      }
    } catch (error) {
      // If babel parsing fails, fall back to simple parsing
      console.warn(`Babel parsing failed for value '${trimmedValue}', falling back to simple parsing:`, error);
    }

    // Fallback to simple parsing
    return this.parseVariableValueSimple(trimmedValue);
  }

  /**
   * Evaluate a babel AST expression to get the actual value
   */
  private evaluateExpression(expression: any, originalValue: string): any {
    switch (expression.type) {
      case 'StringLiteral':
        return expression.value;

      case 'NumericLiteral':
        return expression.value;

      case 'BooleanLiteral':
        return expression.value;

      case 'NullLiteral':
        return null;

      case 'ArrayExpression':
        return expression.elements.map((element: any) =>
          element ? this.evaluateExpression(element, originalValue) : null
        );

      case 'ObjectExpression':
        const obj: Record<string, any> = {};
        for (const property of expression.properties) {
          if (property.type === 'ObjectProperty') {
            const key = property.key.type === 'Identifier'
              ? property.key.name
              : this.evaluateExpression(property.key, originalValue);
            const value = this.evaluateExpression(property.value, originalValue);
            obj[key] = value;
          }
        }
        return obj;

      case 'Identifier':
        // Handle special identifiers
        if (expression.name === 'undefined') return undefined;
        // For other identifiers, return as string (could be enhanced to support variables)
        return expression.name;

      case 'UnaryExpression':
        if (expression.operator === '-' && expression.argument.type === 'NumericLiteral') {
          return -expression.argument.value;
        }
        break;

      default:
        // For complex expressions, fall back to eval (with caution)
        console.warn(`Unsupported expression type: ${expression.type}, using eval fallback`);
        try {
          return new Function(`return (${originalValue})`)();
        } catch (evalError) {
          throw new Error(`Cannot evaluate expression: ${originalValue}`);
        }
    }

    throw new Error(`Cannot evaluate expression: ${originalValue}`);
  }

  /**
   * Simple fallback parser for when babel parsing fails
   */
  private parseVariableValueSimple(value: string): any {
    const trimmedValue = value.trim();

    // Handle string values (quoted)
    if ((trimmedValue.startsWith("'") && trimmedValue.endsWith("'")) ||
        (trimmedValue.startsWith('"') && trimmedValue.endsWith('"'))) {
      return trimmedValue.slice(1, -1); // Remove quotes
    }

    // Handle numbers
    if (/^-?\d+(\.\d+)?$/.test(trimmedValue)) {
      return parseFloat(trimmedValue);
    }

    // Handle booleans
    if (trimmedValue === 'true') return true;
    if (trimmedValue === 'false') return false;

    // Handle null
    if (trimmedValue === 'null') return null;

    // Handle arrays and objects (JavaScript syntax with single quotes)
    if (trimmedValue.startsWith('[') || trimmedValue.startsWith('{')) {
      try {
        // First try JSON.parse for valid JSON
        return JSON.parse(trimmedValue);
      } catch (jsonError) {
        try {
          // If JSON.parse fails, try evaluating as JavaScript
          // This handles single quotes and other JavaScript syntax
          return new Function(`return (${trimmedValue})`)();
        } catch (jsError) {
          console.warn(`Failed to parse value as JSON or JavaScript: ${trimmedValue}`, { jsonError, jsError });
          throw new Error(`Invalid syntax: ${trimmedValue}`);
        }
      }
    }

    // Default to string if no other type matches
    return trimmedValue;
  }

  /**
   * Extract components from markdown content
   */
  private extractComponents(content: string, variables?: Record<string, any>): ComponentReference[] {
    const components: ComponentReference[] = [];

    // Use provided variables or extract them if not provided
    const variablesToUse = variables || this.extractVariables(content);

    // Extract JSX components with their actual positions in content
    const jsxRegex = /```jsx([\s\S]*?)```/g;
    let jsxMatch;

    while ((jsxMatch = jsxRegex.exec(content))) {
      try {
        const jsxCode = jsxMatch[1].trim();
        const parsed = this.parseJSXComponent(jsxCode, variablesToUse);
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