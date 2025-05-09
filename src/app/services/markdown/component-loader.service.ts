import {
  Injectable,
  ViewContainerRef,
  Type,
  ComponentRef,
} from '@angular/core';
import { BaseComponent } from 'src/app/components/base-component';

@Injectable({
  providedIn: 'root',
})
export class ComponentLoaderService {
  constructor() {}

  /**
   * Load a component into a container
   * @param container The ViewContainerRef to load the component into
   * @param componentType The component type to load
   * @param props The props to pass to the component
   * @returns The component reference
   */
  loadComponent(
    container: ViewContainerRef,
    componentType: Type<BaseComponent>,
    props: any,
  ): ComponentRef<BaseComponent> {
    // Clear the container
    container.clear();

    // Create the component
    const componentRef = container.createComponent(componentType);

    // Debug log for TabsComponent
    if (componentType.name === 'TabsComponent') {
      console.log('Loading TabsComponent with props:', props);

      // Special handling for TabsComponent props
      if (props.tabs && Array.isArray(props.tabs)) {
        console.log(
          `TabsComponent: Setting ${props.tabs.length} tabs via props`,
        );

        // Instead of setting tabs directly, include them in props
        props = {
          ...props,
          tabs: [...props.tabs], // Create a fresh copy of the tabs array
        };
      }
    }

    // Set the props
    componentRef.instance.props = props;

    // Detect changes
    componentRef.changeDetectorRef.detectChanges();

    // Return the component reference for potential further manipulation
    return componentRef;
  }
}
