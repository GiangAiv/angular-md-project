// @ts-nocheck
import {Routes} from '@angular/router';

export const NG_DOC_ROUTING: Routes = [
    {
        path: 'api',
        loadChildren: () => import('.ng-doc/ng-doc-live-demo/api/api/ng-doc-api-list.module')
    },
    {
        path: 'chart-components',
        loadChildren: () => import('.ng-doc/ng-doc-live-demo/guides/chart-components/module')
    },
    {
        path: 'data-components',
        loadChildren: () => import('.ng-doc/ng-doc-live-demo/guides/data-components/module')
    },
    {
        path: 'map-components',
        loadChildren: () => import('.ng-doc/ng-doc-live-demo/guides/map-components/module')
    },
    {
        path: 'ui-components',
        loadChildren: () => import('.ng-doc/ng-doc-live-demo/guides/ui-components/module')
    },
];
