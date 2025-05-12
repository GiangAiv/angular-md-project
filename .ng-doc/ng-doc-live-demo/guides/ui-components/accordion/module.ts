// @ts-nocheck
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Routes} from '@angular/router';
import {NgDocDemoAssets, NgDocPageComponent, NgDocRootPage} from '@ng-doc/app';
import {isRoute, NgDocPage, NgDocPageType} from '@ng-doc/core';
import pageEntity from 'src/app/docs/ui-components/accordion/ng-doc.page';
import {PLAYGROUND_COMPONENTS, PLAYGROUND_PROVIDERS} from './playgrounds';
import demoAssets from './demo-assets';

const pageContent: string = `<h1 id="accordion" class="ngde">Accordion<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/accordion#accordion"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><p class="ngde">An accordion is a vertically stacked set of interactive headings that each reveal an associated section of content.</p><h2 id="importing-an-accordion" class="ngde">Importing an accordion<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/accordion#importing-an-accordion"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><ng-doc-blockquote type="note" class="ngde"><p class="ngde">Component can be imported from the root of <code class="ngde">my-lib</code></p></ng-doc-blockquote><p class="ngde">To use the <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/my-lib/classes/AccordionComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">AccordionComponent</a></code> in your project, you need to import the <code class="ngde">AccordionModule</code> from our library:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="app.module.ts" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{<span class="hljs-title class_ ngde">AccordionModule</span>\} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'my-lib'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-meta ngde">@NgModule</span>(\{
</span><span class="line ngde">  <span class="hljs-attr ngde">imports</span>: [<span class="hljs-title class_ ngde">AccordionModule</span>]
</span><span class="line ngde">\})
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">class</span> <span class="hljs-title class_ ngde">AppModule</span> \{\}
</span></code></pre><h2 id="creating-an-accordion" class="ngde">Creating an accordion<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/accordion#creating-an-accordion"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">To create an accordion using our library, you can use the following code:</p><pre class="ngde hljs"><code class="hljs language-html code-lines ngde" lang="html" name="" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">app-accordion</span>></span>
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">app-accordion-item</span> <span class="hljs-attr ngde">title</span>=<span class="hljs-string ngde">"Section 1"</span>></span>
</span><span class="line ngde">    Content for section 1
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">app-accordion-item</span>></span>
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">app-accordion-item</span> <span class="hljs-attr ngde">title</span>=<span class="hljs-string ngde">"Section 2"</span>></span>
</span><span class="line ngde">    Content for section 2
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">app-accordion-item</span>></span>
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">app-accordion-item</span> <span class="hljs-attr ngde">title</span>=<span class="hljs-string ngde">"Section 3"</span>></span>
</span><span class="line ngde">    Content for section 3
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">app-accordion-item</span>></span>
</span><span class="line ngde"><span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">app-accordion</span>></span>
</span></code></pre><p class="ngde">This will create a simple accordion with three sections.</p><ng-doc-demo componentname="BasicAccordionDemoComponent" indexable="false" class="ngde"><div id="options" class="ngde">\{\}</div></ng-doc-demo><h2 id="styling-an-accordion" class="ngde">Styling an accordion<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/accordion#styling-an-accordion"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">You can style the accordion using Tailwind CSS classes. The component comes with default styling that you can customize:</p><pre class="ngde hljs"><code class="hljs language-html code-lines ngde" lang="html" name="" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">app-accordion</span> <span class="hljs-attr ngde">class</span>=<span class="hljs-string ngde">"custom-accordion"</span>></span>
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;<span class="hljs-name ngde">app-accordion-item</span> <span class="hljs-attr ngde">title</span>=<span class="hljs-string ngde">"Custom Section"</span> <span class="hljs-attr ngde">class</span>=<span class="hljs-string ngde">"custom-item"</span>></span>
</span><span class="line ngde">    Custom styled content
</span><span class="line ngde">  <span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">app-accordion-item</span>></span>
</span><span class="line ngde"><span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">app-accordion</span>></span>
</span></code></pre><h2 id="playground" class="ngde">Playground<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/accordion#playground"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><ng-doc-playground id="AccordionPlayground" indexable="false" class="ngde"><div id="selectors" class="ngde">app-accordion-item</div><div id="pipeName" class="ngde"></div><div id="data" class="ngde">\{"title":\{"inputName":"title","type":"string","description":"","options":[]\},"description":\{"inputName":"description","type":"string | undefined","description":"","options":["undefined","string"]\},"compact":\{"inputName":"compact","type":"boolean","description":"","options":["false","true"]\},"expanded":\{"inputName":"expanded","type":"boolean","description":"","options":["false","true"]\}\}</div><div id="options" class="ngde">\{\}</div></ng-doc-playground><div id="end" class="ngde"></div>`


@Component({
    selector: 'ng-doc-page-ui-components-accordion',
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
    title: `Accordion`,
}]

export default routes;

