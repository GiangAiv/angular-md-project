import { Component } from '@angular/core';
import { TabComponent } from 'src/app/code/tabs/tab/tab.component';
import { TabsComponent } from 'src/app/code/tabs/tabs.component';

@Component({
  selector: 'app-tabs-demo',
  template: `
    <div class="space-y-4">
      <app-tabs [activeTab]="activeTabIndex" (tabChange)="onTabChange($event)">
        <app-tab title="Overview">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">Overview</h3>
            <p>This is the overview tab content.</p>
          </div>
        </app-tab>
        
        <app-tab title="Details">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">Details</h3>
            <p>This is the details tab content.</p>
          </div>
        </app-tab>
        
        <app-tab title="Settings">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">Settings</h3>
            <p>This is the settings tab content.</p>
          </div>
        </app-tab>
      </app-tabs>
    </div>
  `,
  standalone: true,
  imports: [TabsComponent, TabComponent]
})
export class TabsDemoComponent {
  activeTabIndex = 0;

  onTabChange(index: number) {
    this.activeTabIndex = index;
  }
} 