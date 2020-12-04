import { Injectable, TemplateRef } from '@angular/core';

@Injectable()
export class TemplateService {
  private templates: Map<string, TemplateRef<any>>;

  constructor() {
    this.templates = new Map();
  }

  get<T>(templateName: string): TemplateRef<T> {
    return this.templates.get(templateName);
  }

  has(templateName: string): boolean {
    return this.templates.has(templateName);
  }

  put<T>(templateName: string, templateRef: TemplateRef<T>) {
    this.templates.set(templateName, templateRef);
  }
}
