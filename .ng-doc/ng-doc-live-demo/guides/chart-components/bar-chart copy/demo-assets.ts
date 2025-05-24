// @ts-nocheck
import {NgDocDemoAssets} from '@ng-doc/app';

export const demoAssets: NgDocDemoAssets = {
BarChartDemoComponent: [
    {
        title: 'TypeScript',
        code: `<pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde">Component</span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'@angular/core'</span>;
</span><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/BarChartComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">BarChartComponent</a></span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'src/app/code/bar-chart/bar-chart.component'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-meta ngde">@Component</span>(\{
</span><span class="line ngde">  <span class="hljs-attr ngde">selector</span>: <span class="hljs-string ngde">'app-bar-chart-demo'</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">standalone</span>: <span class="hljs-literal ngde">true</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">imports</span>: [<span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/BarChartComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">BarChartComponent</a></span>],
</span><span class="line ngde">  <span class="hljs-attr ngde">template</span>: <span class="hljs-string ngde">\`</span>
</span><span class="line ngde"><span class="hljs-string ngde">    &#x3C;div class="space-y-8"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;!-- Basic Bar Chart --></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;h3 class="text-lg font-semibold mb-4">Basic Bar Chart&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-bar-chart</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [data]="[</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Jan', sales: 100 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Feb', sales: 200 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Mar', sales: 150 \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">          ]"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          x="month"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          y="sales"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          title="Monthly Sales"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        >&#x3C;/app-bar-chart></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;!-- Horizontal Bar Chart --></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;h3 class="text-lg font-semibold mb-4">Horizontal Bar Chart&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-bar-chart</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [data]="[</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ product: 'Product A', sales: 100 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ product: 'Product B', sales: 200 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ product: 'Product C', sales: 150 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ product: 'Product D', sales: 300 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ product: 'Product E', sales: 250 \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">          ]"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          x="product"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          y="sales"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          type="horizontalBar"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          title="Product Sales"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        >&#x3C;/app-bar-chart></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;!-- Styled Bar Chart --></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;h3 class="text-lg font-semibold mb-4">Styled Bar Chart&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-bar-chart</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [data]="[</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Jan', sales: 100 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Feb', sales: 200 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Mar', sales: 150 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Apr', sales: 300 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'May', sales: 250 \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">          ]"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          x="month"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          y="sales"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          title="Monthly Sales (Styled)"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          barColor="rgb(59, 130, 246)"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          borderColor="rgb(37, 99, 235)"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [showLegend]="true"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          yAxisTitle="Sales"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          xAxisTitle="Month"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        >&#x3C;/app-bar-chart></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;!-- Currency Formatted Bar Chart --></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;h3 class="text-lg font-semibold mb-4">Currency Formatted Bar Chart&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-bar-chart</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [data]="[</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Jan', revenue: 1000 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Feb', revenue: 2000 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Mar', revenue: 1500 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Apr', revenue: 3000 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'May', revenue: 2500 \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">          ]"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          x="month"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          y="revenue"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          title="Monthly Revenue"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          yFmt="usd"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          yAxisTitle="Revenue (USD)"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        >&#x3C;/app-bar-chart></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde">    &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde">  \`</span>
</span><span class="line ngde">\})
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">class</span> <span class="hljs-title class_ ngde">BarChartDemoComponent</span> \{\}
</span></code></pre>`,
    },
],
}

export default demoAssets;
