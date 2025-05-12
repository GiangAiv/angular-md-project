// @ts-nocheck
import {NgDocDemoAssets} from '@ng-doc/app';

export const demoAssets: NgDocDemoAssets = {
ModalDemoComponent: [
    {
        title: 'TypeScript',
        code: `<pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde">Component</span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'@angular/core'</span>;
</span><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/ModalComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">ModalComponent</a></span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'src/app/code/modal/modal.component'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-meta ngde">@Component</span>(\{
</span><span class="line ngde">  <span class="hljs-attr ngde">selector</span>: <span class="hljs-string ngde">'app-modal-demo'</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">template</span>: <span class="hljs-string ngde">\`</span>
</span><span class="line ngde"><span class="hljs-string ngde">    &#x3C;div class="space-y-4"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;button</span>
</span><span class="line ngde"><span class="hljs-string ngde">        class="px-4 py-2 bg-blue-500 text-white rounded"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        (click)="openModal('sm')"></span>
</span><span class="line ngde"><span class="hljs-string ngde">        Open Small Modal</span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/button></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;button</span>
</span><span class="line ngde"><span class="hljs-string ngde">        class="px-4 py-2 bg-green-500 text-white rounded"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        (click)="openModal('lg')"></span>
</span><span class="line ngde"><span class="hljs-string ngde">        Open Large Modal</span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/button></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;app-modal</span>
</span><span class="line ngde"><span class="hljs-string ngde">        [open]="isOpen"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        [title]="modalTitle"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        [size]="modalSize"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        (close)="closeModal()"></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;div class="p-4"></span>
</span><span class="line ngde"><span class="hljs-string ngde">          &#x3C;p class="mb-4">This is a \{\{ modalSize \}\} modal dialog.&#x3C;/p></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/app-modal></span>
</span><span class="line ngde"><span class="hljs-string ngde">    &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde">  \`</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">standalone</span>: <span class="hljs-literal ngde">true</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">imports</span>: [<span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/ModalComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">ModalComponent</a></span>]
</span><span class="line ngde">\})
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">class</span> <span class="hljs-title class_ ngde">ModalDemoComponent</span> \{
</span><span class="line ngde">  isOpen = <span class="hljs-literal ngde">false</span>;
</span><span class="line ngde">  modalTitle = <span class="hljs-string ngde">'Modal Title'</span>;
</span><span class="line ngde">  <span class="hljs-attr ngde">modalSize</span>: <span class="hljs-string ngde">'sm'</span> | <span class="hljs-string ngde">'md'</span> | <span class="hljs-string ngde">'lg'</span> | <span class="hljs-string ngde">'xl'</span> = <span class="hljs-string ngde">'md'</span>;
</span><span class="line ngde">
</span><span class="line ngde">  <span class="hljs-title function_ ngde">openModal</span>(<span class="hljs-params ngde">size: <span class="hljs-string ngde">'sm'</span> | <span class="hljs-string ngde">'md'</span> | <span class="hljs-string ngde">'lg'</span> | <span class="hljs-string ngde">'xl'</span></span>) \{
</span><span class="line ngde">    <span class="hljs-variable language_ ngde">this</span>.<span class="hljs-property ngde">modalSize</span> = size;
</span><span class="line ngde">    <span class="hljs-variable language_ ngde">this</span>.<span class="hljs-property ngde">modalTitle</span> = <span class="hljs-string ngde">\`<span class="hljs-subst ngde">\$\{size.toUpperCase()\}</span> Modal\`</span>;
</span><span class="line ngde">    <span class="hljs-variable language_ ngde">this</span>.<span class="hljs-property ngde">isOpen</span> = <span class="hljs-literal ngde">true</span>;
</span><span class="line ngde">  \}
</span><span class="line ngde">
</span><span class="line ngde">  <span class="hljs-title function_ ngde">closeModal</span>(<span class="hljs-params ngde"></span>) \{
</span><span class="line ngde">    <span class="hljs-variable language_ ngde">this</span>.<span class="hljs-property ngde">isOpen</span> = <span class="hljs-literal ngde">false</span>;
</span><span class="line ngde">  \}
</span><span class="line ngde">\}
</span></code></pre>`,
    },
],
}

export default demoAssets;
