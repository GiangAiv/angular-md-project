import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../base-component';

export type AlertStatus = 'base' | 'info' | 'positive' | 'warning' | 'negative';

interface AlertProps {
  status?: AlertStatus;
  class?: string;
}

const DEPRECATED_STATUS_MAP = {
  default: 'base',
  danger: 'negative',
  success: 'positive'
} as const;

const isDeprecatedStatus = (input: string): boolean => 
  Object.keys(DEPRECATED_STATUS_MAP).includes(input);

const checkDeprecatedStatus = (input: string): AlertStatus => {
  if (isDeprecatedStatus(input)) {
    console.warn(
      `[Alert] The status "${input}" is deprecated. Please use "${DEPRECATED_STATUS_MAP[input as keyof typeof DEPRECATED_STATUS_MAP]}" instead.`
    );
    return DEPRECATED_STATUS_MAP[input as keyof typeof DEPRECATED_STATUS_MAP] as AlertStatus;
  }
  return input as AlertStatus;
};

const classMap: Record<AlertStatus, string> = {
  base: 'border-base-content/50 bg-base-content/10',
  info: 'border-info/50 bg-info/10 text-info',
  negative: 'border-negative/50 bg-negative/10 text-negative',
  positive: 'border-positive/50 bg-positive/10 text-positive',
  warning: 'border-warning/50 bg-warning/10 text-warning'
};

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent extends BaseComponent<AlertProps> {
  @Input() set status(value: string) {
    this._status = checkDeprecatedStatus(value || 'base');
  }
  get status(): AlertStatus {
    return this._status;
  }
  private _status: AlertStatus = 'base';

  get alertClass(): string {
    return `alert ${classMap[this.status]} border px-3 py-2 mb-4 rounded-sm ${this.props?.class || ''}`;
  }
} 