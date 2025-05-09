import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdRendererComponent } from './md-renderer/md-renderer.component';
import { ComponentRendererComponent } from './component-renderer/component-renderer.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [MdRendererComponent, ComponentRendererComponent],
  imports: [CommonModule, MarkdownModule.forChild()],
  exports: [MdRendererComponent, ComponentRendererComponent],
})
export class MarkdownRenderModule {}
