import { Directive, Input, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardComponentRegistryService } from '../services/markdown/dashboard-component-registry.service';

@Directive()
export abstract class BaseComponent<T = any> implements OnInit, OnDestroy {
  @Input() props: T = {} as T;

  // Inject the dashboard registry service
  protected dashboardRegistry = inject(DashboardComponentRegistryService);

  // Store variable subscriptions
  private variableSubscriptions: Subscription[] = [];

  // Current variables state
  protected variables: Record<string, any> = {};

  ngOnInit() {
    // Subscribe to all variables
    const variableSubscription = this.dashboardRegistry.subscribeToVariables()
      .subscribe(variables => {
        this.variables = variables;
        this.onVariablesChanged(variables);
      });

    this.variableSubscriptions.push(variableSubscription);
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.variableSubscriptions.forEach(sub => sub.unsubscribe());
    this.variableSubscriptions = [];
  }

  /**
   * Get a variable value by name
   */
  protected getVariable(name: string): any {
    return this.variables[name];
  }

  /**
   * Check if a variable exists
   */
  protected hasVariable(name: string): boolean {
    return name in this.variables;
  }

  /**
   * Resolve a value that might be a variable reference or a direct value
   * If the value starts with '$', treat it as a variable reference
   */
  protected resolveValue(value: any): any {
    if (typeof value === 'string' && value.startsWith('$')) {
      const variableName = value.substring(1);
      return this.getVariable(variableName);
    }
    return value;
  }

  /**
   * Override this method in child components to react to variable changes
   */
  protected onVariablesChanged(variables: Record<string, any>): void {
    // Default implementation does nothing
    // Child components can override this to react to variable changes
  }
}
