import { OnInit, ViewContainerRef, ComponentFactoryResolver, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StoryFnAngularReturnType } from '../../types';
export declare class AppComponent implements OnInit, OnDestroy {
    private cfr;
    private changeDetectorRef;
    private data;
    target: ViewContainerRef;
    subscription: Subscription;
    constructor(cfr: ComponentFactoryResolver, changeDetectorRef: ChangeDetectorRef, data: Observable<StoryFnAngularReturnType>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Set inputs and outputs
     */
    private setProps;
    /**
     * Manually call 'ngOnChanges' hook because angular doesn't do that for dynamic components
     * Issue: [https://github.com/angular/angular/issues/8903]
     */
    private callNgOnChangesHook;
    /**
     * If component implements ControlValueAccessor interface try to set ngModel
     */
    private setNgModel;
}
