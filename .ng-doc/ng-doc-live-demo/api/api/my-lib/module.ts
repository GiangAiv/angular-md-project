// @ts-nocheck
import {Routes} from "@angular/router";

const routes: Routes = [
    {path: '', redirectTo: 'classes/AccordionItemComponent', pathMatch: 'full'},
    {
        path: '',
        title: 'my-lib',
        children: [
            {
                path: 'classes/AccordionItemComponent',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/api/api/my-lib/classes/AccordionItemComponent/module')
            },
            {
                path: 'classes/AccordionComponent',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/api/api/my-lib/classes/AccordionComponent/module')
            },
            {
                path: 'classes/AlertComponent',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/api/api/my-lib/classes/AlertComponent/module')
            },
            {
                path: 'type-aliases/AreaChartType',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/api/api/my-lib/type-aliases/AreaChartType/module')
            },
            {
                path: 'type-aliases/StepPosition',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/api/api/my-lib/type-aliases/StepPosition/module')
            },
            {
                path: 'type-aliases/HandleMissing',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/api/api/my-lib/type-aliases/HandleMissing/module')
            },
            {
                path: 'classes/AreaChartComponent',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/api/api/my-lib/classes/AreaChartComponent/module')
            },
            {
                path: 'classes/BarChartComponent',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/api/api/my-lib/classes/BarChartComponent/module')
            },
            {
                path: 'classes/BubbleChartComponent',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/api/api/my-lib/classes/BubbleChartComponent/module')
            },
            {
                path: 'classes/TableColumnComponent',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/api/api/my-lib/classes/TableColumnComponent/module')
            },
            {
                path: 'classes/DataTableComponent',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/api/api/my-lib/classes/DataTableComponent/module')
            },
            {
                path: 'classes/ModalComponent',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/api/api/my-lib/classes/ModalComponent/module')
            },
            {
                path: 'classes/TabComponent',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/api/api/my-lib/classes/TabComponent/module')
            },
            {
                path: 'classes/TabsComponent',
                loadChildren: () => import('.ng-doc/ng-doc-live-demo/api/api/my-lib/classes/TabsComponent/module')
            },
        ]
    }
]

export default routes;
