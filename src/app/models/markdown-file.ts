export interface MarkdownFile {
  id: string; // Unique identifier for the file
  title: string; // Title of the markdown file
  content: string; // The markdown content
  createdAt: Date; // When the file was created
  updatedAt: Date; // When the file was last updated
  tags?: string[]; // Optional array of tags for categorization
}
