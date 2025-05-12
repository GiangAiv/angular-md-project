// @ts-nocheck
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Routes} from '@angular/router';
import {NgDocDemoAssets, NgDocPageComponent, NgDocRootPage} from '@ng-doc/app';
import {isRoute, NgDocPage, NgDocPageType} from '@ng-doc/core';
import pageEntity from 'src/app/docs/data-components/data-table/ng-doc.page';
import {PLAYGROUND_COMPONENTS, PLAYGROUND_PROVIDERS} from './playgrounds';
import demoAssets from './demo-assets';

const pageContent: string = `<h1 id="datatable" class="ngde">DataTable<a title="Link to heading" class="ng-doc-header-link ngde" href="/data-components/data-table#datatable"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><p class="ngde">The DataTable component is a powerful and flexible table component that provides features like sorting, pagination, custom styling, and more. It's built with Tailwind CSS for a modern and responsive design.</p><h2 id="importing" class="ngde">Importing<a title="Link to heading" class="ng-doc-header-link ngde" href="/data-components/data-table#importing"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><ng-doc-blockquote type="note" class="ngde"><p class="ngde">Component can be imported from the root of <code class="ngde">my-lib</code></p></ng-doc-blockquote><p class="ngde">To use the <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/my-lib/classes/DataTableComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">DataTableComponent</a></code> in your project, you need to import it from our library:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="app.module.ts" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/DataTableComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">DataTableComponent</a></span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'my-lib'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-meta ngde">@NgModule</span>(\{
</span><span class="line ngde">  <span class="hljs-attr ngde">imports</span>: [<span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/DataTableComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">DataTableComponent</a></span>]
</span><span class="line ngde">\})
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">class</span> <span class="hljs-title class_ ngde">AppModule</span> \{\}
</span></code></pre><h2 id="basic-usage" class="ngde">Basic Usage<a title="Link to heading" class="ng-doc-header-link ngde" href="/data-components/data-table#basic-usage"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">To create a basic table using our library, you can use the following code:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde">&#x3C;app-data-table
</span><span class="line ngde">  [columns]=<span class="hljs-string ngde">"[</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \{ key: 'name', label: 'Name' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \{ key: 'age', label: 'Age' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \{ key: 'email', label: 'Email' \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">  ]"</span>
</span><span class="line ngde">  [data]=<span class="hljs-string ngde">"[</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \{ name: 'John Doe', age: 30, email: 'john@example.com' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \{ name: 'Jane Smith', age: 25, email: 'jane@example.com' \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">  ]"</span>
</span><span class="line ngde">  title=<span class="hljs-string ngde">"Basic Table Example"</span>
</span><span class="line ngde">>&#x3C;/app-data-table>
</span></code></pre><ng-doc-demo componentname="DataTableDemoComponent" indexable="false" class="ngde"><div id="options" class="ngde">\{\}</div></ng-doc-demo><h2 id="features" class="ngde">Features<a title="Link to heading" class="ng-doc-header-link ngde" href="/data-components/data-table#features"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">The component supports various features:</p><ul class="ngde"><li class="ngde">Sortable columns</li><li class="ngde">Pagination</li><li class="ngde">Custom cell templates</li><li class="ngde">Downloadable data</li><li class="ngde">Fullscreen mode</li><li class="ngde">Custom styling</li><li class="ngde">Responsive design</li><li class="ngde">Row striping</li><li class="ngde">Sticky headers</li></ul><h2 id="sorting" class="ngde">Sorting<a title="Link to heading" class="ng-doc-header-link ngde" href="/data-components/data-table#sorting"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">Enable sorting on columns by setting the <code class="ngde">sortable</code> property:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde">&#x3C;app-data-table
</span><span class="line ngde">  [columns]=<span class="hljs-string ngde">"[</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \{ key: 'name', label: 'Name', sortable: true \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \{ key: 'age', label: 'Age', sortable: true \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">  ]"</span>
</span><span class="line ngde">  [data]=<span class="hljs-string ngde">"data"</span>
</span><span class="line ngde">  (onSort)=<span class="hljs-string ngde">"handleSort($event)"</span>
</span><span class="line ngde">>&#x3C;/app-data-table>
</span></code></pre><ng-doc-demo componentname="DataTableDemoComponent" indexable="false" class="ngde"><div id="options" class="ngde">\{\}</div></ng-doc-demo><h2 id="pagination" class="ngde">Pagination<a title="Link to heading" class="ng-doc-header-link ngde" href="/data-components/data-table#pagination"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">Add pagination to your table:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde">&#x3C;app-data-table
</span><span class="line ngde">  [columns]=<span class="hljs-string ngde">"columns"</span>
</span><span class="line ngde">  [data]=<span class="hljs-string ngde">"data"</span>
</span><span class="line ngde">  [currentPage]=<span class="hljs-string ngde">"currentPage"</span>
</span><span class="line ngde">  [pageSize]=<span class="hljs-string ngde">"pageSize"</span>
</span><span class="line ngde">  [totalItems]=<span class="hljs-string ngde">"totalItems"</span>
</span><span class="line ngde">  (onPageChange)=<span class="hljs-string ngde">"handlePageChange($event)"</span>
</span><span class="line ngde">>&#x3C;/app-data-table>
</span></code></pre><ng-doc-demo componentname="DataTableDemoComponent" indexable="false" class="ngde"><div id="options" class="ngde">\{\}</div></ng-doc-demo><h2 id="custom-styling" class="ngde">Custom Styling<a title="Link to heading" class="ng-doc-header-link ngde" href="/data-components/data-table#custom-styling"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">Customize the appearance of your table using Tailwind CSS classes:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde">&#x3C;app-data-table
</span><span class="line ngde">  [columns]=<span class="hljs-string ngde">"[</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \{ </span>
</span><span class="line ngde"><span class="hljs-string ngde">      key: 'name', </span>
</span><span class="line ngde"><span class="hljs-string ngde">      label: 'Name',</span>
</span><span class="line ngde"><span class="hljs-string ngde">      headerClass: 'bg-blue-50',</span>
</span><span class="line ngde"><span class="hljs-string ngde">      cellClass: 'font-medium text-blue-600'</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \{ </span>
</span><span class="line ngde"><span class="hljs-string ngde">      key: 'age', </span>
</span><span class="line ngde"><span class="hljs-string ngde">      label: 'Age',</span>
</span><span class="line ngde"><span class="hljs-string ngde">      headerClass: 'bg-green-50',</span>
</span><span class="line ngde"><span class="hljs-string ngde">      cellClass: 'text-green-600'</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">  ]"</span>
</span><span class="line ngde">  [data]=<span class="hljs-string ngde">"data"</span>
</span><span class="line ngde">  [downloadable]=<span class="hljs-string ngde">"true"</span>
</span><span class="line ngde">  [fullscreen]=<span class="hljs-string ngde">"true"</span>
</span><span class="line ngde">>&#x3C;/app-data-table>
</span></code></pre><ng-doc-demo componentname="DataTableDemoComponent" indexable="false" class="ngde"><div id="options" class="ngde">\{\}</div></ng-doc-demo><h2 id="properties" class="ngde">Properties<a title="Link to heading" class="ng-doc-header-link ngde" href="/data-components/data-table#properties"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><table class="ngde"><thead class="ngde"><tr class="ngde"><th class="ngde">Property</th><th class="ngde">Type</th><th class="ngde">Default</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde">title</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Table title</td></tr><tr class="ngde"><td class="ngde">columns</td><td class="ngde">any[]</td><td class="ngde">[]</td><td class="ngde">Array of column definitions</td></tr><tr class="ngde"><td class="ngde">data</td><td class="ngde">any[]</td><td class="ngde">[]</td><td class="ngde">Array of data objects</td></tr><tr class="ngde"><td class="ngde">downloadable</td><td class="ngde">boolean</td><td class="ngde">false</td><td class="ngde">Enable data download</td></tr><tr class="ngde"><td class="ngde">fullscreen</td><td class="ngde">boolean</td><td class="ngde">false</td><td class="ngde">Enable fullscreen mode</td></tr><tr class="ngde"><td class="ngde">showFooter</td><td class="ngde">boolean</td><td class="ngde">true</td><td class="ngde">Show pagination footer</td></tr><tr class="ngde"><td class="ngde">currentPage</td><td class="ngde">number</td><td class="ngde">1</td><td class="ngde">Current page number</td></tr><tr class="ngde"><td class="ngde">pageSize</td><td class="ngde">number</td><td class="ngde">10</td><td class="ngde">Number of items per page</td></tr><tr class="ngde"><td class="ngde">totalItems</td><td class="ngde">number</td><td class="ngde">0</td><td class="ngde">Total number of items</td></tr></tbody></table><h2 id="column-properties" class="ngde">Column Properties<a title="Link to heading" class="ng-doc-header-link ngde" href="/data-components/data-table#column-properties"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><table class="ngde"><thead class="ngde"><tr class="ngde"><th class="ngde">Property</th><th class="ngde">Type</th><th class="ngde">Default</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde">key</td><td class="ngde">string</td><td class="ngde">required</td><td class="ngde">Field name in data object</td></tr><tr class="ngde"><td class="ngde">label</td><td class="ngde">string</td><td class="ngde">required</td><td class="ngde">Column header text</td></tr><tr class="ngde"><td class="ngde">width</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Column width</td></tr><tr class="ngde"><td class="ngde">minWidth</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Minimum column width</td></tr><tr class="ngde"><td class="ngde">sortable</td><td class="ngde">boolean</td><td class="ngde">false</td><td class="ngde">Enable column sorting</td></tr><tr class="ngde"><td class="ngde">headerClass</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Custom header classes</td></tr><tr class="ngde"><td class="ngde">cellClass</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Custom cell classes</td></tr><tr class="ngde"><td class="ngde">template</td><td class="ngde">TemplateRef</td><td class="ngde">undefined</td><td class="ngde">Custom cell template</td></tr></tbody></table><h2 id="events" class="ngde">Events<a title="Link to heading" class="ng-doc-header-link ngde" href="/data-components/data-table#events"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><table class="ngde"><thead class="ngde"><tr class="ngde"><th class="ngde">Event</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde">onDownload</td><td class="ngde">void</td><td class="ngde">Emitted when download button is clicked</td></tr><tr class="ngde"><td class="ngde">onFullscreen</td><td class="ngde">void</td><td class="ngde">Emitted when fullscreen button is clicked</td></tr><tr class="ngde"><td class="ngde">onSort</td><td class="ngde">any</td><td class="ngde">Emitted when column is sorted</td></tr><tr class="ngde"><td class="ngde">onPageChange</td><td class="ngde">number</td><td class="ngde">Emitted when page is changed</td></tr></tbody></table><div id="end" class="ngde"></div>`


@Component({
    selector: 'ng-doc-page-data-components-data-table',
    standalone: true,
    template: `<ng-doc-page></ng-doc-page>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgDocPageComponent,
        ...PLAYGROUND_COMPONENTS,
    ],
    providers: [
        {provide: NgDocRootPage, useExisting: DynamicComponent},
        PLAYGROUND_PROVIDERS,
        (pageEntity.providers ?? []),
    ],
})
export class DynamicComponent extends NgDocRootPage {
    readonly routePrefix: string = '';
    readonly pageType: NgDocPageType = 'guide';
    readonly pageContent: string = pageContent;readonly page?: NgDocPage = pageEntity;
    readonly demoAssets: NgDocDemoAssets = demoAssets;

    constructor() {
        super();
    }
}

const routes: Routes = [{
    ...(isRoute(pageEntity.route) ? pageEntity.route : {}),
    path: '',
    component: DynamicComponent,
    title: `DataTable`,
}]

export default routes;

