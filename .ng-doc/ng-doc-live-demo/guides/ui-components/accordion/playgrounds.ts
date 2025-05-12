// @ts-nocheck
import {ChangeDetectionStrategy, Component, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {NgDocBasePlayground, providePlaygroundDemo} from '@ng-doc/app';
// noinspection ES6UnusedImports
import pageEntity from 'src/app/docs/ui-components/accordion/ng-doc.page';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'ng-doc-playground-1',
    standalone: true,
    template: `
		<app-accordion-item [title]="properties['title']" [description]="properties['description']" [compact]="properties['compact']" [expanded]="properties['expanded']">Content</app-accordion-item>
	`,
    imports: [
        CommonModule,
        pageEntity.playgrounds['AccordionPlayground'].target,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent1 extends NgDocBasePlayground {
    static readonly selector: string = 'app-accordion-item';

    @ViewChild(pageEntity.playgrounds['AccordionPlayground'].target, {static: true})
    readonly playground: Type<any>;

    @ViewChild(pageEntity.playgrounds['AccordionPlayground'].target, {static: true, read: ViewContainerRef})
    readonly viewContainerRef: ViewContainerRef;

    readonly configData: any = pageEntity.playgrounds['AccordionPlayground'].data;

    constructor() {
        super(pageEntity.playgrounds['AccordionPlayground'].target);
    }
}

export const PLAYGROUND_COMPONENTS = [
    PlaygroundComponent1,
];

export const PLAYGROUND_PROVIDERS = [
    providePlaygroundDemo('AccordionPlayground', PlaygroundComponent1),
];
