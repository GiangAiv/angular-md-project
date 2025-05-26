import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  template: ''
})
export class BaseComponent<T> {
  @Input() props?: T;
  @Output() propsChange = new EventEmitter<T>();

  protected updateProps(newProps: Partial<T>): void {
    this.props = { ...this.props, ...newProps } as T;
    this.propsChange.emit(this.props);
  }
} 