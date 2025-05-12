// @ts-nocheck
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Routes} from '@angular/router';
import {NgDocDemoAssets, NgDocPageComponent, NgDocRootPage} from '@ng-doc/app';
import {isRoute, NgDocPage, NgDocPageType} from '@ng-doc/core';
import pageEntity from 'src/app/docs/ui-components/tabs/ng-doc.page';
import {PLAYGROUND_COMPONENTS, PLAYGROUND_PROVIDERS} from './playgrounds';
import demoAssets from './demo-assets';

const pageContent: string = `<h1 id="tabs" class="ngde">Tabs<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/tabs#tabs"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><p class="ngde">A tabs component provides a way to organize content into separate views where only one view is visible at a time.</p><h2 id="importing-tabs" class="ngde">Importing tabs<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/tabs#importing-tabs"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><ng-doc-blockquote type="note" class="ngde"><p class="ngde">Component can be imported from the root of <code class="ngde">my-lib</code></p></ng-doc-blockquote><p class="ngde">To use the <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/my-lib/classes/TabsComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">TabsComponent</a></code> in your project, you need to import the <code class="ngde">TabsModule</code> from our library:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="app.module.ts" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{<span class="hljs-title class_ ngde">TabsModule</span>\} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'my-lib'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-meta ngde">@NgModule</span>(\{
</span><span class="line ngde">  <span class="hljs-attr ngde">imports</span>: [<span class="hljs-title class_ ngde">TabsModule</span>]
</span><span class="line ngde">\})
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">class</span> <span class="hljs-title class_ ngde">AppModule</span> \{\}
</span></code></pre><h2 id="creating-tabs" class="ngde">Creating tabs<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/tabs#creating-tabs"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">To create a tabs component using our library, you can use the following code:</p><pre class="ngde hljs"><code class="hljs language-html code-lines ngde" lang="html" name="" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">app-tabs</span> [<span class="hljs-attr ngde">activeTab</span>]=<span class="hljs-string ngde">"activeTabIndex"</span>></span>
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">app-tab</span> <span class="hljs-attr ngde">title</span>=<span class="hljs-string ngde">"First Tab"</span>></span>
</span><span class="line ngde">    <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">div</span> <span class="hljs-attr ngde">class</span>=<span class="hljs-string ngde">"p-4"</span>></span>
</span><span class="line ngde">      <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">p</span>></span>Content for the first tab<span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">p</span>></span>
</span><span class="line ngde">    <span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">div</span>></span>
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">app-tab</span>></span>
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">app-tab</span> <span class="hljs-attr ngde">title</span>=<span class="hljs-string ngde">"Second Tab"</span>></span>
</span><span class="line ngde">    <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">div</span> <span class="hljs-attr ngde">class</span>=<span class="hljs-string ngde">"p-4"</span>></span>
</span><span class="line ngde">      <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">p</span>></span>Content for the second tab<span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">p</span>></span>
</span><span class="line ngde">    <span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">div</span>></span>
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">app-tab</span>></span>
</span><span class="line ngde"><span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">app-tabs</span>></span>
</span></code></pre><p class="ngde">This will create a tabbed interface with two tabs that can be switched between.</p><ng-doc-demo componentname="TabsDemoComponent" indexable="false" class="ngde"><div id="options" class="ngde">\{\}</div></ng-doc-demo><h2 id="styling-tabs" class="ngde">Styling tabs<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/tabs#styling-tabs"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">You can style the tabs component using Tailwind CSS classes. The component comes with default styling that you can customize:</p><pre class="ngde hljs"><code class="hljs language-html code-lines ngde" lang="html" name="" icon="" highlightedlines="[]"><span class="line ngde">&#x3C;<span class="hljs-name ngde">app-tabs</span><span class="hljs-tag ngde"></span>
</span><span class="line ngde"><span class="hljs-tag ngde">  [</span><span class="hljs-attr ngde">activeTab</span>]=<span class="hljs-string ngde">"activeTabIndex"</span><span class="hljs-tag ngde"></span>
</span><span class="line ngde"><span class="hljs-tag ngde">  </span><span class="hljs-attr ngde">class</span>=<span class="hljs-string ngde">"custom-tabs"</span>>
</span><span class="line ngde">  &#x3C;<span class="hljs-name ngde">app-tab</span><span class="hljs-tag ngde"></span>
</span><span class="line ngde"><span class="hljs-tag ngde">    </span><span class="hljs-attr ngde">title</span>=<span class="hljs-string ngde">"Custom Tab"</span><span class="hljs-tag ngde"></span>
</span><span class="line ngde"><span class="hljs-tag ngde">    </span><span class="hljs-attr ngde">class</span>=<span class="hljs-string ngde">"custom-tab"</span>>
</span><span class="line ngde">    <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">div</span> <span class="hljs-attr ngde">class</span>=<span class="hljs-string ngde">"p-6 bg-gray-50"</span>></span>
</span><span class="line ngde">      <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">p</span> <span class="hljs-attr ngde">class</span>=<span class="hljs-string ngde">"text-lg"</span>></span>Custom styled tab content<span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">p</span>></span>
</span><span class="line ngde">    <span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">div</span>></span>
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">app-tab</span>></span>
</span><span class="line ngde"><span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">app-tabs</span>></span>
</span></code></pre><h3 id="properties" class="ngde">Properties<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/tabs#properties"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><ul class="ngde"><li class="ngde"><code class="ngde">activeTab</code>: The index of the currently active tab</li><li class="ngde"><code class="ngde">className</code>: Additional CSS classes for custom styling</li></ul><h3 id="tab-properties" class="ngde">Tab Properties<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/tabs#tab-properties"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><ul class="ngde"><li class="ngde"><code class="ngde">title</code>: The title displayed in the tab header</li><li class="ngde"><code class="ngde">className</code>: Additional CSS classes for custom styling</li></ul><div id="end" class="ngde"></div>`


@Component({
    selector: 'ng-doc-page-ui-components-tabs',
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
    title: `Tabs`,
}]

export default routes;

