// @ts-nocheck
import {ChangeDetectionStrategy, Component, Type} from "@angular/core";
import {Routes} from "@angular/router";
import {NgDocDemoAssets, NgDocPageComponent, NgDocRootPage} from '@ng-doc/app';
import {NgDocPageType} from '@ng-doc/core';

const pageContent: string = `<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">my-lib</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="Class">Class</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span><div class="ng-doc-decorators-group ngde" indexable="false"><code class="ngde">@Component</code></div><span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-tag-selector">app-accordion</span></div><h1 id="accordioncomponent" class="ngde">AccordionComponent<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/my-lib/classes/AccordionComponent#accordioncomponent"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><!-- This is a hack to make the declaration name available to the search index. --><div style="display: none" class="ngde">%%API_NAME_ANCHOR%%</div><div class="ng-doc-header-details ngde" indexable="false"><span class="ng-doc-header-details-label ngde">Implements</span><code indexable="false" class="ngde">AfterContentInit</code></div></header><section class="ngde"><span class="ng-doc-no-content ngde" indexable="false">No documentation has been provided.</span></section><section class="ngde"><h2 id="properties" class="ngde">Properties<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/my-lib/classes/AccordionComponent#properties"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-properties-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-properties-table-name ngde">Name</th><th class="ng-doc-properties-table-type ngde">Type</th><th class="ng-doc-properties-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr data-slug="items" data-slugtype="member" id="items" class="ngde"><td indexable="false" class="ngde"><div class="ng-doc-decorators-group column ngde" indexable="false"><code class="ngde">@ContentChildren</code></div>items<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">QueryList&#x3C;AccordionItemComponent></code></td><td class="ngde"></td></tr><tr data-slug="single" data-slugtype="member" id="single" class="ngde"><td indexable="false" class="ngde"><div class="ng-doc-decorators-group column ngde" indexable="false"><code class="ngde">@Input</code></div>single<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">boolean</code></td><td class="ngde"></td></tr></tbody></table></div></section><section class="ngde"><h2 id="methods" class="ngde">Methods<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/my-lib/classes/AccordionComponent#methods"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="ngaftercontentinit" class="ngde">ngAfterContentInit()<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/my-lib/classes/AccordionComponent#ngaftercontentinit"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde">implements <code class="ngde">AfterContentInit</code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><span class="ng-doc-no-content ngde" indexable="false">No documentation has been provided.</span></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">ngAfterContentInit</span>(): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div></section>`

@Component({
    selector: 'ng-doc-page-api-my-lib-classes-accordion-component',
    standalone: true,
    template: `<ng-doc-page></ng-doc-page>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgDocPageComponent],
    providers: [{provide: NgDocRootPage, useExisting: DynamicComponent}],
})
export class DynamicComponent extends NgDocRootPage {
    readonly routePrefix?: string = undefined;
    readonly pageType: NgDocPageType = 'api';
    readonly pageContent: string = pageContent;
    readonly demo: Record<string, Type<unknown>> | undefined = undefined;
    readonly demoAssets: NgDocDemoAssets | undefined = undefined;

    constructor() {
        super();
    }
}

const routes: Routes = [{
    path: '',
    component: DynamicComponent,
    title: `AccordionComponent`,
}];

export default routes;
