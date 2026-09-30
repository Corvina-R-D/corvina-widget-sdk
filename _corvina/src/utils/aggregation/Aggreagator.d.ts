export declare enum SizeUnit {
    years = "years",
    months = "months",
    weeks = "weeks",
    days = "days",
    hours = "hours",
    minutes = "minutes",
    seconds = "seconds",
    milliseconds = "milliseconds"
}
export declare enum TIMERESOLUTION {
    SECONDS = "SECONDS",
    MINUTE = "MINUTE",
    HOURS = "HOURS",
    DAYS = "DAYS",
    MONTH = "MONTH",
    YEAR = "YEAR"
}
export declare function mapTimeResolutionToSizeUnit(timeResolution: TIMERESOLUTION): SizeUnit;
