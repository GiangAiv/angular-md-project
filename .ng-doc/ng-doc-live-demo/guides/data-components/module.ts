// @ts-nocheck
import {Routes} from "@angular/router";

const routes: Routes = [
    {path: '', redirectTo: 'data-table', pathMatch: 'full'},
    {
        path: '',
        title: `Data Components`,
        children: [
            {
                path: 'data-table',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/guides/data-components/data-table/module')
            },
        ]
    }
]

export default routes;
