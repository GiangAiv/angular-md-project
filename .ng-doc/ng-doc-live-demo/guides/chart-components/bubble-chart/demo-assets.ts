// @ts-nocheck
import {NgDocDemoAssets} from '@ng-doc/app';

export const demoAssets: NgDocDemoAssets = {
BubbleChartDemoComponent: [
    {
        title: 'TypeScript',
        code: `<pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde">Component</span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'@angular/core'</span>;
</span><span class="line ngde"><span class="hljs-keyword ngde">import</span> \{ <span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/BubbleChartComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">BubbleChartComponent</a></span> \} <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'src/app/code/bubble-chart/bubble-chart.component'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-meta ngde">@Component</span>(\{
</span><span class="line ngde">  <span class="hljs-attr ngde">selector</span>: <span class="hljs-string ngde">'app-bubble-chart-demo'</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">standalone</span>: <span class="hljs-literal ngde">true</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">imports</span>: [<span class="hljs-title class_ ngde"><a href="/api/my-lib/classes/BubbleChartComponent" class="ng-doc-code-anchor ngde" data-link-type="Component" class="ngde">BubbleChartComponent</a></span>],
</span><span class="line ngde">  <span class="hljs-attr ngde">template</span>: <span class="hljs-string ngde">\`</span>
</span><span class="line ngde"><span class="hljs-string ngde">    &#x3C;div class="space-y-8"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;!-- Basic Bubble Chart --></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;h3 class="text-lg font-semibold mb-4">Basic Bubble Chart&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-bubble-chart</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [data]="[</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ x: 10, y: 20, r: 5 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ x: 15, y: 30, r: 8 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ x: 20, y: 25, r: 6 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ x: 25, y: 35, r: 10 \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">          ]"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          x="x"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          y="y"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          r="r"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          title="Sample Bubble Chart"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        >&#x3C;/app-bubble-chart></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;!-- Multi-Series Bubble Chart --></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;h3 class="text-lg font-semibold mb-4">Multi-Series Bubble Chart&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-bubble-chart</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [data]="[</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ x: 10, y: 20, r: 5, category: 'A' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ x: 15, y: 30, r: 8, category: 'A' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ x: 20, y: 25, r: 6, category: 'B' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ x: 25, y: 35, r: 10, category: 'B' \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">          ]"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          x="x"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          y="y"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          r="r"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          series="category"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          title="Multi-Series Bubble Chart"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [bubbleOpacity]="0.6"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        >&#x3C;/app-bubble-chart></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;!-- Logarithmic Scale Bubble Chart --></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;h3 class="text-lg font-semibold mb-4">Logarithmic Scale Bubble Chart&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-bubble-chart</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [data]="[</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ x: 1, y: 10, r: 5 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ x: 10, y: 100, r: 8 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ x: 100, y: 1000, r: 6 \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ x: 1000, y: 10000, r: 10 \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">          ]"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          x="x"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          y="y"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          r="r"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          title="Logarithmic Scale Bubble Chart"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [xLog]="true"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [yLog]="true"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          xAxisTitle="X (log scale)"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          yAxisTitle="Y (log scale)"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        >&#x3C;/app-bubble-chart></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde"></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;!-- Styled Bubble Chart --></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;div></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;h3 class="text-lg font-semibold mb-4">Styled Bubble Chart&#x3C;/h3></span>
</span><span class="line ngde"><span class="hljs-string ngde">        &#x3C;app-bubble-chart</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [data]="[</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ x: 10, y: 20, r: 5, category: 'A' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ x: 15, y: 30, r: 8, category: 'A' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ x: 20, y: 25, r: 6, category: 'B' \},</span>
</span><span class="line ngde"><span class="hljs-string ngde">            \{ x: 25, y: 35, r: 10, category: 'B' \}</span>
</span><span class="line ngde"><span class="hljs-string ngde">          ]"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          x="x"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          y="y"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          r="r"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          series="category"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          title="Styled Bubble Chart"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [bubbleOpacity]="0.6"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [bubbleBorderWidth]="1"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          bubbleBorderColor="rgba(0, 0, 0, 0.1)"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [bubbleHoverRadius]="8"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [bubbleHoverBorderWidth]="2"</span>
</span><span class="line ngde"><span class="hljs-string ngde">          [downloadableImage]="true"</span>
</span><span class="line ngde"><span class="hljs-string ngde">        >&#x3C;/app-bubble-chart></span>
</span><span class="line ngde"><span class="hljs-string ngde">      &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde">    &#x3C;/div></span>
</span><span class="line ngde"><span class="hljs-string ngde">  \`</span>
</span><span class="line ngde">\})
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">class</span> <span class="hljs-title class_ ngde">BubbleChartDemoComponent</span> \{\}
</span></code></pre>`,
    },
],
}

export default demoAssets;
