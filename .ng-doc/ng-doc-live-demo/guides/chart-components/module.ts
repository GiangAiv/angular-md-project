// @ts-nocheck
import {Routes} from "@angular/router";

const routes: Routes = [
    {path: '', redirectTo: 'area-chart', pathMatch: 'full'},
    {
        path: '',
        title: `Chart Components`,
        children: [
            {
                path: 'area-chart',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/guides/chart-components/area-chart/module')
            },
            {
                path: 'bar-chart',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/guides/chart-components/bar-chart/module')
            },
            {
                path: 'bubble-chart',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/guides/chart-components/bubble-chart/module')
            },
        ]
    }
]

export default routes;
