import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type AlertStatus = 'base' | 'info' | 'positive' | 'warning' | 'negative';

const DEPRECATED_STATUS_MAP = {
  default: 'base',
  danger: 'negative',
  success: 'positive'
} as const;

const isDeprecatedStatus = (input: string): input is keyof typeof DEPRECATED_STATUS_MAP => {
  return Object.keys(DEPRECATED_STATUS_MAP).includes(input);
};

const checkDeprecatedStatus = (input: string): AlertStatus => {
  if (isDeprecatedStatus(input)) {
    console.warn(
      `[Alert] The status "${input}" is deprecated. Please use "${DEPRECATED_STATUS_MAP[input]}" instead.`
    );
    return DEPRECATED_STATUS_MAP[input] as AlertStatus;
  }
  return input as AlertStatus;
};

const classMap: Record<AlertStatus, string> = {
  base: 'border-gray-200 bg-gray-50 text-gray-800',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
  negative: 'border-red-200 bg-red-50 text-red-800',
  positive: 'border-green-200 bg-green-50 text-green-800',
  warning: 'border-yellow-200 bg-yellow-50 text-yellow-800'
};

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AlertComponent {
  @Input() status: AlertStatus = 'base';

  get alertClasses(): string {
    const checkedStatus = checkDeprecatedStatus(this.status);
    return `alert ${classMap[checkedStatus]} border px-3 py-2 mb-4 rounded-sm`;
  }
} 