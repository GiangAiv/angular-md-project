// @ts-nocheck
import {ChangeDetectionStrategy, Component, Type} from "@angular/core";
import {Routes} from "@angular/router";
import {NgDocDemoAssets, NgDocPageComponent, NgDocRootPage} from '@ng-doc/app';
import {NgDocPageType} from '@ng-doc/core';

const pageContent: string = `<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">my-lib</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="Class">Class</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span><div class="ng-doc-decorators-group ngde" indexable="false"><code class="ngde">@Component</code></div><span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-tag-selector">app-table-column</span></div><h1 id="tablecolumncomponent" class="ngde">TableColumnComponent<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/my-lib/classes/TableColumnComponent#tablecolumncomponent"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><!-- This is a hack to make the declaration name available to the search index. --><div style="display: none" class="ngde">%%API_NAME_ANCHOR%%</div></header><section class="ngde"><span class="ng-doc-no-content ngde" indexable="false">No documentation has been provided.</span></section><section class="ngde"><h2 id="properties" class="ngde">Properties<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/my-lib/classes/TableColumnComponent#properties"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-properties-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-properties-table-name ngde">Name</th><th class="ng-doc-properties-table-type ngde">Type</th><th class="ng-doc-properties-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr data-slug="cellClass" data-slugtype="member" id="cellClass" class="ngde"><td indexable="false" class="ngde"><div class="ng-doc-decorators-group column ngde" indexable="false"><code class="ngde">@Input</code></div>cellClass<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string | undefined</code></td><td class="ngde"></td></tr><tr data-slug="headerClass" data-slugtype="member" id="headerClass" class="ngde"><td indexable="false" class="ngde"><div class="ng-doc-decorators-group column ngde" indexable="false"><code class="ngde">@Input</code></div>headerClass<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string | undefined</code></td><td class="ngde"></td></tr><tr data-slug="key" data-slugtype="member" id="key" class="ngde"><td indexable="false" class="ngde"><div class="ng-doc-decorators-group column ngde" indexable="false"><code class="ngde">@Input</code></div>key<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"></td></tr><tr data-slug="label" data-slugtype="member" id="label" class="ngde"><td indexable="false" class="ngde"><div class="ng-doc-decorators-group column ngde" indexable="false"><code class="ngde">@Input</code></div>label<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"></td></tr><tr data-slug="minWidth" data-slugtype="member" id="minWidth" class="ngde"><td indexable="false" class="ngde"><div class="ng-doc-decorators-group column ngde" indexable="false"><code class="ngde">@Input</code></div>minWidth<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string | undefined</code></td><td class="ngde"></td></tr><tr data-slug="sortable" data-slugtype="member" id="sortable" class="ngde"><td indexable="false" class="ngde"><div class="ng-doc-decorators-group column ngde" indexable="false"><code class="ngde">@Input</code></div>sortable<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">boolean</code></td><td class="ngde"></td></tr><tr data-slug="template" data-slugtype="member" id="template" class="ngde"><td indexable="false" class="ngde"><div class="ng-doc-decorators-group column ngde" indexable="false"><code class="ngde">@Input</code></div>template<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">TemplateRef&#x3C;any> | undefined</code></td><td class="ngde"></td></tr><tr data-slug="width" data-slugtype="member" id="width" class="ngde"><td indexable="false" class="ngde"><div class="ng-doc-decorators-group column ngde" indexable="false"><code class="ngde">@Input</code></div>width<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string | undefined</code></td><td class="ngde"></td></tr></tbody></table></div></section>`

@Component({
    selector: 'ng-doc-page-api-my-lib-classes-table-column-component',
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
    title: `TableColumnComponent`,
}];

export default routes;
