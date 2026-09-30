import BSON from "bson";
export declare enum NoiseSimulationType {
    ABSOLUTE = "abs",
    PERCENT = "%"
}
export interface NoiseSimulationProperties {
    type: NoiseSimulationType;
    amplitude: number;
}
export interface NullableSimulationStateMachine {
    nullifying: boolean;
    start: number;
    duration: number;
}
export interface NullableSimulationProperties {
    probability: number;
    dt_min: number;
    dt_max: number;
    state?: NullableSimulationStateMachine;
}
export declare enum SimulationType {
    SINE = "sine",
    STEP = "step",
    CONST = "const",
    FUNCTION = "function"
}
export interface SimulationDesc {
    type: SimulationType;
    noise: NoiseSimulationProperties;
    nullable: NullableSimulationProperties;
}
export interface TagDesc {
    name: string;
    type: string;
    simulation: SimulationDesc;
}
export interface MultiLangString {
    [languageCode: string]: string;
}
export interface AlarmDesc {
    name: string;
    desc: MultiLangString;
    source: string;
    severity: number;
    ack_required: boolean;
    reset_required: boolean;
    enabled: boolean;
    simulation: SimulationDesc;
}
export interface DataPoint {
    tagName: string;
    value: any;
    timestamp: number;
}
export declare enum AlarmState {
    ALARM_NONE = 0,
    ALARM_ENABLED = 1,
    ALARM_ACTIVE = 2,
    ALARM_ACKED = 4,
    ALARM_REQUIRES_ACK = 8,
    ALARM_REQUIRES_RESET = 16
}
export interface AlarmData {
    name: string;
    desc: string;
    ts: Date;
    evTs: Date;
    sev?: BSON.Int32;
    state: number;
    tag?: string;
    v_d?: number;
    v_i?: BSON.Int32;
    v_b?: boolean;
    v_s?: string;
    v_l?: BSON.Long;
    v_o?: BSON.Binary;
}
export interface AlarmCommand {
    command: string;
    comment: string;
    evTs: number;
    name: string;
    user: string;
}
export declare enum StepSimulationState {
    STABLE = 0,
    TRANSITION = 1
}
export interface StepSimulationStateMachine {
    state: StepSimulationState;
    origin: number;
    target: number;
    current: number;
    duration: number;
    start: number;
}
export interface StepSimulationProperties extends SimulationDesc {
    amplitude: number;
    offset: number;
    easing: string;
    easingProps?: any;
    jump_probability: number;
    dt_min: number;
    dt_max: number;
    state?: StepSimulationStateMachine;
}
export interface SineSimulationProperties extends SimulationDesc {
    amplitude: number;
    offset: number;
    period: number;
    phase: number;
}
export interface FunctionSimulationProperties extends SimulationDesc {
    f: string;
    _f?: ($: any) => any;
}
export interface ConstSimulationProperties extends SimulationDesc {
    value: number;
}
