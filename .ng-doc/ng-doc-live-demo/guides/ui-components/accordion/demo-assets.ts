// @ts-nocheck
import {NgDocDemoAssets} from '@ng-doc/app';

export const demoAssets: NgDocDemoAssets = {
BasicAccordionDemoComponent: [
    {
        title: 'TypeScript',
        code: `<pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde">Component</span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'@angular/core'</span>;
</span><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/AccordionItemComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">AccordionItemComponent</a></span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'src/app/code/accordion/accordion-item.component'</span>;
</span><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/AccordionComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">AccordionComponent</a></span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'src/app/code/accordion/accordion.component'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-meta ngde">@Component</span>(\{
</span><span class="line ngde">  <span class="hljs-attr ngde">selector</span>: <span class="hljs-string ngde">'app-basic-accordion-demo'</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">template</span>: <span class="hljs-string ngde">\`</span>
</span><span class="line ngde"><span class="hljs-string ngde">    &#x3C;app-accordion></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;app-accordion-item title="Getting Started"></span>
</span><span class="line ngde"><span class="hljs-string ngde">        Learn how to get started with our platform and set up your first project.</span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/app-accordion-item></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;app-accordion-item title="Features"></span>
</span><span class="line ngde"><span class="hljs-string ngde">        Explore the powerful features and capabilities of our platform.</span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/app-accordion-item></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;app-accordion-item title="API Reference"></span>
</span><span class="line ngde"><span class="hljs-string ngde">        Detailed documentation of our API endpoints and methods.</span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/app-accordion-item></span>
</span><span class="line ngde"><span class="hljs-string ngde">    &#x3C;/app-accordion></span>
</span><span class="line ngde"><span class="hljs-string ngde">  \`</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">standalone</span>: <span class="hljs-literal ngde">true</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">imports</span>: [<span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/AccordionComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">AccordionComponent</a></span>, <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/AccordionItemComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">AccordionItemComponent</a></span>]
</span><span class="line ngde">\})
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">class</span> <span class="hljs-title class_ ngde">BasicAccordionDemoComponent</span> \{\}
</span></code></pre>`,
    },
],
}

export default demoAssets;
