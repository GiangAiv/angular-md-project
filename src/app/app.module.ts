import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { MarkdownEditorComponent } from './components/markdown-editor/markdown-editor.component';
import { MarkdownViewerComponent } from './components/markdown-viewer/markdown-viewer.component';
import { MarkdownFormComponent } from './components/markdown-form/markdown-form.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { UploadModalComponent } from './upload-modal/upload-modal/upload-modal.component';
import { MarkdownListComponent } from './components/markdown-list/markdown-list.component';
import { MarkdownRenderModule } from './components/markdown/markdown.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { MarkdownModule } from 'ngx-markdown';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${year}-${this._to2digit(month)}-${this._to2digit(day)}`;
    }
    return date.toDateString();
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

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
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    MarkdownRenderModule,
    DashboardModule,
    MarkdownModule.forRoot(),
    MatNativeDateModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
