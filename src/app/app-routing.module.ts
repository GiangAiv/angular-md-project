import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownListComponent } from './components/markdown-list/markdown-list.component';
import { MarkdownEditorComponent } from './components/markdown-editor/markdown-editor.component';
import { MarkdownViewerComponent } from './components/markdown-viewer/markdown-viewer.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

const routes: Routes = [
  { path: '', component: MarkdownListComponent },
  { path: 'create', component: MarkdownEditorComponent },
  { path: 'edit/:id', component: MarkdownEditorComponent },
  { path: 'view/:id', component: MarkdownViewerComponent },
  { path: '**', redirectTo: '' },
  { path: 'upload', component: FileUploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
