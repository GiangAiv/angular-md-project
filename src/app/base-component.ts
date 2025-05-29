import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  template: ''
})
export class BaseComponent<T> {
  @Input() props?: T;
  @Output() propsChange = new EventEmitter<T>();
} 