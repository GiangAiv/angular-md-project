// @ts-nocheck
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Routes} from '@angular/router';
import {NgDocDemoAssets, NgDocPageComponent, NgDocRootPage} from '@ng-doc/app';
import {isRoute, NgDocPage, NgDocPageType} from '@ng-doc/core';
import pageEntity from 'src/app/docs/ui-components/modal/ng-doc.page';
import {PLAYGROUND_COMPONENTS, PLAYGROUND_PROVIDERS} from './playgrounds';
import demoAssets from './demo-assets';

const pageContent: string = `<h1 id="modal" class="ngde">Modal<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/modal#modal"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><p class="ngde">A modal component provides a dialog box that appears on top of the main content, typically used for displaying important information or collecting user input.</p><h2 id="importing-modal" class="ngde">Importing modal<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/modal#importing-modal"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><ng-doc-blockquote type="note" class="ngde"><p class="ngde">Component can be imported from the root of <code class="ngde">my-lib</code></p></ng-doc-blockquote><p class="ngde">To use the <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/my-lib/classes/ModalComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">ModalComponent</a></code> in your project, you need to import the <code class="ngde">ModalModule</code> from our library:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="app.module.ts" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{<span class="hljs-title class_ ngde">ModalModule</span>\} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'my-lib'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-meta ngde">@NgModule</span>(\{
</span><span class="line ngde">  <span class="hljs-attr ngde">imports</span>: [<span class="hljs-title class_ ngde">ModalModule</span>]
</span><span class="line ngde">\})
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">class</span> <span class="hljs-title class_ ngde">AppModule</span> \{\}
</span></code></pre><h2 id="creating-modal" class="ngde">Creating modal<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/modal#creating-modal"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">To create a modal component using our library, you can use the following code:</p><pre class="ngde hljs"><code class="hljs language-html code-lines ngde" lang="html" name="" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">app-modal</span> [<span class="hljs-attr ngde">open</span>]=<span class="hljs-string ngde">"isOpen"</span> <span class="hljs-attr ngde">title</span>=<span class="hljs-string ngde">"Modal Title"</span>></span>
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">div</span> <span class="hljs-attr ngde">class</span>=<span class="hljs-string ngde">"p-4"</span>></span>
</span><span class="line ngde">    <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">p</span>></span>This is the modal content.<span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">p</span>></span>
</span><span class="line ngde">    <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">button</span> (<span class="hljs-attr ngde">click</span>)=<span class="hljs-string ngde">"closeModal()"</span>></span>Close<span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">button</span>></span>
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">div</span>></span>
</span><span class="line ngde"><span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">app-modal</span>></span>
</span></code></pre><p class="ngde">This will create a modal dialog that can be opened and closed.</p><ng-doc-demo componentname="ModalDemoComponent" indexable="false" class="ngde"><div id="options" class="ngde">\{\}</div></ng-doc-demo><h2 id="styling-modal" class="ngde">Styling modal<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/modal#styling-modal"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">You can style the modal component using Tailwind CSS classes. The component comes with default styling that you can customize:</p><pre class="ngde hljs"><code class="hljs language-html code-lines ngde" lang="html" name="" icon="" highlightedlines="[]"><span class="line ngde">&#x3C;<span class="hljs-name ngde">app-modal</span><span class="hljs-tag ngde"></span>
</span><span class="line ngde"><span class="hljs-tag ngde">  [</span><span class="hljs-attr ngde">open</span>]=<span class="hljs-string ngde">"isOpen"</span><span class="hljs-tag ngde"></span>
</span><span class="line ngde"><span class="hljs-tag ngde">  </span><span class="hljs-attr ngde">title</span>=<span class="hljs-string ngde">"Custom Styled Modal"</span><span class="hljs-tag ngde"></span>
</span><span class="line ngde"><span class="hljs-tag ngde">  </span><span class="hljs-attr ngde">size</span>=<span class="hljs-string ngde">"lg"</span><span class="hljs-tag ngde"></span>
</span><span class="line ngde"><span class="hljs-tag ngde">  </span><span class="hljs-attr ngde">class</span>=<span class="hljs-string ngde">"custom-modal"</span>>
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">div</span> <span class="hljs-attr ngde">class</span>=<span class="hljs-string ngde">"p-6 bg-gray-50"</span>></span>
</span><span class="line ngde">    <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">p</span> <span class="hljs-attr ngde">class</span>=<span class="hljs-string ngde">"text-lg"</span>></span>Custom styled content<span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">p</span>></span>
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">div</span>></span>
</span><span class="line ngde"><span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">app-modal</span>></span>
</span></code></pre><h3 id="properties" class="ngde">Properties<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/modal#properties"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><ul class="ngde"><li class="ngde"><code class="ngde">open</code>: Controls the visibility of the modal</li><li class="ngde"><code class="ngde">title</code>: The title displayed in the modal header</li><li class="ngde"><code class="ngde">size</code>: The size of the modal ('sm', 'md', 'lg', 'xl')</li><li class="ngde"><code class="ngde">className</code>: Additional CSS classes for custom styling</li></ul><h2 id="playground" class="ngde">Playground<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/modal#playground"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><ng-doc-playground id="ModalPlayground" indexable="false" class="ngde"><div id="selectors" class="ngde">app-modal</div><div id="pipeName" class="ngde"></div><div id="data" class="ngde">\{"title":\{"inputName":"title","type":"string","description":"","options":[]\},"buttonText":\{"inputName":"buttonText","type":"string | undefined","description":"","options":["undefined","string"]\},"size":\{"inputName":"size","type":"'sm' | 'md' | 'lg' | 'xl'","description":"","options":["'sm'","'md'","'lg'","'xl'"]\}\}</div><div id="options" class="ngde">\{\}</div></ng-doc-playground><div id="end" class="ngde"></div>`


@Component({
    selector: 'ng-doc-page-ui-components-modal',
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
    title: `Modal`,
}]

export default routes;

