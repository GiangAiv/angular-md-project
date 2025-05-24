// @ts-nocheck
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Routes} from '@angular/router';
import {NgDocDemoAssets, NgDocPageComponent, NgDocRootPage} from '@ng-doc/app';
import {isRoute, NgDocPage, NgDocPageType} from '@ng-doc/core';
import pageEntity from 'src/app/docs/chart-components/bar-chart copy/ng-doc.page';
import {PLAYGROUND_COMPONENTS, PLAYGROUND_PROVIDERS} from './playgrounds';
import demoAssets from './demo-assets';

const pageContent: string = `<h1 id="bar-chart" class="ngde">Bar Chart<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/bar-chart copy#bar-chart"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><p class="ngde">The Bar Chart component is a versatile visualization tool that displays data using rectangular bars with lengths proportional to the values they represent. It's ideal for comparing quantities across different categories and showing trends over time.</p><h2 id="importing" class="ngde">Importing<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/bar-chart copy#importing"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><ng-doc-blockquote type="note" class="ngde"><p class="ngde">Component can be imported from the root of <code class="ngde">my-lib</code></p></ng-doc-blockquote><p class="ngde">To use the <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/my-lib/classes/BarChartComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">BarChartComponent</a></code> in your project, you need to import it from our library:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="app.module.ts" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/BarChartComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">BarChartComponent</a></span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'my-lib'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-meta ngde">@NgModule</span>(\{
</span><span class="line ngde">  <span class="hljs-attr ngde">imports</span>: [<span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/BarChartComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">BarChartComponent</a></span>]
</span><span class="line ngde">\})
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">class</span> <span class="hljs-title class_ ngde">AppModule</span> \{\}
</span></code></pre><h2 id="basic-usage" class="ngde">Basic Usage<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/bar-chart copy#basic-usage"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">To create a bar chart using our library, you can use the following code:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde">&#x3C;app-bar-chart
</span><span class="line ngde">  [data]=<span class="hljs-string ngde">"[</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \{ month: 'Jan', sales: 100 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \{ month: 'Feb', sales: 200 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">    \{ month: 'Mar', sales: 150 \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">  ]"</span>
</span><span class="line ngde">  x=<span class="hljs-string ngde">"month"</span>
</span><span class="line ngde">  y=<span class="hljs-string ngde">"sales"</span>
</span><span class="line ngde">  title=<span class="hljs-string ngde">"Monthly Sales"</span>
</span><span class="line ngde">>&#x3C;/app-bar-chart>
</span></code></pre><ng-doc-demo componentname="BarChartDemoComponent" indexable="false" class="ngde"><div id="options" class="ngde">\{\}</div></ng-doc-demo><h2 id="chart-types" class="ngde">Chart Types<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/bar-chart copy#chart-types"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">The component supports different chart types:</p><ul class="ngde"><li class="ngde"><code class="ngde">bar</code>: Standard vertical bar chart</li><li class="ngde"><code class="ngde">horizontalBar</code>: Horizontal bar chart</li><li class="ngde"><code class="ngde">stackedBar</code>: Stacked bar chart</li><li class="ngde"><code class="ngde">stackedHorizontalBar</code>: Stacked horizontal bar chart</li></ul><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde">&#x3C;app-bar-chart
</span><span class="line ngde">  [data]=<span class="hljs-string ngde">"data"</span>
</span><span class="line ngde">  x=<span class="hljs-string ngde">"month"</span>
</span><span class="line ngde">  y=<span class="hljs-string ngde">"sales"</span>
</span><span class="line ngde">  <span class="hljs-keyword ngde">type</span>=<span class="hljs-string ngde">"horizontalBar"</span>
</span><span class="line ngde">  title=<span class="hljs-string ngde">"Product Sales"</span>
</span><span class="line ngde">>&#x3C;/app-bar-chart>
</span></code></pre><ng-doc-demo componentname="BarChartDemoComponent" indexable="false" class="ngde"><div id="options" class="ngde">\{\}</div></ng-doc-demo><h2 id="styling" class="ngde">Styling<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/bar-chart copy#styling"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">You can customize the appearance using various properties:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde">&#x3C;app-bar-chart
</span><span class="line ngde">  [data]=<span class="hljs-string ngde">"data"</span>
</span><span class="line ngde">  x=<span class="hljs-string ngde">"month"</span>
</span><span class="line ngde">  y=<span class="hljs-string ngde">"sales"</span>
</span><span class="line ngde">  barColor=<span class="hljs-string ngde">"rgb(59, 130, 246)"</span>
</span><span class="line ngde">  borderColor=<span class="hljs-string ngde">"rgb(37, 99, 235)"</span>
</span><span class="line ngde">  [showLegend]=<span class="hljs-string ngde">"true"</span>
</span><span class="line ngde">  title=<span class="hljs-string ngde">"Monthly Sales"</span>
</span><span class="line ngde">  yAxisTitle=<span class="hljs-string ngde">"Sales"</span>
</span><span class="line ngde">  xAxisTitle=<span class="hljs-string ngde">"Month"</span>
</span><span class="line ngde">>&#x3C;/app-bar-chart>
</span></code></pre><ng-doc-demo componentname="BarChartDemoComponent" indexable="false" class="ngde"><div id="options" class="ngde">\{\}</div></ng-doc-demo><h2 id="features" class="ngde">Features<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/bar-chart copy#features"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">The component supports various features:</p><ul class="ngde"><li class="ngde">Multiple chart types (vertical, horizontal, stacked)</li><li class="ngde">Custom bar colors and borders</li><li class="ngde">Axis customization</li><li class="ngde">Interactive tooltips</li><li class="ngde">Image download</li><li class="ngde">Currency formatting</li><li class="ngde">Grid lines and labels</li><li class="ngde">Legend display</li></ul><h2 id="properties" class="ngde">Properties<a title="Link to heading" class="ng-doc-header-link ngde" href="/chart-components/bar-chart copy#properties"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><table class="ngde"><thead class="ngde"><tr class="ngde"><th class="ngde">Property</th><th class="ngde">Type</th><th class="ngde">Default</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde">data</td><td class="ngde">any[]</td><td class="ngde">[]</td><td class="ngde">Array of data points</td></tr><tr class="ngde"><td class="ngde">x</td><td class="ngde">string</td><td class="ngde">'region'</td><td class="ngde">Field name for x-axis values</td></tr><tr class="ngde"><td class="ngde">y</td><td class="ngde">string</td><td class="ngde">'revenue'</td><td class="ngde">Field name for y-axis values</td></tr><tr class="ngde"><td class="ngde">type</td><td class="ngde">string</td><td class="ngde">'bar'</td><td class="ngde">Type of bar chart</td></tr><tr class="ngde"><td class="ngde">title</td><td class="ngde">string</td><td class="ngde">''</td><td class="ngde">Chart title</td></tr><tr class="ngde"><td class="ngde">barColor</td><td class="ngde">string</td><td class="ngde">'#0070f3'</td><td class="ngde">Color for bars</td></tr><tr class="ngde"><td class="ngde">borderColor</td><td class="ngde">string</td><td class="ngde">'#0070f3'</td><td class="ngde">Color for bar borders</td></tr><tr class="ngde"><td class="ngde">showLegend</td><td class="ngde">boolean</td><td class="ngde">true</td><td class="ngde">Show chart legend</td></tr><tr class="ngde"><td class="ngde">yFmt</td><td class="ngde">string</td><td class="ngde">''</td><td class="ngde">Format string for y-axis values</td></tr><tr class="ngde"><td class="ngde">yAxisTitle</td><td class="ngde">string</td><td class="ngde">''</td><td class="ngde">Title for y-axis</td></tr><tr class="ngde"><td class="ngde">xAxisTitle</td><td class="ngde">string</td><td class="ngde">''</td><td class="ngde">Title for x-axis</td></tr><tr class="ngde"><td class="ngde">chartAreaHeight</td><td class="ngde">number</td><td class="ngde">300</td><td class="ngde">Height of chart area in pixels</td></tr><tr class="ngde"><td class="ngde">labels</td><td class="ngde">boolean</td><td class="ngde">true</td><td class="ngde">Show data labels</td></tr><tr class="ngde"><td class="ngde">xGridlines</td><td class="ngde">boolean</td><td class="ngde">true</td><td class="ngde">Show x-axis gridlines</td></tr><tr class="ngde"><td class="ngde">yGridlines</td><td class="ngde">boolean</td><td class="ngde">true</td><td class="ngde">Show y-axis gridlines</td></tr><tr class="ngde"><td class="ngde">downloadableImage</td><td class="ngde">boolean</td><td class="ngde">false</td><td class="ngde">Enable image download</td></tr></tbody></table><div id="end" class="ngde"></div>`


@Component({
    selector: 'ng-doc-page-chart-components-bar-chart-copy',
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
    title: `Bar Chart`,
}]

export default routes;

