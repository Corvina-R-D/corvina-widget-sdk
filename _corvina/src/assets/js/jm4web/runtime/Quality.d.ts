declare enum QualityStatus {
    QUALITY_BAD = 0,
    QUALITY_UNCERTAIN = 1,
    QUALITY_GOOD = 3
}
export default class Quality {
    private qual;
    private substatus;
    private limit;
    static MASKQUALITY: number;
    static MASKSUBSTATUS: number;
    static MASKLIMITS: number;
    constructor(bits?: any);
    getStatus(): QualityStatus;
    setState(bits: number): void;
    setStatus(quality: number): void;
    clone(): Quality;
    toString(): String;
    isQualityGood(): boolean;
    static isQualityGood(bits: number): boolean;
    isQualityUncertain(): boolean;
    isQualityBad(): boolean;
}
export {};
