import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../base-component';

export type AlertStatus = 'base' | 'info' | 'positive' | 'warning' | 'negative';

interface AlertProps {
  status?: AlertStatus;
  class?: string;
  children?: string;
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
  base: 'border-gray-200 bg-gray-50 text-gray-600',
  info: 'border-blue-200 bg-blue-50 text-blue-600',
  negative: 'border-red-200 bg-red-50 text-red-600',
  positive: 'border-green-200 bg-green-50 text-green-600',
  warning: 'border-yellow-200 bg-yellow-50 text-yellow-600'
};

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent extends BaseComponent<AlertProps> {
  get status(): AlertStatus {
    const value = this.props?.status || 'base';
    return checkDeprecatedStatus(value);
  }

  get alertClass(): string {
    return `alert ${classMap[this.status]} border px-3 py-2 mb-4 rounded-sm ${this.props?.class || ''}`;
  }
} 