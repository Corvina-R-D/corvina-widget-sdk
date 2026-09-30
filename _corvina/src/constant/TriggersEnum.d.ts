export declare enum TriggerPolicyTypeEnum {
    ANALOG_BAND = "ANALOG_BAND",
    ON_CHANGED = "ON_CHANGED",
    CONNECTION = "CONNECTION",
    ON_LEVEL = "ON_LEVEL",
    PASSTHROUGH = "PASSTHROUGH",
    BOOLEAN_OPERATOR = "BOOLEAN_OPERATOR",
    AND_OPERATOR = "AND_OPERATOR",
    OR_OPERATOR = "OR_OPERATOR"
}
export declare enum TriggerPrettyi18nNameEnum {
    ANALOG_BAND = "analogBand",
    ON_CHANGED = "onChange",
    ON_LEVEL = "onLevel",
    CONNECTION = "connection",
    PASSTHROUGH = "passthrough",
    BOOLEAN_OPERATOR = "booleanOperator",
    AND_OPERATOR = "and",
    OR_OPERATOR = "or"
}
export declare enum TriggerPolicyChangeMaskEnum {
    VALUE_CHANGED = "VALUE_CHANGED",
    TIMESTAMP_CHANGED = "TIMESTAMP_CHANGED"
}
export declare enum TriggerPolicyLevelMaskEnum {
    ON_ENTER = "ON_ENTER",
    ON_EXIT = "ON_EXIT"
}
export declare enum TriggerPolicyConnectionSourceEnum {
    VPN = "VPN",
    IOT = "IOT"
}
export declare enum TriggerPolicyConnectionStatusEnum {
    ON = "ON",
    OFF = "OFF"
}
export declare enum TriggerPolicyModelPathMatcherEnum {
    SIMPLE = "simple",
    ADVANCED = "advanced"
}
export declare enum TriggerPolicySourceEnum {
    REAL_DEVICE = "realDevice",
    SIMULATION = "simulation"
}
export declare enum TriggerActionTypeEnum {
    EMAIL_ACTION = "EMAIL_ACTION",
    WEBHOOK_ACTION = "WEBHOOK_ACTION",
    TELEGRAM_ACTION = "TELEGRAM_ACTION",
    TEAMS_ACTION = "TEAMS_ACTION",
    ATTRIBUTE_ACTION = "ATTRIBUTE_ACTION"
}
export declare enum TriggerActionWebhookTypeEnum {
    DELETE = "DELETE",
    PUT = "PUT",
    POST = "POST",
    GET = "GET",
    PATCH = "PATCH"
}
