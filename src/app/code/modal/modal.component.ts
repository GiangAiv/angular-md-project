import { animate, state, style, transition, trigger } from '@angular/animations';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('modalAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'scale(0.9)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition(':enter', [
        animate('200ms ease-out')
      ]),
      transition(':leave', [
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @Input() set open(value: boolean) {
    this._open = value;
    if (this.overlayRef) {
      if (value) {
        this.showModal();
      } else {
        this.hideModal();
      }
    }
  }
  get open(): boolean {
    return this._open;
  }
  private _open: boolean = false;

  @Input() title: string = '';
  @Input() buttonText?: string = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @ViewChild('modalContent') modalContent!: ElementRef;

  @Output() close = new EventEmitter<void>();

  private overlayRef: OverlayRef | null = null;
  private portal: ComponentPortal<ModalComponent> | null = null;
  closing: boolean = false;

  constructor(
    private overlay: Overlay,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit() {
    this.initializeOverlay();
    if (this.open) {
      this.showModal();
    }
  }

  ngOnDestroy() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  private initializeOverlay() {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'bg-black/50 backdrop-blur-sm',
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    // Handle backdrop click
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    });

    // Handle escape key
    this.overlayRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  private showModal() {
    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      if (!this.portal) {
        this.portal = new ComponentPortal(ModalComponent);
      }
      this.overlayRef.attach(this.portal);
    }
  }

  private hideModal() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  closeModal() {
    this.hideModal();
    this._open = false;
    this.close.emit();
  }

  get contentClasses(): string {
    const sizeClasses = {
      'sm': 'max-w-sm',
      'md': 'max-w-md',
      'lg': 'max-w-lg',
      'xl': 'max-w-xl'
    };
    return `w-full mx-auto bg-white ${sizeClasses[this.size]} rounded-lg border border-base-300 bg-base-100 shadow-lg`;
  }

  get headerClasses(): string {
    return `relative flex items-start justify-between ${
      this.title.trim() ? 'border-b border-base-300 px-4 py-3' : ''
    }`;
  }

  get bodyClasses(): string {
    return `p-4 text-base-content ${
      this.title.trim() ? '' : 'pt-4'
    }`;
  }
} 