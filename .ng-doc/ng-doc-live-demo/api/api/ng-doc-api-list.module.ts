// @ts-nocheck
import {ChangeDetectionStrategy, Component} from "@angular/core";
import {Routes} from "@angular/router";
import {NG_DOC_API_LIST_TOKEN, NgDocApiListComponent} from '@ng-doc/app';
import apiList from './ng-doc.api-list.json';

@Component({
    selector: 'ng-doc-api-list-page-api',
    standalone: true,
    template: `<ng-doc-api-list></ng-doc-api-list>`,
    imports: [NgDocApiListComponent],
    providers: [{
        provide: NG_DOC_API_LIST_TOKEN,
        useValue: apiList
    }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicComponent {
}

const routes: Routes = [
    {
        path: '',
        component: DynamicComponent,
    },
    {
        path: 'my-lib',
        loadChildren: () => import('.ng-doc/ng-doc-live-demo/api/api/my-lib/module')
    },
]

export default routes;
