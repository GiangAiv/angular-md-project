import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { MarkdownEditorComponent } from './components/markdown-editor/markdown-editor.component';
import { MarkdownViewerComponent } from './components/markdown-viewer/markdown-viewer.component';
import { MarkdownFormComponent } from './components/markdown-form/markdown-form.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { UploadModalComponent } from './upload-modal/upload-modal/upload-modal.component';
import { MarkdownListComponent } from './components/markdown-list/markdown-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MarkdownListComponent,
    MarkdownEditorComponent,
    MarkdownViewerComponent,
    MarkdownFormComponent,
    FileUploadComponent,
    UploadModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
