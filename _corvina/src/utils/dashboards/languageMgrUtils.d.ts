import { BaseWgt } from "../../corvina-model";
export declare const WGTID_START: string;
export declare const INVALID_JSON_ERROR: {
    valid: number;
    errors: string[];
}[];
export declare function filterdLanguages(): any;
export declare function languagesOptions(): any;
export declare function getAvailableLanguages(): any;
export declare function createOptions(): any[];
export declare function getComponentValuesAndRemove(wgt: any, wgtLM?: BaseWgt): Map<string, Map<string, any>>;
export declare function getComponentPropertyValueAndRemove(wgtId: any, property: any): Map<string, Map<string, any>>;
export declare function getLanguageDisplay(lang: any): any;
export declare function getTextLanguages(wgtId: string, propName: string, indexList?: number): {
    [language: string]: string;
};
export declare function getPropertyTextValue(wgtPath: string, interpolation?: JSON): any;
