import {
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ComponentRendererProps } from '../../../models/markdown/markdown-types';
import { ComponentRegistryService } from '../../../services/markdown/component-registry.service';
import { ComponentLoaderService } from '../../../services/markdown/component-loader.service';

@Component({
  selector: 'app-component-renderer',
  templateUrl: './component-renderer.component.html',
  styleUrls: ['./component-renderer.component.css'],
})
export class ComponentRendererComponent implements OnChanges {
  @Input() componentData!: ComponentRendererProps;
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  componentContainer!: ViewContainerRef;

  error = false;
  errorTitle = '';
  errorMessage = '';
  errorDetail = '';

  constructor(
    private componentRegistry: ComponentRegistryService,
    private componentLoader: ComponentLoaderService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['componentData'] && this.componentData) {
      this.renderComponent(
        this.componentData.componentType,
        this.componentData.componentProps,
      );
    }
  }

  private renderComponent(
    componentType: string,
    componentProps: Record<string, any>,
  ): void {
    // Reset error state
    this.error = false;
    this.errorTitle = '';
    this.errorMessage = '';
    this.errorDetail = '';

    // Get the component from the registry
    const component = this.componentRegistry.getComponent(componentType);

    // If the component doesn't exist, render an error message
    if (!component) {
      this.error = true;
      this.errorTitle = 'Component Error';
      this.errorMessage = `Component type '${componentType}' not found in registry`;
      return;
    }

    // Validate the component props
    if (component.validateProps) {
      const validation = component.validateProps(componentProps);
      if (typeof validation === 'string') {
        this.error = true;
        this.errorTitle = 'Component Validation Error';
        this.errorMessage = validation;
        return;
      }
    }

    // If the component exists and props are valid, render it with the provided props
    try {
      const renderedComponent = component.render(componentProps);

      // If the rendered component is a component config with a component type
      if (renderedComponent && renderedComponent.component) {
        this.componentLoader.loadComponent(
          this.componentContainer,
          renderedComponent.component,
          renderedComponent.props || componentProps,
        );
      } else {
        // If it's a simple template string, render it directly
        this.componentContainer.clear();
        const element = document.createElement('div');
        element.innerHTML = renderedComponent as string;
        this.componentContainer.element.nativeElement.appendChild(element);
      }
    } catch (error) {
      // If there's an error rendering the component, show an error message
      this.error = true;
      this.errorTitle = 'Component Render Error';
      this.errorMessage = `Error rendering component '${componentType}'`;
      this.errorDetail = (error as Error).message;
    }
  }
}
