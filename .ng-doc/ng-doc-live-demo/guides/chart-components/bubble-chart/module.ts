// @ts-nocheck
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Routes} from '@angular/router';
import {NgDocDemoAssets, NgDocPageComponent, NgDocRootPage} from '@ng-doc/app';
import {isRoute, NgDocPage, NgDocPageType} from '@ng-doc/core';
import pageEntity from 'src/app/docs/chart-components/bubble-chart/ng-doc.page';
import {PLAYGROUND_COMPONENTS, PLAYGROUND_PROVIDERS} from './playgrounds';
import demoAssets from './demo-assets';

const pageContent: string = `<h1 id="bubble-chart" class="ngde">Bubble Chart<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/bubble-chart#bubble-chart"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><p class="ngde">The Bubble Chart component is a powerful visualization tool that displays three dimensions of data using x and y coordinates and bubble size. It's perfect for showing relationships between three variables and identifying patterns or clusters in your data.</p><h2 id="importing" class="ngde">Importing<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/bubble-chart#importing"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><ng-doc-blockquote type="note" class="ngde"><p class="ngde">Component can be imported from the root of <code class="ngde">my-lib</code></p></ng-doc-blockquote><p class="ngde">To use the <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/my-lib/classes/BubbleChartComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">BubbleChartComponent</a></code> in your project, you need to import it from our library:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="app.module.ts" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/BubbleChartComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">BubbleChartComponent</a></span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'my-lib'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-meta ngde">@NgModule</span>(\{
</span><span class="line ngde">  <span class="hljs-attr ngde">imports</span>: [<span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/BubbleChartComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">BubbleChartComponent</a></span>]
</span><span class="line ngde">\})
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">class</span> <span class="hljs-title class_ ngde">AppModule</span> \{\}
</span></code></pre><h2 id="basic-usage" class="ngde">Basic Usage<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/bubble-chart#basic-usage"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">To create a bubble chart using our library, you can use the following code:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde">&#x3C;app-bubble-chart
</span><span class="line ngde">  [data]=<span class="hljs-string ngde">"[</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \{ x: 10, y: 20, r: 5 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \{ x: 15, y: 30, r: 8 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \{ x: 20, y: 25, r: 6 \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">  ]"</span>
</span><span class="line ngde">  x=<span class="hljs-string ngde">"x"</span>
</span><span class="line ngde">  y=<span class="hljs-string ngde">"y"</span>
</span><span class="line ngde">  r=<span class="hljs-string ngde">"r"</span>
</span><span class="line ngde">  title=<span class="hljs-string ngde">"Sample Bubble Chart"</span>
</span><span class="line ngde">>&#x3C;/app-bubble-chart>
</span></code></pre><ng-doc-demo componentname="BubbleChartDemoComponent" indexable="false" class="ngde"><div id="options" class="ngde">\{\}</div></ng-doc-demo><h2 id="features" class="ngde">Features<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/bubble-chart#features"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">The component supports various features:</p><ul class="ngde"><li class="ngde">Multiple series with different colors</li><li class="ngde">Logarithmic or linear scales</li><li class="ngde">Custom bubble styling</li><li class="ngde">Axis customization</li><li class="ngde">Interactive tooltips</li><li class="ngde">Image download</li></ul><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde">&#x3C;app-bubble-chart
</span><span class="line ngde">  [data]=<span class="hljs-string ngde">"data"</span>
</span><span class="line ngde">  x=<span class="hljs-string ngde">"x"</span>
</span><span class="line ngde">  y=<span class="hljs-string ngde">"y"</span>
</span><span class="line ngde">  r=<span class="hljs-string ngde">"r"</span>
</span><span class="line ngde">  series=<span class="hljs-string ngde">"category"</span>
</span><span class="line ngde">  [xLog]=<span class="hljs-string ngde">"true"</span>
</span><span class="line ngde">  [yLog]=<span class="hljs-string ngde">"true"</span>
</span><span class="line ngde">  [bubbleOpacity]=<span class="hljs-string ngde">"0.6"</span>
</span><span class="line ngde">  [showLegend]=<span class="hljs-string ngde">"true"</span>
</span><span class="line ngde">>&#x3C;/app-bubble-chart>
</span></code></pre><h2 id="styling" class="ngde">Styling<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/bubble-chart#styling"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">You can customize the appearance using various properties:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde">&#x3C;app-bubble-chart
</span><span class="line ngde">  [data]=<span class="hljs-string ngde">"data"</span>
</span><span class="line ngde">  x=<span class="hljs-string ngde">"x"</span>
</span><span class="line ngde">  y=<span class="hljs-string ngde">"y"</span>
</span><span class="line ngde">  r=<span class="hljs-string ngde">"r"</span>
</span><span class="line ngde">  [bubbleOpacity]=<span class="hljs-string ngde">"0.6"</span>
</span><span class="line ngde">  [bubbleBorderWidth]=<span class="hljs-string ngde">"1"</span>
</span><span class="line ngde">  bubbleBorderColor=<span class="hljs-string ngde">"rgba(0, 0, 0, 0.1)"</span>
</span><span class="line ngde">  [bubbleHoverRadius]=<span class="hljs-string ngde">"8"</span>
</span><span class="line ngde">  [bubbleHoverBorderWidth]=<span class="hljs-string ngde">"2"</span>
</span><span class="line ngde">>&#x3C;/app-bubble-chart>
</span></code></pre><h2 id="properties" class="ngde">Properties<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/bubble-chart#properties"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><table class="ngde"><thead class="ngde"><tr class="ngde"><th class="ngde">Property</th><th class="ngde">Type</th><th class="ngde">Default</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde">data</td><td class="ngde">any[]</td><td class="ngde">[]</td><td class="ngde">Array of data points</td></tr><tr class="ngde"><td class="ngde">x</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Field name for x-axis values</td></tr><tr class="ngde"><td class="ngde">y</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Field name for y-axis values</td></tr><tr class="ngde"><td class="ngde">r</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Field name for bubble radius</td></tr><tr class="ngde"><td class="ngde">series</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Field name for series grouping</td></tr><tr class="ngde"><td class="ngde">xType</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Type of x-axis data</td></tr><tr class="ngde"><td class="ngde">yType</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Type of y-axis data</td></tr><tr class="ngde"><td class="ngde">xLog</td><td class="ngde">boolean</td><td class="ngde">false</td><td class="ngde">Use logarithmic scale for x-axis</td></tr><tr class="ngde"><td class="ngde">yLog</td><td class="ngde">boolean</td><td class="ngde">false</td><td class="ngde">Use logarithmic scale for y-axis</td></tr><tr class="ngde"><td class="ngde">title</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Chart title</td></tr><tr class="ngde"><td class="ngde">subtitle</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Chart subtitle</td></tr><tr class="ngde"><td class="ngde">legend</td><td class="ngde">boolean</td><td class="ngde">true</td><td class="ngde">Show legend</td></tr><tr class="ngde"><td class="ngde">xAxisTitle</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Title for x-axis</td></tr><tr class="ngde"><td class="ngde">yAxisTitle</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Title for y-axis</td></tr><tr class="ngde"><td class="ngde">xGridlines</td><td class="ngde">boolean</td><td class="ngde">true</td><td class="ngde">Show x-axis gridlines</td></tr><tr class="ngde"><td class="ngde">yGridlines</td><td class="ngde">boolean</td><td class="ngde">true</td><td class="ngde">Show y-axis gridlines</td></tr><tr class="ngde"><td class="ngde">bubbleOpacity</td><td class="ngde">number</td><td class="ngde">0.5</td><td class="ngde">Opacity of bubbles</td></tr><tr class="ngde"><td class="ngde">bubbleBorderWidth</td><td class="ngde">number</td><td class="ngde">1</td><td class="ngde">Width of bubble borders</td></tr><tr class="ngde"><td class="ngde">bubbleBorderColor</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Color of bubble borders</td></tr><tr class="ngde"><td class="ngde">bubbleHoverRadius</td><td class="ngde">number</td><td class="ngde">8</td><td class="ngde">Radius of bubbles on hover</td></tr><tr class="ngde"><td class="ngde">bubbleHoverBorderWidth</td><td class="ngde">number</td><td class="ngde">2</td><td class="ngde">Width of bubble borders on hover</td></tr><tr class="ngde"><td class="ngde">chartAreaHeight</td><td class="ngde">number</td><td class="ngde">400</td><td class="ngde">Height of chart area in pixels</td></tr><tr class="ngde"><td class="ngde">downloadableImage</td><td class="ngde">boolean</td><td class="ngde">false</td><td class="ngde">Enable image download</td></tr></tbody></table><h2 id="playground" class="ngde">Playground<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/bubble-chart#playground"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div id="end" class="ngde"></div>`


@Component({
    selector: 'ng-doc-page-chart-components-bubble-chart',
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
    title: `Bubble Chart`,
}]

export default routes;

