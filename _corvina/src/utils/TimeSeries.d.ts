export interface ITimeSeries {
    timestamps: number[];
    values: any[];
}
export declare class TimeSeries implements ITimeSeries {
    timestamps: number[];
    values: any[];
    constructor({ timestamps, values }: {
        timestamps: number[];
        values: any[];
    });
    static isTimeSeries(value: any): any;
    static from(value: any): TimeSeries;
}
