import BaseWgt from "./BaseWgt";
export default class LanguageMgr extends BaseWgt {
    private language;
    private fallbackLanguage;
    private text;
    private translationsObj;
    private textView;
    private dashboardLanguagePreview;
    private forceTextView;
    constructor(args: any);
    private checkLanguages;
    private setAllDefualtValues;
    updateKeyValueVarListOptions(wgtId: any, prop: any, value: Array<{
        key: string;
        value: string;
    }>, oldValue: Array<{
        key: string;
        value: string;
    }>): void;
    updateOrderArrayKeyValue(wgtId: any, prop: any, newValue: Array<{
        value: any;
        display: string;
    }>): void;
    updateKeyValue(wgtId: any, prop: any, value: any): void;
    private isDefaultValue;
    private extractPropFromWidget;
    private findLangDifference;
    private findTextDifferences;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    private getIDbyText;
    decorationChangeData(viewString: string, skipShowErrors?: boolean): JSON;
    private addWidgetToJson;
    private decorationViewData;
    private updateTextView;
    private updateForceTextView;
    private updateText;
    getPropertyValue(property: string): any;
    manageUndoRedoActions(keyValueInput: Map<string, Map<string, any>>): void;
    removeKey(wgtId: any, prop: any): Map<string, Map<string, any>>;
    removeAllKeys(wgtId: string): Map<string, Map<string, any>>;
    addPropertyValue(keyId: string, textValue: any, propName: string): boolean;
    uploadJSON(newText: JSON): boolean;
    changeGlobalLanguage(newLanguage: string, force?: boolean): boolean;
    firstLoadLanguage(comps: Object, defaultLanguage?: any): void;
    changeTextLanguage(): void;
    private resetText;
    private defaultBaseText;
    private wgtIdToName;
    private checkTypeValueProperty;
    private findFirstValueProperty;
    private checkTextLanguage;
    private findDuplicateObjectKeys;
    checkChangeText(viewString: any, forceAllCheck?: boolean, skipShowErrors?: boolean, skipUpdateText?: boolean): any;
    checkText(json: any, forceAllCheck?: boolean, skipShowErrors?: boolean, skipUpdateText?: boolean): any;
    updateMessagesWarnings(warnings?: {
        valid: number;
        warnings?: string[];
        errors?: string[];
        language?: string;
        missingProps?: string[];
    }[]): void;
    invalidInput(check: {
        valid: number;
        warnings?: string[];
        errors?: string[];
        language?: string;
        missingProps?: string[];
    }[]): void;
    serialize(): import("@/corvina-model").IWidgetSerialization;
}
