"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var global_1 = require("global");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var rxjs_1 = require("rxjs");
var app_component_1 = require("./components/app.component");
var app_token_1 = require("./app.token");
var platform = null;
var promises = [];
var moduleClass = /** @class */ (function () {
    function DynamicModule() {
    }
    return DynamicModule;
}());
var componentClass = /** @class */ (function () {
    function DynamicComponent() {
    }
    return DynamicComponent;
}());
var storyData = new rxjs_1.ReplaySubject(1);
var getModule = function (declarations, entryComponents, bootstrap, data, moduleMetadata) {
    storyData.next(data);
    var moduleMeta = {
        declarations: declarations.concat((moduleMetadata.declarations || [])),
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule].concat((moduleMetadata.imports || [])),
        providers: [{ provide: app_token_1.STORY, useValue: storyData }].concat((moduleMetadata.providers || [])),
        entryComponents: entryComponents.concat((moduleMetadata.entryComponents || [])),
        schemas: (moduleMetadata.schemas || []).slice(),
        bootstrap: bootstrap.slice(),
    };
    return core_1.NgModule(moduleMeta)(moduleClass);
};
var createComponentFromTemplate = function (template, styles) {
    return core_1.Component({
        template: template,
        styles: styles,
    })(componentClass);
};
var extractNgModuleMetadata = function (importItem) {
    var decoratorKey = '__annotations__';
    var decorators = Reflect && Reflect.getOwnPropertyDescriptor
        ? Reflect.getOwnPropertyDescriptor(importItem, decoratorKey).value
        : importItem[decoratorKey];
    if (!decorators || decorators.length === 0) {
        return null;
    }
    var ngModuleDecorator = decorators.find(function (decorator) { return decorator instanceof core_1.NgModule; });
    if (!ngModuleDecorator) {
        return null;
    }
    return ngModuleDecorator;
};
var getExistenceOfComponentInModules = function (component, declarations, imports) {
    if (declarations && declarations.some(function (declaration) { return declaration === component; })) {
        // Found component in declarations array
        return true;
    }
    if (!imports) {
        return false;
    }
    return imports.some(function (importItem) {
        var extractedNgModuleMetadata = extractNgModuleMetadata(importItem);
        if (!extractedNgModuleMetadata) {
            // Not an NgModule
            return false;
        }
        return getExistenceOfComponentInModules(component, extractedNgModuleMetadata.declarations, extractedNgModuleMetadata.imports);
    });
};
var initModule = function (storyFn) {
    var storyObj = storyFn();
    var component = storyObj.component, template = storyObj.template, props = storyObj.props, styles = storyObj.styles, _a = storyObj.moduleMetadata, moduleMetadata = _a === void 0 ? {} : _a;
    var isCreatingComponentFromTemplate = Boolean(template);
    var AnnotatedComponent = isCreatingComponentFromTemplate
        ? createComponentFromTemplate(template, styles)
        : component;
    var componentRequiesDeclaration = isCreatingComponentFromTemplate ||
        !getExistenceOfComponentInModules(component, moduleMetadata.declarations, moduleMetadata.imports);
    var componentDeclarations = componentRequiesDeclaration
        ? [app_component_1.AppComponent, AnnotatedComponent]
        : [app_component_1.AppComponent];
    var story = {
        component: AnnotatedComponent,
        props: props,
    };
    return getModule(componentDeclarations, [AnnotatedComponent], [app_component_1.AppComponent], story, moduleMetadata);
};
var staticRoot = global_1.document.getElementById('root');
var insertDynamicRoot = function () {
    var app = global_1.document.createElement('storybook-dynamic-app-root');
    staticRoot.appendChild(app);
};
var draw = function (newModule) {
    if (!platform) {
        insertDynamicRoot();
        // eslint-disable-next-line no-undef
        if (typeof NODE_ENV === 'string' && NODE_ENV !== 'development') {
            try {
                core_1.enableProdMode();
            }
            catch (e) {
                //
            }
        }
        platform = platform_browser_dynamic_1.platformBrowserDynamic();
        promises.push(platform.bootstrapModule(newModule));
    }
    else {
        Promise.all(promises).then(function (modules) {
            modules.forEach(function (mod) { return mod.destroy(); });
            insertDynamicRoot();
            promises = [];
            promises.push(platform.bootstrapModule(newModule));
        });
    }
};
exports.renderNgApp = function (storyFn, forced) {
    if (!forced) {
        draw(initModule(storyFn));
    }
    else {
        storyData.next(storyFn());
    }
};
