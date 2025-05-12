// @ts-nocheck
import {Provider} from '@angular/core';
import {NG_DOC_CONTEXT} from '@ng-doc/app/tokens';

export function provideNgDocContext(): Provider {
    return {
        provide: NG_DOC_CONTEXT,
        useValue: {
            navigation: [
                
                {
                    title: `API`,
                    route: '/api',
                    order: 1,
                    hidden: false,
                },
                
                {
                    title: `Chart Components`,
                    route: '/chart-components',
                    expandable: true,
                    expanded: true,
                    order: 2,
                    hidden: false,
                    children: [
                        
                {
                    title: `Area Chart`,
                    route: '/chart-components/area-chart',
                },
                        
                {
                    title: `Bar Chart`,
                    route: '/chart-components/bar-chart',
                },
                        
                {
                    title: `Bubble Chart`,
                    route: '/chart-components/bubble-chart',
                },
                    ]
                },
                
                {
                    title: `UI Components`,
                    route: '/ui-components',
                    expandable: true,
                    expanded: false,
                    order: 2,
                    hidden: false,
                    children: [
                        
                {
                    title: `Accordion`,
                    route: '/ui-components/accordion',
                },
                        
                {
                    title: `Alert`,
                    route: '/ui-components/alert',
                },
                        
                {
                    title: `Modal`,
                    route: '/ui-components/modal',
                },
                        
                {
                    title: `Tabs`,
                    route: '/ui-components/tabs',
                },
                    ]
                },
                
                {
                    title: `Data Components`,
                    route: '/data-components',
                    expandable: true,
                    expanded: false,
                    children: [
                        
                {
                    title: `DataTable`,
                    route: '/data-components/data-table',
                },
                    ]
                },
                
                {
                    title: `Map Components`,
                    route: '/map-components',
                    expandable: true,
                    expanded: false,
                    children: [
                    ]
                },
            ],
        }
    };
}
