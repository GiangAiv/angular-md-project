// @ts-nocheck
import {Routes} from "@angular/router";

const routes: Routes = [
    {path: '', redirectTo: 'accordion', pathMatch: 'full'},
    {
        path: '',
        title: `UI Components`,
        children: [
            {
                path: 'accordion',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/guides/ui-components/accordion/module')
            },
            {
                path: 'alert',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/guides/ui-components/alert/module')
            },
            {
                path: 'modal',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/guides/ui-components/modal/module')
            },
            {
                path: 'tabs',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/guides/ui-components/tabs/module')
            },
        ]
    }
]

export default routes;
