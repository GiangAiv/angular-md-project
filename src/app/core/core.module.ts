import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, MarkdownModule.forRoot()],
  exports: [MarkdownModule],
})
export class CoreModule {}
