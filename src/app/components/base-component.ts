import { Directive, Input } from '@angular/core';

@Directive()
export abstract class BaseComponent<T = any>  {
  @Input() props: T = {} as T;

}
