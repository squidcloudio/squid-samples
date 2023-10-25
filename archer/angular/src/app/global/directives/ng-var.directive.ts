import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface NgVarContext<T> {
  ngVar: T;
  $implicit: T;
}

@Directive({
  selector: '[ngVar]',
})
export class NgVarDirective<T> {
  static ngTemplateGuard_ngVar: 'binding';
  private context: NgVarContext<T | null> = { ngVar: null, $implicit: null };
  private hasView = false;

  // eslint-disable-next-line no-unused-vars
  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<NgVarContext<T>>,
  ) {}

  @Input()
  set ngVar(value: T) {
    this.context.$implicit = this.context.ngVar = value;
    if (!this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef, this.context);
      this.hasView = true;
    }
  }

  static ngTemplateContextGuard<T>(
    dir: NgVarDirective<T>,
    ctx: any,
  ): ctx is NgVarContext<Exclude<T, false | 0 | '' | null | undefined>> {
    return true;
  }
}
