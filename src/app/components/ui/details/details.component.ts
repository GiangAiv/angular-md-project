import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { toBoolean } from '../accordion/util';

interface DetailsProps {
  title?: string;
  open?: boolean | string;
  printShowAll?: boolean | string;
  class?: string;
  children?: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('200ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('200ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class DetailsComponent extends BaseComponent<DetailsProps> {
  get title(): string {
    return this.props?.title || 'Details';
  }

  get open(): boolean {
    return toBoolean(this.props?.open || false);
  }

  get printShowAll(): boolean {
    return toBoolean(this.props?.printShowAll ?? true);
  }

  printing = false;

  @HostListener('window:beforeprint')
  onBeforePrint(): void {
    this.printing = true;
  }

  @HostListener('window:afterprint')
  onAfterPrint(): void {
    this.printing = false;
  }

  @HostListener('window:export-beforeprint')
  onExportBeforePrint(): void {
    this.printing = true;
  }

  @HostListener('window:export-afterprint')
  onExportAfterPrint(): void {
    this.printing = false;
  }

  toggleOpen(): void {
    this.props = { ...this.props, open: !this.open };
    // this.propsChange.emit(this.props);
  }

  get markerClass(): string {
    return this.open ? 'marker rotate-marker' : 'marker';
  }

  get showContent(): boolean {
    return !this.printing || !this.printShowAll;
  }
} 