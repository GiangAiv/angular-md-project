import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { AfterViewInit, ApplicationRef, Component, EventEmitter, OnDestroy, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../base-component';

interface ModalProps {
  open: boolean;
  title: string;
  buttonText: string;
  innerText: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends BaseComponent<ModalProps> implements AfterViewInit, OnDestroy {
  @Output() close = new EventEmitter<void>();
  @ViewChild('modalContainer') modalContainer!: TemplateRef<any>;
  
  private portalOutlet: DomPortalOutlet | null = null;
  private portal: TemplatePortal | null = null;
  closing = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private appRef: ApplicationRef,
  ) {
    super();
  }

  ngAfterViewInit() {
    // Create portal outlet at the end of body
    const container = document.createElement('div');
    container.id = 'modal-portal-container';
    document.body.appendChild(container);
    
    this.portalOutlet = new DomPortalOutlet(
      container,
      this.appRef,

    );

    // Create and attach the template portal
    if (this.modalContainer) {
      this.portal = new TemplatePortal(
        this.modalContainer,
        this.viewContainerRef
      );
      this.portalOutlet.attach(this.portal);
    }
  }

  ngOnDestroy() {
    if (this.portalOutlet) {
      this.portalOutlet.dispose();
      const container = document.getElementById('modal-portal-container');
      if (container) {
        container.remove();
      }
    }
  }

  isOpen(): void {
    if (this.props.open) {
      this.closing = true;
      setTimeout(() => {
        this.closing = false;
        this.props.open = false;
        this.close.emit();
      }, 150);
    } else {
      this.props.open = true;
    }
  }

  get modalClasses(): string {
    return `modal z-[9999] fixed w-full h-full top-0 left-0 flex items-center justify-center lg:p-0 ${
      this.closing ? 'modal-exit' : 'modal-enter'
    }`;
  }

  get titleClasses(): string {
    return `relative flex justify-between items-start ${
      this.props.title.trim() !== '' ? 'pt-3 pb-1 px-5 text-lg font-semibold break-normal text-center' : ''
    }`;
  }

  get contentClasses(): string {
    return `h-auto max-h-96 overflow-y-auto px-5 ${
      this.props.title.trim() !== '' ? 'my-4' : 'my-6'
    } text-sm break-normal`;
  }
} 