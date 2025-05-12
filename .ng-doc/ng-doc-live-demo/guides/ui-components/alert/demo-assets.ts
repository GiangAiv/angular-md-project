// @ts-nocheck
import {NgDocDemoAssets} from '@ng-doc/app';

export const demoAssets: NgDocDemoAssets = {
AlertDemoComponent: [
    {
        title: 'TypeScript',
        code: `<pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde">Component</span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'@angular/core'</span>;
</span><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/AlertComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">AlertComponent</a></span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'src/app/code/alert/alert.component'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-meta ngde">@Component</span>(\{
</span><span class="line ngde">  <span class="hljs-attr ngde">selector</span>: <span class="hljs-string ngde">'app-alert-demo'</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">template</span>: <span class="hljs-string ngde">\`</span>
</span><span class="line ngde"><span class="hljs-string ngde">    &#x3C;div class="space-y-4"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;app-alert status="info"></span>
</span><span class="line ngde"><span class="hljs-string ngde">        This is an informational alert message.</span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/app-alert></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;app-alert status="positive"></span>
</span><span class="line ngde"><span class="hljs-string ngde">        Operation completed successfully!</span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/app-alert></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;app-alert status="warning"></span>
</span><span class="line ngde"><span class="hljs-string ngde">        Please review your changes before proceeding.</span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/app-alert></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;app-alert status="negative"></span>
</span><span class="line ngde"><span class="hljs-string ngde">        An error occurred while processing your request.</span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/app-alert></span>
</span><span class="line ngde"><span class="hljs-string ngde">    &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde">  \`</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">standalone</span>: <span class="hljs-literal ngde">true</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">imports</span>: [<span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/AlertComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">AlertComponent</a></span>]
</span><span class="line ngde">\})
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">class</span> <span class="hljs-title class_ ngde">AlertDemoComponent</span> \{\}
</span></code></pre>`,
    },
],
}

export default demoAssets;
