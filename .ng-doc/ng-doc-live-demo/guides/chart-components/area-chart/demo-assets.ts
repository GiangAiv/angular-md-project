// @ts-nocheck
import {NgDocDemoAssets} from '@ng-doc/app';

export const demoAssets: NgDocDemoAssets = {
AreaChartDemoComponent: [
    {
        title: 'TypeScript',
        code: `<pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde">Component</span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'@angular/core'</span>;
</span><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/AreaChartComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">AreaChartComponent</a></span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'src/app/code/area-chart/area-chart.component'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-meta ngde">@Component</span>(\{
</span><span class="line ngde">  <span class="hljs-attr ngde">selector</span>: <span class="hljs-string ngde">'app-area-chart-demo'</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">standalone</span>: <span class="hljs-literal ngde">true</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">imports</span>: [<span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/AreaChartComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">AreaChartComponent</a></span>],
</span><span class="line ngde">  <span class="hljs-attr ngde">template</span>: <span class="hljs-string ngde">\`</span>
</span><span class="line ngde"><span class="hljs-string ngde">    &#x3C;div class="space-y-8"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;!-- Basic Area Chart --></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;h3 class="text-lg font-semibold mb-4">Basic Area Chart&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-area-chart</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [data]="[</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Jan', sales: 100 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Feb', sales: 150 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Mar', sales: 200 \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">          ]"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          x="month"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          y="sales"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          title="Monthly Sales"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [downloadableImage]="true"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        >&#x3C;/app-area-chart></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;!-- Stacked Area Chart with Custom Styling --></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;h3 class="text-lg font-semibold mb-4">Stacked Area Chart with Custom Styling&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-area-chart</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [data]="[</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Jan', sales: 100, category: 'Electronics' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Feb', sales: 150, category: 'Electronics' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Mar', sales: 200, category: 'Electronics' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Jan', sales: 80, category: 'Clothing' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Feb', sales: 120, category: 'Clothing' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Mar', sales: 160, category: 'Clothing' \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">          ]"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          x="month"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          y="sales"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          series="category"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          chartType="stacked"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          title="Sales by Category"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          fillColor="rgba(75, 192, 192, 0.2)"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          lineColor="rgba(75, 192, 192, 1)"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [markers]="true"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [markerSize]="6"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [showLabels]="true"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          labelPosition="top"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        >&#x3C;/app-area-chart></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;!-- 100% Stacked Area Chart with Missing Data Handling --></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;h3 class="text-lg font-semibold mb-4">100% Stacked Area Chart with Missing Data Handling&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-area-chart</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [data]="[</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Jan', sales: 100, category: 'Electronics' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Feb', sales: null, category: 'Electronics' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Mar', sales: 200, category: 'Electronics' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Jan', sales: 80, category: 'Clothing' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Feb', sales: 120, category: 'Clothing' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Mar', sales: null, category: 'Clothing' \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">          ]"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          x="month"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          y="sales"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          series="category"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          chartType="stacked100"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          handleMissing="zero"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          title="Sales Distribution by Category"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          xAxisTitle="Month"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          yAxisTitle="Percentage"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        >&#x3C;/app-area-chart></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;!-- Stepped Line Chart with Custom Series Order --></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;h3 class="text-lg font-semibold mb-4">Stepped Line Chart with Custom Series Order&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-area-chart</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [data]="[</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Jan', sales: 100, category: 'Electronics' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Feb', sales: 150, category: 'Electronics' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Mar', sales: 200, category: 'Electronics' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Jan', sales: 80, category: 'Clothing' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Feb', sales: 120, category: 'Clothing' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ month: 'Mar', sales: 160, category: 'Clothing' \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">          ]"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          x="month"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          y="sales"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          series="category"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          chartType="stepped"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          stepPosition="middle"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [seriesOrder]="['Clothing', 'Electronics']"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          title="Monthly Sales Trend"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [downloadableImage]="true"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        >&#x3C;/app-area-chart></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde">    &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde">  \`</span>
</span><span class="line ngde">\})
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">class</span> <span class="hljs-title class_ ngde">AreaChartDemoComponent</span> \{\}
</span></code></pre>`,
    },
],
}

export default demoAssets;
