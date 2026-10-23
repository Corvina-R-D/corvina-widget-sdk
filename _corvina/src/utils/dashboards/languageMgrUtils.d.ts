import { LanguageMgr, BaseWgt, BasePropsHandler } from "../../corvina-model";
export declare const WGTID_START: string;
export declare const INVALID_JSON_ERROR: {
    valid: number;
    errors: string[];
}[];
export declare function filterLanguages(): any;
export declare function languagesOptions(): any;
export declare function getAvailableLanguages(): any;
export declare function createOptions(): any[];
export declare function getComponentValuesAndRemove(wgt: any, wgtLM?: BaseWgt): Map<string, Map<string, any>>;
export declare function getComponentPropertyValueAndRemove(wgtId: any, property: any): Map<string, Map<string, any>>;
export declare function getLanguageDisplay(lang: any): any;
export declare function getTextLanguagesTooltip(wgtId: string, propName: string, indexList?: number): {
    [language: string]: string;
};
export declare function supportI18n(propertyHandler: BasePropsHandler, prop: string, path?: {
    name: string;
    isArray: boolean;
}[], properties?: string[]): boolean;
export declare function exploreSupportI18n(wgt: any, propertyHandler: BasePropsHandler, prop: string): string | string[];
export declare function applyMappingComposedWidget(mappingID: Map<string, string>, addJson: Record<string, any>, languageMgrWgt: LanguageMgr, parentId: string): void;
