import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, Input } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { toBoolean } from '../accordion/util';

interface DetailsProps {
  title?: string;
  open?: boolean;
  printShowAll?: boolean;
  class?: string;
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
  @Input() set title(value: string) {
    this._title = value || 'Details';
  }
  get title(): string {
    return this._title;
  }
  private _title = 'Details';

  @Input() set open(value: string | boolean) {
    this._open = toBoolean(value);
  }
  get open(): boolean {
    return this._open;
  }
  private _open = false;

  @Input() set printShowAll(value: string | boolean) {
    this._printShowAll = toBoolean(value);
  }
  get printShowAll(): boolean {
    return this._printShowAll;
  }
  private _printShowAll = true;

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
    this._open = !this._open;
  }

  get markerClass(): string {
    return this.open ? 'marker rotate-marker' : 'marker';
  }

  get showContent(): boolean {
    return !this.printing || !this.printShowAll;
  }
} 