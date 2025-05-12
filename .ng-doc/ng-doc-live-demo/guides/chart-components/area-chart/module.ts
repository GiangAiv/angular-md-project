// @ts-nocheck
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Routes} from '@angular/router';
import {NgDocDemoAssets, NgDocPageComponent, NgDocRootPage} from '@ng-doc/app';
import {isRoute, NgDocPage, NgDocPageType} from '@ng-doc/core';
import pageEntity from 'src/app/docs/chart-components/area-chart/ng-doc.page';
import {PLAYGROUND_COMPONENTS, PLAYGROUND_PROVIDERS} from './playgrounds';
import demoAssets from './demo-assets';

const pageContent: string = `<h1 id="area-chart" class="ngde">Area Chart<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/area-chart#area-chart"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><p class="ngde">The Area Chart component is a versatile visualization tool that displays data as a filled area between the x-axis and the line connecting data points. It's perfect for showing trends and cumulative values over time.</p><h2 id="importing" class="ngde">Importing<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/area-chart#importing"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><ng-doc-blockquote type="note" class="ngde"><p class="ngde">Component can be imported from the root of <code class="ngde">my-lib</code></p></ng-doc-blockquote><p class="ngde">To use the <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/my-lib/classes/AreaChartComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">AreaChartComponent</a></code> in your project, you need to import it from our library:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="app.module.ts" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/AreaChartComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">AreaChartComponent</a></span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'my-lib'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-meta ngde">@NgModule</span>(\{
</span><span class="line ngde">  <span class="hljs-attr ngde">imports</span>: [<span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/AreaChartComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">AreaChartComponent</a></span>]
</span><span class="line ngde">\})
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">class</span> <span class="hljs-title class_ ngde">AppModule</span> \{\}
</span></code></pre><h2 id="basic-usage" class="ngde">Basic Usage<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/area-chart#basic-usage"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">To create an area chart using our library, you can use the following code:</p><ng-doc-demo componentname="AreaChartDemoComponent" indexable="false" class="ngde"><div id="options" class="ngde">\{\}</div></ng-doc-demo><h2 id="chart-types" class="ngde">Chart Types<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/area-chart#chart-types"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">The component supports different chart types:</p><ul class="ngde"><li class="ngde"><code class="ngde">area</code>: Standard area chart</li><li class="ngde"><code class="ngde">stacked</code>: Stacked area chart</li><li class="ngde"><code class="ngde">stacked100</code>: 100% stacked area chart</li><li class="ngde"><code class="ngde">stepped</code>: Stepped area chart</li></ul><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde">&#x3C;app-area-chart
</span><span class="line ngde">  [data]=<span class="hljs-string ngde">"data"</span>
</span><span class="line ngde">  x=<span class="hljs-string ngde">"month"</span>
</span><span class="line ngde">  y=<span class="hljs-string ngde">"sales"</span>
</span><span class="line ngde">  chartType=<span class="hljs-string ngde">"stacked"</span>
</span><span class="line ngde">>&#x3C;/app-area-chart>
</span></code></pre><h2 id="styling" class="ngde">Styling<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/area-chart#styling"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">You can customize the appearance using various properties:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde">&#x3C;app-area-chart
</span><span class="line ngde">  [data]=<span class="hljs-string ngde">"data"</span>
</span><span class="line ngde">  x=<span class="hljs-string ngde">"month"</span>
</span><span class="line ngde">  y=<span class="hljs-string ngde">"sales"</span>
</span><span class="line ngde">  fillColor=<span class="hljs-string ngde">"rgba(59, 130, 246, 0.2)"</span>
</span><span class="line ngde">  lineColor=<span class="hljs-string ngde">"rgb(59, 130, 246)"</span>
</span><span class="line ngde">  [line]=<span class="hljs-string ngde">"true"</span>
</span><span class="line ngde">  [markers]=<span class="hljs-string ngde">"true"</span>
</span><span class="line ngde">  markerShape=<span class="hljs-string ngde">"circle"</span>
</span><span class="line ngde">  [markerSize]=<span class="hljs-string ngde">"4"</span>
</span><span class="line ngde">>&#x3C;/app-area-chart>
</span></code></pre><h2 id="properties" class="ngde">Properties<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/area-chart#properties"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><table class="ngde"><thead class="ngde"><tr class="ngde"><th class="ngde">Property</th><th class="ngde">Type</th><th class="ngde">Default</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde">data</td><td class="ngde">any[]</td><td class="ngde">[]</td><td class="ngde">Array of data points</td></tr><tr class="ngde"><td class="ngde">x</td><td class="ngde">string</td><td class="ngde">''</td><td class="ngde">Field name for x-axis values</td></tr><tr class="ngde"><td class="ngde">y</td><td class="ngde">string</td><td class="ngde">''</td><td class="ngde">Field name for y-axis values</td></tr><tr class="ngde"><td class="ngde">series</td><td class="ngde">string</td><td class="ngde">''</td><td class="ngde">Field name for series grouping</td></tr><tr class="ngde"><td class="ngde">chartType</td><td class="ngde">'area' | 'stacked' | 'stacked100' | 'stepped'</td><td class="ngde">'area'</td><td class="ngde">Type of area chart</td></tr><tr class="ngde"><td class="ngde">title</td><td class="ngde">string</td><td class="ngde">''</td><td class="ngde">Chart title</td></tr><tr class="ngde"><td class="ngde">fillColor</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Color for area fill</td></tr><tr class="ngde"><td class="ngde">lineColor</td><td class="ngde">string</td><td class="ngde">undefined</td><td class="ngde">Color for line</td></tr><tr class="ngde"><td class="ngde">line</td><td class="ngde">boolean</td><td class="ngde">true</td><td class="ngde">Show line</td></tr><tr class="ngde"><td class="ngde">markers</td><td class="ngde">boolean</td><td class="ngde">false</td><td class="ngde">Show data point markers</td></tr><tr class="ngde"><td class="ngde">markerShape</td><td class="ngde">string</td><td class="ngde">'circle'</td><td class="ngde">Shape of markers</td></tr><tr class="ngde"><td class="ngde">markerSize</td><td class="ngde">number</td><td class="ngde">3</td><td class="ngde">Size of markers</td></tr><tr class="ngde"><td class="ngde">handleMissing</td><td class="ngde">'gap' | 'zero' | 'connect'</td><td class="ngde">'gap'</td><td class="ngde">How to handle missing data</td></tr><tr class="ngde"><td class="ngde">step</td><td class="ngde">boolean</td><td class="ngde">false</td><td class="ngde">Use stepped lines</td></tr><tr class="ngde"><td class="ngde">stepPosition</td><td class="ngde">'start' | 'middle' | 'end'</td><td class="ngde">'middle'</td><td class="ngde">Position of steps</td></tr><tr class="ngde"><td class="ngde">showLabels</td><td class="ngde">boolean</td><td class="ngde">true</td><td class="ngde">Show data labels</td></tr><tr class="ngde"><td class="ngde">labelSize</td><td class="ngde">number</td><td class="ngde">12</td><td class="ngde">Size of labels</td></tr><tr class="ngde"><td class="ngde">labelPosition</td><td class="ngde">'top' | 'bottom' | 'middle'</td><td class="ngde">'top'</td><td class="ngde">Position of labels</td></tr><tr class="ngde"><td class="ngde">downloadableImage</td><td class="ngde">boolean</td><td class="ngde">false</td><td class="ngde">Enable image download</td></tr></tbody></table><div id="end" class="ngde"></div>`


@Component({
    selector: 'ng-doc-page-chart-components-area-chart',
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
    title: `Area Chart`,
}]

export default routes;

