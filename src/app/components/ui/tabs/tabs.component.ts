// src/app/components/dashboard/tabs/tabs.component.ts
import { Component, OnInit } from '@angular/core';
import { MarkdownParserService } from '../../../services/markdown/markdown-parser.service';
import { BaseComponent } from 'src/app/components/base-component';

export interface TabItem {
  id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent extends BaseComponent implements OnInit {
  activeTabId: string | null = null;
  parsedContents: { [id: string]: any } = {};

  constructor(private markdownParser: MarkdownParserService) {
    super();
  }

  override ngOnInit(): void {
    console.log('TabsComponent initialized');
    console.log('Props:', this.props);

    // Get tabs from props
    const tabs = this.getTabs();
    console.log('TabsComponent - tabs count:', tabs.length);

    // Set default active tab
    if (tabs.length > 0) {
      const defaultTabId = this.props?.defaultTabId;
      this.activeTabId = defaultTabId || tabs[0].id;
      console.log('Set active tab to:', this.activeTabId);
    }

    // Parse each tab's content
    tabs.forEach(async (tab) => {
      console.log(
        `Processing tab ${tab.id}, content length: ${tab.content?.length || 0}`,
      );
      this.parsedContents[tab.id] = await this.markdownParser.parseMarkdown(
        tab.content,
      );
    });
  }

  /**
   * Get tabs from props
   */
  getTabs(): TabItem[] {
    if (!this.props || !this.props.tabs || !Array.isArray(this.props.tabs)) {
      console.warn('No tabs in props or invalid tabs format');
      return [];
    }
    return this.props.tabs;
  }

  selectTab(tabId: string): void {
    console.log('Selecting tab:', tabId);
    this.activeTabId = tabId;
  }

  isTabActive(tabId: string): boolean {
    return this.activeTabId === tabId;
  }

  getActiveTabContent(): any {
    if (!this.activeTabId) return null;
    return this.parsedContents[this.activeTabId];
  }
}
