// markdown/models/markdown-types.ts

export interface ParsedContent {
  content: string;
  frontmatter: Record<string, any>;
  components: ComponentReference[];
  variables: Record<string, any>;
}

export interface ComponentReference {
  type: string;
  props: Record<string, any>;
  position: number;
}

export interface DashboardComponent {
  type: string;
  name: string;
  description: string;
  render: (props: any) => any;
  validateProps?: (props: any) => boolean | string;
}

export interface MDRendererProps {
  parsedContent: ParsedContent;
}

export interface ComponentRendererProps {
  componentType: string;
  componentProps: Record<string, any>;
}
