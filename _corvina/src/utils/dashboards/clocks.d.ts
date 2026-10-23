import { TIME_UNITS } from "@/interfaces/dashboardClock";
export declare const UNITS_VALUES: {
    milliseconds: number;
    minutes: number;
    hours: number;
    days: number;
    weeks: number;
    years: number;
};
export declare function getMaxSafeDurationValue(unit: string): number;
export declare function isValidDate(date: Date | null): boolean;
export declare function parseClockExpression(expression: string): {
    property: string;
    clock: string;
    sourceId: string;
};
export declare function effectiveDurationValue(value: number): number;
export declare function isValidDurationValue(value: number | string, unit: string): boolean;
export declare function isDurationValueTooLarge(value: number | string, unit: string): boolean;
export declare function calculateBestUnit(value: number): TIME_UNITS.MINUTES | TIME_UNITS.HOURS | TIME_UNITS.DAYS | TIME_UNITS.WEEKS | TIME_UNITS.YEARS;
export declare function calculateDurationStruct(duration: number): {
    value: number;
    unit: TIME_UNITS;
};
