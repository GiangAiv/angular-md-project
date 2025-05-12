// @ts-nocheck
import {ChangeDetectionStrategy, Component, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {NgDocBasePlayground, providePlaygroundDemo} from '@ng-doc/app';
// noinspection ES6UnusedImports
import pageEntity from 'src/app/docs/ui-components/modal/ng-doc.page';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'ng-doc-playground-1',
    standalone: true,
    template: `
		<app-modal [title]="properties['title']" [buttonText]="properties['buttonText']" [size]="properties['size']">Modal Content</app-modal>
	`,
    imports: [
        CommonModule,
        pageEntity.playgrounds['ModalPlayground'].target,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent1 extends NgDocBasePlayground {
    static readonly selector: string = 'app-modal';

    @ViewChild(pageEntity.playgrounds['ModalPlayground'].target, {static: true})
    readonly playground: Type<any>;

    @ViewChild(pageEntity.playgrounds['ModalPlayground'].target, {static: true, read: ViewContainerRef})
    readonly viewContainerRef: ViewContainerRef;

    readonly configData: any = pageEntity.playgrounds['ModalPlayground'].data;

    constructor() {
        super(pageEntity.playgrounds['ModalPlayground'].target);
    }
}

export const PLAYGROUND_COMPONENTS = [
    PlaygroundComponent1,
];

export const PLAYGROUND_PROVIDERS = [
    providePlaygroundDemo('ModalPlayground', PlaygroundComponent1),
];
