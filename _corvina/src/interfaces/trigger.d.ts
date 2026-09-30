import { TriggerPolicyChangeMaskEnum, TriggerPolicyTypeEnum, TriggerPolicyLevelMaskEnum, TriggerActionTypeEnum, TriggerPolicyConnectionSourceEnum, TriggerPolicyConnectionStatusEnum } from "@/constant/TriggersEnum";
import { PaginationDTO } from "./commons/pagination";
export interface PageTriggerResponseDTO extends PaginationDTO {
    content: TriggerResponseDTO[];
}
export interface TriggerBase {
    id: string;
    name: string;
    orgResourceId: string;
    updatedAt: number;
    triggerData: any;
    disabled?: boolean;
    deviceGroups: string[];
    owner?: string;
}
export type OperatorPolicies = TriggerPolicyAndOperator | TriggerPolicyOrOperator;
export type MatchPolicies = TriggerPolicyAnalogBand | TriggerPolicyOnChange | TriggerPolicyOnLevel | TriggerPolicyPassThrough;
export type ExistingPolicies = OperatorPolicies | MatchPolicies;
export type AvailableActions = TriggerEmailAction | TriggerWebhookAction | TriggerAttributeAction;
export interface TriggerDTO extends TriggerBase {
    triggerData: {
        policy: OperatorPolicies;
        actions: Array<AvailableActions>;
    };
}
export interface TriggerResponseDTO extends TriggerBase {
    triggerData: {
        policy: ExistingPolicies;
        actions: Array<AvailableActions>;
    };
}
export interface TriggerObject extends TriggerBase {
    triggerData: {
        policy: Array<OperatorPolicies>;
        actions: Array<AvailableActions>;
    };
}
export interface CounterResponseDTO {
    time: number;
    counterIn: number;
    counterOut: number;
    counterThrottled: number;
}
export interface PageCounterResponseDTO extends PaginationDTO {
    content: CounterResponseDTO[];
}
export interface DeltaCounters {
    timeFrom: number;
    timeTo: number;
    deltaCounterIn: number;
    deltaCounterOut: number;
    deltaCounterThrottled: number;
}
export interface TriggerCreateRequestDTO {
    orgResourceId: string;
    name: string;
    triggerData: {
        policy: ExistingPolicies;
        actions: Array<AvailableActions>;
        locale?: string;
        timezone?: string;
    };
    disabled?: boolean;
    deviceGroups: string[];
    id?: string;
}
export interface TriggerPolicyTree {
    parentUuid: null;
    showDropLimit: false;
    addYoungerSibilling: false;
    mousePointer: false;
    addChild: false;
    addOlderSibilling: false;
}
export interface TriggerPolicyAnalogBandTree extends TriggerPolicyAnalogBand, TriggerPolicyTree {
}
export interface TriggerPolicyOnChangeTree extends TriggerPolicyOnChange, TriggerPolicyTree {
}
export interface TriggerPolicyOnLevelTree extends TriggerPolicyOnLevel, TriggerPolicyTree {
}
export interface TriggerPolicyConnectionTree extends TriggerPolicyConnection, TriggerPolicyTree {
}
export interface TriggerPolicyPassThroughTree extends TriggerPolicyPassThrough, TriggerPolicyTree {
}
export interface TriggerPolicyAndOperatorTree extends TriggerPolicyAndOperator, TriggerPolicyTree {
}
export interface TriggerPolicyOrOperatorTree extends TriggerPolicyOrOperator, TriggerPolicyTree {
}
export interface TriggerPolicyAnalogBand {
    modelPathMatcher: string;
    type: TriggerPolicyTypeEnum.ANALOG_BAND;
    inside: boolean;
    minOrEqual: boolean;
    min: number;
    maxOrEqual: boolean;
    max: number;
    time?: number;
    uuid?: string;
}
export interface TriggerPolicyOnChange {
    modelPathMatcher: string;
    type: TriggerPolicyTypeEnum.ON_CHANGED;
    changeMask: TriggerPolicyChangeMaskEnum.VALUE_CHANGED | TriggerPolicyChangeMaskEnum.TIMESTAMP_CHANGED;
    skipFirstNChanges: number;
    deadband: number;
    isPercentage: boolean;
    uuid?: string;
}
export interface TriggerPolicyOnLevel {
    modelPathMatcher: string;
    type: TriggerPolicyTypeEnum.ON_LEVEL;
    level: string;
    levelBool: boolean;
    mode: TriggerPolicyLevelMaskEnum.ON_ENTER | TriggerPolicyLevelMaskEnum.ON_EXIT;
    skipFirstChanges: number;
    minOrEqual: boolean;
    min: number;
    maxOrEqual: boolean;
    max: number;
    time?: number;
    uuid?: string;
}
export interface TriggerPolicyPassThrough {
    type: TriggerPolicyTypeEnum.PASSTHROUGH;
    modelPathMatcher: string;
    uuid?: string;
}
export interface TriggerPolicyConnection {
    type: TriggerPolicyTypeEnum.CONNECTION;
    source: TriggerPolicyConnectionSourceEnum.IOT | TriggerPolicyConnectionSourceEnum.VPN;
    status: TriggerPolicyConnectionStatusEnum.ON | TriggerPolicyConnectionStatusEnum.OFF;
    time?: number;
}
export interface TriggerPolicyAndOperator {
    type: TriggerPolicyTypeEnum.AND_OPERATOR;
    innerPolicies: Array<ExistingPolicies>;
    uuid?: string;
}
export interface TriggerPolicyOrOperator {
    type: TriggerPolicyTypeEnum.OR_OPERATOR;
    innerPolicies: Array<ExistingPolicies>;
    uuid?: string;
}
export interface TriggerEmailEventContentDTO {
    emailTo: string;
    emailFrom: string;
    emailBcc?: string;
    subject: string;
    template: string;
    xdays: string;
}
export interface TriggerEmailAction {
    type: TriggerActionTypeEnum.EMAIL_ACTION;
    disabled?: boolean;
    stateful: false;
    emailConfig: TriggerEmailEventContentDTO;
    throttlingIntervalInMSec?: number;
    uuid?: string;
}
export interface TriggerWebhookEventContentDTO {
    headers: {};
    method: string;
    url: string;
    template: string;
    xdays: string;
}
export interface TriggerWebhookAction {
    type: TriggerActionTypeEnum.WEBHOOK_ACTION;
    disabled?: boolean;
    stateful: false;
    webhookConfig: TriggerWebhookEventContentDTO;
    throttlingIntervalInMSec?: number;
    uuid?: string;
}
export interface TeamsEventContentDTO {
    endpoint: string;
    template: string;
    xdays: string;
}
export interface TriggerTeamsAction {
    type: TriggerActionTypeEnum.TEAMS_ACTION;
    disabled?: boolean;
    stateful: false;
    teamsConfig: TeamsEventContentDTO;
    throttlingIntervalInMSec?: number;
    uuid?: string;
}
export interface TelegramEventContentDTO {
    token: string;
    chatId: string;
    template: string;
    xdays: string;
}
export interface TriggerTelegramAction {
    type: TriggerActionTypeEnum.TELEGRAM_ACTION;
    disabled?: boolean;
    stateful: false;
    telegramConfig: TelegramEventContentDTO;
    throttlingIntervalInMSec?: number;
    uuid?: string;
}
export interface TriggerAttributeAction {
    type: TriggerActionTypeEnum.ATTRIBUTE_ACTION;
    disabled?: boolean;
    stateful: false;
    attribute: string;
    throttlingIntervalInMSec?: number;
    uuid?: string;
}
export interface TriggerActionsDTO {
    webhookAction: boolean;
    emailAction: boolean;
    attributeAction: boolean;
    telegramAction: boolean;
    teamsAction: boolean;
}
