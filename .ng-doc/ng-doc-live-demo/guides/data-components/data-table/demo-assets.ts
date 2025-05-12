// @ts-nocheck
import {NgDocDemoAssets} from '@ng-doc/app';

export const demoAssets: NgDocDemoAssets = {
DataTableDemoComponent: [
    {
        title: 'TypeScript',
        code: `<pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde">Component</span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'@angular/core'</span>;
</span><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/TableColumnComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">TableColumnComponent</a></span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'../../../../code/data-table/column.component'</span>;
</span><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/DataTableComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">DataTableComponent</a></span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'../../../../code/data-table/data-table.component'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-meta ngde">@Component</span>(\{
</span><span class="line ngde">  <span class="hljs-attr ngde">selector</span>: <span class="hljs-string ngde">'app-data-table-demo'</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">standalone</span>: <span class="hljs-literal ngde">true</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">imports</span>: [<span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/DataTableComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">DataTableComponent</a></span>, <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/TableColumnComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">TableColumnComponent</a></span>],
</span><span class="line ngde">  <span class="hljs-attr ngde">template</span>: <span class="hljs-string ngde">\`</span>
</span><span class="line ngde"><span class="hljs-string ngde">    &#x3C;div class="space-y-8"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;!-- Basic Table --></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;h3 class="text-lg font-semibold mb-4">Basic Table&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-data-table</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [columns]="basicColumns"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [data]="basicData"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          title="Basic Table Example"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        >&#x3C;/app-data-table></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;!-- Sortable Table --></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;h3 class="text-lg font-semibold mb-4">Sortable Table&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-data-table</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [columns]="sortableColumns"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [data]="sortableData"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          title="Sortable Table Example"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          (onSort)="handleSort($event)"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        >&#x3C;/app-data-table></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;!-- Paginated Table --></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;h3 class="text-lg font-semibold mb-4">Paginated Table&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-data-table</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [columns]="basicColumns"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [data]="paginatedData"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [currentPage]="currentPage"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [pageSize]="pageSize"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [totalItems]="totalItems"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          title="Paginated Table Example"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          (onPageChange)="handlePageChange($event)"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        >&#x3C;/app-data-table></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;!-- Custom Styled Table --></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;h3 class="text-lg font-semibold mb-4">Custom Styled Table&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-data-table</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [columns]="styledColumns"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [data]="styledData"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          title="Custom Styled Table Example"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [downloadable]="true"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [fullscreen]="true"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        >&#x3C;/app-data-table></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde">    &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde">  \`</span>
</span><span class="line ngde">\})
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">class</span> <span class="hljs-title class_ ngde">DataTableDemoComponent</span> \{
</span><span class="line ngde">  <span class="hljs-comment ngde">// Basic Table</span>
</span><span class="line ngde">  basicColumns = [
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">key</span>: <span class="hljs-string ngde">'name'</span>, <span class="hljs-attr ngde">label</span>: <span class="hljs-string ngde">'Name'</span> \},
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">key</span>: <span class="hljs-string ngde">'age'</span>, <span class="hljs-attr ngde">label</span>: <span class="hljs-string ngde">'Age'</span> \},
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">key</span>: <span class="hljs-string ngde">'email'</span>, <span class="hljs-attr ngde">label</span>: <span class="hljs-string ngde">'Email'</span> \}
</span><span class="line ngde">  ];
</span><span class="line ngde">
</span><span class="line ngde">  basicData = [
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">name</span>: <span class="hljs-string ngde">'John Doe'</span>, <span class="hljs-attr ngde">age</span>: <span class="hljs-number ngde">30</span>, <span class="hljs-attr ngde">email</span>: <span class="hljs-string ngde">'john@example.com'</span> \},
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">name</span>: <span class="hljs-string ngde">'Jane Smith'</span>, <span class="hljs-attr ngde">age</span>: <span class="hljs-number ngde">25</span>, <span class="hljs-attr ngde">email</span>: <span class="hljs-string ngde">'jane@example.com'</span> \},
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">name</span>: <span class="hljs-string ngde">'Bob Johnson'</span>, <span class="hljs-attr ngde">age</span>: <span class="hljs-number ngde">35</span>, <span class="hljs-attr ngde">email</span>: <span class="hljs-string ngde">'bob@example.com'</span> \}
</span><span class="line ngde">  ];
</span><span class="line ngde">
</span><span class="line ngde">  <span class="hljs-comment ngde">// Sortable Table</span>
</span><span class="line ngde">  sortableColumns = [
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">key</span>: <span class="hljs-string ngde">'name'</span>, <span class="hljs-attr ngde">label</span>: <span class="hljs-string ngde">'Name'</span>, <span class="hljs-attr ngde">sortable</span>: <span class="hljs-literal ngde">true</span> \},
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">key</span>: <span class="hljs-string ngde">'age'</span>, <span class="hljs-attr ngde">label</span>: <span class="hljs-string ngde">'Age'</span>, <span class="hljs-attr ngde">sortable</span>: <span class="hljs-literal ngde">true</span> \},
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">key</span>: <span class="hljs-string ngde">'email'</span>, <span class="hljs-attr ngde">label</span>: <span class="hljs-string ngde">'Email'</span>, <span class="hljs-attr ngde">sortable</span>: <span class="hljs-literal ngde">true</span> \}
</span><span class="line ngde">  ];
</span><span class="line ngde">
</span><span class="line ngde">  sortableData = [
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">name</span>: <span class="hljs-string ngde">'John Doe'</span>, <span class="hljs-attr ngde">age</span>: <span class="hljs-number ngde">30</span>, <span class="hljs-attr ngde">email</span>: <span class="hljs-string ngde">'john@example.com'</span> \},
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">name</span>: <span class="hljs-string ngde">'Jane Smith'</span>, <span class="hljs-attr ngde">age</span>: <span class="hljs-number ngde">25</span>, <span class="hljs-attr ngde">email</span>: <span class="hljs-string ngde">'jane@example.com'</span> \},
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">name</span>: <span class="hljs-string ngde">'Bob Johnson'</span>, <span class="hljs-attr ngde">age</span>: <span class="hljs-number ngde">35</span>, <span class="hljs-attr ngde">email</span>: <span class="hljs-string ngde">'bob@example.com'</span> \}
</span><span class="line ngde">  ];
</span><span class="line ngde">
</span><span class="line ngde">  <span class="hljs-comment ngde">// Paginated Table</span>
</span><span class="line ngde">  currentPage = <span class="hljs-number ngde">1</span>;
</span><span class="line ngde">  pageSize = <span class="hljs-number ngde">2</span>;
</span><span class="line ngde">  totalItems = <span class="hljs-number ngde">6</span>;
</span><span class="line ngde">
</span><span class="line ngde">  paginatedData = [
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">name</span>: <span class="hljs-string ngde">'John Doe'</span>, <span class="hljs-attr ngde">age</span>: <span class="hljs-number ngde">30</span>, <span class="hljs-attr ngde">email</span>: <span class="hljs-string ngde">'john@example.com'</span> \},
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">name</span>: <span class="hljs-string ngde">'Jane Smith'</span>, <span class="hljs-attr ngde">age</span>: <span class="hljs-number ngde">25</span>, <span class="hljs-attr ngde">email</span>: <span class="hljs-string ngde">'jane@example.com'</span> \},
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">name</span>: <span class="hljs-string ngde">'Bob Johnson'</span>, <span class="hljs-attr ngde">age</span>: <span class="hljs-number ngde">35</span>, <span class="hljs-attr ngde">email</span>: <span class="hljs-string ngde">'bob@example.com'</span> \},
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">name</span>: <span class="hljs-string ngde">'Alice Brown'</span>, <span class="hljs-attr ngde">age</span>: <span class="hljs-number ngde">28</span>, <span class="hljs-attr ngde">email</span>: <span class="hljs-string ngde">'alice@example.com'</span> \},
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">name</span>: <span class="hljs-string ngde">'Charlie Wilson'</span>, <span class="hljs-attr ngde">age</span>: <span class="hljs-number ngde">32</span>, <span class="hljs-attr ngde">email</span>: <span class="hljs-string ngde">'charlie@example.com'</span> \},
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">name</span>: <span class="hljs-string ngde">'Diana Miller'</span>, <span class="hljs-attr ngde">age</span>: <span class="hljs-number ngde">27</span>, <span class="hljs-attr ngde">email</span>: <span class="hljs-string ngde">'diana@example.com'</span> \}
</span><span class="line ngde">  ];
</span><span class="line ngde">
</span><span class="line ngde">  <span class="hljs-comment ngde">// Styled Table</span>
</span><span class="line ngde">  styledColumns = [
</span><span class="line ngde">    \{ 
</span><span class="line ngde">      <span class="hljs-attr ngde">key</span>: <span class="hljs-string ngde">'name'</span>, 
</span><span class="line ngde">      <span class="hljs-attr ngde">label</span>: <span class="hljs-string ngde">'Name'</span>,
</span><span class="line ngde">      <span class="hljs-attr ngde">headerClass</span>: <span class="hljs-string ngde">'bg-blue-50'</span>,
</span><span class="line ngde">      <span class="hljs-attr ngde">cellClass</span>: <span class="hljs-string ngde">'font-medium text-blue-600'</span>
</span><span class="line ngde">    \},
</span><span class="line ngde">    \{ 
</span><span class="line ngde">      <span class="hljs-attr ngde">key</span>: <span class="hljs-string ngde">'age'</span>, 
</span><span class="line ngde">      <span class="hljs-attr ngde">label</span>: <span class="hljs-string ngde">'Age'</span>,
</span><span class="line ngde">      <span class="hljs-attr ngde">headerClass</span>: <span class="hljs-string ngde">'bg-green-50'</span>,
</span><span class="line ngde">      <span class="hljs-attr ngde">cellClass</span>: <span class="hljs-string ngde">'text-green-600'</span>
</span><span class="line ngde">    \},
</span><span class="line ngde">    \{ 
</span><span class="line ngde">      <span class="hljs-attr ngde">key</span>: <span class="hljs-string ngde">'email'</span>, 
</span><span class="line ngde">      <span class="hljs-attr ngde">label</span>: <span class="hljs-string ngde">'Email'</span>,
</span><span class="line ngde">      <span class="hljs-attr ngde">headerClass</span>: <span class="hljs-string ngde">'bg-purple-50'</span>,
</span><span class="line ngde">      <span class="hljs-attr ngde">cellClass</span>: <span class="hljs-string ngde">'text-purple-600'</span>
</span><span class="line ngde">    \}
</span><span class="line ngde">  ];
</span><span class="line ngde">
</span><span class="line ngde">  styledData = [
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">name</span>: <span class="hljs-string ngde">'John Doe'</span>, <span class="hljs-attr ngde">age</span>: <span class="hljs-number ngde">30</span>, <span class="hljs-attr ngde">email</span>: <span class="hljs-string ngde">'john@example.com'</span> \},
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">name</span>: <span class="hljs-string ngde">'Jane Smith'</span>, <span class="hljs-attr ngde">age</span>: <span class="hljs-number ngde">25</span>, <span class="hljs-attr ngde">email</span>: <span class="hljs-string ngde">'jane@example.com'</span> \},
</span><span class="line ngde">    \{ <span class="hljs-attr ngde">name</span>: <span class="hljs-string ngde">'Bob Johnson'</span>, <span class="hljs-attr ngde">age</span>: <span class="hljs-number ngde">35</span>, <span class="hljs-attr ngde">email</span>: <span class="hljs-string ngde">'bob@example.com'</span> \}
</span><span class="line ngde">  ];
</span><span class="line ngde">
</span><span class="line ngde">  <span class="hljs-title function_ ngde">handleSort</span>(<span class="hljs-attr ngde">column</span>: <span class="hljs-built_in ngde">any</span>): <span class="hljs-built_in ngde">void</span> \{
</span><span class="line ngde">    <span class="hljs-variable language_ ngde">console</span>.<span class="hljs-title function_ ngde">log</span>(<span class="hljs-string ngde">'Sorting by:'</span>, column.<span class="hljs-property ngde">key</span>);
</span><span class="line ngde">    <span class="hljs-comment ngde">// Implement sorting logic here</span>
</span><span class="line ngde">  \}
</span><span class="line ngde">
</span><span class="line ngde">  <span class="hljs-title function_ ngde">handlePageChange</span>(<span class="hljs-attr ngde">page</span>: <span class="hljs-built_in ngde">number</span>): <span class="hljs-built_in ngde">void</span> \{
</span><span class="line ngde">    <span class="hljs-variable language_ ngde">console</span>.<span class="hljs-title function_ ngde">log</span>(<span class="hljs-string ngde">'Page changed to:'</span>, page);
</span><span class="line ngde">    <span class="hljs-comment ngde">// Implement pagination logic here</span>
</span><span class="line ngde">  \}
</span><span class="line ngde">\}
</span></code></pre>`,
    },
],
}

export default demoAssets;
