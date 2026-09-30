export default class TextFormatUtil {
    static timeFormatValidator: RegExp;
    static dateFormatValidator: RegExp;
    static applyPadding(formatOpt: any, strValue: any): any;
    static formatINTValue(options: any, newValue: any, style: any, grouping: any): any;
    static applyStyle(strValue: any, style: any, groupingThousand: any): any;
    static formatDecimalPlaces(options: any, newValue: any): any;
    static formatFLOATValue(options: any, newValue: any, style: any, groupingThousand: any): any;
    static formatHexadecimalValue(options: any, newValue: any): any;
    static formatExponentialValue(options: any, newValue: any, expDigits: any, style: any, groupingThousand: any): any;
    static scientificNotation(value: any, decimals: any, coefficentDegree: any, expDigits: any): string;
    static formatText(options: any, newValue: any, style: any, groupingThousand: any): any;
    static getIndexesOfSeparators(format: any): {
        e: number;
        E: number;
        "+": number;
        "-": number;
        ",": number;
        h: number;
        H: number;
        ".": number;
        "0": number;
        "#": number;
    };
    static countOptionalDecimalDigits(format: any, idxDot: any): number;
    static countOptionalLeadingDigits(format: any, idxDot: any): number;
    static parseFormat(format: any): {
        format: any;
        formatType: enFormatType.TEXT | enFormatType.NUMBER;
        numericFormat: enNumericType.INT | enNumericType.FLOAT | enNumericType.HEXL | enNumericType.HEXU | enNumericType.EXP | enNumericType.EXPD;
        decimalPlaces: number;
        isPadding: boolean;
        magnitudeDegree: number;
        dotPos: number;
        leadingDigits: number;
        hPos: number;
        ePos: number;
        eSymbol: string;
        oldDigitsGrouping: number;
        optionalDecimals: number;
        optionalLeading: number;
    };
    static format(options: any, value: any, style: any, groupingThousand: any): any;
    static addDecimalDigitsToFormat(format: any, decimalDigits: any): any;
    static addLeadingDigitsToFormat(format: any, leadingDigits: any): any;
    static generateDynamicFormat(options: any): any;
    static containsD(format: any, strD: any): boolean;
    static parseDateTimeFormat(format: any, configuration: any): {
        format: any;
        formatType: enFormatType;
    };
    static formatDateTime(value: any, timeSpec: any, formatOpt: any, config: any): string;
}
declare enum enNumericType {
    INT = 0,
    FLOAT = 1,
    HEXL = 2,
    HEXU = 3,
    EXP = 4,
    EXPD = 5,
    THOUSAND = 6
}
declare enum enFormatType {
    TEXT = 0,
    NUMBER = 1,
    DATETIME = 2
}
export declare function abbreviate(value: number): string;
export {};
