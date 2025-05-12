// @ts-nocheck
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Routes} from '@angular/router';
import {NgDocDemoAssets, NgDocPageComponent, NgDocRootPage} from '@ng-doc/app';
import {isRoute, NgDocPage, NgDocPageType} from '@ng-doc/core';
import pageEntity from 'src/app/docs/ui-components/alert/ng-doc.page';
import {PLAYGROUND_COMPONENTS, PLAYGROUND_PROVIDERS} from './playgrounds';
import demoAssets from './demo-assets';

const pageContent: string = `<h1 id="alert" class="ngde">Alert<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/alert#alert"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><p class="ngde">The Alert component is used to display important messages to users, such as notifications, warnings, or errors.</p><h2 id="basic-usage" class="ngde">Basic Usage<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/alert#basic-usage"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><pre class="ngde hljs"><code class="hljs language-html code-lines ngde" lang="html" name="" icon="" highlightedlines="[]"><span class="line ngde">&#x3C;<span class="hljs-name ngde">app-alert</span><span class="hljs-tag ngde"></span>
</span><span class="line ngde"><span class="hljs-tag ngde">  </span><span class="hljs-attr ngde">status</span>=<span class="hljs-string ngde">"info"</span><span class="hljs-tag ngde"></span>
</span><span class="line ngde"><span class="hljs-tag ngde">></span>
</span><span class="line ngde">This is an informational alert message.
</span><span class="line ngde"><span class="hljs-tag ngde">&#x3C;/<span class="hljs-name ngde">app-alert</span>></span>
</span></code></pre><h2 id="examples" class="ngde">Examples<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/alert#examples"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><h3 id="basic-alert" class="ngde">Basic Alert<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/alert#basic-alert"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><ng-doc-demo componentname="AlertDemoComponent" indexable="false" class="ngde"><div id="options" class="ngde">\{\}</div></ng-doc-demo><h2 id="alert-types" class="ngde">Alert Types<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/alert#alert-types"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">The Alert component supports five different types:</p><ol class="ngde"><li class="ngde"><p class="ngde"><strong class="ngde">Base</strong> (<code class="ngde">status="base"</code>)</p><ul class="ngde"><li class="ngde">Used for general information</li><li class="ngde">Gray color scheme</li><li class="ngde">Default style</li></ul></li><li class="ngde"><p class="ngde"><strong class="ngde">Info</strong> (<code class="ngde">status="info"</code>)</p><ul class="ngde"><li class="ngde">Used for general information</li><li class="ngde">Blue color scheme</li><li class="ngde">Information icon</li></ul></li><li class="ngde"><p class="ngde"><strong class="ngde">Positive</strong> (<code class="ngde">status="positive"</code>)</p><ul class="ngde"><li class="ngde">Used for successful operations</li><li class="ngde">Green color scheme</li><li class="ngde">Checkmark icon</li></ul></li><li class="ngde"><p class="ngde"><strong class="ngde">Warning</strong> (<code class="ngde">status="warning"</code>)</p><ul class="ngde"><li class="ngde">Used for cautionary messages</li><li class="ngde">Yellow color scheme</li><li class="ngde">Warning icon</li></ul></li><li class="ngde"><p class="ngde"><strong class="ngde">Negative</strong> (<code class="ngde">status="negative"</code>)</p><ul class="ngde"><li class="ngde">Used for error messages</li><li class="ngde">Red color scheme</li><li class="ngde">Error icon</li></ul></li></ol><h2 id="accessibility" class="ngde">Accessibility<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/alert#accessibility"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">The Alert component follows WAI-ARIA best practices:</p><ul class="ngde"><li class="ngde">Uses appropriate ARIA roles and attributes</li><li class="ngde">Provides clear visual indicators</li><li class="ngde">Supports keyboard navigation</li><li class="ngde">Maintains proper color contrast ratios</li></ul><h2 id="styling" class="ngde">Styling<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/alert#styling"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">The component uses Tailwind CSS classes for styling. You can customize the appearance by:</p><ol class="ngde"><li class="ngde">Modifying the Tailwind configuration</li><li class="ngde">Adding custom classes to the component</li><li class="ngde">Using the provided CSS variables for theming</li></ol><h2 id="best-practices" class="ngde">Best Practices<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/alert#best-practices"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><ol class="ngde"><li class="ngde">Use appropriate alert types for different situations</li><li class="ngde">Keep messages clear and concise</li><li class="ngde">Make alerts dismissible when appropriate</li><li class="ngde">Consider using alerts for temporary messages</li><li class="ngde">Ensure proper color contrast for accessibility</li><li class="ngde">Test with screen readers</li><li class="ngde">Consider mobile responsiveness</li></ol><h2 id="playground" class="ngde">Playground<a title="Link to heading" class="ng-doc-header-link ngde" href="/ui-components/alert#playground"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><ng-doc-playground id="AlertPlayground" indexable="false" class="ngde"><div id="selectors" class="ngde">app-alert</div><div id="pipeName" class="ngde"></div><div id="data" class="ngde">\{"status":\{"inputName":"status","type":"AlertStatus","description":"","options":["'base'","'info'","'positive'","'warning'","'negative'"]\}\}</div><div id="options" class="ngde">\{\}</div></ng-doc-playground><div id="end" class="ngde"></div>`


@Component({
    selector: 'ng-doc-page-ui-components-alert',
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
    title: `Alert`,
}]

export default routes;

