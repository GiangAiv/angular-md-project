// @ts-nocheck
import {ChangeDetectionStrategy, Component, Type} from "@angular/core";
import {Routes} from "@angular/router";
import {NgDocDemoAssets, NgDocPageComponent, NgDocRootPage} from '@ng-doc/app';
import {NgDocPageType} from '@ng-doc/core';

const pageContent: string = `<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">my-lib</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="TypeAlias">TypeAlias</span></div><h1 id="stepposition" class="ngde">StepPosition<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/my-lib/type-aliases/StepPosition#stepposition"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><!-- This is a hack to make the declaration name available to the search index. --><div style="display: none" class="ngde">%%API_NAME_ANCHOR%%</div></header><section class="ngde"><span class="ng-doc-no-content ngde" indexable="false">No documentation has been provided.</span></section><section class="ngde"><h2 id="presentation" class="ngde">Presentation<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/my-lib/type-aliases/StepPosition#presentation"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">type</span> <span class="hljs-title class_ ngde"><a href="/api/my-lib/type-aliases/StepPosition" class="ng-doc-code-anchor ngde" data-link-type="TypeAlias" class="ngde">StepPosition</a></span> = <span class="hljs-string ngde">"start"</span> | <span class="hljs-string ngde">"middle"</span> | <span class="hljs-string ngde">"end"</span>;
</span></code></pre></section>`

@Component({
    selector: 'ng-doc-page-api-my-lib-type-aliases-step-position',
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
    title: `StepPosition`,
}];

export default routes;
