import { Injectable } from '@angular/core';
import { DashboardComponent } from 'src/app/models/markdown/markdown-types';

@Injectable({
  providedIn: 'root',
})
export class ComponentRegistryService {
  private components: Map<string, DashboardComponent> = new Map();

  /**
   * Register a component
   * @param component The component to register
   */
  register(component: DashboardComponent): void {
    if (this.components.has(component.type)) {
      console.warn(
        `Component type '${component.type}' is already registered. Overwriting.`,
      );
    }
    this.components.set(component.type, component);
  }

  /**
   * Register multiple components
   * @param components Array of components to register
   */
  registerMany(components: DashboardComponent[]): void {
    components.forEach((component) => this.register(component));
  }

  /**
   * Get a component by type
   * @param type The component type
   * @returns The component or undefined if not found
   */
  getComponent(type: string): DashboardComponent | undefined {
    return this.components.get(type);
  }

  /**
   * Check if a component exists
   * @param type The component type
   * @returns True if the component exists
   */
  hasComponent(type: string): boolean {
    return this.components.has(type);
  }

  /**
   * Get all available component types
   * @returns Array of component types
   */
  getAvailableComponentTypes(): string[] {
    return Array.from(this.components.keys());
  }

  /**
   * Get all registered components
   * @returns Array of all components
   */
  getAllComponents(): DashboardComponent[] {
    return Array.from(this.components.values());
  }
}
