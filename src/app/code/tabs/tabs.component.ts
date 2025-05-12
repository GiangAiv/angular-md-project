import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList, SimpleChanges } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  standalone: true,
  imports: [CommonModule, TabComponent]
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  @Input() activeTab: number = 0;
  @Output() tabChange = new EventEmitter<number>();
  
  ngAfterContentInit() {
    // Get all active tabs
    const activeTabs = this.tabs.filter(tab => tab.active);
    
    // If there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTabByIndex(this.activeTab);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeTab'] && this.tabs) {
      this.selectTabByIndex(this.activeTab);
    }
  }
  
  selectTab(tab: TabComponent) {
    // Deactivate all tabs
    this.tabs.toArray().forEach(t => t.active = false);
    
    // Activate the selected tab
    tab.active = true;

    // Emit the index of the selected tab
    const index = this.tabs.toArray().indexOf(tab);
    this.tabChange.emit(index);
  }

  private selectTabByIndex(index: number) {
    const tabsArray = this.tabs.toArray();
    if (tabsArray[index]) {
      this.selectTab(tabsArray[index]);
    }
  }
} 