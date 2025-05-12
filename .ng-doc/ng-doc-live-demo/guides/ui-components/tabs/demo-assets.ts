// @ts-nocheck
import {NgDocDemoAssets} from '@ng-doc/app';

export const demoAssets: NgDocDemoAssets = {
TabsDemoComponent: [
    {
        title: 'TypeScript',
        code: `<pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde">Component</span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'@angular/core'</span>;
</span><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/TabComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">TabComponent</a></span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'src/app/code/tabs/tab/tab.component'</span>;
</span><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/TabsComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">TabsComponent</a></span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'src/app/code/tabs/tabs.component'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-meta ngde">@Component</span>(\{
</span><span class="line ngde">  <span class="hljs-attr ngde">selector</span>: <span class="hljs-string ngde">'app-tabs-demo'</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">template</span>: <span class="hljs-string ngde">\`</span>
</span><span class="line ngde"><span class="hljs-string ngde">    &#x3C;div class="space-y-4"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;app-tabs [activeTab]="activeTabIndex" (tabChange)="onTabChange($event)"></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-tab title="Overview"></span>
</span><span class="line ngde"><span class="hljs-string ngde">          &#x3C;div class="p-4"></span>
</span><span class="line ngde"><span class="hljs-string ngde">            &#x3C;h3 class="text-lg font-semibold mb-2">Overview&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">            &#x3C;p>This is the overview tab content.&#x3C;/p></span>
</span><span class="line ngde"><span class="hljs-string ngde">          &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;/app-tab></span>
</span><span class="line ngde"><span class="hljs-string ngde">        </span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-tab title="Details"></span>
</span><span class="line ngde"><span class="hljs-string ngde">          &#x3C;div class="p-4"></span>
</span><span class="line ngde"><span class="hljs-string ngde">            &#x3C;h3 class="text-lg font-semibold mb-2">Details&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">            &#x3C;p>This is the details tab content.&#x3C;/p></span>
</span><span class="line ngde"><span class="hljs-string ngde">          &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;/app-tab></span>
</span><span class="line ngde"><span class="hljs-string ngde">        </span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-tab title="Settings"></span>
</span><span class="line ngde"><span class="hljs-string ngde">          &#x3C;div class="p-4"></span>
</span><span class="line ngde"><span class="hljs-string ngde">            &#x3C;h3 class="text-lg font-semibold mb-2">Settings&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">            &#x3C;p>This is the settings tab content.&#x3C;/p></span>
</span><span class="line ngde"><span class="hljs-string ngde">          &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;/app-tab></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/app-tabs></span>
</span><span class="line ngde"><span class="hljs-string ngde">    &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde">  \`</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">standalone</span>: <span class="hljs-literal ngde">true</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">imports</span>: [<span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/TabsComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">TabsComponent</a></span>, <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/TabComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">TabComponent</a></span>]
</span><span class="line ngde">\})
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">class</span> <span class="hljs-title class_ ngde">TabsDemoComponent</span> \{
</span><span class="line ngde">  activeTabIndex = <span class="hljs-number ngde">0</span>;
</span><span class="line ngde">
</span><span class="line ngde">  <span class="hljs-title function_ ngde">onTabChange</span>(<span class="hljs-params ngde">index: <span class="hljs-built_in ngde">number</span></span>) \{
</span><span class="line ngde">    <span class="hljs-variable language_ ngde">this</span>.<span class="hljs-property ngde">activeTabIndex</span> = index;
</span><span class="line ngde">  \}
</span><span class="line ngde">\}
</span></code></pre>`,
    },
],
}

export default demoAssets;
