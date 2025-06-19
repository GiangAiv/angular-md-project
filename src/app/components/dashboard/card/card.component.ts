import { Component, OnInit, OnChanges } from '@angular/core';
import { BaseComponent } from '../../base-component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent extends BaseComponent implements OnInit, OnChanges {
  override ngOnInit(): void {
    super.ngOnInit(); // Set up variable subscriptions
  }

  ngOnChanges(): void {
    // Component will automatically re-render when props change
  }

  protected override onVariablesChanged(_variables: Record<string, any>): void {
    // Component will automatically re-render when variables change
  }

  // Helper method to resolve values that might be variable references
  getResolvedValue(key: string): any {
    return this.resolveValue(this.props?.[key]);
  }
}
